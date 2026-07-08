import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";
import { contactEmail, links } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Replaying an npm supply-chain attack under eBPF",
  description:
    "What the kernel sees that your scanner doesn't: a reproducible eBPF replay of the 2026 npm supply-chain attack pattern, with syscall-level attribution to the exact package.",
  alternates: {
    canonical: "/blog/tanstack-replay-under-ebpf",
  },
  openGraph: {
    title: "Replaying an npm supply-chain attack under eBPF",
    description:
      "What the kernel sees that your scanner doesn't: a reproducible eBPF replay attributing a supply-chain attack pattern to the exact npm package.",
    url: "https://www.heisenbug.ai/blog/tanstack-replay-under-ebpf",
    type: "article",
    images: [{ url: "/dashboard.png", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Replaying an npm supply-chain attack under eBPF",
    description:
      "What the kernel sees that your scanner doesn't: a reproducible eBPF replay attributing a supply-chain attack pattern to the exact npm package.",
    images: ["/dashboard.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Replaying an npm supply-chain attack under eBPF",
  description:
    "A reproducible eBPF replay of the 2026 npm supply-chain attack pattern, attributing syscall-level behavior to the exact package and version.",
  author: { "@type": "Organization", name: "Heisenbug", url: "https://www.heisenbug.ai" },
  publisher: { "@id": "https://www.heisenbug.ai/#organization" },
  mainEntityOfPage: "https://www.heisenbug.ai/blog/tanstack-replay-under-ebpf",
  image: "https://www.heisenbug.ai/dashboard.png",
};

const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="mt-12 scroll-mt-24 font-display text-2xl font-bold tracking-tight sm:text-3xl">
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 text-pretty leading-relaxed text-foreground/90">{children}</p>
);

const Code = ({ children }: { children: string }) => (
  <pre className="mt-4 overflow-x-auto rounded-xl bg-[#2b2b2b] p-4 font-mono text-xs leading-relaxed text-neutral-200 sm:text-sm">
    {children}
  </pre>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>
);

export default function TanStackReplayPost() {
  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Nav />
      <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Engineering · eBPF
        </p>
        <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Replaying an npm supply-chain attack under eBPF: what the kernel
          sees that your scanner doesn&apos;t
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          In 2026, a run of npm supply-chain attacks (TanStack, Axios, and
          the Shai-Hulud family) shared one uncomfortable trait: the
          malicious package versions passed static scanning. Nothing in the
          registry metadata, the dependency graph, or a pre-install scan
          flagged them. The only signals that would have caught them in time
          were behavioral, and they only existed once the code was already
          running in production.
        </p>
        <P>
          That&apos;s the gap we built{" "}
          <Link href={links.repo} target="_blank" className="text-accent underline underline-offset-2">
            Goodman
          </Link>{" "}
          to close: an open-source eBPF sensor that watches what a dependency
          actually does at runtime, attributes every security-relevant
          syscall to the exact npm package and version that caused it, and
          alerts the moment a package&apos;s behavior drifts from what it has
          always done before.
        </P>
        <P>
          This post walks through a real replay of that attack pattern, the
          same scenario our end-to-end test suite runs on every change to the
          sensor, and shows exactly what shows up in the kernel, second by
          second.
        </P>

        <H2>The pattern, in one sentence</H2>
        <P>
          A dependency that has read only its own files and made zero network
          calls for its entire observed lifetime suddenly, in a patch version
          bump, starts reading credential files and opening a connection to a
          host it has never talked to. No CVE. No malicious string in the
          diff that an <InlineCode>npm audit</InlineCode> would catch. Just
          new behavior.
        </P>

        <H2>What we replayed</H2>
        <P>
          We used Goodman&apos;s own end-to-end harness, the same one that
          has to pass before we merge any change to the sensor or the
          attribution logic. It&apos;s not a simulation layered on top of the
          product; it&apos;s the product&apos;s own regression test, and
          anyone can run it:
        </P>
        <Code>{`git clone https://github.com/hi-heisenbug/goodman
cd goodman
sudo make e2e`}</Code>
        <P>
          The setup: a tiny Node HTTP service requires a package called{" "}
          <InlineCode>good-pkg</InlineCode> and calls into it on every
          request, so every syscall that package makes originates from inside
          its own stack frame, exactly like a real dependency in a real
          service.
        </P>
        <P>
          <strong>good-pkg@1.0.0</strong>, the baseline, reads one file
          inside its own package directory and returns. That&apos;s the
          entire behavioral fingerprint. No network. No secrets. No child
          processes.
        </P>
        <P>
          <strong>good-pkg@1.0.1</strong>, same public API, same version
          bump you&apos;d approve without a second look, adds two behaviors:
        </P>
        <Code>{`// NEW BEHAVIOR #1: read a credentials file
secret = fs.readFileSync(FAKE_CRED, "utf8");

// NEW BEHAVIOR #2: outbound connect to an exfil sink
exfiltrate(secret);`}</Code>
        <P>
          This mirrors the attack shape across TanStack, Axios, and
          Shai-Hulud: a trusted, frequently-updated package gets a
          routine-looking patch release that quietly adds a credential read
          and a new outbound connection.
        </P>

        <H2>What the kernel saw</H2>
        <P>
          Goodman learned <InlineCode>good-pkg@1.0.0</InlineCode>&apos;s
          baseline over several minutes of live traffic; the collector needs
          enough observations before it promotes a fingerprint to
          &ldquo;known good.&rdquo; Once promoted, we swapped the dependency
          to 1.0.1 and hit the same endpoint again. Here&apos;s the tail of{" "}
          <InlineCode>goodmanctl alerts</InlineCode>:
        </P>
        <Code>{`$ goodmanctl alerts tail

CRITICAL  dependency behavior drift
service   · demo-workload
package   · good-pkg  1.0.0 → 1.0.1

+ NEW READ  /tmp/goodman-fake-secrets/credentials
+ NEW CONNECT 127.0.0.1:9999

baseline learned over 6 rounds of live traffic · 0 prior anomalies
→ attributed to good-pkg in <3s. static scanning would have shown nothing:
  the package.json diff for 1.0.0 → 1.0.1 has no suspicious strings.`}</Code>
        <P>Two things worth pulling apart here:</P>
        <P>
          <strong>The syscalls alone aren&apos;t the hard part.</strong> Any
          eBPF-based runtime security tool (Falco and similar) can tell you
          that a process opened a new file or made a new connection.
          That&apos;s necessary but not sufficient: in a service with 40+
          dependencies, &ldquo;something in this process did something
          new&rdquo; doesn&apos;t tell an on-call engineer where to look.
        </P>
        <P>
          <strong>The attribution is the hard part.</strong> Goodman resolves
          the user-space stack at the moment of the syscall through V8 perf
          maps (<InlineCode>--perf-basic-prof --interpreted-frames-native-stack</InlineCode>)
          down to the deepest <InlineCode>node_modules/&lt;pkg&gt;/</InlineCode> frame,
          and maps that to the package&apos;s <InlineCode>package.json</InlineCode> version.
          That&apos;s how the alert above names <InlineCode>good-pkg</InlineCode> specifically,
          not just &ldquo;node process 41213.&rdquo; When the stack doesn&apos;t
          resolve cleanly (a native addon, a bundler that flattens frames, a
          worker thread), Goodman reports <InlineCode>&lt;unknown&gt;</InlineCode> rather
          than guess. A wrong package name sent to an incident channel is
          worse than no name at all; it sends the on-call engineer somewhere
          wrong while the actual package keeps running.
        </P>

        <H2>Why this needed to happen at the kernel, not somewhere higher up</H2>
        <P>
          Everything upstream of runtime had a chance to catch this and
          didn&apos;t, by design:
        </P>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-foreground/90">
          <li>
            <strong>The registry scanner</strong> evaluates the package
            before install. The 1.0.1 <InlineCode>package.json</InlineCode> diff
            shows a version bump; nothing in static analysis of the patch
            flags &ldquo;will read arbitrary files and open a socket&rdquo;
            unless the scanner executes the code, which most don&apos;t, for
            good reason.
          </li>
          <li>
            <strong>CI/CD hardening</strong> (pinning, minimum release age,
            delayed upgrades) raises the cost of installing a version within
            minutes of publish. It does nothing once a version is already
            deployed and has been running safely for days before a
            maintainer&apos;s account or pipeline is compromised and pushes a
            malicious point release under the same version scheme.
          </li>
          <li>
            <strong>Runtime is the only layer left</strong>, and until now
            it&apos;s mostly meant &ldquo;does this container do something a
            WAF or network policy blocks&rdquo; rather than &ldquo;does this
            specific dependency behave differently than it always has.&rdquo;
          </li>
        </ul>
        <P>
          That&apos;s the layer Goodman adds. It&apos;s explicitly
          complementary to scanning and CI hardening, not a replacement; you
          want all three. But 2026 showed what happens when only the first
          two exist.
        </P>

        <H2>Try it yourself</H2>
        <P>
          The whole thing above is reproducible without root, using a
          synthetic driver instead of live eBPF:
        </P>
        <Code>{`git clone https://github.com/hi-heisenbug/goodman
cd goodman
make demo`}</Code>
        <P>
          Open <InlineCode>http://127.0.0.1:8844</InlineCode>. The dashboard
          seeds baseline fingerprints and the drift alert above, so you can
          click through the same alert we just walked through. For the real
          eBPF path against your own workload:
        </P>
        <Code>{`sudo make e2e`}</Code>
        <P>
          Source, docs, and the Helm chart for Kubernetes are all{" "}
          <Link href={links.repo} target="_blank" className="text-accent underline underline-offset-2">
            on GitHub
          </Link>
          , Apache-2.0.
        </P>
        <P>
          We&apos;re taking a small number of design partners to run this
          against real production traffic. If runtime dependency drift is
          something your team has thought about since the 2026 wave of
          attacks, we&apos;d like to hear where this breaks.{" "}
          <Link href={`mailto:${contactEmail}`} className="text-accent underline underline-offset-2">
            {contactEmail}
          </Link>
        </P>
      </article>
      <Footer />
    </main>
  );
}
