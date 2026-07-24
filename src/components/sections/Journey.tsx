"use client";

import { FrostedCta } from "@/components/ui/FrostedCta";
import { journey } from "@/data/home-content";
import { motion } from "framer-motion";
import {
  Armchair,
  CalendarClock,
  ClipboardList,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function StepIcon({ icon }: { icon: (typeof journey.steps)[number]["icon"] }) {
  const cls = "h-11 w-11 text-white sm:h-12 sm:w-12 md:h-[3.25rem] md:w-[3.25rem]";
  const map: Record<string, ReactNode> = {
    clipboard: (
      <span className="relative inline-flex items-center justify-center">
        <ClipboardList className={cls} strokeWidth={1.35} />
        <UserRound
          className="absolute right-0 bottom-0 h-4 w-4 text-white sm:h-4.5 sm:w-4.5"
          strokeWidth={2}
        />
      </span>
    ),
    whatsapp: <WhatsAppIcon className={cls} />,
    calendar: <CalendarClock className={cls} strokeWidth={1.35} />,
    chair: <Armchair className={cls} strokeWidth={1.35} />,
  };
  return map[icon] ?? null;
}

/**
 * Flecha profesional: la punta rota según la tangente
 * al final de la curva (no queda horizontal).
 */
function FlowArrow({ down }: { down: boolean }) {
  // Ángulo de la punta ≈ dirección del último tramo de la curva
  const tipAngle = down ? 35 : -35;
  const tipX = 49;
  const tipY = down ? 81.2 : 6.8;

  return (
    <svg
      className={`pointer-events-none absolute left-full z-[1] hidden w-[3.25rem] overflow-visible lg:block xl:w-14 ${
        down ? "top-[38%] h-[5.5rem]" : "bottom-[38%] h-[5.5rem]"
      }`}
      viewBox="0 0 56 88"
      fill="none"
      aria-hidden
    >
      {down ? (
        <path
          d="M2 6 C 20 8, 26 38, 32 54 C 38 70, 44 78, 47.5 80.5"
          stroke="white"
          strokeOpacity="0.78"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M2 82 C 20 80, 26 50, 32 34 C 38 18, 44 10, 47.5 7.5"
          stroke="white"
          strokeOpacity="0.78"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}

      {/* Punta alineada con el final de la línea */}
      <g transform={`translate(${tipX} ${tipY}) rotate(${tipAngle})`}>
        <path
          d="M0 0 L-9 -5.2 L-9 5.2 Z"
          fill="white"
          fillOpacity="0.92"
        />
      </g>
    </svg>
  );
}

function StepCopy({
  step,
  iconFirst,
}: {
  step: (typeof journey.steps)[number];
  iconFirst: boolean;
}) {
  const title = (
    <p className="relative z-10 max-w-[15rem] font-title text-lg leading-snug text-white sm:text-xl md:text-[1.35rem]">
      <span className="mr-1.5 inline-block align-baseline text-3xl leading-none text-white sm:text-4xl md:text-[2.75rem]">
        {step.n}.
      </span>
      {step.title}
    </p>
  );
  const icon = (
    <div className={`relative z-10 flex items-center justify-center ${iconFirst ? "mb-3.5" : "mt-3.5"}`}>
      <StepIcon icon={step.icon} />
    </div>
  );

  return iconFirst ? (
    <>
      {icon}
      {title}
    </>
  ) : (
    <>
      {title}
      {icon}
    </>
  );
}

export function Journey() {
  return (
    <section id="camino" className="bg-light py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#7030A0] via-[#5C2D8A] to-[#45206A] px-5 py-12 shadow-[0_24px_60px_rgba(45,27,78,0.18)] sm:rounded-[2rem] sm:px-8 sm:py-14 md:px-12 lg:px-14 lg:py-16">
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="whitespace-nowrap font-title text-[clamp(1.15rem,3.6vw,2.65rem)] leading-tight text-white">
                {journey.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-subtitle text-lg text-white/90 sm:text-xl md:text-2xl">
                {journey.intro}
              </p>
            </div>

            <ol className="relative mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0 lg:pt-4 lg:pb-8">
              {journey.steps.map((step, i) => {
                const high = i % 2 === 0;
                return (
                  <motion.li
                    key={step.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className={`relative z-10 flex flex-col items-center px-1 text-center ${
                      high ? "lg:-translate-y-6" : "lg:translate-y-10"
                    }`}
                  >
                    {i < journey.steps.length - 1 ? <FlowArrow down={high} /> : null}
                    <StepCopy step={step} iconFirst={!high} />
                  </motion.li>
                );
              })}
            </ol>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex justify-center sm:mt-12 lg:mt-16"
            >
              <FrostedCta className="cta-invite border-white/30 bg-white/15 px-10 py-4 text-lg font-title text-white hover:bg-white/25 sm:px-12 sm:py-5 sm:text-xl">
                Queremos acompañarte
              </FrostedCta>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
