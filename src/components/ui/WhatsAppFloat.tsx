"use client";

import { siteConfig } from "@/data/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hola HABITADAS, me gustaría información sobre terapia / agendar una cita.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-white/90" />
      </span>
    </a>
  );
}
