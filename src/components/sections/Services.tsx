"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { sections, services } from "@/data/site";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Services() {
  return (
    <section id="servicios" className="bg-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal animation="fadeInUp" className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-4xl text-headline md:text-5xl">
            {sections.services.title}
          </h2>
          <p className="mt-3 text-foreground/70">{sections.services.description}</p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-primary/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: index * 0.06 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary-dark uppercase">
                  Servicio
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-headline transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/65">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/profesionales"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
          >
            Agendar cita con un profesional
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
