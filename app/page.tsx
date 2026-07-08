import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import {
  WhyNow,
  Demo,
  Detects,
  HowItWorks,
  WhereItSits,
  OpenSource,
} from "@/components/landing/sections";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { JsonLd } from "@/components/landing/json-ld";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <main className="w-full">
      <JsonLd />
      <Nav />
      <Hero />
      <ScrollReveal>
        <TrustedBy />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <WhyNow />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <Demo />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Detects />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <WhereItSits />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <OpenSource />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Faq />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <Cta />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
