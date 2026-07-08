"use client";

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
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
    <p className="font-mono text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-[#93cb52] to-[#1c9770] bg-clip-text text-transparent">
      {eyebrow}
    </p>
    <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl text-[#464646]">
      {title}
    </h2>
    {children ? (
      <p className="text-pretty text-base leading-relaxed text-[#464646]/70">
        {children}
      </p>
    ) : null}
  </div>
);

/* ── Animated counter component ── */
const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse the numeric part and suffix
    const numericMatch = value.match(/^(\d+)/);
    const suffix = value.replace(/^\d+/, "");

    if (numericMatch) {
      const target = parseInt(numericMatch[1], 10);
      const controls = animate(0, target, {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate(v) {
          setDisplayValue(Math.round(v) + suffix);
        },
      });
      return () => controls.stop();
    } else {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="relative">
        {/* Pulse glow effect behind stat number */}
        <motion.div
          className="absolute inset-0 -inset-x-6 -inset-y-2 rounded-full bg-gradient-to-r from-[#93cb52]/20 to-[#1c9770]/20 blur-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.p
          className="relative font-display text-5xl font-bold tracking-tight bg-gradient-to-r from-[#93cb52] to-[#1c9770] bg-clip-text text-transparent sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {displayValue}
        </motion.p>
      </div>
      <motion.p
        className="max-w-xs text-sm leading-relaxed text-[#464646]/70"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {label}
      </motion.p>
    </div>
  );
};

