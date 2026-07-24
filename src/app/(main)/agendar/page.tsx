import { IntakeWizard } from "@/components/booking/IntakeWizard";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agenda tu cita | HABITADAS",
  description:
    "Completa tu ficha y agenda una cita con nuestras profesionales. Acceso asequible a salud mental en Quito.",
};

export default function AgendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-light/40 via-light to-cream pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
        <div className="mb-8 text-center">
          <p className="font-subtitle text-xs tracking-[0.2em] text-primary uppercase">
            Cómo agendar una cita
          </p>
          <h1 className="mt-2 font-title text-3xl text-headline sm:text-4xl">
            Agenda tu cita aquí
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm text-foreground/65">
            Un wizard corto con ficha socioeconómica, preferencias y calendario. Creemos que la
            salud mental es un derecho; el acceso asequible es indispensable.
          </p>
        </div>
        <IntakeWizard />
      </div>
    </div>
  );
}
