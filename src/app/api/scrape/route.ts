import { NextResponse } from "next/server";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

/** API para re-ejecutar el scraper y actualizar assets */
export async function POST() {
  try {
    execSync("npm run scrape", {
      cwd: process.cwd(),
      stdio: "pipe",
      timeout: 120_000,
    });
    return NextResponse.json({
      success: true,
      message: "Scraping completado. Assets actualizados en /public/scraped",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/scrape",
    method: "POST",
    description: "Descarga imágenes y videos del sitio original y actualiza scraped.json",
  });
}
