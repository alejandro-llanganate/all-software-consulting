"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { animationConfig, sections, testimonials } from "@/data/site";
import { fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Testimonials() {
  return (
    <section className="bg-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal animation="fadeInUpBlur" className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.15em] text-primary uppercase">
            {sections.testimonials.eyebrow}
          </p>
          <h2 className="font-serif text-4xl text-headline md:text-5xl">
            {sections.testimonials.title}
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/70">
            {sections.testimonials.description}
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            loop
            speed={600}
            autoplay={{
              delay: animationConfig.carousel.testimonials.autoplay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.author}>
                <motion.div
                  className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <p className="flex-1 text-sm leading-relaxed text-foreground/75 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-serif text-sm text-primary-dark">
                      {testimonial.author.charAt(0)}
                    </div>
                    <p className="font-medium text-primary-dark">
                      {testimonial.author}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
