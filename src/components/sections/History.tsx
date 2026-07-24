"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { history } from "@/data/site";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";

export function History() {
  return (
    <section id="historia" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-2xl shadow-xl shadow-primary/10 sm:aspect-[4/5] lg:max-h-none"
          >
            <Image
              src={history.image}
              alt="Habitar el cuidado emocional — equipo HABITADAS"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
          >
            <ScrollReveal animation="fadeIn" delay="xs">
              <p className="mb-3 text-sm font-medium tracking-[0.15em] text-primary uppercase">
                {history.eyebrow}
              </p>
            </ScrollReveal>
            <h2 className="font-title text-3xl leading-tight text-headline sm:text-4xl md:text-5xl">
              {history.title}
            </h2>
            {history.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-foreground/75">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
