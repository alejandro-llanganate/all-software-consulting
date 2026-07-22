"use client";

import { disclaimer } from "@/data/site";
import { motion } from "framer-motion";
import { PhoneCall, ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <section id="importante" className="relative overflow-hidden py-12 sm:py-16">
      {/* Fondo degradado de marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B4E] via-[#55247A] to-[#7030A0]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,164,230,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(155,89,199,0.25),transparent_50%)]" />
      {/* Textura sutil */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-8 md:p-10"
        >
          <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-white text-primary-dark shadow-lg shadow-primary-dark/30">
              <ShieldAlert className="h-7 w-7" aria-hidden />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold tracking-[0.25em] text-accent uppercase">
                Aviso legal y de seguridad
              </p>
              <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                {disclaimer.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
                {disclaimer.body}
              </p>

              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/20 bg-gradient-to-r from-white/15 to-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-accent">
                    <PhoneCall className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">¿Crisis o emergencia?</p>
                    <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                      Contacta de inmediato a los servicios de emergencia de tu zona.
                    </p>
                  </div>
                </div>
                <a
                  href="tel:911"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary-dark transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
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
