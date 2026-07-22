"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type OptionCardProps = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export function OptionCard({ selected, onClick, children, className }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all",
        selected
          ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
          : "border-primary/15 bg-white text-headline hover:border-primary/40 hover:bg-violet-light/40",
        className,
      )}
    >
      {children}
    </button>
  );
}
