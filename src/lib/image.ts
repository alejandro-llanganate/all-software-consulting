import type { ImageProps } from "next/image";

/** Detecta si la URL es remota (requiere remotePatterns en next.config) */
export function isRemoteSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

/** Props seguras para next/image con src local o remoto */
export function imageProps(
  src: string,
  alt: string,
  options?: Partial<ImageProps>,
): ImageProps {
  const base: ImageProps = { src, alt, ...options };
  if (isRemoteSrc(src) && !options?.width && !options?.fill) {
    return { ...base, width: 800, height: 600 };
  }
  return base;
}
