import { assetPath as a } from "@/lib/asset-path";

export const aboutHabitadas = {
  title: "¿Qué es HABITADAS?",
  subtitle: "Hacemos accesible la salud mental para todas las personas.",
  bodyBold:
    "En Habitadas creemos que el bienestar emocional debe ser un derecho, no un privilegio. Somos un espacio seguro donde acompañamos a mujeres, niñas, niños y sus familias con atención psicológica profesional, humana y accesible, adaptada a la realidad de cada persona.",
  image: a("/hero/que-es-habitadas.jpg"),
  cta: "Queremos acompañarte.",
};

export const journey = {
  title: "Así comienza tu camino en Habitadas",
  intro:
    "Queremos que acceder a atención psicológica sea un proceso sencillo, claro y cercano.",
  background: a("/hero/consultorio-2.jpg"),
  footer: "Estás en el lugar correcto. Estamos aquí para caminar contigo.",
  steps: [
    {
      n: "1",
      title: "Cuéntanos sobre ti",
      desc: "Completa nuestro formulario de valoración socioeconómica para que podamos conocer tu realidad y ofrecerte una tarifa justa.",
      icon: "clipboard" as const,
    },
    {
      n: "2",
      title: "Recibe tu respuesta",
      desc: "Nuestro equipo revisará tu información y, en un plazo máximo de 8 horas, te contactará por WhatsApp con el valor asignado y las indicaciones para continuar.",
      icon: "whatsapp" as const,
    },
    {
      n: "3",
      title: "Agenda tu primera sesión",
      desc: "Una vez confirmada tu tarifa, coordinaremos el horario que mejor se adapte a ti y te asignaremos la profesional más adecuada según tu motivo de consulta.",
      icon: "calendar" as const,
    },
    {
      n: "4",
      title: "Comienza tu proceso",
      desc: "Inicia un acompañamiento psicológico en un espacio seguro, humano y profesional, pensado para apoyar tu bienestar emocional.",
      icon: "chair" as const,
    },
  ],
};

export type ServiceModality = "both" | "presencial";

export type HomeService = {
  id: string;
  title: string;
  description: string;
  modality: ServiceModality;
  /** Solo en individual / pareja / familiar */
  priceLabel?: string;
  images: string[];
};

export const homeServices: HomeService[] = [
  {
    id: "acompanamiento",
    title: "Acompañamiento psicológico",
    description:
      "Brindamos atención psicológica individual para niñas, niños, adolescentes y personas adultas. Acompañamos procesos relacionados con ansiedad, depresión, duelo, autoestima, regulación emocional, estrés, dificultades escolares, cambios de vida y otras situaciones que impactan el bienestar emocional.",
    modality: "both",
    priceLabel: "Accede desde 7",
    images: [
      a("/hero/ansiedad-estres.jpg"),
      a("/hero/consultorio-1.jpg"),
      a("/hero/welcome.jpg"),
    ],
  },
  {
    id: "pareja",
    title: "Terapia de pareja",
    description:
      "Ofrecemos un espacio de escucha y acompañamiento para fortalecer la comunicación, resolver conflictos, reconstruir la confianza y favorecer relaciones más saludables y conscientes.",
    modality: "both",
    priceLabel: "Accede desde 15",
    images: [
      a("/hero/consultorio-2.jpg"),
      a("/hero/welcome.jpg"),
      a("/hero/consultorio-3.jpg"),
    ],
  },
  {
    id: "familiar",
    title: "Terapia familiar",
    description:
      "Acompañamos a las familias en la mejora de la convivencia, la comunicación y la resolución de conflictos, fortaleciendo los vínculos y promoviendo un entorno de apoyo y bienestar para todos sus integrantes.",
    modality: "both",
    priceLabel: "Accede desde 20",
    images: [
      a("/hero/ninos.jpg"),
      a("/hero/comunidad.jpg"),
      a("/hero/consultorio-1.jpg"),
    ],
  },
  {
    id: "evaluaciones",
    title: "Evaluaciones psicológicas",
    description:
      "Realizamos procesos de evaluación psicológica y neuropsicológica mediante entrevistas, observación clínica y pruebas estandarizadas, con el objetivo de comprender las necesidades de cada persona y orientar un plan de intervención adecuado.",
    modality: "presencial",
    images: [
      a("/hero/neuropsicologia.jpg"),
      a("/hero/espacios.jpg"),
      a("/hero/consultorio-3.jpg"),
    ],
  },
  {
    id: "talleres",
    title: "Talleres y grupos",
    description:
      "Desarrollamos talleres vivenciales y espacios grupales dirigidos a niñas, niños, adolescentes, personas adultas, familias e instituciones, enfocados en el bienestar emocional, la prevención y el desarrollo de habilidades para la vida.",
    modality: "both",
    images: [
      a("/hero/taller.jpg"),
      a("/hero/campamento.jpg"),
      a("/hero/club.jpg"),
    ],
  },
  {
    id: "empresas",
    title: "Capacitación para empresas",
    description:
      "Diseñamos programas de formación y prevención para organizaciones e instituciones en temas como salud mental, bienestar laboral, prevención de riesgos psicosociales, liderazgo, comunicación, manejo del estrés y desarrollo de equipos de trabajo.",
    modality: "both",
    images: [
      a("/hero/capacitacion.jpg"),
      a("/hero/proyecto.jpg"),
      a("/hero/red-profesionales.jpg"),
    ],
  },
  {
    id: "neurodiversidades",
    title: "Atención en neurodiversidades",
    description:
      "Brindamos acompañamiento psicológico a personas con condiciones del neurodesarrollo, como Trastorno del Espectro Autista (TEA), Trastorno por Déficit de Atención e Hiperactividad (TDAH), discapacidad intelectual y otras neurodivergencias, ofreciendo además orientación y apoyo a sus familias para favorecer su desarrollo e inclusión.",
    modality: "presencial",
    images: [
      a("/hero/neuropsicologia.jpg"),
      a("/hero/ninos.jpg"),
      a("/hero/consultorio-2.jpg"),
    ],
  },
  {
    id: "psicopedagogia",
    title: "Psicopedagogía",
    description:
      "Realizamos evaluación, intervención y elaboración de informes psicopedagógicos para fortalecer los procesos de aprendizaje y desarrollo integral.",
    modality: "presencial",
    images: [
      a("/hero/espacios.jpg"),
      a("/hero/neuropsicologia.jpg"),
      a("/hero/historia.jpg"),
    ],
  },
];

