import type { Professional } from "@/types";
import { assetPath as a } from "@/lib/asset-path";

/** IDs alineados con seed de Supabase (`supabase/migrations/001_habitadas_schema.sql`) */
export const professionals: Professional[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "stepfanie-villacis",
    name: "Stepfanie Villacís",
    title: "Psicóloga / Neuropsicóloga Clínica",
    areas: ["neuropsicologia", "ansiedad-estres", "bienestar-laboral"],
    specializations: [
      "Intervención psicológica",
      "Bienestar organizacional",
      "Neuropsicología clínica",
      "Rehabilitación multidisciplinar",
    ],
    image: a("/team/stepfanie-villacis.png"),
    gallery: [a("/team/stepfanie-villacis.png"), a("/hero/consultorio.jpg")],
    shortBio: "¡Hola, soy Stepf! Psicóloga General con enfoque cognitivo-conductual.",
    bio: "¡Hola, soy Stepf!\n\nSoy Psicóloga General, graduada de la Universidad Politécnica Salesiana. Mi enfoque de trabajo es cognitivo-conductual, basado en la evidencia científica y adaptado a las necesidades de cada persona.\n\nHe realizado un Diplomado en Educación Emocional por la UTE y una Maestría en Neuropsicología Clínica en la Universidad Internacional de Valencia (VIU). Además, me mantengo en constante formación porque creo que aprender continuamente es la mejor manera de brindar una atención ética, actualizada y de calidad.\n\nMi propósito es ofrecer un espacio seguro, cercano y profesional, donde cada persona se sienta escuchada, comprendida y acompañada en su proceso de bienestar emocional.",
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
    id: "22222222-2222-2222-2222-222222222222",
    slug: "valery-cevallos",
    name: "Lic. Valery Cevallos",
    title: "Psicóloga Clínica / Psicoterapeuta",
    areas: ["ansiedad-estres", "pareja-familia", "trauma-duelo"],
    specializations: [
      "Psicología clínica",
      "Terapia individual",
      "Acompañamiento emocional",
      "Salud mental comunitaria",
    ],
    image: a("/team/valery-cevallos.png"),
    gallery: [a("/team/valery-cevallos.png"), a("/hero/taller.jpg")],
    shortBio: "Hola, soy Valer! Psicóloga Clínica / Psicoterapeuta.",
    bio: "Hola, soy Valer!\n\nMe gradué como Psicóloga, cuento con un Máster en Terapia Cognitivo-Conductual, una Maestría en Psicología Clínica y Psicoterapia, y actualmente curso un Diplomado en Terapias Conductuales y Contextuales.\n\nCreo profundamente en las personas y en la capacidad que tenemos de transformar nuestras vidas cuando caminamos juntos. Mi experiencia como voluntaria y el trabajo con personas en situación de vulnerabilidad fortalecieron una convicción que hoy guía todo lo que hago: la salud mental es un derecho que se construye con justicia social y que el bienestar nace del vínculo con los demás, con los animales y con la naturaleza. Por eso, todas las formas de vida merecen respeto, cuidado y compasión, así construimos una sociedad más humana y empática.",
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
