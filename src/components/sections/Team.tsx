"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { sections, team } from "@/data/site";
import { getArea } from "@/data/areas";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Team() {
  return (
    <section id="equipo" className="bg-light py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeInUpBlur" className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.15em] text-primary uppercase">
            {sections.team.eyebrow}
          </p>
          <h2 className="font-serif text-3xl text-headline sm:text-4xl md:text-5xl">
            {sections.team.title}
          </h2>
          <p className="mt-3 text-foreground/70">{sections.team.description}</p>
          <Link
            href="/profesionales"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
          >
            <Calendar className="h-4 w-4" />
            Agendar cita ahora
          </Link>
        </ScrollReveal>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          speed={500}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-14"
        >
          {team.map((member, index) => (
            <SwiperSlide key={member.slug}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/profesionales/${member.slug}`}
                  className="group block text-center"
                >
                  <div className="relative mx-auto mb-4 aspect-[3/4] max-w-[240px] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/15">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="240px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute right-0 bottom-0 left-0 flex translate-y-0 items-center justify-center gap-1 p-4 text-sm font-medium text-white opacity-100 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                      Ver perfil
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    {member.featured && (
                      <div className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary-dark uppercase">
                        Directora
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-headline transition-colors group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/60">{member.role}</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {member.areas.slice(0, 2).map((areaSlug) => {
                      const area = getArea(areaSlug);
                      return (
                        <span
                          key={areaSlug}
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                          style={{ backgroundColor: area?.color ?? "#7030A0" }}
                        >
                          {area?.label ?? areaSlug}
                        </span>
                      );
                    })}
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 text-center">
          <Link
            href="/profesionales"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-medium text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            Ver todos los profesionales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
