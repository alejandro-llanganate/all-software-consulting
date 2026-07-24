"use client";

import { blogPosts } from "@/data/home-content";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Blog() {
  return (
    <section id="blog" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="font-subtitle text-xs tracking-[0.2em] text-primary uppercase">
            Recursos
          </p>
          <h2 className="mt-2 font-title text-3xl text-headline sm:text-4xl md:text-5xl">
            Blog
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-primary/10">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mt-4 font-title text-lg text-headline transition-colors group-hover:text-primary sm:text-xl">
                  {post.title}
                </h3>
                <p className="mt-2 font-body text-sm text-foreground/60">{post.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
