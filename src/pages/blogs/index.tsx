import { useEffect, useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import { CalendarIcon, TagIcon, ArrowRightIcon } from "lucide-react";

import FadeUp from "@/animation/fade-up";
import { siteMetadata } from "@/data/siteMetaData.mjs";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <NextSeo
        title="Blog | Senzura Codelabs"
        description="Read insights on modern web development, cloud architecture, security best practices, and engineering culture from the Senzura Codelabs team."
        canonical={`${siteMetadata.siteUrl}/blogs`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/blogs`,
          title: "Blog | Senzura Codelabs",
          description:
            "Engineering insights, tutorials, and thought leadership from Senzura Codelabs.",
          siteName: siteMetadata.siteName,
          type: "website",
        }}
      />

      <section className="mx-auto mb-40 mt-6 w-full gap-20 px-6 sm:mt-12 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence>
            <FadeUp key="blog-title" duration={0.6}>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Our Blog
              </span>
              <h1 className="mt-3 bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                Insights & Engineering Stories
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                Thoughts on modern development, architecture decisions, and
                lessons learned from building production systems.
              </p>
            </FadeUp>
          </AnimatePresence>

          {loading ? (
            <div className="mt-20 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : blogs.length === 0 ? (
            <FadeUp duration={0.6} delay={0.2}>
              <div className="mt-20 rounded-2xl border border-[#6C7A89]/20 bg-white p-12 text-center dark:border-[#6C7A89]/10 dark:bg-zinc-900">
                <h2 className="text-2xl font-bold text-foreground">
                  Coming Soon
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We&apos;re working on some great content. Check back soon for
                  articles on engineering, architecture, and best practices.
                </p>
              </div>
            </FadeUp>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <FadeUp key={blog._id} duration={0.6} delay={index * 0.1}>
                  <Link href={`/blogs/${blog.slug}`}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#6C7A89]/20 bg-white transition-all duration-300 hover:border-[#2E86A7]/40 hover:shadow-lg dark:border-[#6C7A89]/10 dark:bg-zinc-900 dark:hover:border-[#2E86A7]/30">
                      {blog.coverImage && (
                        <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CalendarIcon size={12} />
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span>·</span>
                          <span>{blog.author}</span>
                        </div>

                        <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
                          {blog.title}
                        </h2>

                        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
                          {blog.excerpt}
                        </p>

                        {blog.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                              >
                                <TagIcon size={10} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all group-hover:gap-2">
                          Read more <ArrowRightIcon size={14} />
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
