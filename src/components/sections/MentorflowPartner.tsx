"use client";

import { mentorflowPartner } from "@/data/site";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Handshake, Sparkles } from "lucide-react";

export function MentorflowPartner() {
  return (
    <section
      aria-labelledby="mentorflow-partner-heading"
      className="border-y border-primary/10 bg-gradient-to-br from-violet-light/50 via-white to-cream py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl"
        >
          <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-primary/10 ring-1 ring-primary/10">
            <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-4 text-center sm:px-8 sm:py-5">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/75 uppercase sm:text-xs">
                {mentorflowPartner.lead}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 px-5 py-8 text-center sm:gap-6 sm:px-10 sm:py-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-light/80 ring-1 ring-primary/15 sm:h-16 sm:w-16">
                <Handshake className="h-7 w-7 text-primary sm:h-8 sm:w-8" aria-hidden />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase sm:text-xs">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  {mentorflowPartner.eyebrow}
                </span>
                <h2
                  id="mentorflow-partner-heading"
                  className="font-serif text-3xl text-headline sm:text-4xl md:text-5xl"
                >
                  {mentorflowPartner.name}
                </h2>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-foreground/65 sm:text-base">
                  {mentorflowPartner.tagline}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
