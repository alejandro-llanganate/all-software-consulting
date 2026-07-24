"use client";

import { BookCta } from "@/components/ui/BookCta";
import { homeServices, type ServiceModality } from "@/data/home-content";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Contorno de computador (virtual) */
function IconComputer({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3.5" y="5" width="25" height="17" rx="2" />
      <path d="M11 27h10" />
      <path d="M16 22v5" />
      <path d="M3.5 18.5h25" />
    </svg>
  );
}

/** Contorno de sofá (presencial) */
function IconSofa({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 18v-3.5a3.5 3.5 0 0 1 3.5-3.5h15A3.5 3.5 0 0 1 27 14.5V18" />
      <path d="M4 18h24v5.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 23.5V18Z" />
      <path d="M8 11V9.5A2.5 2.5 0 0 1 10.5 7h11A2.5 2.5 0 0 1 24 9.5V11" />
      <path d="M7 25v2" />
      <path d="M25 25v2" />
    </svg>
  );
}

function ModalityIcons({ modality }: { modality: ServiceModality }) {
  return (
    <div className="mt-8 space-y-3">
      <p className="font-subtitle text-sm text-white/90">Modalidad:</p>
      <div className="flex flex-wrap items-center gap-6 text-white">
        {modality === "both" && (
          <span className="inline-flex items-center gap-2.5 font-body text-sm text-white/85">
            <IconComputer className="h-8 w-8 shrink-0" />
            Virtual
          </span>
        )}
        <span className="inline-flex items-center gap-2.5 font-body text-sm text-white/85">
          <IconSofa className="h-8 w-8 shrink-0" />
          Presencial
        </span>
      </div>
    </div>
  );
}

export function Services() {
  const [index, setIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const service = homeServices[index];
  const total = homeServices.length;
  const images = service.images;
  const nextService = homeServices[(index + 1) % total];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    setImgIndex(0);
  }, [index]);

  useEffect(() => {
    if (images.length < 2) return;
    const t = window.setInterval(() => {
      setImgIndex((i) => (i + 1) % images.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, [images]);

  return (
    <section
      id="servicios"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      {/* Fondo del servicio activo — overlay suave para que no se vea opaco */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${service.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover brightness-[1.05]"
            sizes="100vw"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/72 via-primary-dark/55 to-dark/45" />
      <div className="absolute inset-0 bg-primary/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="font-subtitle text-xs tracking-[0.2em] text-white/70 uppercase">
              Lo que ofrecemos
            </p>
            <h2 className="mt-2 font-title text-3xl text-white sm:text-4xl md:text-5xl">
              Nuestros Servicios
            </h2>
          </div>
          <p className="font-body text-sm text-white/55">
            {index + 1} / {total}
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          {/* Texto izquierda */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-title text-3xl leading-tight text-white sm:text-4xl md:text-[2.75rem]">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/88 sm:text-lg">
                  {service.description}
                </p>

                <ModalityIcons modality={service.modality} />

                {service.priceLabel ? (
                  <BookCta className="mt-9 inline-flex rounded-full bg-primary px-8 py-3.5 font-subtitle text-base text-white shadow-lg shadow-primary-dark/30 transition-all hover:bg-secondary hover:shadow-xl">
                    {service.priceLabel}
                  </BookCta>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15"
                aria-label="Servicio anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex flex-1 gap-1.5 sm:max-w-xs">
                {homeServices.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-7 bg-white" : "w-2 bg-white/35"
                    }`}
                    aria-label={`Ir a ${s.title}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15"
                aria-label="Siguiente servicio"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Carrusel de imágenes derecha — cambia con el servicio */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative flex items-center justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${service.id}-${imgIndex}`}
                  initial={{ opacity: 0, x: 36, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -28, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 aspect-[4/5] w-[78%] max-w-md overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 sm:w-[72%]"
                >
                  <Image
                    src={images[imgIndex]}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 70vw, 420px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Preview del siguiente servicio */}
              <div className="absolute top-1/2 right-0 z-0 hidden h-[72%] w-[38%] -translate-y-1/2 overflow-hidden rounded-2xl opacity-70 shadow-xl ring-1 ring-white/15 sm:block lg:right-[-4%]">
                <Image
                  src={nextService.images[0]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-primary-dark/25" />
              </div>
            </div>

            {images.length > 1 ? (
              <div className="mt-5 flex justify-center gap-2 lg:justify-end lg:pr-8">
                {images.map((_, i) => (
                  <button
                    key={`${service.id}-dot-${i}`}
                    type="button"
                    onClick={() => setImgIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === imgIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                    aria-label={`Imagen ${i + 1} de ${service.title}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
