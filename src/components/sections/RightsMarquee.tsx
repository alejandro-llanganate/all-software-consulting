"use client";

import { rightsMarquee } from "@/data/site";

export function RightsMarquee() {
  const items = [...rightsMarquee, ...rightsMarquee];

  return (
    <div className="overflow-hidden border-y border-primary/15 bg-primary py-3.5 text-white">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="inline-flex items-center gap-10 font-subtitle text-sm tracking-[0.12em] uppercase sm:text-base"
          >
            {text}
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
              aria-hidden
            />
          </span>
        ))}
      </div>
    </div>
  );
}
