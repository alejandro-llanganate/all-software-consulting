"use client";

import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type StaggerChildrenProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
};

export function StaggerChildren({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.1,
  once = true,
  amount = 0.15,
  ...props
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
