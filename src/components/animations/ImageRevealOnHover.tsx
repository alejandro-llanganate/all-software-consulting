"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ImageRevealOnHoverProps = {
  imageSrc: string;
  imageAlt: string;
  revealRadius?: number;
  className?: string;
  children: ReactNode;
};

export function ImageRevealOnHover({
  imageSrc,
  imageAlt,
  revealRadius = 320,
  className,
  children,
}: ImageRevealOnHoverProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);

  const spring = { damping: 28, stiffness: 180, mass: 0.6 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);
  const clipPath = useMotionTemplate`circle(${radius}px at ${x}px ${y}px)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovering(true);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
      animate(radius, revealRadius, { duration: 0.45, ease: [0.24, 1, 0.3, 1] });
    },
    [mouseX, mouseY, radius, revealRadius],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    animate(radius, 0, { duration: 0.35, ease: [0.24, 1, 0.3, 1] });
  }, [radius]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Fondo base oscuro */}
      <div className="absolute inset-0 z-0 bg-primary-dark" />
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(112,48,160,0.35) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(198,164,230,0.2) 0%, transparent 45%)",
        }}
      />

      {/* Imagen revelada bajo el cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={reducedMotion ? undefined : { clipPath }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover scale-105"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-primary-dark/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-primary-dark/30" />
      </motion.div>

      {/* Imagen estática en móvil / touch (sin hover) */}
      <div
        className={cn(
          "absolute inset-0 z-[1] md:hidden",
          reducedMotion ? "opacity-40" : "opacity-35",
        )}
        aria-hidden
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-dark/60" />
      </div>

      {/* Anillo luminoso en el cursor */}
      {!reducedMotion && isHovering && (
        <motion.div
          className="pointer-events-none absolute z-[2] hidden md:block"
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            width: revealRadius * 2,
            height: revealRadius * 2,
          }}
        >
          <div className="h-full w-full rounded-full ring-1 ring-white/20 ring-inset" />
        </motion.div>
      )}

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
