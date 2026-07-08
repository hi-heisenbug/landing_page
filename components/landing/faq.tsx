const faqs = [
  {
    q: "What is Goodman?",
    a: "Goodman is an open-source runtime dependency-security sensor. It uses eBPF to capture security-relevant Linux syscalls, attributes each one to the exact npm package and version that caused it, learns a behavioral baseline per service, package, and version, and alerts when a dependency starts doing something it has never done before.",
  },
  {
    q: "How is this different from a dependency scanner (SCA)?",
    a: "Scanners judge what a package might do before you install it — static analysis, registry metadata, known CVEs. Goodman watches what dependencies actually do in production. The 2026 TanStack and Axios attacks passed every scanner; the malicious behavior only appeared at runtime. The two layers are complementary, and we recommend running both.",
  },
  {
    q: "How is this different from Falco or other eBPF runtime security tools?",
    a: "Generic runtime tools tell you a process opened a file or connected to an IP. Goodman resolves the user-space stack through V8 perf maps and tells you which npm package inside that process did it — for example tanstack-query@1.169.5, not just node. Package-level attribution is the core difference.",
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
    a: "Detection-first in v1. Goodman observes, attributes, fingerprints, and alerts — it does not block or sandbox. Blocking on kernel-level signals without high-confidence attribution causes outages; we are building trust in the signal first.",
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

export const Faq = () => {
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
        <dl className="mt-12 divide-y divide-border/10">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-display text-lg font-bold">{f.q}</dt>
              <dd className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
