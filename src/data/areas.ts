import type { AreaSlug } from "@/types";
import { assetPath as a } from "@/lib/asset-path";

export const areas: {
  slug: AreaSlug;
  label: string;
  short: string;
  color: string;
  image: string;
}[] = [
  {
    slug: "ansiedad-estres",
    label: "Ansiedad y Estrés",
    short: "Regulación emocional y manejo del estrés",
    color: "#7030A0",
    image: a("/hero/ansiedad-estres.jpg"),
  },
  {
    slug: "nna-infancia",
    label: "Niños y Adolescentes",
    short: "Desarrollo emocional en NNA",
    color: "#9B59C7",
    image: a("/hero/ninos.jpg"),
  },
  {
    slug: "neuropsicologia",
    label: "Neuropsicología",
    short: "Evaluación cognitiva y funciones ejecutivas",
    color: "#6A3D9A",
    image: a("/hero/neuropsicologia.jpg"),
  },
  {
    slug: "bienestar-laboral",
    label: "Bienestar Laboral",
    short: "Burnout, riesgos psicosociales y equipos",
    color: "#55247A",
    image: a("/hero/capacitacion.jpg"),
  },
  {
    slug: "trauma-duelo",
    label: "Trauma y Duelo",
    short: "Procesamiento emocional y resiliencia",
    color: "#8E44AD",
    image: a("/hero/consultorio.jpg"),
  },
  {
    slug: "pareja-familia",
    label: "Pareja y Familia",
    short: "Vínculos, comunicación y dinámicas",
    color: "#A569BD",
    image: a("/hero/club.jpg"),
  },
  {
    slug: "mujeres",
    label: "Mujeres",
    short: "Acompañamiento en situación de vulnerabilidad",
    color: "#7030A0",
    image: a("/hero/comunidad.jpg"),
  },
  {
    slug: "comunitaria",
    label: "Intervención Comunitaria",
    short: "Proyectos psicosociales y grupos",
    color: "#C6A4E6",
    image: a("/hero/proyecto.jpg"),
  },
];

export function getArea(slug: AreaSlug) {
  return areas.find((a) => a.slug === slug);
}
