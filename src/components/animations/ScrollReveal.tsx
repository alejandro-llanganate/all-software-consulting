"use client";

import {
  animationVariants,
  type AnimationType,
  STAGGER_DELAYS,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  animation?: AnimationType;
  delay?: keyof typeof STAGGER_DELAYS | number;
  once?: boolean;
  amount?: number;
};

export function ScrollReveal({
  children,
  className,
  animation = "fadeInUp",
  delay = "md",
  once = true,
  amount = 0.2,
  ...props
}: ScrollRevealProps) {
  const delayValue =
    typeof delay === "number" ? delay : STAGGER_DELAYS[delay];

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={animationVariants[animation]}
      transition={{ delay: delayValue }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
