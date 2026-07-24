"use client";

import { journey } from "@/data/home-content";
import { motion } from "framer-motion";
import {
  Armchair,
  CalendarClock,
  ClipboardList,
  Heart,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

function Flower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 6c1.2 3.2 3.8 5 7 5-1.2 3.2-1 6.6 1 9.4-3.2.2-5.6 2.4-7 5.4-1.4-3-3.8-5.2-7-5.4 2-2.8 2.2-6.2 1-9.4 3.2 0 5.8-1.8 7-5Z"
        fill="#D4B4F0"
        stroke="#EDE0FF"
        strokeWidth="1"
      />
      <circle cx="16" cy="16" r="2.5" fill="#fff" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function StepIcon({ icon }: { icon: (typeof journey.steps)[number]["icon"] }) {
  const cls = "h-7 w-7 text-white sm:h-8 sm:w-8";
  const map: Record<string, ReactNode> = {
    clipboard: (
      <span className="relative inline-flex items-center justify-center">
        <ClipboardList className={cls} strokeWidth={1.4} />
        <UserRound className="absolute bottom-0.5 right-0 h-3 w-3 text-white" strokeWidth={2.2} />
      </span>
    ),
    whatsapp: <WhatsAppIcon className={cls} />,
    calendar: <CalendarClock className={cls} strokeWidth={1.4} />,
    chair: <Armchair className={cls} strokeWidth={1.4} />,
  };
  return map[icon] ?? null;
}

/** Tarjeta con punta superior (forma casita / pentágono) */
const houseClip =
  "polygon(50% 0%, 100% 14%, 100% 100%, 0% 100%, 0% 14%)";

export function Journey() {
  return (
    <section id="camino" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Fondo visible: overlay más ligero */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{
          backgroundImage: `url('${journey.background}')`,
          filter: "brightness(1.12) saturate(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-[#7030A0]/38" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#55247A]/25 via-transparent to-[#2D1B4E]/45" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2.5 sm:gap-4">
            <Flower className="h-7 w-7 shrink-0 drop-shadow-[0_0_10px_rgba(212,180,240,0.85)] sm:h-8 sm:w-8" />
            <h2 className="font-title text-[1.65rem] leading-[1.15] text-white drop-shadow-sm sm:text-3xl md:text-4xl lg:text-[2.65rem]">
              {journey.title}
            </h2>
            <Flower className="h-7 w-7 shrink-0 drop-shadow-[0_0_10px_rgba(212,180,240,0.85)] sm:h-8 sm:w-8" />
          </div>

          {/* Separador con diamante */}
          <div className="mx-auto mt-5 flex max-w-md items-center gap-3 px-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E8D5F5] to-[#C6A4E6]" />
            <span className="h-2 w-2 rotate-45 rounded-[1px] bg-[#E8D5F5] shadow-[0_0_8px_rgba(232,213,245,0.9)]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#E8D5F5] to-[#C6A4E6]" />
          </div>

          <p className="mx-auto mt-4 max-w-2xl font-subtitle text-sm text-white/95 drop-shadow-sm sm:text-base md:text-lg">
            {journey.intro}
          </p>
        </div>

        {/* Pasos */}
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          {/* Línea ondulada (desktop) */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-20 hidden h-10 lg:block">
            <svg
              className="absolute inset-x-[6%] top-3 h-10 w-[88%]"
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M20 20 C 140 4, 220 36, 320 20 S 500 4, 600 20 S 780 36, 900 20 L 955 20"
                stroke="#DCC6F5"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_6px_rgba(220,198,245,0.95)]"
              />
              <path
                d="M935 10 L968 20 L935 30"
                stroke="#EDE0FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <ol className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5 lg:pt-2">
            {journey.steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                className="relative flex flex-col items-center"
              >
                {/* Número sobre la línea */}
                <span className="relative z-30 mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white font-title text-sm text-[#7030A0] shadow-[0_4px_16px_rgba(45,27,78,0.25)] ring-2 ring-[#DCC6F5]/80 lg:mb-4">
                  {step.n}
                </span>

                {/* Card casita */}
                <div
                  className="relative flex w-full flex-1 flex-col px-4 pb-6 pt-10 sm:px-5 sm:pb-7 sm:pt-11"
                  style={{
                    clipPath: houseClip,
                    background:
                      "linear-gradient(180deg, rgba(155,89,199,0.72) 0%, rgba(85,36,122,0.88) 100%)",
                    boxShadow:
                      "0 0 0 1.5px rgba(232,213,245,0.55), 0 16px 36px rgba(45,27,78,0.28)",
                  }}
                >
                  {/* borde glow simulado */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-80"
                    style={{
                      clipPath: houseClip,
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)",
                    }}
                  />

                  <div className="relative flex justify-center">
                    <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-white/45 bg-white/15 shadow-[0_0_18px_rgba(198,164,230,0.35)] sm:h-16 sm:w-16">
                      <StepIcon icon={step.icon} />
                    </div>
                  </div>

                  <h3 className="relative mt-4 text-center font-subtitle text-[0.95rem] leading-snug text-white sm:text-base">
                    {step.title}
                  </h3>
                  <p className="relative mt-2.5 flex-1 text-center font-body text-[0.78rem] leading-relaxed text-white/92 sm:text-[0.82rem]">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Pie */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 flex max-w-lg items-center gap-3 rounded-full border border-white/50 bg-[#4a2080]/45 px-4 py-2.5 shadow-[0_8px_28px_rgba(45,27,78,0.2)] backdrop-blur-sm sm:mt-12 sm:max-w-xl sm:gap-4 sm:px-5 sm:py-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/15">
            <Heart className="h-3.5 w-3.5 fill-[#E8D5F5] text-[#E8D5F5]" />
          </span>
          <p className="font-body text-xs leading-snug text-white sm:text-sm">
            {journey.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
