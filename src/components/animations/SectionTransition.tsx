"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionTransitionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "fade" | "slide-up" | "scale" | "blur";
};

const easeOut = [0.24, 1, 0.3, 1] as const;

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeOut } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)", y: 24 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  },
};

export function SectionTransition({
  children,
  className,
  id,
  variant = "slide-up",
}: SectionTransitionProps) {
  return (
    <motion.section
      id={id}
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "-60px" }}
      variants={variants[variant]}
    >
      {children}
    </motion.section>
  );
}
