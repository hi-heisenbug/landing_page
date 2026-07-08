import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";
import { ParticleEffect } from "@/components/particle-effect";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "What we believe at Heisenbug: focus, overdelivering, ownership, and security designed in from day one.",
  alternates: {
    canonical: "/manifesto",
  },
};

export default function ManifestoPage() {
  return (
    <main className="w-full">
      <Nav />
      <section className="mx-auto w-full max-w-3xl px-6 pb-20 pt-32 md:pt-36">
        <ParticleEffect className="h-32 w-full sm:h-40" />
        <article className="mt-10 space-y-6 text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg">
          <p>
            We are building Heisenbug at a moment when technology is moving
            faster than the systems meant to govern it. Laws are changing, data
            is everywhere, and most organizations are unprepared for the
            reality they now face. We exist to bring clarity where there is
            confusion and confidence where there is fear.
          </p>
          <p>
            At Heisenbug, we believe in following one cause until it succeeds.
            Focus matters. We do not chase everything. We commit deeply to the
            problems we choose and see them through with discipline and intent.
          </p>
          <p>
            We believe in overdelivering, every single time. Speed is
            important, but precision is essential. We build fast, but never
            carelessly. Every system we design is grounded in first principles
            and engineered to work in the real world, not just on paper.
          </p>
          <p>
            We take complete ownership of our work. We own our ideas, our
            outcomes, and our mistakes. Accountability is not optional. It is
            how trust is built, both internally and with the people who rely on
            us.
          </p>
          <p>
            Doing the right thing is non-negotiable. Trust is the foundation of
            everything we build. Security, privacy, and integrity are not
            features added later. They are designed into the core from day one.
          </p>
          <p>
            We obsess over the product. When the product is right, trust
            follows. We choose simplicity over unnecessary complexity and aim
            to make even the hardest problems feel intuitive to the user.
          </p>
          <p>
            Professionalism defines how we work. We encourage strong opinions
            and honest disagreement, but once a decision is made, we commit
            fully as a team.
          </p>
          <p>
            We build for reality. Indian workflows, Indian regulations, and
            Indian scale deserve solutions created with local understanding and
            global standards. We do not adapt foreign systems. We build what
            truly fits.
          </p>
          <p>
            At Heisenbug, the company always comes before any individual. What
            we are building is bigger than all of us, and it deserves that
            level of commitment.
          </p>
          <p>
            We are not here just to meet requirements. We are here to set a new
            standard.
          </p>
          <p className="font-display text-xl font-bold text-foreground">
            This is Heisenbug.
          </p>
        </article>
      </section>
      <Footer />
    </main>
  );
}
