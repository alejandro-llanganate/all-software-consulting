"use client";

import { BookingFlow } from "@/components/booking/BookingFlow";
import { getProfessional } from "@/data/professionals";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export function AgendarClient() {
  const params = useParams();
  const slug = params.slug as string;
  const professional = getProfessional(slug);
  if (!professional) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-light/30 to-light pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/profesionales/${slug}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al perfil
        </Link>
        <BookingFlow professional={professional} />
      </div>
    </div>
  );
}
