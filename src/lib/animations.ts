import type { Transition, Variants } from "framer-motion";

/** Timing curves matching UiCore / Elementor */
export const EASE_UI = [0.24, 1, 0.3, 1] as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
} as const;

/** Elementor-style scroll reveal delays (seconds) */
export const STAGGER_DELAYS = {
  xs: 0.18,
  sm: 0.2,
  md: 0.25,
  lg: 0.4,
  xl: 0.5,
  xxl: 0.75,
} as const;

const baseTransition: Transition = {
  duration: DURATION.normal,
  ease: EASE_UI,
};

/** fadeInUp — Elementor default entrance */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

/** fadeIn */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

/** fadeInLeft */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

/** fadeInRight */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

/** fadeInUp + blur — Elementor Pro motion blur */
export const fadeInUpBlur: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE_UI },
  },
};

/** scaleIn — UiCore */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
};

/** Stagger container for child elements */
export const staggerContainer = (
  stagger = 0.12,
  delayChildren = 0.1,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Carousel slide fade+blur transition */
export const carouselSlideBlur = {
  enter: { opacity: 0, filter: "blur(8px)", scale: 1.02 },
  center: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, filter: "blur(8px)", scale: 0.98 },
};

/** Hover lift — ui-e-item-anim-translate */
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE_UI },
  },
};

/** Hover zoom — ui-e-item-anim-zoom */
export const hoverZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: DURATION.fast, ease: EASE_UI },
  },
};

export type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInLeft"
  | "fadeInRight"
  | "fadeInUpBlur"
  | "scaleIn";

export const animationVariants: Record<AnimationType, Variants> = {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeInUpBlur,
  scaleIn,
};
