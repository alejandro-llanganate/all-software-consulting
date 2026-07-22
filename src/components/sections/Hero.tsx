"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BookCta } from "@/components/ui/BookCta";
import { hero, siteConfig } from "@/data/site";
import { fadeInUp, fadeInUpBlur } from "@/lib/animations";
import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[85dvh] items-center overflow-hidden bg-cover bg-center bg-no-repeat pt-20 sm:min-h-screen sm:bg-[center_30%]"
      style={{ backgroundImage: `url('${hero.image}')` }}
      aria-label={`${siteConfig.brandName} — bienestar emocional`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-dark/88 via-primary-dark/70 to-primary/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <ScrollReveal animation="fadeIn" delay="xs">
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">
              {hero.subtitle}
            </p>
          </ScrollReveal>

          <motion.h1
            className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUpBlur}
            transition={{ delay: 0.18 }}
          >
            {hero.title}
          </motion.h1>

          <ScrollReveal animation="fadeInUp" delay="md">
            <p className="mt-6 text-lg leading-relaxed text-white/90">{hero.description}</p>
          </ScrollReveal>

          <ScrollReveal animation="fadeInUp" delay="lg">
            <ul className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {hero.approaches.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <BookCta className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-light hover:shadow-lg hover:shadow-primary/20 sm:w-auto sm:px-8 sm:py-4">
              <Calendar className="h-4 w-4" />
              Agenda tu cita aquí
            </BookCta>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-accent/60 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 sm:w-auto sm:px-8 sm:py-4"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </motion.div>

          <ScrollReveal animation="fadeIn" delay="xl">
            <Link
              href="#equipo"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              Conoce a nuestras profesionales
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
