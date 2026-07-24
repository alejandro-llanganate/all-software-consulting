"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { office } from "@/data/site";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";

export function Office() {
  return (
    <section className="bg-cream py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={office.gallery[0]}
                alt="Consultorio HABITADAS"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {office.gallery.slice(1).map((img) => (
                <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                  <Image
                    src={img}
                    alt="Espacio de consulta HABITADAS"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
            transition={{ delay: 0.25 }}
          >
            <ScrollReveal animation="fadeIn" delay="xs">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium tracking-[0.12em] text-primary uppercase">
                <Award className="h-4 w-4" />
                {office.badge}
              </p>
            </ScrollReveal>
            <h2 className="font-title text-3xl leading-tight text-headline sm:text-4xl md:text-5xl">
              {office.title}
            </h2>
            {office.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="mt-5 leading-relaxed text-foreground/75">
                {p}
              </p>
            ))}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-6 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold tracking-wider text-primary uppercase"
            >
              Talleres psicoeducativos
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
