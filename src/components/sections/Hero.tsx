"use client";

import { FrostedCta } from "@/components/ui/FrostedCta";
import { hero, logo, siteConfig } from "@/data/site";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${hero.image}')` }}
      aria-label={`${siteConfig.brandName} — portada`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark/55 via-primary-dark/45 to-dark/70" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md sm:max-w-lg"
        >
          <Image
            src={logo.white}
            alt="HABITADAS — Empresa psicosocial"
            width={560}
            height={240}
            className="mx-auto h-auto w-full max-w-[280px] object-contain drop-shadow-lg sm:max-w-[360px] md:max-w-[420px]"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mt-8 max-w-xl font-subtitle text-lg leading-snug text-white/95 sm:text-xl md:text-2xl"
        >
          {hero.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="mt-10 sm:mt-12"
        >
          <FrostedCta className="min-w-[260px] text-lg font-subtitle sm:min-w-[320px] sm:text-xl">
            Queremos acompañarte.
          </FrostedCta>
        </motion.div>
      </div>
    </section>
  );
}
