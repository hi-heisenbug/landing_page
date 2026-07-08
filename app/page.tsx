import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
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

export default function Home() {
  return (
    <main className="w-full">
      <JsonLd />
      <Nav />
      <Hero />
      <WhyNow />
      <Demo />
      <Detects />
      <HowItWorks />
      <WhereItSits />
      <OpenSource />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
