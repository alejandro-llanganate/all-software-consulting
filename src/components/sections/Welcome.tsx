"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { welcome } from "@/data/site";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Welcome() {
  return (
    <section id="sobre-nosotros" className="bg-cream py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            transition={{ delay: 0.25 }}
          >
            <ScrollReveal animation="fadeIn" delay="xs">
              <p className="mb-3 text-sm font-medium tracking-[0.15em] text-primary uppercase">
                {welcome.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUpBlur" delay="sm">
              <h2 className="font-serif text-3xl leading-tight text-headline sm:text-4xl md:text-5xl">
                {welcome.title}
              </h2>
            </ScrollReveal>
            {welcome.paragraphs.map((p, i) => (
              <ScrollReveal key={i} animation="fadeInUp" delay={i === 0 ? "md" : "lg"}>
                <p className="mt-5 leading-relaxed text-foreground/75">{p}</p>
              </ScrollReveal>
            ))}
            <ScrollReveal animation="fadeInUp" delay="xl">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/profesionales"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 sm:w-auto"
                >
                  Agendar con un profesional
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="#servicios"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/5 sm:w-auto"
                >
                  Ver servicios
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
            transition={{ delay: 0.5 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-primary/15"
          >
            <Image
              src={welcome.image}
              alt="Comunidad HABITADAS — bienestar psicosocial"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10 ring-inset" />
          </motion.div>
        </div>

        {/* Enfoque — promoción y prevención */}
        <div className="mt-20">
          <ScrollReveal animation="fadeInUpBlur" className="mb-10 text-center">
            <h3 className="font-serif text-2xl text-headline sm:text-3xl md:text-4xl">
              {welcome.enfoque.title}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/65">
              Promoción y prevención de la salud mental como eje transversal de
              todo lo que hacemos en HABITADAS S.A.S.
            </p>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {welcome.enfoque.items.map((item, i) => (
              <motion.div
                key={item.label}
                className="enfoque-card rounded-2xl border border-primary/15 bg-white p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
                <h4 className="font-semibold text-primary-dark">{item.label}</h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
