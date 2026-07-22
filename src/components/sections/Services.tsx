"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BookCta } from "@/components/ui/BookCta";
import { sections, services, siteConfig } from "@/data/site";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  HeartHandshake,
  Home,
  MessageCircle,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "Acompañamiento Psicológico": HeartHandshake,
  "Terapia Individual": UserRound,
  "Terapia de Pareja": Users,
  "Terapia Familiar": Home,
  "Talleres Psicoeducativos": Brain,
  "Comunidad y Apoyo": MessageCircle,
};

const SERVICE_TONES: Record<string, string> = {
  "Acompañamiento Psicológico": "from-[#7030A0] to-[#9B59C7]",
  "Terapia Individual": "from-[#55247A] to-[#7030A0]",
  "Terapia de Pareja": "from-[#9B59C7] to-[#C6A4E6]",
  "Terapia Familiar": "from-[#6A3D9A] to-[#55247A]",
  "Talleres Psicoeducativos": "from-[#7030A0] via-[#9B59C7] to-[#C6A4E6]",
  "Comunidad y Apoyo": "from-[#2D1B4E] to-[#7030A0]",
};

export function Services() {
  return (
    <section id="servicios" className="bg-light py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeInUp" className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-headline sm:text-4xl md:text-5xl">
            {sections.services.title}
          </h2>
          <p className="mt-3 text-foreground/70">{sections.services.description}</p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.title] ?? HeartHandshake;
            const tone = SERVICE_TONES[service.title] ?? "from-primary to-secondary";
            const isFree = "freeGroup" in service && service.freeGroup;
            const price = "price" in service ? service.price : null;

            return (
              <motion.article
                key={service.title}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/15"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.06 }}
              >
                <div className={`relative bg-gradient-to-br ${tone} px-5 py-6 text-white`}>
                  <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    {price != null && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary-dark shadow-sm">
                        ${price} USD
                      </span>
                    )}
                    {isFree && (
                      <span className="rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-bold tracking-wide text-emerald-950 uppercase">
                        Gratuito · Registro
                      </span>
                    )}
                  </div>
                  <h3 className="relative mt-5 font-serif text-xl leading-snug">{service.title}</h3>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="flex-1 text-sm leading-relaxed text-foreground/65">
                    {service.description}
                  </p>

                  {isFree ? (
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                        "Hola, quiero registrarme en los grupos de apoyo gratuitos de HABITADAS.",
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Registrarme por WhatsApp
                    </a>
                  ) : (
                    <BookCta className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                      Agenda tu cita aquí
                      <ArrowRight className="h-3.5 w-3.5" />
                    </BookCta>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
