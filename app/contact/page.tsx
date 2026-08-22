import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";
import { contactEmail, links, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Heisenbug team: email hi@heisenbug.ai for design-partner pilots, security reports, or questions about Goodman.",
  alternates: {
    canonical: "/contact",
  },
};

const channels = [
  {
    label: "General and design-partner pilots",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    note: "Product questions, pilot inquiries, feedback on Goodman alerts.",
  },
  {
    label: "GitHub",
    value: "hi-heisenbug/goodman",
    href: links.repo,
    note: "Bug reports, feature requests, and contributions. Please use GitHub issues for anything code-related so it stays public and searchable.",
  },
  {
    label: "Documentation",
    value: "docs.heisenbug.ai",
    href: links.docs,
    note: "Installation, Helm charts, configuration, and the alert reference before filing a question.",
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background font-sans antialiased text-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[500px] rounded-full bg-gradient-to-br from-[#93cb52]/10 via-[#1c9770]/5 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 size-[600px] rounded-full bg-gradient-to-br from-[#1c9770]/8 via-[#93cb52]/4 to-transparent blur-[140px]" />

      <Nav />

      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-36">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-br from-[#464646] to-[#1c9770] bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="max-w-xl text-balance leading-relaxed text-muted-foreground">
            The fastest way to reach the Heisenbug team is email. We read
            everything and reply within two business days.
          </p>
        </div>

        <article className="space-y-10 text-pretty text-base leading-relaxed text-[#464646]/85 sm:text-[17px] max-w-2xl mx-auto">
          {channels.map((c) => (
            <div key={c.label} className="rounded-2xl border border-[#464646]/10 bg-white/60 p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {c.label}
              </h2>
              <p className="mt-3">
                <a href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="text-lg font-semibold text-accent underline underline-offset-2">
                  {c.value}
                </a>
              </p>
              <p className="mt-2 leading-relaxed">{c.note}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-[#464646]/10 bg-white/60 p-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Mailing address
            </h2>
            <p className="mt-3 leading-relaxed">
              Heisenbug Private Limited
              <br />
              6th Floor, Lightbridge, Hiranandani Business Park
              <br />
              Mumbai, Maharashtra 400072, India
            </p>
          </div>

          <div className="rounded-2xl border border-[#464646]/10 bg-white/60 p-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Social
            </h2>
            <p className="mt-3 leading-relaxed">
              We post product updates and supply-chain incident analysis on{" "}
              <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">X</a>,{" "}
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">LinkedIn</a>, and{" "}
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">YouTube</a>.
              For security reports concerning this website or Goodman itself,
              email {contactEmail} with details and reproduction steps.
            </p>
          </div>

          <p>
            Reporting a suspected npm supply-chain compromise? Include the
            package name and version, what behavior you observed, and any
            Goodman alert output. We treat these as high priority.
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}
