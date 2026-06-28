export const siteConfig = {
  name: "HABITADAS S.A.S",
  brandName: "HABITADAS",
  tagline: "Bienestar emocional y fortalecimiento personal",
  phone: "+593 98 438 4524",
  email: "contacto@habitadas.com",
  address: "Quito, Ecuador",
  bookingUrl: "/profesionales",
};

export const colors = {
  primary: "#7030A0",
  secondary: "#9B59C7",
  accent: "#C6A4E6",
  light: "#FAF7FC",
  cream: "#F3EDFA",
  dark: "#2D1B4E",
  text: "#1A1028",
  headline: "#2D1B4E",
};

export const logo = {
  default: "/logo.png",
  white: "/logo.png",
  favicon: "/logo.png",
};

export const hero = {
  subtitle: "Empresa psicosocial · Promoción y prevención en salud mental",
  title: "Un espacio habitado para tu bienestar emocional",
  description:
    "Red de psicólogos y especialistas listos para acompañarte. Agenda tu cita en línea con el profesional que mejor se adapte a ti.",
  image: "/hero/portada.jpg",
  video: "",
};

export const welcome = {
  eyebrow: "Bienvenidos a HABITADAS",
  title: "Fortalecimiento personal con enfoque psicosocial",
  paragraphs: [
    "Articulamos una red de psicólogos clínicos, neuropsicólogos y especialistas para facilitar el acceso a salud mental accesible y de calidad.",
    "Enfoque en promoción y prevención, con especial atención a mujeres y NNA en situación de vulnerabilidad.",
  ],
  image: "/hero/comunidad.jpg",
  enfoque: {
    title: "Nuestro enfoque",
    items: [
      { label: "Promoción", desc: "Fomentamos hábitos y entornos que cuidan la salud mental antes de la crisis." },
      { label: "Prevención", desc: "Intervenimos temprano en factores de riesgo emocional y psicosocial." },
      { label: "Accesibilidad", desc: "Servicios adaptados a las realidades socioeconómicas de cada persona." },
      { label: "Red colaborativa", desc: "Profesionales independientes unidos por un mismo propósito de cuidado." },
    ],
  },
};

export const office = {
  badge: "Espacios habitados para el cuidado emocional",
  title: "Consultorios y espacios de apoyo",
  paragraphs: [
    "Disponemos de consultorios para profesionales que deseen brindar atención psicológica de manera independiente, en un entorno cálido, seguro y pensado para el bienestar de quienes nos visitan.",
    "Además, creamos espacios de comunidad: grupos de apoyo, encuentros psicoeducativos, actividades de bienestar y nuestro club de psicología, donde el aprendizaje y el cuidado mutuo se encuentran.",
  ],
  image: "/hero/espacios.jpg",
  video: "",
};

export const services = [
  {
    title: "Talleres Psicoeducativos",
    description:
      "Espacios formativos sobre temas relevantes de salud mental: regulación emocional, autocuidado, vínculos saludables, resiliencia y más. Diseñados para comunidades, familias y grupos específicos.",
    image: "/hero/taller.jpg",
  },
  {
    title: "Capacitaciones Empresariales",
    description:
      "Formación para empresas, instituciones y organizaciones en riesgos psicosociales, bienestar laboral, burnout, manejo de ansiedad, comunicación efectiva y cultura organizacional saludable.",
    image: "/hero/capacitacion.jpg",
  },
  {
    title: "Proyectos Psicosociales",
    description:
      "Diseño y ejecución de proyectos orientados a comunidades vulnerables, mujeres y adultos mayores. Incluye intervención grupal, acompañamiento psicosocial y trabajo comunitario.",
    image: "/hero/proyecto.jpg",
  },
  {
    title: "Red de Profesionales",
    description:
      "Articulación de psicólogos clínicos, neuropsicólogos y especialistas independientes. Los servicios clínicos son brindados directamente por cada profesional, bajo su propia responsabilidad.",
    image: "/hero/red-profesionales.jpg",
  },
  {
    title: "Espacios de Atención",
    description:
      "Consultorios disponibles para profesionales que deseen brindar atención psicológica de manera independiente, en instalaciones acogedoras y equipadas.",
    image: "/hero/consultorio.jpg",
  },
  {
    title: "Comunidad y Apoyo",
    description:
      "Grupos de apoyo, encuentros psicoeducativos, actividades de bienestar y club de psicología. Espacios donde compartir, aprender y sanar en comunidad.",
    image: "/hero/club.jpg",
  },
  {
    title: "Campamento Vacacional",
    description:
      "Experiencias vacacionales para niños y niñas con actividades lúdicas, psicoeducativas y de fortalecimiento emocional en un entorno seguro y supervisado por profesionales.",
    image: "/hero/campamento.jpg",
  },
];

