import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";
import { ParticleEffect } from "@/components/particle-effect";

export const metadata: Metadata = {
  title: "The Heisenbug Manifesto",
  description:
    "What we believe at Heisenbug: focus, overdelivering, ownership, and security designed in from day one.",
  alternates: {
    canonical: "/manifesto",
  },
};

export default function ManifestoPage() {
  const paragraphs = [
    "We are building Heisenbug at a moment when technology is moving faster than the systems meant to govern it. Laws are changing, data is everywhere, and most organizations are unprepared for the reality they now face. We exist to bring clarity where there is confusion and confidence where there is fear.",
    "At Heisenbug, we believe in following one cause until it succeeds. Focus matters. We do not chase everything. We commit deeply to the problems we choose and see them through with discipline and intent.",
    "We believe in overdelivering, every single time. Speed is important, but precision is essential. We build fast, but never carelessly. Every system we design is grounded in first principles and engineered to work in the real world, not just on paper.",
    "We take complete ownership of our work. We own our ideas, our outcomes, and our mistakes. Accountability is not optional. It is how trust is built, both internally and with the people who rely on us.",
    "Doing the right thing is non-negotiable. Trust is the foundation of everything we build. Security, privacy, and integrity are not features added later. They are designed into the core from day one.",
    "We obsess over the product. When the product is right, trust follows. We choose simplicity over unnecessary complexity and aim to make even the hardest problems feel intuitive to the user.",
    "Professionalism defines how we work. We encourage strong opinions and honest disagreement, but once a decision is made, we commit fully as a team.",
    "We build for global reality. Cloud-native architectures, international compliance frameworks, and internet-scale infrastructure require security solutions built on universal, open standards. We do not design for local boundaries. We build tools that secure the global open-source supply chain.",
    "At Heisenbug, the company always comes before any individual. What we are building is bigger than all of us, and it deserves that level of commitment.",
    "We are not here just to meet requirements. We are here to set a new standard."
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background font-sans antialiased text-foreground">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[500px] rounded-full bg-gradient-to-br from-[#93cb52]/10 via-[#1c9770]/5 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 size-[600px] rounded-full bg-gradient-to-br from-[#1c9770]/8 via-[#93cb52]/4 to-transparent blur-[140px]" />

      <Nav />

      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-36">
        {/* Subtle decorative particles */}
        <div className="opacity-70">
          <ParticleEffect className="h-24 w-full sm:h-32" />
        </div>

        {/* Header section */}
        <div className="mt-8 flex flex-col items-center text-center gap-3 mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-br from-[#464646] to-[#1c9770] bg-clip-text text-transparent">
            Manifesto
          </h1>
        </div>

        {/* Paragraphs body */}
        <article className="space-y-8 text-pretty text-base leading-relaxed text-[#464646]/85 sm:text-[17px] max-w-2xl mx-auto">
          {paragraphs.map((text, i) => (
            <p key={i} className="transition-all duration-300 hover:text-[#464646]">
              {text}
            </p>
          ))}

          {/* Signoff */}
          <div className="mt-16 border-t border-[#464646]/5 pt-12 text-left">
            <p className="font-display text-xl font-extrabold tracking-tight text-[#464646]">
              This is Heisenbug.
            </p>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
