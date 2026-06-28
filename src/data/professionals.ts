import type { Professional } from "@/types";
import { assetPath as a } from "@/lib/asset-path";

export const professionals: Professional[] = [
  {
    id: "prof-1",
    slug: "maria-fernanda-rios",
    name: "Dra. María Fernanda Ríos",
    title: "Psicóloga Clínica",
    areas: ["mujeres", "trauma-duelo", "ansiedad-estres"],
    specializations: ["Trauma complejo", "Duelo", "Regulación emocional", "Intervención con mujeres"],
    image: a("/team/prof1.jpg"),
    gallery: [a("/team/prof1.jpg"), a("/hero/consultorio.jpg"), a("/hero/comunidad.jpg")],
    shortBio: "Especialista en trauma, duelo y acompañamiento a mujeres.",
    bio: "Psicóloga clínica con más de 12 años de experiencia en intervención psicosocial con mujeres en situación de vulnerabilidad. Enfoque integrador basado en evidencia.",
    approach: "Terapia humanista-integrativa con técnicas de regulación emocional y procesamiento de trauma.",
    sessionPrice: 85000,
    featured: true,
    education: [
      { degree: "Doctorado en Psicología Clínica", institution: "Universidad Nacional de Colombia", year: "2018" },
      { degree: "Maestría en Psicología Clínica", institution: "Universidad de los Andes", year: "2012" },
      { degree: "Pregrado en Psicología", institution: "Universidad Javeriana", year: "2008" },
    ],
    certifications: [
      { name: "Especialización en Trauma y EMDR Nivel I", issuer: "EMDR Colombia", year: "2019" },
      { name: "Diplomado en Intervención Psicosocial con Mujeres", issuer: "ICBF / MinSalud", year: "2015" },
    ],
  },
  {
    id: "prof-2",
    slug: "carolina-mendoza",
    name: "Lic. Carolina Mendoza",
    title: "Neuropsicóloga",
    areas: ["neuropsicologia", "nna-infancia"],
    specializations: ["Evaluación cognitiva", "TDAH", "Funciones ejecutivas", "Aprendizaje"],
    image: a("/team/prof2.jpg"),
    gallery: [a("/team/prof2.jpg"), a("/hero/ninos.jpg")],
    shortBio: "Evaluación neuropsicológica infantil, adolescente y adulta.",
    bio: "Neuropsicóloga especializada en evaluación cognitiva, funciones ejecutivas y diagnóstico diferencial en niños, adolescentes y adultos.",
    approach: "Evaluación basada en evidencia con informes claros y planes de intervención personalizados.",
    sessionPrice: 120000,
    education: [
      { degree: "Maestría en Neuropsicología Clínica", institution: "Universidad del Rosario", year: "2016" },
      { degree: "Pregrado en Psicología", institution: "Universidad Nacional de Colombia", year: "2011" },
    ],
    certifications: [
      { name: "Certificación NEPSY-II", issuer: "Pearson Clinical", year: "2018" },
      { name: "Diplomado en Neurodesarrollo Infantil", issuer: "Fundación Santa Fe", year: "2017" },
    ],
  },
  {
    id: "prof-3",
    slug: "laura-vargas",
    name: "Psic. Laura Vargas",
    title: "Psicóloga Clínica",
    areas: ["ansiedad-estres", "pareja-familia"],
    specializations: ["TCC", "Terapia de pareja", "Ansiedad", "Estrés laboral"],
    image: a("/team/prof3.jpg"),
    gallery: [a("/team/prof3.jpg"), a("/hero/taller.jpg")],
    shortBio: "Ansiedad, estrés crónico y terapia de pareja.",
    bio: "Psicóloga clínica con formación en terapia cognitivo-conductual y de pareja. Acompaña procesos de ansiedad, estrés laboral y conflictos relacionales.",
    approach: "TCC y terapia sistémica breve orientada a resultados concretos.",
    sessionPrice: 90000,
    education: [
      { degree: "Especialización en Terapia Cognitivo-Conductual", institution: "Universidad de San Buenaventura", year: "2017" },
      { degree: "Pregrado en Psicología", institution: "Universidad El Bosque", year: "2013" },
    ],
    certifications: [
      { name: "Diplomado en Terapia de Pareja", issuer: "Instituto Gestalt", year: "2019" },
      { name: "Certificación en Mindfulness Clínico", issuer: "MBCT Colombia", year: "2020" },
    ],
  },
  {
    id: "prof-4",
    slug: "andrea-torres",
    name: "Psic. Andrea Torres",
    title: "Psicóloga Infanto-Juvenil",
    areas: ["nna-infancia", "comunitaria"],
    specializations: ["Juego terapéutico", "Proyectos NNA", "Psicoeducación grupal"],
    image: a("/team/prof4.jpg"),
    gallery: [a("/team/prof4.jpg"), a("/hero/ninos.jpg"), a("/hero/campamento.jpg")],
    shortBio: "Intervención emocional con niños, niñas y adolescentes.",
    bio: "Psicóloga comunitaria e infanto-juvenil. Diseña e implementa proyectos psicosociales con NNA, utilizando juego terapéutico, arte y psicoeducación grupal.",
    approach: "Intervención lúdica y psicoeducativa adaptada al desarrollo evolutivo.",
    sessionPrice: 80000,
    education: [
      { degree: "Maestría en Psicología Infanto-Juvenil", institution: "Universidad Pedagógica Nacional", year: "2019" },
      { degree: "Pregrado en Psicología", institution: "Universidad Pedagógica Nacional", year: "2014" },
    ],
    certifications: [
      { name: "Diplomado en Juego Terapéutico", issuer: "Asociación Colombiana de Psicología", year: "2018" },
      { name: "Certificación en Proyectos Psicosociales ICBF", issuer: "ICBF", year: "2020" },
    ],
  },
  {
    id: "prof-5",
    slug: "diana-herrera",
    name: "Lic. Diana Herrera",
    title: "Psicóloga Organizacional",
    areas: ["bienestar-laboral", "ansiedad-estres"],
    specializations: ["Riesgos psicosociales", "Burnout", "Bienestar laboral", "Cultura organizacional"],
    image: a("/team/prof5.jpg"),
    gallery: [a("/team/prof5.jpg"), a("/hero/capacitacion.jpg")],
    shortBio: "Riesgos psicosociales, burnout y bienestar en equipos.",
    bio: "Psicóloga organizacional con experiencia en diagnóstico de riesgos psicosociales, intervención en burnout y programas de bienestar laboral.",
    approach: "Intervención organizacional con enfoque preventivo y basado en datos.",
    sessionPrice: 95000,
    education: [
      { degree: "Maestría en Psicología Organizacional", institution: "Universidad ICESI", year: "2015" },
      { degree: "Pregrado en Psicología", institution: "Universidad del Valle", year: "2010" },
    ],
    certifications: [
      { name: "Certificación en Riesgos Psicosociales (Res. 2646)", issuer: "MinTrabajo", year: "2018" },
      { name: "Diplomado en Liderazgo y Bienestar", issuer: "Cámara de Comercio de Bogotá", year: "2021" },
    ],
  },
  {
    id: "prof-6",
    slug: "james-morales",
    name: "Psic. James Morales",
    title: "Psicólogo Clínico",
    areas: ["pareja-familia", "trauma-duelo", "comunitaria"],
    specializations: ["Terapia familiar", "Duelo", "Grupos de apoyo", "Intervención comunitaria"],
    image: a("/team/prof6.jpg"),
    gallery: [a("/team/prof6.jpg"), a("/hero/club.jpg"), a("/hero/comunidad.jpg")],
    shortBio: "Terapia familiar, duelo y grupos de apoyo comunitario.",
    bio: "Psicólogo clínico con enfoque sistémico y comunitario. Facilita grupos de apoyo, terapia familiar y procesos de duelo en contextos individuales y grupales.",
    approach: "Terapia sistémica y facilitación grupal con perspectiva comunitaria.",
    sessionPrice: 85000,
    education: [
      { degree: "Especialización en Terapia Familiar Sistémica", institution: "Universidad Santo Tomás", year: "2016" },
      { degree: "Pregrado en Psicología", institution: "Universidad Libre", year: "2012" },
    ],
    certifications: [
      { name: "Diplomado en Intervención en Duelo", issuer: "Fundación Sanar", year: "2019" },
      { name: "Certificación en Facilitación de Grupos", issuer: "Red Nacional de Apoyo", year: "2020" },
    ],
  },
];

export function getProfessional(slug: string) {
  return professionals.find((p) => p.slug === slug);
}

export function getProfessionalsByArea(area: string) {
  return professionals.filter((p) => p.areas.includes(area as Professional["areas"][number]));
}
