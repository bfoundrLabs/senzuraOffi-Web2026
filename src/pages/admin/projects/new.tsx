import React, { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload, { MultiImageUpload } from "@/components/admin/ImageUpload";

export default function NewProject() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    favicon: "/favicon.png",
    images: "",
    sourceCodeHref: "",
    liveWebsiteHref: "",
    tags: "",
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: form.images
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          tags: form.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/projects");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="New Project">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeftIcon size={16} />
          Back to Projects
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Project Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="A brief description of the project..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="Next.js, React, Tailwind CSS"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Links
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Live Website URL
                </label>
                <input
                  type="url"
                  value={form.liveWebsiteHref}
                  onChange={(e) =>
                    setForm({ ...form, liveWebsiteHref: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Source Code URL
                </label>
                <input
                  type="url"
                  value={form.sourceCodeHref}
                  onChange={(e) =>
                    setForm({ ...form, sourceCodeHref: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="https://github.com/your-repo"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Images
            </h3>
            <div className="space-y-4">
              <div>
                <ImageUpload
                  label="Favicon"
                  value={form.favicon}
                  onChange={(url) => setForm({ ...form, favicon: url })}
                  placeholder="/favicon.png"
                />
              </div>

              <div>
                <MultiImageUpload
                  label="Project Images"
                  value={form.images}
                  onChange={(val) => setForm({ ...form, images: val })}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="h-4 w-4 rounded border-zinc-300 text-[#2E86A7] focus:ring-[#2E86A7]"
              />
              <label
                htmlFor="published"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Publish immediately
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
            >
              <SaveIcon size={16} />
              {saving ? "Saving..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
