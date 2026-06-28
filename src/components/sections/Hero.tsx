"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { hero, siteConfig } from "@/data/site";
import { fadeIn, fadeInUp, fadeInUpBlur } from "@/lib/animations";
import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={`${siteConfig.brandName} — bienestar emocional`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-primary-dark/75 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <ScrollReveal animation="fadeIn" delay="xs">
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">
              {hero.subtitle}
            </p>
          </ScrollReveal>

          <motion.h1
            className="font-serif text-5xl leading-[1.1] text-white md:text-6xl lg:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUpBlur}
            transition={{ delay: 0.18 }}
          >
            {hero.title}
          </motion.h1>

          <ScrollReveal animation="fadeInUp" delay="md">
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              {hero.description}
            </p>
          </ScrollReveal>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={siteConfig.bookingUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-light hover:shadow-lg hover:shadow-primary/20"
            >
              <Calendar className="h-4 w-4" />
              Agendar cita
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-accent/60 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-accent hover:bg-accent/10"
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
              Conoce a nuestros profesionales
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