export const challenges = [
  {
    title: "Mujeres en Vulnerabilidad",
    description: "Acompañamiento psicosocial para mujeres en situación de vulnerabilidad.",
    areaSlug: "mujeres" as const,
  },
  {
    title: "Niños, Niñas y Adolescentes",
    description: "Intervenciones adaptadas al desarrollo emocional de NNA.",
    areaSlug: "nna-infancia" as const,
  },
  {
    title: "Neuropsicología",
    description: "Evaluación cognitiva y funciones ejecutivas.",
    areaSlug: "neuropsicologia" as const,
  },
  {
    title: "Burnout y Agotamiento",
    description: "Prevención y recuperación del agotamiento emocional.",
    areaSlug: "bienestar-laboral" as const,
  },
  {
    title: "Ansiedad y Estrés",
    description: "Herramientas para manejar ansiedad y estrés crónico.",
    areaSlug: "ansiedad-estres" as const,
  },
  {
    title: "Bienestar Laboral",
    description: "Entornos de trabajo saludables y sostenibles.",
    areaSlug: "bienestar-laboral" as const,
  },
  {
    title: "Trauma y Duelo",
    description: "Procesamiento emocional y resiliencia.",
    areaSlug: "trauma-duelo" as const,
  },
  {
    title: "Comunidades Vulnerables",
    description: "Proyectos psicosociales con enfoque comunitario.",
    areaSlug: "comunitaria" as const,
  },
  {
    title: "Regulación Emocional",
    description: "Autoconocimiento y manejo de conflictos.",
    areaSlug: "ansiedad-estres" as const,
  },
  {
    title: "Vínculos y Familia",
    description: "Dinámicas familiares y comunicación asertiva.",
    areaSlug: "pareja-familia" as const,
  },
  {
    title: "Prevención en Salud Mental",
    description: "Fortalecimiento de factores protectores.",
    areaSlug: "comunitaria" as const,
  },
  {
    title: "Resiliencia Comunitaria",
    description: "Capacidades colectivas frente a adversidades.",
    areaSlug: "comunitaria" as const,
  },
];

import { professionals } from "./professionals";

export const team = professionals.map((p) => ({
  name: p.name,
  role: p.title,
  image: p.image,
  slug: p.slug,
  areas: p.areas,
  shortBio: p.shortBio,
  featured: p.featured,
}));

export const testimonials = [
  {
    author: "María Elena G.",
    quote: "Los talleres psicoeducativos de HABITADAS me dieron herramientas que nunca había tenido. Sentí que por primera vez alguien entendía mi realidad como mujer cabeza de familia y me acompañó sin juzgarme.",
  },
  {
    author: "Institución Educativa La Esperanza",
    quote: "La capacitación en riesgos psicosociales transformó la cultura de nuestro equipo docente. Hoy tenemos un lenguaje común sobre bienestar emocional y sabemos cómo cuidarnos mutuamente.",
  },
  {
    author: "Camila R.",
    quote: "Mi hija participó en el campamento vacacional y volvió más segura, más comunicativa. El equipo de HABITADAS creó un espacio donde los niños pudieron ser ellos mismos, con alegría y contención.",
  },
  {
    author: "Prof. James M.",
    quote: "Encontrar un consultorio en HABITADAS me permitió enfocarme en mis pacientes. El espacio es cálido, profesional y transmite la misma calidez que busco ofrecer en cada sesión.",
  },
  {
    author: "Rosa Patricia L.",
    quote: "El grupo de apoyo para mujeres fue un refugio en uno de los momentos más difíciles de mi vida. En HABITADAS encontré comunidad, no solo terapia. Eso marca la diferencia.",
  },
];

export const animationConfig = {
  scroll: ["fadeInUp", "fadeIn", "fadeInLeft", "fadeInRight", "fadeInUpBlur"],
  carousel: { therapy: "fade_blur", testimonials: { autoplay: 5000, loop: true } },
  hover: { translateY: -8, scale: 1.08 },
};

export const sections = {
  services: {
    title: "Lo que ofrece HABITADAS",
    description:
      "Talleres, capacitaciones, proyectos comunitarios y una red de profesionales para el bienestar de toda la familia.",
  },
  challenges: {
    title: "Áreas de intervención",
    description: "Haz clic en un área para ver los profesionales especializados.",
  },
  team: {
    eyebrow: "Conoce nuestra red",
    title: "Profesionales independientes",
    description: "Psicólogos, neuropsicólogos y especialistas. Elige tu profesional y agenda en minutos.",
  },
  testimonials: {
    eyebrow: "Testimonios",
    title: "Historias de fortalecimiento y comunidad",
    description:
      "Cada experiencia compartida refleja el impacto de espacios habitados: lugares donde el cuidado emocional, la prevención y la comunidad se encuentran.",
  },
  cta: {
    title: "Tu bienestar empieza con un profesional",
    description:
      "Elige entre nuestra red de especialistas, agenda en línea y da el primer paso hacia tu bienestar emocional.",
    button: "Agendar cita",
    hint: "Pasa el cursor para descubrir nuestros espacios",
  },
};

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  {
    label: "Sobre Nosotros",
    href: "#sobre-nosotros",
    children: [
      { label: "Nuestra empresa", href: "#sobre-nosotros" },
      { label: "Nuestro enfoque", href: "#sobre-nosotros" },
      { label: "Profesionales", href: "/profesionales" },
    ],
  },
  {
    label: "Servicios",
    href: "#servicios",
    children: services.map((s) => ({ label: s.title, href: "#servicios" })),
  },
  { label: "Profesionales", href: "/profesionales" },
];

export const videos = { hero: "", office: "" };
