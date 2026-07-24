import { blogPosts } from "@/data/home-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | HABITADAS",
  description: "Artículos sobre salud mental, bienestar y el camino en Habitadas.",
};

export default function BlogIndexPage() {
  return (
    <div className="bg-light pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-title text-3xl text-headline sm:text-4xl md:text-5xl">Blog</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <h2 className="mt-4 font-title text-lg text-headline group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 font-body text-sm text-foreground/60">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
