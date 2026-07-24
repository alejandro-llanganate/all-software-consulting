import { blogPosts } from "@/data/home-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog" };
  return { title: `${post.title} | HABITADAS`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-light pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#blog"
          className="font-subtitle text-sm text-primary hover:text-primary-dark"
        >
          ← Volver al blog
        </Link>
        <h1 className="mt-6 font-title text-3xl text-headline sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 font-body text-sm text-foreground/50">
          {new Date(post.date + "T12:00:00").toLocaleDateString("es-EC", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={post.image} alt="" fill className="object-cover" sizes="768px" priority />
        </div>
        <div className="mt-8 space-y-5">
          {post.content.split("\n\n").map((para) => (
            <p
              key={para.slice(0, 48)}
              className="font-body text-base leading-relaxed text-foreground/75 sm:text-lg"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
