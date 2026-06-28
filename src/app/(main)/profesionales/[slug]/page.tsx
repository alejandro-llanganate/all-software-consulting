import { areas } from "@/data/areas";
import { getProfessional, professionals } from "@/data/professionals";
import { ProfessionalProfile } from "@/components/professionals/ProfessionalProfile";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return professionals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prof = getProfessional(slug);
  if (!prof) return { title: "Profesional no encontrado" };
  return {
    title: `${prof.name} | HABITADAS`,
    description: prof.shortBio,
  };
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prof = getProfessional(slug);
  if (!prof) notFound();

  const profAreas = prof.areas
    .map((a) => areas.find((ar) => ar.slug === a))
    .filter((a): a is NonNullable<typeof a> => a != null);

  return <ProfessionalProfile professional={prof} profAreas={profAreas} />;
}
