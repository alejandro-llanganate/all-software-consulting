import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
};

/** Botón con aspecto borroso / glass (PDF: botones de página) */
export function FrostedCta({ children, className, href }: Props) {
  const to = href ?? siteConfig.bookingUrl;
  return (
    <a
      href={to}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/40",
        "bg-white/20 px-8 py-4 text-center font-subtitle text-base text-white",
        "shadow-[0_8px_32px_rgba(45,27,78,0.25)] backdrop-blur-xl",
        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-[0_12px_40px_rgba(45,27,78,0.35)]",
        "sm:px-10 sm:py-5 sm:text-lg",
        className,
      )}
    >
      {children}
    </a>
  );
}
