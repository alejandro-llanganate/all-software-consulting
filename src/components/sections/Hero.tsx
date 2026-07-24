"use client";

import { FrostedCta } from "@/components/ui/FrostedCta";
import { hero, logo, siteConfig } from "@/data/site";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [waveKey, setWaveKey] = useState(0);
  const wasInView = useRef(false);

  useEffect(() => {
    if (inView && !wasInView.current) {
      setWaveKey((k) => k + 1);
    }
    wasInView.current = inView;
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${hero.image}')` }}
      aria-label={`${siteConfig.brandName} — portada`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark/55 via-primary-dark/45 to-dark/70" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl"
        >
          <Image
            src={logo.white}
            alt="HABITADAS — Empresa psicosocial"
            width={720}
            height={310}
            className="mx-auto h-auto w-full max-w-[340px] object-contain drop-shadow-lg sm:max-w-[460px] md:max-w-[540px] lg:max-w-[600px]"
            priority
          />
        </motion.div>

        <p className="relative mt-10 max-w-4xl font-title text-2xl leading-snug font-extrabold sm:mt-12 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          <span className="hero-title-base relative z-0">{hero.title}</span>
          <span
            key={waveKey}
            aria-hidden
            className="hero-title-wave-overlay z-10"
          >
            {hero.title}
          </span>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="mt-10 sm:mt-14"
        >
          <FrostedCta className="min-w-[280px] px-10 py-5 text-xl font-subtitle sm:min-w-[360px] sm:px-12 sm:py-6 sm:text-2xl md:min-w-[400px]">
            Queremos acompañarte.
          </FrostedCta>
        </motion.div>
      </div>
    </section>
  );
}
