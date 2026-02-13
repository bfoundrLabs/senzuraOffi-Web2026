import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  published: boolean;
  order: number;
  liveWebsiteHref: string;
  sourceCodeHref: string;
  createdAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    fetch("/api/projects?all=true")
      .then((r) => r.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  const togglePublish = async (project: Project) => {
    await fetch(`/api/projects/${project._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !project.published }),
    });
    fetchProjects();
  };

  const moveProject = async (index: number, direction: "up" | "down") => {
    const newProjects = [...projects];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newProjects.length) return;

    [newProjects[index], newProjects[swapIndex]] = [
      newProjects[swapIndex],
      newProjects[index],
    ];
    setProjects(newProjects);

    const items = newProjects.map((p, i) => ({ id: p._id, order: i }));
    await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  };

  return (
    <AdminLayout title="Project Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
          >
            <PlusIcon size={16} />
            New Project
          </Link>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              No projects yet
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Add your first project to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Name
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 md:table-cell">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 lg:table-cell">
                    Links
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 md:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {projects.map((project, index) => (
                  <tr
                    key={project._id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveProject(index, "up")}
                          disabled={index === 0}
                          className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-30 dark:hover:bg-zinc-700"
                        >
                          <ArrowUpIcon size={14} />
                        </button>
                        <button
                          onClick={() => moveProject(index, "down")}
                          disabled={index === projects.length - 1}
                          className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-30 dark:hover:bg-zinc-700"
                        >
                          <ArrowDownIcon size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {project.name}
                      </p>
                      <p className="text-xs text-zinc-500 md:hidden">
                        {project.published ? "Published" : "Draft"}
                      </p>
                    </td>
                    <td className="hidden px-4 py-4 md:table-cell">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          project.published
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {project.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 lg:table-cell">
                      <div className="flex gap-3 text-xs">
                        {project.liveWebsiteHref && (
                          <a
                            href={project.liveWebsiteHref}
                            target="_blank"
                            className="text-[#2E86A7] underline"
                          >
                            Live
                          </a>
                        )}
                        {project.sourceCodeHref && (
                          <a
                            href={project.sourceCodeHref}
                            target="_blank"
                            className="text-[#2E86A7] underline"
                          >
                            Source
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 text-sm text-zinc-500 md:table-cell">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(project)}
                          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                          title={project.published ? "Unpublish" : "Publish"}
                        >
                          {project.published ? (
                            <EyeIcon size={16} />
                          ) : (
                            <EyeOffIcon size={16} />
                          )}
                        </button>
                        <Link
                          href={`/admin/projects/${project._id}`}
                          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                          title="Edit"
                        >
                          <PencilIcon size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
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
