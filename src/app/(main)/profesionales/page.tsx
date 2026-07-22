"use client";

import { BookCta } from "@/components/ui/BookCta";
import { areas } from "@/data/areas";
import { professionals as staticProfessionals } from "@/data/professionals";
import { fetchProfessionals } from "@/lib/supabase/api";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";
import type { AreaSlug, Professional } from "@/types";
import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ProfessionalsContent() {
  const searchParams = useSearchParams();
  const initialArea = searchParams.get("area") as AreaSlug | null;
  const [activeArea, setActiveArea] = useState<AreaSlug | "all">(
    initialArea && areas.some((a) => a.slug === initialArea) ? initialArea : "all",
  );
  const [professionals, setProfessionals] = useState<Professional[]>(staticProfessionals);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    void fetchProfessionals().then((remote) => {
      if (remote?.length) setProfessionals(remote);
    });
  }, []);

  const filtered =
    activeArea === "all"
      ? professionals
      : professionals.filter((p) => p.areas.includes(activeArea));

  return (
    <div className="min-h-screen bg-light pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-medium tracking-widest text-primary uppercase">
            Nuestro equipo
          </p>
          <h1 className="font-serif text-3xl text-headline sm:text-4xl md:text-5xl">
            Nuestras profesionales
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-foreground/65">
            Conoce sus perfiles y agenda tu cita completando la ficha socioeconómica.
          </p>
          <BookCta className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 sm:w-auto sm:px-8 sm:py-4">
            <Calendar className="h-5 w-5" />
            Agenda tu cita aquí
          </BookCta>
        </motion.div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] sm:mb-12 sm:flex-wrap sm:justify-center sm:overflow-visible">
          <button
            onClick={() => setActiveArea("all")}
            className={cn(
              "shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              activeArea === "all"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-white text-foreground/70 ring-1 ring-primary/15 hover:ring-primary/40",
            )}
          >
            Todas las áreas
          </button>
          {areas.map((area) => (
            <button
              key={area.slug}
              onClick={() => setActiveArea(area.slug)}
              className={cn(
                "shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                activeArea === area.slug
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-foreground/70 ring-1 ring-primary/15 hover:ring-primary/40",
              )}
            >
              {area.label}
            </button>
          ))}
        </div>

        <motion.div
          id="profesionales-grid"
          layout
          className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
        >
          {filtered.map((prof, i) => (
            <motion.div
              key={prof.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/15"
            >
              <Link href={`/profesionales/${prof.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={prof.image}
                    alt={prof.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/20 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-5">
                    <h3 className="font-serif text-xl text-white">{prof.name}</h3>
                    <p className="text-sm text-white/80">{prof.title}</p>
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <p className="text-sm text-foreground/65">{prof.shortBio}</p>
                <div className="mt-3 flex items-start gap-2 text-xs text-foreground/50">
                  <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/50" />
                  <span className="line-clamp-2">
                    {prof.education[0]?.degree} · {prof.education[0]?.institution}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {prof.specializations.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-violet-light/60 px-2.5 py-0.5 text-xs font-medium text-primary-dark"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={`/profesionales/${prof.slug}`}
                    className="flex-1 rounded-full border border-primary/20 py-3 text-center text-sm font-medium text-primary transition-colors hover:bg-violet-light/50 sm:py-2.5 sm:text-xs"
                  >
                    Ver perfil
                  </Link>
                  <BookCta
                    professionalSlug={prof.slug}
                    className="flex-1 rounded-full bg-primary py-3 text-center text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:py-2.5 sm:text-xs"
                  >
                    Agenda tu cita
                  </BookCta>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-foreground/50">
            No hay profesionales en esta área por ahora.
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProfesionalesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light pt-24" />}>
      <ProfessionalsContent />
    </Suspense>
  );
}
