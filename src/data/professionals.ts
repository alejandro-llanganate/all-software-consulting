import type { Professional } from "@/types";
import { assetPath as a } from "@/lib/asset-path";

export const professionals: Professional[] = [
  {
    id: "prof-1",
    slug: "stepfanie-villacis",
    name: "Stepfanie Villacís",
    title: "Psicóloga | Neuropsicología Clínica",
    areas: ["neuropsicologia", "ansiedad-estres", "bienestar-laboral"],
    specializations: [
      "Intervención psicológica",
      "Bienestar organizacional",
      "Neuropsicología clínica",
      "Rehabilitación multidisciplinar",
    ],
    image: a("/team/stepfanie-villacis.png"),
    gallery: [a("/team/stepfanie-villacis.png"), a("/hero/consultorio.jpg")],
    shortBio: "Psicóloga general en formación de Maestría en Neuropsicología Clínica.",
    bio: "Psicóloga General con experiencia en intervención psicológica y bienestar organizacional; actualmente cursando Maestría en Neuropsicología Clínica. Apasionada por aplicar conocimientos neurocognitivos al apoyo de pacientes con daño neurológico y a la rehabilitación multidisciplinar.",
    approach:
      "Acompañamiento humanizado con base en evidencia, empatía y observación clínica.",
    sessionPrice: 7,
    featured: true,
    education: [
      {
        degree: "Maestría en Neuropsicología Clínica (en curso)",
        institution: "VIU — Universidad Internacional de Valencia",
        year: "Actualidad",
      },
      {
        degree: "Psicología",
        institution: "Universidad Politécnica Salesiana",
        year: "2020 – 2024",
      },
    ],
    certifications: [
      {
        name: "Práctica en Neuropsicología Clínica",
        issuer: "NeuroLogic International",
        year: "2026",
      },
      {
        name: "Intervención psicológica en consultorio",
        issuer: "Megasalud Santa Ana",
        year: "2024 – actualidad",
      },
    ],
  },
  {
    id: "prof-2",
    slug: "valery-cevallos",
    name: "Lic. Valery Cevallos",
    title: "Mgtr. Psicología Clínica",
    areas: ["ansiedad-estres", "pareja-familia", "trauma-duelo"],
    specializations: [
      "Psicología clínica",
      "Terapia individual",
      "Acompañamiento emocional",
      "Salud mental comunitaria",
    ],
    image: a("/team/valery-cevallos.png"),
    gallery: [a("/team/valery-cevallos.png"), a("/hero/taller.jpg")],
    shortBio: "Magíster en Psicología Clínica. Acompañamiento terapéutico cercano y profesional.",
    bio: "Licenciada y Magíster en Psicología Clínica. Brinda acompañamiento terapéutico individual y de vínculos con un enfoque basado en evidencia, cálido y orientado al bienestar emocional de cada persona.",
    approach: "Psicología clínica basada en evidencia, con escucha activa y herramientas prácticas.",
    sessionPrice: 7,
    featured: true,
    education: [
      {
        degree: "Maestría en Psicología Clínica",
        institution: "Formación de posgrado",
        year: "—",
      },
      {
        degree: "Licenciatura en Psicología",
        institution: "—",
        year: "—",
      },
    ],
    certifications: [
      {
        name: "Ejercicio profesional en psicología clínica",
        issuer: "HABITADAS",
        year: "Actualidad",
      },
    ],
  },
];

export function getProfessional(slug: string) {
  return professionals.find((p) => p.slug === slug);
}

export function getProfessionalsByArea(area: string) {
  return professionals.filter((p) => p.areas.includes(area as Professional["areas"][number]));
}
