import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";
import { contactEmail } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Heisenbug collects, uses, and protects information on heisenbug.ai: analytics, newsletter subscriptions, cookies, and your rights.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    h: "Overview",
    body: [
      "This privacy policy describes how Heisenbug Private Limited (\"Heisenbug\", \"we\", \"us\") handles information when you visit heisenbug.ai (the \"Site\") or interact with us by email. Goodman, our open-source product, runs entirely on your own infrastructure; we do not receive telemetry, usage data, or alerts from deployments of Goodman.",
    ],
  },
  {
    h: "Information we collect",
    body: [
      "Contact details you give us. If you email us or subscribe to our newsletter, we receive the information you choose to send: typically your email address and the contents of your message. We use it to reply, to send updates you asked for, and to follow up on pilot inquiries.",
      "Usage data. The Site is hosted on Vercel and served through Cloudflare, which process standard request logs (IP address, user agent, requested URL, timestamp) for security and availability purposes. We use Vercel Analytics to understand aggregate page traffic; it does not build advertising profiles and we do not sell this data.",
      "Local storage. We store only your cookie consent choice in your browser. No marketing or cross-site tracking cookies are set.",
    ],
  },
  {
    h: "How we use information",
    body: [
      "We use the information above to operate and secure the Site, respond to messages, deliver newsletter emails with one-click unsubscribe, and evaluate interest in design-partner pilots. We do not sell personal information, and we do not share it with third parties except the processors named above (Vercel, Cloudflare) as needed to run the Site.",
    ],
  },
  {
    h: "Retention",
    body: [
      "Email correspondence is retained for as long as needed to handle your request and our legitimate business records. Newsletter addresses are kept until you unsubscribe. Request logs are retained by our hosting providers per their standard retention windows.",
    ],
  },
  {
    h: "Your rights",
    body: [
      `You may ask us to access, correct, or delete personal information you have given us, or to stop contacting you, at any time by emailing ${contactEmail}. If you are located in the EEA, UK, or India, you have statutory rights over your personal data under the GDPR, UK GDPR, or India's DPDP Act respectively; we will honor a verified request within the timelines those laws require.`,
    ],
  },
  {
    h: "Changes and contact",
    body: [
      "We will post any changes to this policy on this page with an updated effective date. Questions about this policy can be sent to:",
      "Heisenbug Private Limited, 6th Floor, Lightbridge, Hiranandani Business Park, Mumbai, Maharashtra 400072, India. Email: hi@heisenbug.ai.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background font-sans antialiased text-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[500px] rounded-full bg-gradient-to-br from-[#93cb52]/10 via-[#1c9770]/5 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 size-[600px] rounded-full bg-gradient-to-br from-[#1c9770]/8 via-[#93cb52]/4 to-transparent blur-[140px]" />

      <Nav />

      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-36">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-br from-[#464646] to-[#1c9770] bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            Effective date: August 22, 2026
          </p>
        </div>

        <article className="space-y-10 text-pretty text-base leading-relaxed text-[#464646]/85 sm:text-[17px] max-w-2xl mx-auto">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#464646]">
                {s.h}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>
      </section>

      <Footer />
    </main>
  );
}
