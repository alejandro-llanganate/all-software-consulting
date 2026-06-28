import { createWriteStream, existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs";
import { basename, join } from "path";
import { pipeline } from "stream/promises";
import { execSync } from "child_process";

const BASE_URL = "https://themodernpsychology.com";
const OUTPUT_DIR = join(process.cwd(), "public", "scraped");
const DATA_FILE = join(process.cwd(), "src", "data", "scraped.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** Assets del sitio original con nombre de archivo destino */
const ASSETS: Record<string, { url: string; fallback: string }> = {
  "MP-Logo.png": {
    url: `${BASE_URL}/wp-content/uploads/2026/05/MP-Logo.png`,
    fallback: "svg:logo-dark",
  },
  "MP-Logo-WHITE.png": {
    url: `${BASE_URL}/wp-content/uploads/2026/05/MP-Logo-WHITE.png`,
    fallback: "svg:logo-white",
  },
  "favicon-mp.png": {
    url: `${BASE_URL}/wp-content/uploads/2026/05/favicon-mp.png`,
    fallback: "svg:favicon",
  },
  "20211003_19453477.png": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/20211003_19453477.png`,
    fallback: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=900&fit=crop&q=80",
  },
  "20211003_195514960-2048x1363.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/20211003_195514960-2048x1363.jpg`,
    fallback: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop&q=80",
  },
  "2202038680.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/2202038680.jpg`,
    fallback: "https://images.unsplash.com/photo-1573497019940-1c28c88b4c3f?w=800&h=600&fit=crop&auto=format",
  },
  "2167024571.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/2167024571.jpg`,
    fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format",
  },
  "398253928.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/398253928.jpg`,
    fallback: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&q=80",
  },
  "1387143441.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/1387143441.jpg`,
    fallback: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop&q=80",
  },
  "2175077429-scaled.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/2175077429-scaled.jpg`,
    fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&q=80",
  },
  "2215349197.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/2215349197.jpg`,
    fallback: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&q=80",
  },
  "liz-photo.png": {
    url: `${BASE_URL}/wp-content/uploads/2025/12/liz-photo.png`,
    fallback: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=650&fit=crop&q=80",
  },
  "Lugannys-Soto-photo.png": {
    url: `${BASE_URL}/wp-content/uploads/2025/11/Lugannys-Soto-photo.png`,
    fallback: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=650&fit=crop&q=80",
  },
  "Nataly-Acevedo-photo.jpg": {
    url: `${BASE_URL}/wp-content/uploads/2026/01/Nataly-Acevedo-photo.jpg`,
    fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=650&fit=crop&q=80",
  },
  "Sofia-Ricardo-photo.png": {
    url: `${BASE_URL}/wp-content/uploads/2026/06/Sofia-Ricardo-photo.png`,
    fallback: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=650&fit=crop&q=80",
  },
  "Yamila-Rosales-photo.png": {
    url: `${BASE_URL}/wp-content/uploads/2026/06/Yamila-Rosales-photo.png`,
    fallback: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=650&fit=crop&q=80",
  },
};

