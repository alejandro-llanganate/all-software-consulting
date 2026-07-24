"use client";

import { ImageRevealOnHover } from "@/components/animations/ImageRevealOnHover";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BookCta } from "@/components/ui/BookCta";
import { office, sections, siteConfig } from "@/data/site";
import { fadeInUpBlur } from "@/lib/animations";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function Cta() {
  return (
    <ImageRevealOnHover
      imageSrc={office.image}
      imageAlt="Espacios HABITADAS — consultorios y comunidad"
      revealRadius={340}
      className="py-16 sm:py-24 lg:py-32"
    >
      <section id="contacto" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="font-title text-3xl text-white sm:text-4xl md:text-5xl"
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
            <BookCta className="group relative mt-8 inline-flex w-full max-w-xs items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 sm:mt-10 sm:w-auto sm:px-10 sm:py-4">
              <span className="relative z-10">{sections.cta.button}</span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-violet-light transition-transform duration-500 group-hover:scale-x-100" />
            </BookCta>
          </ScrollReveal>

          <ScrollReveal animation="fadeIn" delay="xl">
            <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-8">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-accent sm:text-base"
              >
                <Phone className="h-5 w-5 shrink-0" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 break-all text-sm text-white/90 transition-colors hover:text-accent sm:text-base"
              >
                <Mail className="h-5 w-5 shrink-0" />
                {siteConfig.email}
              </a>
              <a
                href="#ubicacion"
                className="flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-accent sm:text-base"
              >
                <MapPin className="h-5 w-5 shrink-0" />
                <span className="text-sm">{siteConfig.address}</span>
              </a>
            </div>
          </ScrollReveal>

          <p className="mt-8 text-xs tracking-wider text-accent/80 uppercase">
            {sections.cta.hint}
          </p>
        </div>
      </section>
    </ImageRevealOnHover>
  );
}
