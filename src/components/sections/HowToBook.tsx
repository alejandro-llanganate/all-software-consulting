"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BookCta } from "@/components/ui/BookCta";
import { howToBook } from "@/data/site";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HowToBook() {
  return (
    <section id="como-agendar" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeInUp" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {howToBook.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-headline sm:text-4xl md:text-5xl">
            {howToBook.title}
          </h2>
          <p className="mt-4 text-foreground/70">{howToBook.intro}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {howToBook.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10"
            >
              <span className="font-brand text-3xl font-extrabold text-primary/25">{step.n}</span>
              <h3 className="mt-2 text-lg font-semibold text-headline">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <BookCta className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 sm:w-auto">
            {howToBook.cta}
            <ArrowRight className="h-4 w-4" />
          </BookCta>
        </div>
      </div>
    </section>
  );
}
