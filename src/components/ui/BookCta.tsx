import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Profesional opcional: /agendar?pro=slug */
  professionalSlug?: string;
};

/** CTA de agendar → wizard interno con ficha socioeconómica */
export function BookCta({ children, className, professionalSlug }: Props) {
  const href = professionalSlug
    ? `/profesionales/${professionalSlug}/agendar`
    : siteConfig.bookingUrl;

  return (
    <a href={href} className={cn(className)}>
      {children}
    </a>
  );
}
