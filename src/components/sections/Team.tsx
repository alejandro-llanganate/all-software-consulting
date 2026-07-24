"use client";

import { teamHome } from "@/data/home-content";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Team() {
  const [active, setActive] = useState<string | null>(null);
  const selected = teamHome.find((p) => p.slug === active) ?? null;

  return (
    <section id="equipo" className="bg-light py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2 className="font-title text-3xl text-headline sm:text-4xl md:text-5xl">
            Nuestro Equipo
          </h2>
          <p className="mt-3 font-body text-sm text-foreground/55 sm:text-base">
            Elige a quién quieres conocer.
          </p>
        </div>

        {/* Cada una: foto + nombre + especialidad; solo una abierta a la vez */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {teamHome.map((pro) => {
            const isActive = active === pro.slug;
            return (
              <motion.button
                key={pro.slug}
                type="button"
                layout
                onClick={() => setActive(isActive ? null : pro.slug)}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className={`group overflow-hidden rounded-[1.5rem] text-left transition-shadow ${
                  isActive
                    ? "bg-white shadow-lg ring-2 ring-primary"
                    : "bg-white shadow-sm ring-1 ring-primary/10 hover:ring-primary/25"
                }`}
                aria-expanded={isActive}
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
                  <Image
                    src={pro.image}
                    alt={pro.name}
                    fill
                    className={`object-cover object-top transition-transform duration-700 ${
                      isActive ? "scale-[1.03]" : "group-hover:scale-[1.03]"
                    }`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 transition-colors ${
                      isActive
                        ? "bg-gradient-to-t from-primary/85 via-primary/25 to-transparent"
                        : "bg-gradient-to-t from-dark/75 via-dark/15 to-transparent"
                    }`}
                  />
                  <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
                    <h3 className="font-title text-xl text-white sm:text-2xl md:text-[1.65rem]">
                      {pro.name}
                    </h3>
                    <p
                      className={`mt-1 font-subtitle text-sm sm:text-base ${
                        isActive ? "text-white/90" : "text-accent"
                      }`}
                    >
                      {pro.role}
                    </p>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 font-body text-xs ${
                        isActive ? "text-white/80" : "text-white/65"
                      }`}
                    >
                      {isActive ? "Ocultar" : "Conóceme"}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bio de la persona elegida */}
        <div className="mt-5 sm:mt-6">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.slug}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -12, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <article className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-primary/10 sm:p-8 md:p-10">
                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 }}
                    className="font-subtitle text-lg text-primary sm:text-xl"
                  >
                    {selected.greeting}
                  </motion.p>
                  <div className="mt-4 space-y-4">
                    {selected.bio.split("\n\n").map((para, i) => (
                      <motion.p
                        key={`${selected.slug}-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.07 }}
                        className="font-body text-sm leading-relaxed text-foreground/70 sm:text-base"
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>
                </article>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
