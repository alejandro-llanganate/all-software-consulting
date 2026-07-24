"use client";

import { FrostedCta } from "@/components/ui/FrostedCta";
import { aboutHabitadas } from "@/data/home-content";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHabitadas() {
  return (
    <section id="que-es-habitadas" className="bg-light py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-3xl bg-violet-light/40 shadow-lg ring-1 ring-primary/10 lg:max-h-none"
        >
          <Image
            src={aboutHabitadas.image}
            alt="HABITADAS"
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-title text-3xl text-headline sm:text-4xl md:text-5xl">
            {aboutHabitadas.title}
          </h2>
          <p className="mt-4 font-subtitle text-lg text-primary sm:text-xl">
            {aboutHabitadas.subtitle}
          </p>
          <p className="mt-6 font-body text-base leading-relaxed text-foreground/80 sm:text-lg">
            <strong className="font-body font-normal text-headline">{aboutHabitadas.bodyBold}</strong>
          </p>
          <div className="mt-8">
            <FrostedCta className="border-primary/25 bg-primary/15 text-primary-dark hover:bg-primary/25">
              {aboutHabitadas.cta}
            </FrostedCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
