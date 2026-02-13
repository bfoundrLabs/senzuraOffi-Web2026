import React, { useEffect, useState, useCallback } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XIcon,
  Loader2Icon,
  CheckIcon,
  XCircleIcon,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface CareerItem {
  _id: string;
  title: string;
  position: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  active: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  position: "",
  type: "Internship",
  location: "Remote",
  description: "",
  requirements: "",
  benefits: "",
  active: true,
};

export default function AdminCareers() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchCareers = useCallback(() => {
    fetch("/api/careers?all=true")
      .then((r) => r.json())
      .then((data) => {
        setCareers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this career posting?")) return;
    await fetch(`/api/careers/${id}`, { method: "DELETE" });
    fetchCareers();
  };

  const toggleActive = async (career: CareerItem) => {
    await fetch(`/api/careers/${career._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !career.active }),
    });
    fetchCareers();
  };

  const move = async (index: number, direction: "up" | "down") => {
    const newCareers = [...careers];
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= newCareers.length) return;

    [newCareers[index], newCareers[swapIdx]] = [
      newCareers[swapIdx],
      newCareers[index],
    ];
    setCareers(newCareers);

    await fetch("/api/careers/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: newCareers.map((c) => c._id) }),
    });
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (career: CareerItem) => {
    setForm({
      title: career.title,
      position: career.position,
      type: career.type,
      location: career.location,
      description: career.description,
      requirements: career.requirements.join("\n"),
      benefits: career.benefits.join("\n"),
      active: career.active,
    });
    setEditing(career._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      requirements: form.requirements.split("\n").filter(Boolean),
      benefits: form.benefits.split("\n").filter(Boolean),
    };

    const url = editing ? `/api/careers/${editing}` : "/api/careers";
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    setShowForm(false);
    fetchCareers();
  };

  return (
    <AdminLayout title="Career Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {careers.length} career posting{careers.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
          >
            <PlusIcon size={16} />
            New Career
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {editing ? "Edit Career" : "New Career Posting"}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <XIcon size={20} className="text-zinc-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                  placeholder="e.g. Full Stack Developer"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Position *
                </label>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, position: e.target.value }))
                  }
                  required
                  placeholder="e.g. Senior - Full Stack Development"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Type *
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, type: e.target.value }))
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                >
                  <option>Internship</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Location *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Requirements (one per line)
                </label>
                <textarea
                  value={form.requirements}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, requirements: e.target.value }))
                  }
                  rows={4}
                  placeholder="Strong foundation in Python&#10;Experience with React"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Benefits (one per line)
                </label>
                <textarea
                  value={form.benefits}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, benefits: e.target.value }))
                  }
                  rows={4}
                  placeholder="Remote work&#10;Competitive salary"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, active: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-zinc-300 text-[#2E86A7] focus:ring-[#2E86A7]"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Active
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-6 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving && <Loader2Icon className="animate-spin" size={16} />}
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Careers List */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
          </div>
        ) : careers.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              No career postings yet
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            {careers.map((career, index) => (
              <div
                key={career._id}
                className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Reorder buttons */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => move(index, "up")}
                    disabled={index === 0}
                    className="rounded p-1 text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
                  >
                    <ArrowUpIcon size={14} />
                  </button>
                  <button
                    onClick={() => move(index, "down")}
                    disabled={index === careers.length - 1}
                    className="rounded p-1 text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
                  >
                    <ArrowDownIcon size={14} />
                  </button>
                </div>

                {/* Career info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {career.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        career.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {career.active ? (
                        <>
                          <CheckIcon size={10} /> Active
                        </>
                      ) : (
                        <>
                          <XCircleIcon size={10} /> Inactive
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    {career.position} · {career.type} · {career.location}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(career)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title={career.active ? "Deactivate" : "Activate"}
                  >
                    {career.active ? (
                      <XCircleIcon size={16} />
                    ) : (
                      <CheckIcon size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => openEdit(career)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Edit"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(career._id)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    title="Delete"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
