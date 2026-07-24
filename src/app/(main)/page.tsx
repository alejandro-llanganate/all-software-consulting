import { SectionTransition } from "@/components/animations/SectionTransition";
import { AboutHabitadas } from "@/components/sections/AboutHabitadas";
import { Blog } from "@/components/sections/Blog";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { LocationCta } from "@/components/sections/LocationCta";
import { RightsMarquee } from "@/components/sections/RightsMarquee";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <RightsMarquee />
      <SectionTransition variant="fade">
        <AboutHabitadas />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <Journey />
      </SectionTransition>
      <SectionTransition variant="scale">
        <Services />
      </SectionTransition>
      <SectionTransition variant="fade">
        <Team />
      </SectionTransition>
      <SectionTransition variant="blur">
        <Blog />
      </SectionTransition>
      <SectionTransition variant="slide-up">
        <LocationCta />
      </SectionTransition>
      <Disclaimer />
    </>
  );
}
