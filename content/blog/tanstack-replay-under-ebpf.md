# Replaying an npm supply-chain attack under eBPF: what the kernel sees that your scanner doesn't

In 2026, a run of npm supply-chain attacks (TanStack, Axios, and the Shai-Hulud family) shared one uncomfortable trait: the malicious package versions passed static scanning. Nothing in the registry metadata, the dependency graph, or a pre-install scan flagged them. The only signals that would have caught them in time were behavioral, and they only existed once the code was already running in production.

That is the gap we built [Goodman](https://github.com/hi-heisenbug/goodman) to close: an open-source eBPF sensor that watches what a dependency actually does at runtime, attributes every security-relevant syscall to the exact npm package and version that caused it, and alerts the moment a package's behavior drifts from what it has always done before.

This post walks through a real replay of that attack pattern, the same scenario our end-to-end test suite runs on every change to the sensor, and shows exactly what shows up in the kernel, second by second.

## The pattern, in one sentence

A dependency that has read only its own files and made zero network calls for its entire observed lifetime suddenly, in a patch version bump, starts reading credential files and opening a connection to a host it has never talked to. No CVE. No malicious string in the diff that an `npm audit` would catch. Just new behavior.

## What we replayed

We used Goodman's own end-to-end harness, the same one that has to pass before we merge any change to the sensor or the attribution logic:

```bash
git clone https://github.com/hi-heisenbug/goodman
cd goodman
sudo make e2e
```

The setup: a tiny Node HTTP service requires a package called `good-pkg` and calls into it on every request, so every syscall that package makes originates from inside its own stack frame, exactly like a real dependency in a real service.

**good-pkg@1.0.0**, the baseline, reads one file inside its own package directory and returns. That is the entire behavioral fingerprint. No network. No secrets. No child processes.

**good-pkg@1.0.1**, same public API, same version bump you'd approve without a second look, adds two behaviors:

```js
// NEW BEHAVIOR #1: read a credentials file
secret = fs.readFileSync(FAKE_CRED, "utf8");

// NEW BEHAVIOR #2: outbound connect to an exfil sink
exfiltrate(secret);
```

This mirrors the attack shape across TanStack, Axios, and Shai-Hulud: a trusted, frequently-updated package gets a routine-looking patch release that quietly adds a credential read and a new outbound connection.

## What the kernel saw

Goodman learned `good-pkg@1.0.0`'s baseline over several minutes of live traffic; the collector needs enough observations before it promotes a fingerprint to "known good." Once promoted, we swapped the dependency to 1.0.1 and hit the same endpoint again. Here's the tail of `goodmanctl alerts`:

```text
$ goodmanctl alerts tail

CRITICAL  dependency behavior drift
service   · demo-workload
package   · good-pkg  1.0.0 → 1.0.1

+ NEW READ  /tmp/goodman-fake-secrets/credentials
+ NEW CONNECT 127.0.0.1:9999

baseline learned over 6 rounds of live traffic · 0 prior anomalies
→ attributed to good-pkg in <3s. static scanning would have shown nothing:
  the package.json diff for 1.0.0 → 1.0.1 has no suspicious strings.
```

Two things worth pulling apart here:

**The syscalls alone aren't the hard part.** Any eBPF-based runtime security tool (Falco and similar) can tell you that a process opened a new file or made a new connection. That's necessary but not sufficient: in a service with 40+ dependencies, "something in this process did something new" doesn't tell an on-call engineer where to look.

**The attribution is the hard part.** Goodman resolves the user-space stack at the moment of the syscall through V8 perf maps (`--perf-basic-prof --interpreted-frames-native-stack`) down to the deepest `node_modules/<pkg>/` frame, and maps that to the package's `package.json` version. That's how the alert above names `good-pkg` specifically, not just "node process 41213." When the stack doesn't resolve cleanly (a native addon, a bundler that flattens frames, a worker thread), Goodman reports `<unknown>` rather than guess. A wrong package name sent to an incident channel is worse than no name at all; it sends the on-call engineer somewhere wrong while the actual package keeps running.

## Why this needed to happen at the kernel, not somewhere higher up

Everything upstream of runtime had a chance to catch this and didn't, by design:

- **The registry scanner** evaluates the package before install. The 1.0.1 `package.json` diff shows a version bump; nothing in static analysis of the patch flags "will read arbitrary files and open a socket" unless the scanner executes the code, which most don't, for good reason.
- **CI/CD hardening** (pinning, minimum release age, delayed upgrades) raises the cost of installing a version within minutes of publish. It does nothing once a version is already deployed and has been running safely for days before a maintainer's account or pipeline is compromised and pushes a malicious point release under the same version scheme.
- **Runtime is the only layer left**, and until now it's mostly meant "does this container do something a WAF or network policy blocks" rather than "does this specific dependency behave differently than it always has."

That's the layer Goodman adds. It's explicitly complementary to scanning and CI hardening, not a replacement; you want all three. But 2026 showed what happens when only the first two exist.

## Try it yourself

The whole thing above is reproducible without root, using a synthetic driver instead of live eBPF:

```bash
git clone https://github.com/hi-heisenbug/goodman
cd goodman
make demo
```

Open http://127.0.0.1:8844. The dashboard seeds baseline fingerprints and the drift alert above, so you can click through the same alert we just walked through. For the real eBPF path against your own workload:

```bash
sudo make e2e
```

Source, docs, and the Helm chart for Kubernetes are all [on GitHub](https://github.com/hi-heisenbug/goodman), Apache-2.0.

We're taking a small number of design partners to run this against real production traffic. If runtime dependency drift is something your team has thought about since the 2026 wave of attacks, we'd like to hear where this breaks: [hi@heisenbug.ai](mailto:hi@heisenbug.ai)
