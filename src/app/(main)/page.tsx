import { SectionTransition } from "@/components/animations/SectionTransition";
import { Challenges } from "@/components/sections/Challenges";
import { Cta } from "@/components/sections/Cta";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { Hero } from "@/components/sections/Hero";
import { History } from "@/components/sections/History";
import { HowToBook } from "@/components/sections/HowToBook";
import { Location } from "@/components/sections/Location";
import { Office } from "@/components/sections/Office";
import { Prices } from "@/components/sections/Prices";
import { RightsMarquee } from "@/components/sections/RightsMarquee";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Welcome } from "@/components/sections/Welcome";

export default function Home() {
  return (
    <>
      <Hero />
      <RightsMarquee />
      <SectionTransition variant="fade">
        <Team />
      </SectionTransition>
      <SectionTransition variant="blur">
        <Welcome />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <History />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <Challenges />
      </SectionTransition>
      <SectionTransition variant="scale">
        <Services />
      </SectionTransition>
      <SectionTransition variant="fade">
        <Prices />
      </SectionTransition>
      <SectionTransition variant="blur">
        <Office />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <HowToBook />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <Testimonials />
      </SectionTransition>
      <SectionTransition variant="scale">
        <Cta />
      </SectionTransition>
      <SectionTransition variant="fade">
        <Location />
      </SectionTransition>
      <Disclaimer />
    </>
  );
}