export const WhyNow = () => {
  const stats = [
    { value: "0", label: "suspicious strings in the package.json diff; the version bump looked routine" },
    { value: "<3s", label: "to attribute the drift to the exact package once it misbehaved" },
    { value: "1", label: "Helm command to start watching a namespace, no code changes, no sidecars" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#93cb52]/30 to-transparent" />
      {/* Gradient bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1c9770]/30 to-transparent" />
      <div className="bg-[#f2eeee]/60">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3 sm:gap-6">
          {stats.map((s, i) => (
            <AnimatedStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-6 pb-10 text-center font-mono text-xs text-[#464646]/50">
          The pattern behind the 2026 npm supply-chain attacks (TanStack, Axios, Shai-Hulud):
          install-time checks stayed green while runtime behavior changed.
        </p>
      </div>
    </section>
  );
};

export const Demo = () => (
  <section id="product" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20 lg:py-28">
    <SectionHeading eyebrow="54-second demo" title="From syscall to package name">
      Watch Goodman learn a baseline, catch a poisoned version reading
      credentials, and name the exact package, live in the dashboard.
    </SectionHeading>
    {/* Video wrapper with gradient border + ambient glow */}
    <div className="relative mx-auto mt-12 max-w-4xl">
      {/* Ambient glow behind */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#93cb52]/8 via-transparent to-[#1c9770]/8 blur-2xl" />
      {/* Gradient border wrapper */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#93cb52]/25 via-[#1c9770]/15 to-[#93cb52]/8 p-px">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_-20px_rgba(70,70,70,0.15)]">
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
      </div>
    </div>
  </section>
);

/* ── Detects card with hover gradient sweep ── */
const DetectCard = ({
  item,
  index,
}: {
  item: { icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>; title: string; body: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className="group relative flex flex-col gap-3 rounded-2xl border border-[#464646]/[0.08] bg-white p-6 transition-all duration-300 hover:border-[#1c9770]/30 hover:-translate-y-1.5 hover:shadow-[0_12px_50px_-12px_rgba(28,151,112,0.18)]"
    >
      {/* Gradient sweep overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#1c9770]/[0.04] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      </div>

      {/* Left accent border */}
      <div className="absolute inset-y-3 left-0 w-px bg-gradient-to-b from-[#93cb52]/40 via-[#1c9770]/30 to-transparent rounded-full" />
      {/* Icon with pulsing glow dot */}
      <div className="relative">
        <motion.div
          className="absolute -inset-2 rounded-full bg-[#1c9770]/10 blur-md"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute -inset-2 rounded-full bg-[#1c9770]/8 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <item.icon className="relative size-5 text-[#1c9770]" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-[#464646]">{item.title}</h3>
      <p className="text-sm leading-relaxed text-[#464646]/70">{item.body}</p>
    </motion.div>
  );
};

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
      body: "A package update that adds execve where the learned baseline had none: the classic install-script backdoor.",
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
        {items.map((item, index) => (
          <DetectCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

/* ── Step card with sequential reveal ── */
const StepCard = ({
  step,
  index,
}: {
  step: { n: string; title: string; body: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
      transition={{
        duration: 0.55,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="relative flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-[0_2px_20px_-6px_rgba(70,70,70,0.1)]"
    >
      {/* Gradient top border accent */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-[#93cb52]/30 via-[#1c9770]/20 to-transparent" />
      {/* Step number badge with animated gradient ring */}
      <div className="relative flex size-8 items-center justify-center">
        <motion.div
          className="absolute -inset-1 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #93cb52, #1c9770, #93cb52)",
            opacity: 0.2,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#93cb52]/15 to-[#1c9770]/15 blur-sm" />
        <div className="relative flex size-8 items-center justify-center rounded-full border border-[#1c9770]/25 bg-[#f2eeee]">
          <p className="font-mono text-xs font-semibold bg-gradient-to-r from-[#93cb52] to-[#1c9770] bg-clip-text text-transparent">{step.n}</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-[#464646]">{step.title}</h3>
      <p className="text-sm leading-relaxed text-[#464646]/70">{step.body}</p>
    </motion.div>
  );
};

/* ── Animated connecting line ── */
const AnimatedConnectingLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="absolute top-10 left-[12.5%] right-[12.5%] hidden h-px lg:block overflow-visible">
      {/* Base dashed line */}
      <div className="absolute inset-0 border-t border-dashed border-[#1c9770]/15" />
      {/* Animated traveling pulse */}
      <motion.div
        className="absolute top-0 h-px w-24 -translate-y-px bg-gradient-to-r from-transparent via-[#1c9770]/60 to-transparent"
        initial={{ left: "-10%" }}
        animate={isInView ? { left: "110%" } : { left: "-10%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
      {/* Gradient fill that reveals left-to-right */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#93cb52]/30 via-[#1c9770]/25 to-[#93cb52]/30"
        initial={{ right: "100%" }}
        animate={isInView ? { right: "0%" } : { right: "100%" }}
        transition={{
          duration: 1.5,
          delay: 0.3,
          ease: "easeOut",
        }}
        style={{ height: "1px" }}
      />
    </div>
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
      body: "Stack addresses resolve through V8 perf maps to the deepest node_modules frame, mapped to its exact package.json version.",
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
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#93cb52]/25 to-transparent" />
      {/* Gradient bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1c9770]/25 to-transparent" />
      <div className="bg-[#f2eeee]/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <SectionHeading eyebrow="How it works" title="Kernel truth, package-level answers">
            One privileged sensor per node, one collector, one dashboard.
            Attribution is conservative by design: Goodman reports{" "}
            <span className="font-mono text-[#464646]">&lt;unknown&gt;</span>{" "}
            rather than guess a package name.
          </SectionHeading>
          <div className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Animated connecting line on desktop */}
            <AnimatedConnectingLine />
            {steps.map((step, index) => (
              <StepCard key={step.n} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Highlighted card with shimmer + pulsing border ── */
const HighlightedLayerCard = ({
  layer,
}: {
  layer: { when: string; what: string; body: string };
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="relative flex flex-col gap-3 rounded-2xl p-px overflow-hidden"
    >
      {/* Pulsing border glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#93cb52]/60 via-[#1c9770]/40 to-[#93cb52]/20 blur-sm"
        animate={{
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Static gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#93cb52]/60 via-[#1c9770]/40 to-[#93cb52]/20" />
      {/* Ambient shadow */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_-8px_rgba(147,203,82,0.15),0_0_80px_-16px_rgba(28,151,112,0.1)]" />
      {/* Inner card content */}
      <div className="relative flex flex-col gap-3 rounded-[calc(1rem-1px)] bg-[#f8fff2] p-6 overflow-hidden">
        {/* Shimmer sweep effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 -translate-x-full"
          animate={{
            translateX: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
        </motion.div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1c9770]">
          {layer.when}
        </p>
        <h3 className="text-lg font-semibold text-[#464646]">{layer.what}</h3>
        <p className="text-sm leading-relaxed text-[#464646]/70">{layer.body}</p>
      </div>
    </motion.div>
  );
};

export const WhereItSits = () => {
  const layers = [
    {
      when: "Before install",
      what: "Registry & SCA scanners",
      body: "Judge packages by static analysis and metadata before they land in your lockfile. Necessary, but the TanStack versions passed.",
      highlight: false,
    },
    {
      when: "At build time",
      what: "CI/CD hardening",
      body: "Pin dependencies, restrict egress in builds, delay upgrades. Closes the install window, doing nothing once poisoned code is running.",
      highlight: false,
    },
    {
      when: "At runtime",
      what: "Goodman",
      body: "Watches what dependencies actually do in production and attributes every anomaly to a package@version. The layer the 2026 attacks proved was missing.",
      highlight: true,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
      <SectionHeading eyebrow="Where it sits" title="Complementary to your scanner, not a replacement">
        Supply-chain defense is layered. Goodman is the runtime layer that
        keeps working after everything upstream said the package was fine.
      </SectionHeading>
      <div ref={ref} className="mt-12 grid gap-4 lg:grid-cols-3">
        {layers.map((layer, index) =>
          layer.highlight ? (
            <HighlightedLayerCard key={layer.what} layer={layer} />
          ) : (
            <motion.div
              key={layer.what}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex flex-col gap-3 rounded-2xl border border-[#464646]/[0.08] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_rgba(70,70,70,0.12)] hover:border-[#464646]/15"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#464646]/50">
                {layer.when}
              </p>
              <h3 className="text-lg font-semibold text-[#464646]">{layer.what}</h3>
              <p className="text-sm leading-relaxed text-[#464646]/70">{layer.body}</p>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

/* ── Animated dot grid background ── */
const AnimatedDotGrid = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(28,151,112,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    {/* Subtle traveling highlight across the grid */}
    <motion.div
      className="absolute h-full w-1/3 bg-gradient-to-r from-transparent via-[#93cb52]/[0.04] to-transparent"
      animate={{
        x: ["-33%", "133%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ top: 0, left: 0 }}
    />
  </div>
);

export const OpenSource = () => (
  <section id="open-source" className="relative scroll-mt-24 overflow-hidden">
    {/* Gradient top border */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#93cb52]/25 to-transparent" />
    {/* Gradient bottom border */}
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1c9770]/25 to-transparent" />
    <div className="relative bg-[#f2eeee]/60">
      {/* Animated dot grid pattern */}
      <AnimatedDotGrid />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex min-w-0 flex-col items-start gap-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-[#93cb52] to-[#1c9770] bg-clip-text text-transparent">
            Open source
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[#464646] sm:text-4xl">
            Apache-2.0. Runs on <span className="text-[#1c9770]">your</span> cluster.
          </h2>
          <p className="text-pretty text-base leading-relaxed text-[#464646]/70">
            The sensor, collector, dashboard, and Helm chart are all open. Your
            syscall data never leaves your infrastructure. SQLite for a laptop,
            Postgres for production, Prometheus metrics and an SSE stream built in.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link href={links.repo} target="_blank" className={buttonVariants({ className: "px-5 group w-full sm:w-auto text-center justify-center" })}>
              Read the source
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href={links.docs} target="_blank" className={buttonVariants({ className: "px-5 group w-full sm:w-auto text-center justify-center" })}>
              Documentation
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <CopyCommand
            label="Try it locally - no root needed"
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
    </div>
  </section>
);
