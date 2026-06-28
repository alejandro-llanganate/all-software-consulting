"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { challenges, sections } from "@/data/site";
import { getArea } from "@/data/areas";
import { fadeInUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Challenges() {
  return (
    <section className="bg-violet-light/40 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeInUpBlur" className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-headline sm:text-4xl md:text-5xl">
            {sections.challenges.title}
          </h2>
          <p className="mt-3 text-foreground/70">{sections.challenges.description}</p>
        </ScrollReveal>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          speed={500}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-14"
        >
          {challenges.map((challenge, index) => {
            const area = challenge.areaSlug ? getArea(challenge.areaSlug) : null;
            return (
              <SwiperSlide key={challenge.title}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: (index % 4) * 0.08 }}
                >
                  <Link
                    href={challenge.areaSlug ? `/profesionales?area=${challenge.areaSlug}` : "/profesionales"}
                    className="group challenge-card block h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                  >
                    {area?.image && (
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={area.image}
                          alt={challenge.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width:640px) 100vw, 25vw"
                        />
                        <div
                          className="absolute inset-0 opacity-40 mix-blend-multiply"
                          style={{ backgroundColor: area.color }}
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-medium text-headline transition-colors group-hover:text-primary">
                        {challenge.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-foreground/65">
                        {challenge.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                        Ver profesionales
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
