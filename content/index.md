# Heisenbug: Know which dependency did it

> Runtime npm supply-chain attack detection powered by eBPF. Goodman attributes security-relevant syscalls to the exact npm package and version that caused them, and alerts when a dependency's behavior drifts from its learned baseline. Open source, Apache-2.0, self-hosted.

Goodman is an open-source eBPF sensor for Node.js applications. Unlike static analyzers that scan files during build time, Goodman watches what a dependency actually does at runtime, maps anomalies to per-version behavioral baselines, and alerts on drift within seconds.

## The problem

In 2026, a wave of npm supply-chain attacks (TanStack, Axios, Shai-Hulud family) shared one trait: malicious versions passed static scanning. Registry metadata, dependency graphs, and pre-install scans flagged nothing. The only signals that would have caught them existed after the code was already running in production.

## Key features

- **Runtime attribution**: resolves user-space stacks at syscall time through V8 perf maps down to the deepest `node_modules/<pkg>/` frame, and names the exact package@version responsible.
- **eBPF-powered**: CO-RE tracepoints on file open, network connect, and process exec for watched processes only, with negligible CPU overhead.
- **Behavioral baselines**: learns what each package version normally does over live traffic and alerts only on drift from that fingerprint.
- **Zero code changes**: Helm install for Kubernetes clusters, SQLite for local development, no sidecars, no agents inside your application code.
- **Integrations**: SSE stream APIs, Prometheus metrics, alert routing to your incident channel.
- **Apache-2.0**: 100% open source and self-hosted inside your infrastructure.

## When this is useful

A trusted package ships a routine-looking patch release that quietly adds a credential read and an outbound connection. No CVE exists. No suspicious string appears in the diff. Goodman catches exactly this shape: new file reads, new hosts, new child processes attributed to the specific dependency that changed behavior.

## Try it

```bash
git clone https://github.com/hi-heisenbug/goodman
cd goodman
make demo
```

Open http://127.0.0.1:8844 to see baseline fingerprints and drift alerts in the dashboard.

## Explore further

- [Manifesto](/manifesto.md): what Heisenbug believes and how we work.
- [Blog](/blog.md): engineering notes on runtime dependency security and eBPF.
- [About](/about.md): who we are.
- [Contact](/contact.md): how to reach us.
- [Privacy](/privacy.md): data practices for this website.
- [llms.txt](/llms.txt): machine-readable site guide for AI agents.
- [GitHub repository](https://github.com/hi-heisenbug/goodman)
- [Documentation](https://docs.heisenbug.ai)
