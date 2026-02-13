import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    fetch("/api/blogs?all=true")
      .then((r) => r.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const togglePublish = async (blog: Blog) => {
    await fetch(`/api/blogs/${blog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !blog.published }),
    });
    fetchBlogs();
  };

  return (
    <AdminLayout title="Blog Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {blogs.length} blog post{blogs.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
          >
            <PlusIcon size={16} />
            New Blog Post
          </Link>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              No blog posts yet
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Create your first blog post to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {blog.title}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          /{blog.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          blog.published
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {blog.published ? (
                          <>
                            <EyeIcon size={12} /> Published
                          </>
                        ) : (
                          <>
                            <EyeOffIcon size={12} /> Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(blog)}
                          className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                          title={blog.published ? "Unpublish" : "Publish"}
                        >
                          {blog.published ? (
                            <EyeOffIcon size={16} />
                          ) : (
                            <EyeIcon size={16} />
                          )}
                        </button>
                        <Link
                          href={`/admin/blogs/${blog._id}`}
                          className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                          title="Edit"
                        >
                          <PencilIcon size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                          title="Delete"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
