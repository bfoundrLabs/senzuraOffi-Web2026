import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { CalendarIcon, ArrowLeftIcon, TagIcon, UserIcon } from "lucide-react";

import FadeUp from "@/animation/fade-up";
import { siteMetadata } from "@/data/siteMetaData.mjs";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: string;
}

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Blog Not Found</h1>
        <Link href="/blogs" className="text-accent hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title={`${blog.title} | Senzura Codelabs Blog`}
        description={blog.excerpt}
        canonical={`${siteMetadata.siteUrl}/blogs/${blog.slug}`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/blogs/${blog.slug}`,
          title: blog.title,
          description: blog.excerpt,
          type: "article",
          ...(blog.coverImage && {
            images: [{ url: blog.coverImage, alt: blog.title }],
          }),
        }}
      />

      <article className="mx-auto mb-40 mt-6 w-full px-6 sm:mt-12 sm:px-14 md:px-20">
        <div className="mx-auto max-w-4xl">
          <FadeUp duration={0.6}>
            <Link
              href="/blogs"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeftIcon size={16} />
              Back to Blogs
            </Link>

            {blog.coverImage && (
              <div className="mb-8 aspect-video w-full overflow-hidden rounded-2xl">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon size={14} />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UserIcon size={14} />
                {blog.author}
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              {blog.title}
            </h1>

            {blog.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    <TagIcon size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div
              className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-a:text-accent prose-strong:text-foreground max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </FadeUp>
        </div>
      </article>
    </>
  );
}
