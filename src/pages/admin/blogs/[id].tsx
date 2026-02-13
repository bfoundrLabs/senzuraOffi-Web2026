import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    author: "",
    published: false,
  });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          tags: (data.tags || []).join(", "),
          author: data.author || "",
          published: data.published || false,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Blog not found");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/admin/blogs");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update blog");
      }
    } catch {
      setError("Something went wrong");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Blog Post">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Blog Post">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#2E86A7] hover:underline"
        >
          <ArrowLeftIcon size={16} />
          Back to Blogs
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#2E86A7] focus:ring-2 focus:ring-[#2E86A7]/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#2E86A7] focus:ring-2 focus:ring-[#2E86A7]/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Author
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, author: e.target.value }))
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#2E86A7] focus:ring-2 focus:ring-[#2E86A7]/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <ImageUpload
                  label="Cover Image"
                  value={form.coverImage}
                  onChange={(url) =>
                    setForm((prev) => ({ ...prev, coverImage: url }))
                  }
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#2E86A7] focus:ring-2 focus:ring-[#2E86A7]/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Excerpt *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  required
                  rows={2}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#2E86A7] focus:ring-2 focus:ring-[#2E86A7]/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Content * (HTML supported)
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  required
                  rows={12}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 font-mono text-sm text-zinc-900 outline-none focus:border-[#2E86A7] focus:ring-2 focus:ring-[#2E86A7]/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, published: e.target.checked }))
                }
                className="h-4 w-4 rounded border-zinc-300 text-[#2E86A7] focus:ring-[#2E86A7]"
              />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Published
              </span>
            </label>

            <div className="flex gap-3">
              <Link
                href="/admin/blogs"
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:opacity-60"
              >
                {saving && <Loader2Icon className="animate-spin" size={16} />}
                Save Changes
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-center text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
}
