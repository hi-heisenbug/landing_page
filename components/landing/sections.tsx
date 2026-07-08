import Link from "next/link";
import {
  KeyRound,
  Globe,
  TerminalSquare,
  GitCompareArrows,
  ArrowUpRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { links } from "@/lib/constants";
import { CopyCommand } from "./copy-command";

const SectionHeading = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {eyebrow}
    </p>
    <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
      {title}
    </h2>
    {children ? (
      <p className="text-pretty text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    ) : null}
  </div>
);

export const WhyNow = () => {
  const stats = [
    { value: "84", label: "malicious versions published from one compromised release pipeline" },
    { value: "6 min", label: "the malicious code ran inside a legitimate pipeline before anyone noticed" },
    { value: "0", label: "static scanners flagged it — the only signals were behavioral, at the kernel" },
  ];

  return (
    <section className="border-y border-border/10 bg-secondary/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3 sm:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-3 text-center">
            <p className="font-display text-5xl font-bold tracking-tight text-accent sm:text-6xl">{s.value}</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-10 text-center font-mono text-xs text-muted-foreground">
        The 2026 npm supply-chain attacks (TanStack, Axios, Shai-Hulud) all shared one trait:
        install-time checks were green while runtime behavior changed.
      </p>
    </section>
  );
};

export const Demo = () => (
  <section id="product" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20 lg:py-28">
    <SectionHeading eyebrow="54-second demo" title="From syscall to package name">
      Watch Goodman learn a baseline, catch a poisoned version reading
      credentials, and name the exact package — live in the dashboard.
    </SectionHeading>
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border/10 shadow-[0_24px_70px_-30px_rgba(70,70,70,0.4)]">
      <video
        src="/goodman-demo.mp4"
        poster="/dashboard.png"
        title="Goodman product demo: eBPF runtime detection of an npm supply-chain attack"
        aria-label="54-second Goodman product demo video"
        controls
        playsInline
        preload="metadata"
        className="w-full"
      />
    </div>
  </section>
);

export const Detects = () => {
  const items = [
    {
      icon: KeyRound,
      title: "Secret & credential reads",
      body: "A package version that starts reading tokens, SSH keys, .npmrc, or cloud credentials it never touched before.",
    },
    {
      icon: Globe,
      title: "New outbound connections",
      body: "A dependency that suddenly talks to cloud metadata (169.254.169.254) or an exfil host that isn't in its baseline.",
    },
    {
      icon: TerminalSquare,
      title: "Unexpected process execution",
      body: "A package update that adds execve where the learned baseline had none — the classic install-script backdoor.",
    },
    {
      icon: GitCompareArrows,
      title: "Any behavioral drift",
      body: "Every new canonical behavior is diffed against the per-(service, package, version) baseline and scored by risk rules.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 lg:pb-28">
      <SectionHeading eyebrow="What it catches" title="Built for dependency behavior drift">
        Scanners judge what a package might do. Goodman watches what it
        actually does in your production workloads.
      </SectionHeading>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-3 rounded-2xl border border-border/10 bg-card p-6 shadow-button transition-colors hover:border-accent/40"
          >
            <item.icon className="size-5 text-accent" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const steps = [
    {
      n: "01",
      title: "Capture",
      body: "CO-RE eBPF hooks open, connect, and execve on watched Node processes and records the user-space stack. No code changes, no sidecars.",
    },
    {
      n: "02",
      title: "Attribute",
      body: "Stack addresses resolve through V8 perf maps to the deepest node_modules frame — mapped to its exact package.json version.",
    },
    {
      n: "03",
      title: "Fingerprint",
      body: "Events canonicalize into stable behaviors like READ node_modules/pkg/** or CONNECT 169.254.169.254:80, learned per service, package, and version.",
    },
    {
      n: "04",
      title: "Diff & alert",
      body: "Live behavior is compared to the learned baseline. New behavior plus a high-risk rule match becomes an alert that names the package.",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 border-y border-border/10 bg-secondary/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeading eyebrow="How it works" title="Kernel truth, package-level answers">
          One privileged sensor per node, one collector, one dashboard.
          Attribution is conservative by design — Goodman reports{" "}
          <span className="font-mono text-foreground">&lt;unknown&gt;</span>{" "}
          rather than guess a package name.
        </SectionHeading>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col gap-3 rounded-2xl border border-border/10 bg-background p-6 shadow-button">
              <p className="font-mono text-xs font-semibold text-accent">{step.n}</p>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhereItSits = () => {
  const layers = [
    {
      when: "Before install",
      what: "Registry & SCA scanners",
      body: "Judge packages by static analysis and metadata before they land in your lockfile. Necessary — but the TanStack versions passed.",
      highlight: false,
    },
    {
      when: "At build time",
      what: "CI/CD hardening",
      body: "Pin dependencies, restrict egress in builds, delay upgrades. Closes the install window — does nothing once poisoned code is running.",
      highlight: false,
    },
    {
      when: "At runtime",
      what: "Goodman",
      body: "Watches what dependencies actually do in production and attributes every anomaly to a package@version. The layer the 2026 attacks proved was missing.",
      highlight: true,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
      <SectionHeading eyebrow="Where it sits" title="Complementary to your scanner — not a replacement">
        Supply-chain defense is layered. Goodman is the runtime layer that
        keeps working after everything upstream said the package was fine.
      </SectionHeading>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {layers.map((layer) => (
          <div
            key={layer.what}
            className={
              layer.highlight
                ? "flex flex-col gap-3 rounded-2xl border-2 border-primary bg-primary/10 p-6 shadow-button-hover"
                : "flex flex-col gap-3 rounded-2xl border border-border/10 bg-card p-6 shadow-button"
            }
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {layer.when}
            </p>
            <h3 className="text-lg font-semibold">{layer.what}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const OpenSource = () => (
  <section id="open-source" className="scroll-mt-24 border-y border-border/10 bg-secondary/60">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
      <div className="flex flex-col items-start gap-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Open source
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Apache-2.0. Runs on <span className="text-accent">your</span> cluster.
        </h2>
        <p className="text-pretty text-base leading-relaxed text-muted-foreground">
          The sensor, collector, dashboard, and Helm chart are all open. Your
          syscall data never leaves your infrastructure. SQLite for a laptop,
          Postgres for production, Prometheus metrics and an SSE stream built in.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={links.repo} target="_blank" className={buttonVariants({ className: "px-5" })}>
            Read the source
            <ArrowUpRight className="size-4" />
          </Link>
          <Link href={links.docs} target="_blank" className={buttonVariants({ className: "px-5" })}>
            Documentation
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <CopyCommand
          label="Try it locally — no root needed"
          command={`git clone https://github.com/hi-heisenbug/goodman
cd goodman && make demo`}
        />
        <CopyCommand
          label="Install on Kubernetes"
          command={`scripts/install-k8s.sh --cluster prod
scripts/enable-node-attribution.sh -n checkout --all`}
        />
      </div>
    </div>
  </section>
);
