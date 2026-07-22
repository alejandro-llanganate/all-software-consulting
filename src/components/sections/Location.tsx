"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { siteConfig } from "@/data/site";
import { MapPin, Navigation } from "lucide-react";

export function Location() {
  return (
    <section id="ubicacion" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeInUp" className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Encuéntranos</p>
          <h2 className="mt-2 font-serif text-3xl text-headline sm:text-4xl">Nuestra ubicación</h2>
          <p className="mt-3 flex items-center gap-2 text-foreground/70">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {siteConfig.address}
          </p>
        </ScrollReveal>

        <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-primary/10">
          <iframe
            title="Ubicación HABITADAS en Quito"
            src="https://www.google.com/maps?q=Quito,+Ecuador&output=embed"
            className="h-64 w-full border-0 sm:h-80 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-4 text-center sm:text-left">
          <a
            href={siteConfig.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark"
          >
            <Navigation className="h-4 w-4" />
            Abrir en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