export const teamHome = [
  {
    slug: "stepfanie-villacis",
    name: "Stepfanie Villacís",
    role: "Psicóloga / Neuropsicóloga Clínica",
    greeting: "¡Hola, soy Stepf!",
    image: a("/team/stepfanie-villacis.png"),
    bio: `Soy Psicóloga General, graduada de la Universidad Politécnica Salesiana. Mi enfoque de trabajo es cognitivo-conductual, basado en la evidencia científica y adaptado a las necesidades de cada persona.

He realizado un Diplomado en Educación Emocional por la UTE y una Maestría en Neuropsicología Clínica en la Universidad Internacional de Valencia (VIU). Además, me mantengo en constante formación porque creo que aprender continuamente es la mejor manera de brindar una atención ética, actualizada y de calidad.

Mi propósito es ofrecer un espacio seguro, cercano y profesional, donde cada persona se sienta escuchada, comprendida y acompañada en su proceso de bienestar emocional.`,
  },
  {
    slug: "valery-cevallos",
    name: "Valery Cevallos",
    role: "Psicóloga Clínica / Psicoterapeuta",
    greeting: "Hola, soy Valer!",
    image: a("/team/valery-cevallos.png"),
    bio: `Me gradué como Psicóloga, cuento con un Máster en Terapia Cognitivo-Conductual, una Maestría en Psicología Clínica y Psicoterapia, y actualmente curso un Diplomado en Terapias Conductuales y Contextuales.

Creo profundamente en las personas y en la capacidad que tenemos de transformar nuestras vidas cuando caminamos juntos. Mi experiencia como voluntaria y el trabajo con personas en situación de vulnerabilidad fortalecieron una convicción que hoy guía todo lo que hago: la salud mental es un derecho que se construye con justicia social y que el bienestar nace del vínculo con los demás, con los animales y con la naturaleza. Por eso, todas las formas de vida merecen respeto, cuidado y compasión, así construimos una sociedad más humana y empática.`,
  },
];

export const blogPosts = [
  {
    slug: "salud-mental-es-un-derecho",
    title: "La salud mental es un derecho, no un privilegio",
    excerpt:
      "Por qué en HABITADAS creemos que el acceso asequible a terapia transforma comunidades.",
    image: a("/hero/welcome.jpg"),
    date: "2026-07-01",
    content: `En Habitadas partimos de una certeza: cuidar la mente no puede depender del privilegio económico. La atención psicológica profesional, ética y humana debe estar al alcance de más personas.

Cuando una mujer, una niña, un niño o una familia encuentra un espacio seguro, se reduce el sufrimiento silencioso y se abren caminos de regulación emocional, vínculos más sanos y esperanza concreta.

Este blog es un espacio para hablar claro, sin tecnicismos innecesarios, sobre bienestar emocional, prevención y derechos.`,
  },
  {
    slug: "como-saber-si-necesito-terapia",
    title: "¿Cómo saber si necesito terapia?",
    excerpt:
      "Señales cotidianas que invitan a pedir acompañamiento psicológico sin culpa.",
    image: a("/hero/taller.jpg"),
    date: "2026-07-08",
    content: `No hace falta “estar en crisis” para buscar ayuda. La ansiedad que no baja, el duelo que duele de más, los conflictos de pareja que se repiten o la sensación de estar desbordada/o son motivos válidos.

La terapia no es un juicio: es un proceso con herramientas, escucha y un plan adaptado a tu realidad. En HABITADAS empezamos con una valoración socioeconómica para ofrecerte una tarifa justa y cercana.`,
  },
  {
    slug: "primeros-pasos-en-habitadas",
    title: "Tus primeros pasos en Habitadas",
    excerpt:
      "Del formulario a tu primera sesión: qué esperar en las primeras 8 horas.",
    image: a("/hero/consultorio-2.jpg"),
    date: "2026-07-15",
    content: `El camino es sencillo: completas tu ficha, recibes respuesta por WhatsApp en máximo 8 horas con el valor asignado, agendas tu primera sesión y comienzas en un espacio seguro.

Queremos que el proceso sea claro y humano desde el primer clic. Si tienes dudas, escríbenos: estamos para acompañarte.`,
  },
];
