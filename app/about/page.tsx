import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";
import { contactEmail, links, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Heisenbug builds Goodman, an open-source eBPF sensor that detects npm supply-chain attacks at runtime by attributing kernel-level behavior to the exact dependency that caused it.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background font-sans antialiased text-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[500px] rounded-full bg-gradient-to-br from-[#93cb52]/10 via-[#1c9770]/5 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 size-[600px] rounded-full bg-gradient-to-br from-[#1c9770]/8 via-[#93cb52]/4 to-transparent blur-[140px]" />

      <Nav />

      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-36">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-br from-[#464646] to-[#1c9770] bg-clip-text text-transparent">
            About Heisenbug
          </h1>
        </div>

        <article className="space-y-8 text-pretty text-base leading-relaxed text-[#464646]/85 sm:text-[17px] max-w-2xl mx-auto">
          <p>
            Heisenbug is a security company focused on one problem: npm
            supply-chain attacks that pass every static scanner. Our product,
            Goodman, is an open-source eBPF sensor that runs on your own
            infrastructure and watches what your dependencies actually do at
            runtime. It attributes every security-relevant system call to the
            exact npm package and version that caused it, learns a behavioral
            baseline for each package version it observes, and alerts within
            seconds when a dependency starts doing something it has never done
            before.
          </p>
          <p>
            We take our name from Heisenberg&apos;s uncertainty principle and
            the classic notion of a heisenbug: a defect that changes or
            vanishes when you try to observe it directly. Runtime threats are
            the same shape. You cannot catch them by reading files at build
            time; you have to observe systems while they run, without changing
            their behavior. That is why Goodman is built on eBPF, adds no
            sidecars, requires no agents inside application code, and is
            designed to run in production with negligible overhead.
          </p>
          <p>
            The company operates as Heisenbug Private Limited, registered in
            Mumbai, Maharashtra, India, with an engineering team distributed
            across India. We work in the open wherever we can: Goodman is
            Apache-2.0 licensed, its end-to-end attack replay suite is public,
            and our roadmap and incident write-ups are published in our{" "}
            <a href="/blog" className="text-accent underline underline-offset-2">blog</a>.
          </p>

          <dl className="grid gap-6 rounded-2xl border border-[#464646]/10 bg-white/60 p-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Legal entity
              </dt>
              <dd className="mt-2 leading-relaxed">
                Heisenbug Private Limited
                <br />
                6th Floor, Lightbridge, Hiranandani Business Park
                <br />
                Mumbai, Maharashtra 400072, India
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Contact
              </dt>
              <dd className="mt-2 leading-relaxed">
                <a href={`mailto:${contactEmail}`} className="text-accent underline underline-offset-2">
                  {contactEmail}
                </a>
                <br />
                <a href={links.repo} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  GitHub
                </a>
                {" · "}
                <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  X
                </a>
                {" · "}
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>

          <p>
            If you are evaluating runtime dependency security for a production
            Node.js fleet, or you found a behavior-drift alert confusing, we
            want to hear from you at{" "}
            <a href={`mailto:${contactEmail}`} className="text-accent underline underline-offset-2">
              {contactEmail}
            </a>
            .
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}
