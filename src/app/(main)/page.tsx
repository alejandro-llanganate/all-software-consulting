import { SectionTransition } from "@/components/animations/SectionTransition";
import { Challenges } from "@/components/sections/Challenges";
import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { Office } from "@/components/sections/Office";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Welcome } from "@/components/sections/Welcome";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionTransition variant="fade">
        <Team />
      </SectionTransition>
      <SectionTransition variant="blur">
        <Welcome />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <Challenges />
      </SectionTransition>
      <SectionTransition variant="scale">
        <Services />
      </SectionTransition>
      <SectionTransition variant="blur">
        <Office />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <Testimonials />
      </SectionTransition>
      <SectionTransition variant="scale">
        <Cta />
      </SectionTransition>
    </>
  );
}
