"use client";

import { ImageRevealOnHover } from "@/components/animations/ImageRevealOnHover";
import { FrostedCta } from "@/components/ui/FrostedCta";
import { office, siteConfig } from "@/data/site";
import { MapPin, Navigation } from "lucide-react";

/** Ubicación + agenda (mitad / mitad) con reveal del consultorio */
export function LocationCta() {
  return (
    <section id="ubicacion" className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="bg-cream px-4 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="font-subtitle text-xs tracking-[0.2em] text-primary uppercase">
            Encuéntranos
          </p>
          <h2 className="mt-2 font-title text-3xl text-headline sm:text-4xl">
            Nuestra ubicación
          </h2>
          <p className="mt-3 flex items-center gap-2 font-body text-foreground/70">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {siteConfig.address}
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl shadow-md ring-1 ring-primary/10">
            <iframe
              title="Ubicación HABITADAS en Quito"
              src="https://www.google.com/maps?q=Quito,+Ecuador&output=embed"
              className="h-56 w-full border-0 sm:h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            href={siteConfig.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-subtitle text-sm text-primary hover:text-primary-dark"
          >
            <Navigation className="h-4 w-4" />
            Abrir en Google Maps
          </a>
        </div>

        <ImageRevealOnHover
          imageSrc={office.image}
          imageAlt="Consultorio HABITADAS"
          revealRadius={300}
          className="h-full min-h-[420px] lg:min-h-full"
        >
          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-6 py-14 text-center sm:py-20">
            <h2 className="font-title text-3xl text-white sm:text-4xl">
              Agenda tu cita
            </h2>
            <p className="mt-4 font-body text-base text-white/85">
              Completa tu ficha socioeconómica y da el primer paso hacia tu bienestar
              emocional.
            </p>
            <div className="mt-8">
              <FrostedCta>Queremos acompañarte.</FrostedCta>
            </div>
            <p className="mt-6 text-xs tracking-wider text-accent/90 uppercase">
              Salud mental accesible · Quito, Ecuador
            </p>
          </div>
        </ImageRevealOnHover>
      </div>
    </section>
  );
}
