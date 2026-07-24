"use client";

import { disclaimer } from "@/data/site";
import { motion } from "framer-motion";
import { PhoneCall, ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <section id="importante" className="bg-[#3d2460] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-[#2d1b4e] p-6 sm:p-8 md:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent">
              <ShieldAlert className="h-6 w-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-subtitle text-[11px] tracking-[0.25em] text-accent uppercase">
                Aviso legal y de seguridad
              </p>
              <h2 className="mt-2 font-title text-2xl text-white sm:text-3xl">
                {disclaimer.title}
              </h2>
              <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-white/80 sm:text-base">
                {disclaimer.body}
              </p>
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-subtitle text-sm text-white">¿Crisis o emergencia?</p>
                    <p className="mt-0.5 font-body text-xs text-white/65">
                      Contacta de inmediato a los servicios de emergencia de tu zona.
                    </p>
                  </div>
                </div>
                <a
                  href="tel:911"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-2.5 font-subtitle text-sm text-primary-dark hover:bg-accent"
                >
                  Llamar 911
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
