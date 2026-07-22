"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BookCta } from "@/components/ui/BookCta";
import { prices, sections } from "@/data/site";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

export function Prices() {
  return (
    <section id="precios" className="bg-light py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeInUp" className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-headline sm:text-4xl md:text-5xl">
            {sections.prices.title}
          </h2>
          <p className="mt-3 text-foreground/70">{sections.prices.description}</p>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {prices.map((p, i) => (
            <motion.article
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-primary/10 sm:p-8"
            >
              <h3 className="font-serif text-xl text-headline">{p.title}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-brand text-4xl font-extrabold text-primary">${p.price}</span>
                <span className="text-sm text-foreground/50">{p.currency}</span>
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
                <Clock className="h-4 w-4 text-primary" />
                Duración: {p.duration}
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {p.notes.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-foreground/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {n}
                  </li>
                ))}
              </ul>
              <BookCta className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark">
                Agenda tu cita aquí
              </BookCta>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
