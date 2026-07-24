"use client";

import { areas } from "@/data/areas";
import type { Professional } from "@/types";
import { BookCta } from "@/components/ui/BookCta";
import { motion } from "framer-motion";
import { ArrowLeft, Award, BookOpen, Calendar, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  professional: Professional;
  profAreas: NonNullable<ReturnType<typeof areas.find>>[];
};

export function ProfessionalProfile({ professional, profAreas }: Props) {
  return (
    <div className="min-h-screen bg-light pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/profesionales"
          className="mb-8 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a profesionales
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-[3/4] max-h-[65vh] overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 sm:aspect-[4/5] sm:max-h-none">
              <Image
                src={professional.image}
                alt={professional.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {professional.gallery.slice(0, 3).map((img) => (
                <div key={img} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={img} alt="" fill className="object-cover" sizes="150px" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="font-subtitle text-sm tracking-widest text-primary uppercase">
              {professional.title}
            </p>
            <h1 className="mt-2 font-title text-3xl text-headline sm:text-4xl md:text-5xl">
              {professional.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {profAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/profesionales?area=${area.slug}`}
                  className="rounded-full bg-violet-light/70 px-3 py-1 text-xs font-medium text-primary-dark transition-colors hover:bg-primary hover:text-white"
                >
                  {area.label}
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <p className="font-subtitle text-xs tracking-wider text-primary/60 uppercase">Especializaciones</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {professional.specializations.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-foreground/70 ring-1 ring-primary/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-foreground/75">{professional.bio}</p>

            <div className="mt-6 rounded-xl bg-white p-5 ring-1 ring-primary/10">
              <h3 className="font-subtitle text-sm text-primary-dark">Enfoque terapéutico</h3>
              <p className="mt-2 font-body text-sm text-foreground/65">{professional.approach}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="font-title text-2xl text-primary-dark">
                ${professional.sessionPrice} USD
              </span>
              <span className="font-body text-sm text-foreground/50">/ sesión · 45–50 min</span>
            </div>

            <BookCta
              professionalSlug={professional.slug}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-subtitle text-sm text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 sm:w-auto"
            >
              <Calendar className="h-5 w-5" />
              Agenda tu cita aquí
            </BookCta>
          </motion.div>
        </div>

        {/* Formación académica y certificaciones */}
        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-title text-2xl text-headline">Estudios superiores</h2>
            </div>
            <ul className="space-y-5">
              {professional.education.map((edu) => (
                <li key={`${edu.degree}-${edu.year}`} className="border-l-2 border-primary/20 pl-4">
                  <p className="font-subtitle text-headline">{edu.degree}</p>
                  <p className="mt-0.5 font-body text-sm text-foreground/60">{edu.institution}</p>
                  <p className="mt-1 font-subtitle text-xs text-primary">{edu.year}</p>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-title text-2xl text-headline">Certificados y diplomas</h2>
            </div>
            <ul className="space-y-5">
              {professional.certifications.map((cert) => (
                <li key={`${cert.name}-${cert.year}`} className="flex gap-3">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary/50" />
                  <div>
                    <p className="font-subtitle text-headline">{cert.name}</p>
                    <p className="mt-0.5 font-body text-sm text-foreground/60">{cert.issuer}</p>
                    <p className="mt-1 font-subtitle text-xs text-primary">{cert.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
