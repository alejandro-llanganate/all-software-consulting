#!/usr/bin/env tsx
/**
 * Verifica que todas las imágenes referenciadas en el código existan en public/.
 * Se ejecuta automáticamente antes de `npm run build`.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const SOURCE_DIRS = ["src/data", "src/components", "src/app"];

function collectImageRefs(): Set<string> {
  const refs = new Set<string>();
  const pattern = /["'`]\/(?:hero|team|scraped|logo\.png|logo-white\.png|uploads)[^"'`\s]*/g;

  for (const dir of SOURCE_DIRS) {
    const fullDir = join(ROOT, dir);
    if (!existsSync(fullDir)) continue;
    walk(fullDir, (file) => {
      if (!/\.(ts|tsx|js|jsx|json)$/.test(file)) return;
      const content = readFileSync(file, "utf-8");
      for (const match of content.matchAll(pattern)) {
        const path = match[0].slice(1).split("?")[0];
        refs.add(path);
      }
      // logo paths like "/logo.png"
      if (content.includes('"/logo.png"') || content.includes("'/logo.png'")) {
        refs.add("logo.png");
      }
    });
  }
  return refs;
}

function walk(dir: string, fn: (file: string) => void) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, fn);
    else fn(full);
  }
}

function main() {
  const refs = collectImageRefs();
  const missing: string[] = [];

  for (const ref of refs) {
    const filePath = join(PUBLIC, ref);
    if (!existsSync(filePath)) missing.push(ref);
  }

  // Resumen de assets en public/
  const heroCount = existsSync(join(PUBLIC, "hero"))
    ? readdirSync(join(PUBLIC, "hero")).filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f)).length
    : 0;
  const teamCount = existsSync(join(PUBLIC, "team"))
    ? readdirSync(join(PUBLIC, "team")).filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f)).length
    : 0;

  console.log(`✓ Imágenes en public/hero: ${heroCount}`);
  console.log(`✓ Imágenes en public/team: ${teamCount}`);
  console.log(`✓ Referencias verificadas: ${refs.size}`);

  if (missing.length > 0) {
    console.error("\n✗ Imágenes faltantes:");
    missing.forEach((m) => console.error(`  - public/${m}`));
    process.exit(1);
  }

  console.log("✓ Todas las imágenes referenciadas existen.\n");
}

main();
