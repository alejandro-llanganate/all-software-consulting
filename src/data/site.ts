import { assetPath as a } from "@/lib/asset-path";

/** Ficha socioeconómica externa (referencia); el flujo principal es el wizard interno */
export const SOCIOECONOMIC_FORM_URL =
  "https://kumpita.cloud/registrate/?tipo_registro=usuario";

export const siteConfig = {
  name: "HABITADAS",
  brandName: "HABITADAS",
  tagline: "Bienestar emocional y fortalecimiento personal",
  phone: "+593 98 437 0041",
  phoneDigits: "593984370041",
  whatsapp: "593984370041",
  email: "contacto@habitadas.site",
  address: "Quito, Pichincha, Ecuador",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905!2d-78.4678!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a2561a0b0b1%3A0x0!2sQuito!5e0!3m2!1ses!2sec!4v1",
  mapLink: "https://maps.google.com/?q=Quito,+Ecuador",
  bookingUrl: "/agendar",
  professionalsUrl: "/profesionales",
  instagram: "https://www.instagram.com/habitadas.ec/",
  facebook: "https://www.facebook.com/habitadas.ec/",
  instagramHandle: "habitadas.ec",
  facebookHandle: "habitadas.ec",
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
  default: a("/logo.png"),
  white: a("/logo-white.png"),
  full: a("/logo-full.png"),
  favicon: a("/favicon-habitadas.png"),
};

export const hero = {
  subtitle: "Empresa psicosocial",
  title:
    "Habitamos el cambio, porque la salud mental es un derecho, no un privilegio.",
  description: "",
  image: a("/hero/portada.jpg"),
  video: "",
  approaches: [],
};

export const rightsMarquee = [
  "Terapia basada en evidencia",
  "Terapias conductuales contextuales",
  "Cognitivo-conductual",
  "Terapia ética y humana",
];

export const welcome = {
  eyebrow: "Bienvenidos a HABITADAS",
  title: "Fortalecimiento personal con enfoque psicosocial",
  paragraphs: [
    "Somos una empresa psicosocial en Quito dedicada a la promoción y prevención en salud mental. Creemos que la salud mental es un derecho no negociable; por eso el acceso asequible es indispensable para todas las personas.",
    "Trabajamos con enfoques basados en evidencia — terapias conductuales contextuales y terapia cognitivo-conductual — para acompañarte con profesionalismo y calidez.",
  ],
  image: a("/hero/welcome.jpg"),
  enfoque: {
    title: "Nuestro enfoque terapéutico",
    items: [
      {
        label: "Basado en evidencia",
        desc: "Intervenciones respaldadas por investigación científica y buenas prácticas clínicas.",
      },
      {
        label: "Conductuales contextuales",
        desc: "Terapias que integran contexto, valores y acción para un cambio significativo.",
      },
      {
        label: "Cognitivo-conductual",
        desc: "TCC para trabajar pensamientos, emociones y conductas con herramientas concretas.",
      },
      {
        label: "Acceso asequible",
        desc: "Tarifas pensadas para que más personas puedan cuidar su salud mental.",
      },
    ],
  },
};

export const history = {
  eyebrow: "Nuestra historia",
  title: "Habitar el cuidado emocional",
  paragraphs: [
    "HABITADAS nace en Quito con una convicción clara: la salud mental debe ser cercana, humana y accesible. Queremos espacios donde las personas se sientan acompañadas, sin juicios, y con profesionales comprometidos.",
    "Desde el acompañamiento psicológico individual hasta la terapia de pareja y familiar, construimos un lugar habitado — un refugio para el bienestar emocional, la prevención y la comunidad.",
    "Hoy seguimos creciendo con transparencia, ética y la certeza de que cuidar la mente es un derecho, no un privilegio.",
  ],
  image: a("/hero/historia.jpg"),
};

export const office = {
  badge: "Espacios habitados para el cuidado emocional",
  title: "Consultorios y espacios de apoyo",
  paragraphs: [
    "Disponemos de consultorios pensados para el bienestar: un entorno cálido, seguro y profesional para tu proceso terapéutico, de forma presencial o virtual.",
    "Además, impulsamos talleres psicoeducativos para comunidades, familias y grupos que buscan herramientas de autocuidado y regulación emocional.",
  ],
  image: a("/hero/consultorio-1.jpg"),
  gallery: [
    a("/hero/consultorio-1.jpg"),
    a("/hero/consultorio-2.jpg"),
    a("/hero/consultorio-3.jpg"),
  ],
  video: "",
};

export const services = [
  {
    title: "Acompañamiento Psicológico",
    description:
      "Orientación y contención emocional con profesionales certificados, en un espacio seguro y confidencial.",
    image: a("/hero/consultorio.jpg"),
  },
  {
    title: "Terapia Individual",
    description:
      "Proceso personalizado de 45–50 minutos. Presencial o virtual, sin límite de sesiones, con evaluaciones específicas si son necesarias.",
    image: a("/hero/taller.jpg"),
    price: 7,
  },
  {
    title: "Terapia de Pareja",
    description:
      "Fortalece la comunicación y el vínculo. Sesiones de 45–50 minutos, presencial o virtual.",
    image: a("/hero/comunidad.jpg"),
    price: 20,
  },
  {
    title: "Terapia Familiar",
    description:
      "Trabajo con el sistema familiar para mejorar dinámicas y bienestar compartido. Sesiones de 45–50 minutos.",
    image: a("/hero/proyecto.jpg"),
    price: 25,
  },
  {
    title: "Talleres Psicoeducativos",
    description:
      "Espacios formativos sobre salud mental: regulación emocional, autocuidado, vínculos saludables y resiliencia.",
    image: a("/hero/capacitacion.jpg"),
  },
  {
    title: "Comunidad y Apoyo",
    description:
      "Grupos de apoyo gratuitos (con registro previo) y campamento vacacional para niñas y niños. Comunícate por WhatsApp para inscribirte.",
    image: a("/hero/campamento.jpg"),
    freeGroup: true,
  },
];