const SVG_LOGOS: Record<string, string> = {
  "logo-dark": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#717F71"/>
    <text x="24" y="31" text-anchor="middle" fill="white" font-family="Georgia,serif" font-size="22" font-weight="400">M</text>
    <text x="58" y="32" fill="#171F17" font-family="Georgia,serif" font-size="22">Modern Psychology</text>
  </svg>`,
  "logo-white": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="white" fill-opacity="0.2" stroke="white" stroke-width="1"/>
    <text x="24" y="31" text-anchor="middle" fill="white" font-family="Georgia,serif" font-size="22">M</text>
    <text x="58" y="32" fill="white" font-family="Georgia,serif" font-size="22">Modern Psychology</text>
  </svg>`,
  favicon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="32" fill="#717F71"/>
    <text x="32" y="42" text-anchor="middle" fill="white" font-family="Georgia,serif" font-size="32">M</text>
  </svg>`,
};

function isValidImage(buf: Buffer): boolean {
  if (buf.length < 4 || buf[0] === 0x3c) return false;
  if (buf[0] === 0x89 && buf[1] === 0x50) return true;
  if (buf[0] === 0xff && buf[1] === 0xd8) return true;
  if (buf.toString("ascii", 0, 4) === "RIFF") return true;
  if (buf.toString("ascii", 0, 4).startsWith("<svg") || buf.toString("utf8", 0, 5) === "<?xml") return true;
  return false;
}

async function downloadUrl(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Referer: `${BASE_URL}/es/inicio/` },
    });
    if (!res.ok || !res.body) return false;
    await pipeline(res.body as unknown as NodeJS.ReadableStream, createWriteStream(dest));
    return existsSync(dest) && statSync(dest).size > 100;
  } catch {
    return false;
  }
}

function downloadCurl(url: string, dest: string): boolean {
  try {
    execSync(
      `curl -sL --max-time 30 -A "${UA}" -H "Referer: ${BASE_URL}/es/inicio/" -o "${dest}" "${url}"`,
      { stdio: "pipe" },
    );
    return existsSync(dest) && statSync(dest).size > 100;
  } catch {
    return false;
  }
}

async function ensureAsset(filename: string, config: { url: string; fallback: string }): Promise<{ path: string; source: string }> {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const dest = join(OUTPUT_DIR, filename);
  const localPath = `/scraped/${filename}`;

  // Limpiar corruptos
  if (existsSync(dest)) {
    const buf = readFileSync(dest);
    if (!isValidImage(buf)) unlinkSync(dest);
    else return { path: localPath, source: "cached" };
  }

  // Intentar sitio original
  console.log(`  🌐 Intentando original: ${filename}`);
  const ok = (await downloadUrl(config.url, dest)) || downloadCurl(config.url, dest);
  if (ok && isValidImage(readFileSync(dest))) {
    console.log(`  ✅ Original descargado: ${filename}`);
    return { path: localPath, source: "original" };
  }
  if (existsSync(dest)) unlinkSync(dest);

  // SVG logos
  if (config.fallback.startsWith("svg:")) {
    const key = config.fallback.replace("svg:", "");
    const svgDest = dest.replace(/\.(png|jpg|jpeg)$/i, ".svg");
    writeFileSync(svgDest, SVG_LOGOS[key]);
    console.log(`  🎨 SVG generado: ${basename(svgDest)}`);
    return { path: `/scraped/${basename(svgDest)}`, source: "svg" };
  }

  // Fallback Unsplash → guardar como .jpg local
  const jpgName = filename.replace(/\.(png|jpeg)$/i, ".jpg");
  const jpgDest = join(OUTPUT_DIR, jpgName);
  const jpgPath = `/scraped/${jpgName}`;

  console.log(`  ↩ Fallback Unsplash: ${jpgName}`);
  const fallbackUrls = [config.fallback, config.fallback.replace("w=800", "w=600")];
  for (const fbUrl of fallbackUrls) {
    if (existsSync(jpgDest)) unlinkSync(jpgDest);
    const fbOk = (await downloadUrl(fbUrl, jpgDest)) || downloadCurl(fbUrl, jpgDest);
    if (fbOk && existsSync(jpgDest) && isValidImage(readFileSync(jpgDest))) {
      return { path: jpgPath, source: "fallback" };
    }
    if (existsSync(jpgDest)) unlinkSync(jpgDest);
  }

  throw new Error(`No se pudo descargar ${filename}`);
}

async function main() {
  console.log("📥 Descargando imágenes del sitio original...\n");
  console.log("   (Si el WAF bloquea, se usan fallbacks locales de alta calidad)\n");

  const paths: Record<string, string> = {};

  for (const [filename, config] of Object.entries(ASSETS)) {
    const result = await ensureAsset(filename, config);
    paths[filename] = result.path;
  }

  const p = (key: string) => paths[key] ?? "";

  const data = {
    scrapedAt: new Date().toISOString(),
    source: `${BASE_URL}/es/inicio/`,
    scrapeMethod: "original-with-local-fallback",
    colors: {
      primary: "#717F71", secondary: "#6D5A46", accent: "#475347",
      light: "#FDFAF7", cream: "#F3EFEB", dark: "#171F17",
      text: "#0C0C0C", headline: "#070707",
    },
    fonts: ["Alice", "Montserrat"],
    videos: { hero: "", office: "" },
    logo: {
      default: p("MP-Logo.png"),
      white: p("MP-Logo-WHITE.png"),
      favicon: p("favicon-mp.png"),
    },
    hero: {
      subtitle: "Servicios de Salud Mental en South Miami",
      title: "Psicología Moderna para los Desafíos de Hoy",
      description: "Atención compasiva y basada en evidencia para niños, adolescentes, adultos y familias en South Miami, enfocada en la sanación, el crecimiento y el bienestar emocional a largo plazo.",
      video: "",
    },
    welcome: {
      eyebrow: "Bienvenidos a Modern Psychology",
      title: "El Enfoque Moderno de South Miami para la Salud Mental",
      paragraphs: [
        "En Modern Psychology en South Miami, apoyamos a niños, adolescentes, adultos y familias en cada etapa de su bienestar emocional y mental. Nuestro enfoque combina terapias basadas en evidencia con un ambiente cálido y compasivo que ayuda a las personas a obtener claridad, desarrollar resiliencia y avanzar con confianza.",
        "Ya sea que estés buscando apoyo para tu hijo, navegando los retos de la adolescencia, o manejando ansiedad, estrés, dificultades en las relaciones o transiciones importantes como adulto, ofrecemos atención personalizada diseñada para satisfacer las diversas necesidades de nuestra comunidad de Miami.",
      ],
      image: p("20211003_19453477.png"),
    },
    office: {
      badge: '"Mejor Servicio de Salud Mental 2025" según BusinessRate',
      title: "Un Espacio Diseñado para tu Comodidad",
      paragraphs: [
        "Nuestra oficina de terapia en South Miami está diseñada cuidadosamente para sentirse como un refugio tranquilo del estrés cotidiano. Con tonos cálidos, iluminación suave y detalles intencionales que crean una sensación de serenidad, es un espacio donde puedes relajarte, respirar profundo y sentirte verdaderamente apoyado durante tus sesiones.",
        "Estamos orgullosos de que Modern Psychology haya sido reconocido como el Mejor Servicio de Salud Mental en South Miami para el 2025 por BusinessRate, un reflejo de nuestro compromiso continuo con una atención compasiva, basada en evidencia.",
      ],
      image: p("20211003_195514960-2048x1363.jpg"),
      video: "",
    },
    services: [
      { title: "Terapia Individual", description: "Apoyo personalizado y uno a uno diseñado para ayudarte a comprender patrones, reducir síntomas y crear cambios significativos. Ideal para ansiedad, depresión, trauma y transiciones de vida.", image: p("2202038680.jpg") },
      { title: "Terapia de Pareja", description: "Fortalezcan su conexión a través de una comunicación guiada, comprensión emocional y crecimiento en conjunto. Reconstruyan la confianza, resuelvan conflictos y vuelvan a conectarse de manera significativa.", image: p("2167024571.jpg") },
      { title: "Terapia para Niños y Adolescentes", description: "Consejería especializada que apoya a niños y jóvenes en los desafíos emocionales, sociales y conductuales que surgen durante la niñez y la adolescencia.", image: p("398253928.jpg") },
      { title: "Terapia Familiar", description: "Apoyo para mejorar la dinámica familiar y fortalecer la comunicación entre padres, adolescentes y cuidadores. Promueve la conexión y reduce la tensión dentro del hogar.", image: p("1387143441.jpg") },
      { title: "Sesiones en Línea", description: "Atención experta desde la comodidad de tu hogar. Terapia por video segura y compatible con HIPAA, que se adapta a tu horario y mantiene el mismo nivel de apoyo profesional.", image: p("2175077429-scaled.jpg") },
      { title: "Sesiones Intensivas", description: "Tiempo de terapia extendido para un trabajo más profundo y enfocado. Ideal para el procesamiento de trauma, avances significativos y desafíos emocionales complejos que requieren atención dedicada.", image: p("2215349197.jpg") },
    ],
    challenges: [
      { title: "Ansiedad y Trastornos de Pánico", description: "Te ayudamos a manejar pensamientos abrumadores, síntomas físicos y respuestas de miedo mediante técnicas calmantes y basadas en evidencia." },
      { title: "Depresión y Trastornos del Estado de Ánimo", description: "Nuestro enfoque apoya la estabilización del estado de ánimo, la resiliencia emocional y una motivación renovada en tu vida diaria." },
      { title: "Trauma y TEPT (PTSD)", description: "Ofrecemos un espacio seguro para procesar el trauma, reducir detonantes y reconstruir una sensación de seguridad y empoderamiento." },
      { title: "Dificultades en las Relaciones", description: "Te guiamos hacia una comunicación más saludable, mayor comprensión emocional y conexiones más satisfactorias." },
      { title: "Transiciones de Vida", description: "Apoyo para navegar cambios importantes con claridad, confianza y equilibrio emocional." },
      { title: "Duelo y Pérdida", description: "Atención compasiva para ayudarte a honrar tu experiencia y avanzar a tu propio ritmo a través de la complejidad del duelo." },
      { title: "Manejo del Estrés", description: "Herramientas y estrategias prácticas para reducir el estrés, restaurar el equilibrio y fortalecer tu bienestar emocional." },
      { title: "Problemas de Autoestima", description: "Te ayudamos a desarrollar confianza, valor propio y una relación más positiva y auténtica contigo mismo(a)." },
      { title: "Recuperación de Adicciones", description: "Apoyo terapéutico para romper patrones poco saludables, construir estrategias de afrontamiento y lograr un cambio sostenible." },
      { title: "TDAH y Diferencias de Aprendizaje", description: "Guía para mejorar el enfoque, la organización y la regulación emocional con estrategias prácticas y de apoyo." },
      { title: "Trastornos Alimentarios", description: "Un enfoque compasivo y estructurado para sanar tu relación con la comida, tu cuerpo y contigo mismo(a)." },
      { title: "Trastornos del Sueño", description: "Apoyo para mejorar los hábitos de sueño, reducir interrupciones y crear patrones de descanso más saludables." },
    ],
    team: [
      { name: "Liz Lopez, RMHCI", role: "Fundadora y Consejera Registrada de Salud Mental en Práctica Supervisada", image: p("liz-photo.png"), featured: true },
      { name: "Lugannys Soto, LMHC", role: "Consejera Licenciada de Salud Mental", image: p("Lugannys-Soto-photo.png") },
      { name: "Nataly Acevedo, RMHCI", role: "Consejera Registrada de Salud Mental en Práctica Supervisada", image: p("Nataly-Acevedo-photo.jpg") },
      { name: "Sofia Ricardo, RMHCI", role: "Consejera Registrada de Salud Mental en Práctica Supervisada", image: p("Sofia-Ricardo-photo.png") },
      { name: "Yamila Rosales, BS, RMHCI", role: "Consejera Registrada de Salud Mental en Práctica Supervisada", image: p("Yamila-Rosales-photo.png") },
    ],
    testimonials: [
      { author: "Chris H.", quote: "Estaba atrapado(a) en un momento muy difícil, pero tú muestras una empatía genuina y una excelente capacidad de escucha. Explicas las cosas de una manera que realmente tiene sentido, y me escuchas sin hacerme sentir juzgado(a)." },
      { author: "Claudia", quote: "No tengo palabras para agradecer a Modern Psychology por el impacto tan profundo que han tenido en mi vida. Desde el momento en que entré por sus puertas, me sentí visto(a), escuchado(a) y apoyado(a)." },
      { author: "Olga P.", quote: "Este lugar ha sido una verdadera bendición para mí. Desde el momento en que llegué, me sentí muy bien recibido(a) y en un ambiente seguro y comprensivo." },
      { author: "Jenise R.", quote: "Después de que mi mamá falleció, me sentía abrumado(a) por el duelo. Liz me brindó un espacio seguro y reconfortante donde pude expresar mis sentimientos abiertamente." },
      { author: "Danny H.", quote: "Uno de los lugares más tranquilos de todo South Miami. Liz y Edgar son muy amables y atentos. Realmente se toman el tiempo para entender a cada paciente." },
    ],
    animations: {
      scroll: ["fadeInUp", "fadeIn", "fadeInLeft", "fadeInRight", "fadeInUpBlur"],
      carousel: { therapy: "fade_blur", testimonials: { autoplay: 5000, loop: true } },
      hover: { translateY: -8, scale: 1.08 },
    },
  };

  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log(`\n✅ ${Object.keys(paths).length} assets listos en public/scraped/`);
  console.log(`💾 scraped.json actualizado`);
}

main().catch(console.error);
