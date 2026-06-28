"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { office } from "@/data/site";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { assetPath } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function Office() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(office.video);

  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [hasVideo]);

  return (
    <section className="bg-cream py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            transition={{ delay: 0.25 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
          >
            {hasVideo ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                muted
                playsInline
                loop
                poster={assetPath(office.image)}
              >
                <source src={assetPath(office.video)} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={office.image}
                alt="Oficina de terapia en South Miami"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
            transition={{ delay: 0.5 }}
          >
            <ScrollReveal animation="fadeIn" delay="xs">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Award className="h-4 w-4 text-primary-dark" />
                <span className="text-xs font-medium text-primary-dark">
                  {office.badge}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUpBlur" delay="sm">
              <h2 className="font-serif text-3xl leading-tight text-headline sm:text-4xl md:text-5xl">
                {office.title}
              </h2>
            </ScrollReveal>
            {office.paragraphs.map((p, i) => (
              <ScrollReveal key={i} animation="fadeInUp" delay={i === 0 ? "md" : "lg"}>
                <p className="mt-5 leading-relaxed text-foreground/75">{p}</p>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
