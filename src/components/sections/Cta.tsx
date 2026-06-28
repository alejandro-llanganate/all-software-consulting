"use client";

import { ImageRevealOnHover } from "@/components/animations/ImageRevealOnHover";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { office, sections, siteConfig } from "@/data/site";
import { fadeInUpBlur } from "@/lib/animations";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <ImageRevealOnHover
      imageSrc={office.image}
      imageAlt="Espacios HABITADAS — consultorios y comunidad"
      revealRadius={340}
      className="py-24 lg:py-32"
    >
      <section id="contacto" className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="font-serif text-4xl text-white md:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpBlur}
          >
            {sections.cta.title}
          </motion.h2>

          <ScrollReveal animation="fadeInUp" delay="md">
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              {sections.cta.description}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fadeInUp" delay="lg">
            <Link
              href={siteConfig.bookingUrl}
              className="group relative mt-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-semibold text-primary-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10">{sections.cta.button}</span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-violet-light transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </ScrollReveal>

          <ScrollReveal animation="fadeIn" delay="xl">
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-white/90 transition-colors hover:text-accent"
              >
                <Phone className="h-5 w-5" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-white/90 transition-colors hover:text-accent"
              >
                <Mail className="h-5 w-5" />
                {siteConfig.email}
              </a>
              <span className="flex items-center gap-2 text-white/90">
                <MapPin className="h-5 w-5 shrink-0" />
                <span className="text-sm">{siteConfig.address}</span>
              </span>
            </div>
          </ScrollReveal>

          <p className="mt-8 hidden text-xs tracking-wider text-accent/70 uppercase md:block">
            {sections.cta.hint}
          </p>
        </div>
      </section>
    </ImageRevealOnHover>
  );
}
