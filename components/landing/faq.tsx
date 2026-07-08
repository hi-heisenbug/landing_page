"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Goodman?",
    a: "Goodman is an open-source runtime dependency-security sensor. It uses eBPF to capture security-relevant Linux syscalls, attributes each one to the exact npm package and version that caused it, learns a behavioral baseline per service, package, and version, and alerts when a dependency starts doing something it has never done before.",
  },
  {
    q: "How is this different from a dependency scanner (SCA)?",
    a: "Scanners judge what a package might do before you install it: static analysis, registry metadata, known CVEs. Goodman watches what dependencies actually do in production. The 2026 TanStack and Axios attacks passed every scanner; the malicious behavior only appeared at runtime. The two layers are complementary, and we recommend running both.",
  },
  {
    q: "How is this different from Falco or other eBPF runtime security tools?",
    a: "Generic runtime tools tell you a process opened a file or connected to an IP. Goodman resolves the user-space stack through V8 perf maps and tells you which npm package inside that process did it, for example tanstack-query@1.169.5, not just node. Package-level attribution is the core difference.",
  },
  {
    q: "Does it slow down my production workloads?",
    a: "The sensor uses CO-RE eBPF tracepoints on file open, network connect, and process exec for watched processes only. Node attribution uses V8 perf maps enabled with one NODE_OPTIONS environment variable. Overhead is designed to be low enough for production; you can scope watching to specific namespaces or deployments.",
  },
  {
    q: "Does my data leave my infrastructure?",
    a: "No. Goodman is fully self-hosted: the sensor, collector, dashboard, and storage (SQLite or Postgres) all run on your cluster. Syscall data never leaves your infrastructure.",
  },
  {
    q: "Can attribution be wrong?",
    a: "Goodman is deliberately conservative: when it cannot resolve a syscall to a package with confidence, it reports <unknown> rather than guess. Incorrect attribution is worse than no attribution.",
  },
  {
    q: "Does it block attacks or only detect them?",
    a: "Detection-first in v1. Goodman observes, attributes, fingerprints, and alerts; it does not block or sandbox. Blocking on kernel-level signals without high-confidence attribution causes outages; we are building trust in the signal first.",
  },
  {
    q: "What does it cost?",
    a: "The software is free and open source under Apache-2.0. Heisenbug offers paid design-partner pilots that include deployment on your cluster, rule tuning, and a weekly dependency-behavior report. Email hi@heisenbug.ai.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const answerVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.25, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.15 },
    },
  },
};

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto w-full max-w-3xl px-6 py-20 lg:py-28">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Common questions
          </h2>
        </div>
        <dl className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                className="relative overflow-hidden rounded-xl border border-border/10 transition-colors duration-200"
              >
                {/* Active left accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to bottom, #93cb52, #1c9770)",
                    opacity: isOpen ? 1 : 0,
                  }}
                />

                <dt>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#f2eeee]/60"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-display text-lg font-bold transition-colors duration-200"
                      style={
                        isOpen
                          ? {
                              background:
                                "linear-gradient(135deg, #93cb52, #1c9770)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }
                          : undefined
                      }
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-[#1c9770]"
                        strokeWidth={2.5}
                      />
                    </motion.span>
                  </button>
                </dt>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      variants={answerVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-pretty leading-relaxed text-muted-foreground">
                        {f.a}
                      </div>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};
