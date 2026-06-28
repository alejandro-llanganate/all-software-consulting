/** Prefijo para GitHub Pages (ej. /all-software-consulting). Vacío en local/Docker. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefija rutas de public/ para que carguen en GitHub Pages. */
export function assetPath(path: string): string {
  if (!path || path.startsWith("http") || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath || normalized.startsWith(basePath)) return normalized;
  return `${basePath}${normalized}`;
}