export const prices = [
  {
    title: "Terapia Individual",
    price: 6,
    currency: "USD",
    from: true,
    duration: "45 a 50 minutos",
    notes: [
      "Presencial o virtual",
      "Sin límite de sesiones",
      "Evaluaciones específicas incluidas de ser necesario",
      "El valor final se confirma según lo que completes al agendar",
    ],
  },
  {
    title: "Terapia de Pareja",
    price: 20,
    currency: "USD",
    from: true,
    duration: "45 a 50 minutos",
    notes: [
      "Presencial o virtual",
      "Sin límite de sesiones",
      "Evaluaciones específicas incluidas de ser necesario",
      "Precio desde este valor: depende mucho de lo que completes en el agendamiento de la cita",
    ],
  },
  {
    title: "Terapia Familiar",
    price: 25,
    currency: "USD",
    from: true,
    duration: "45 a 50 minutos",
    notes: [
      "Presencial o virtual",
      "Sin límite de sesiones",
      "Evaluaciones específicas incluidas de ser necesario",
      "Precio desde este valor: depende mucho de lo que completes en el agendamiento de la cita",
    ],
  },
];

export const howToBook = {
  eyebrow: "Proceso sencillo",
  title: "Cómo agendar una cita",
  intro:
    "Creemos que la salud mental es un derecho no negociable. Completa un wizard corto con tu ficha, preferencias y elige horario.",
  steps: [
    {
      n: "01",
      title: "Cuéntanos tu situación",
      desc: "Ficha breve: a quién acompañamos, servicio y contexto socioeconómico confidencial.",
    },
    {
      n: "02",
      title: "Elige profesional y horario",
      desc: "Selecciona a tu profesional y una fecha/hora disponible en el calendario.",
    },
    {
      n: "03",
      title: "Confirma tu cita",
      desc: "Registra el pago por transferencia y descarga tu comprobante.",
    },
  ],
  cta: "Agenda tu cita aquí",
};

export const disclaimer = {
  title: "Importante",
  body: "Los servicios disponibles a través de HABITADAS son proporcionados de forma independiente por profesionales de salud mental certificados. Los profesionales de salud mental no recetan medicamentos a través de HABITADAS. Si estás pasando por una crisis o emergencia, por favor contacta a los servicios de emergencia más cercanos a tu ubicación.",
};

export const challenges = [
  {
    title: "Ansiedad y Estrés",
    description: "Herramientas prácticas con enfoque cognitivo-conductual.",
    areaSlug: "ansiedad-estres" as const,
  },
  {
    title: "Neuropsicología",
    description: "Evaluación y acompañamiento neurocognitivo.",
    areaSlug: "neuropsicologia" as const,
  },
  {
    title: "Pareja y Familia",
    description: "Comunicación, vínculos y dinámicas saludables.",
    areaSlug: "pareja-familia" as const,
  },
  {
    title: "Bienestar emocional",
    description: "Prevención, autocuidado y fortalecimiento personal.",
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
    quote:
      "En HABITADAS encontré un espacio seguro y tarifas accesibles. Por primera vez sentí que la terapia estaba a mi alcance.",
  },
  {
    author: "Camila R.",
    quote:
      "Las sesiones de pareja nos ayudaron a comunicarnos mejor. Profesionales cálidas y muy claras en el proceso.",
  },
  {
    author: "Andrés P.",
    quote:
      "El enfoque basado en evidencia me dio herramientas concretas. Recomiendo HABITADAS a cualquiera que busque cuidarse.",
  },
];

export const animationConfig = {
  scroll: ["fadeInUp", "fadeIn", "fadeInLeft", "fadeInRight", "fadeInUpBlur"],
  carousel: { therapy: "fade_blur", testimonials: { autoplay: 5000, loop: true } },
  hover: { translateY: -8, scale: 1.08 },
};

export const sections = {
  services: {
    title: "Nuestros servicios",
    description:
      "Acompañamiento psicológico, terapia individual, de pareja y familiar, talleres psicoeducativos y comunidad.",
  },
  challenges: {
    title: "Áreas de intervención",
    description: "Haz clic en un área para ver a nuestras profesionales.",
  },
  team: {
    eyebrow: "Nuestro equipo",
    title: "Profesionales de HABITADAS",
    description: "Psicólogas certificadas en Quito. Conoce sus perfiles y agenda tu cita.",
  },
  testimonials: {
    eyebrow: "Testimonios",
    title: "Historias de fortalecimiento",
    description: "Voces de quienes encontraron en HABITADAS un espacio habitado para su bienestar.",
  },
  cta: {
    title: "Agenda tu cita aquí",
    description:
      "Completa tu ficha socioeconómica y da el primer paso hacia tu bienestar emocional.",
    button: "Agenda tu cita aquí",
    hint: "Salud mental accesible · Quito, Ecuador",
  },
  prices: {
    title: "Nuestros precios",
    description:
      "Tarifas claras y asequibles desde $6 USD. Sesiones de 45 a 50 minutos. En pareja y familiar el valor es desde el indicado y depende de lo que completes al agendar tu cita.",
  },
};

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Qué es HABITADAS", href: "#que-es-habitadas" },
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Blog", href: "#blog" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Agendar", href: "/agendar" },
];

export const videos = { hero: "", office: "" };
