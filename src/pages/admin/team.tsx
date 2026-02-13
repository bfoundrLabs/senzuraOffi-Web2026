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
  LinkedinIcon,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  linkedinUrl: string;
  order: number;
  active: boolean;
}

const emptyForm = {
  name: "",
  role: "",
  image: "",
  linkedinUrl: "",
  active: true,
};

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchMembers = useCallback(() => {
    fetch("/api/team?all=true")
      .then((r) => r.json())
      .then((data) => {
        setMembers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    fetchMembers();
  };

  const toggleActive = async (member: TeamMember) => {
    await fetch(`/api/team/${member._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !member.active }),
    });
    fetchMembers();
  };

  const move = async (index: number, direction: "up" | "down") => {
    const newMembers = [...members];
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= newMembers.length) return;

    await Promise.all([
      fetch(`/api/team/${newMembers[index]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: swapIdx }),
      }),
      fetch(`/api/team/${newMembers[swapIdx]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: index }),
      }),
    ]);
    fetchMembers();
  };

  const openEdit = (member: TeamMember) => {
    setForm({
      name: member.name,
      role: member.role,
      image: member.image,
      linkedinUrl: member.linkedinUrl,
      active: member.active,
    });
    setEditing(member._id);
    setShowForm(true);
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      role: form.role,
      image: form.image,
      linkedinUrl: form.linkedinUrl,
      active: form.active,
    };

    if (editing) {
      await fetch(`/api/team/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchMembers();
  };

  return (
    <AdminLayout title="Team Members">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Manage team members displayed on the About page.
        </p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#2E86A7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2E86A7]/90"
        >
          <PlusIcon size={16} />
          Add Member
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {editing ? "Edit Member" : "Add Team Member"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setForm(emptyForm);
                }}
              >
                <XIcon
                  size={20}
                  className="text-zinc-400 hover:text-zinc-600"
                />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Role *
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Lead Engineer"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Profile Photo"
                placeholder="https://example.com/photo.jpg"
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) =>
                    setForm({ ...form, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-[#2E86A7] focus:ring-[#2E86A7]"
                />
                <label
                  htmlFor="active"
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  Visible on website
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2E86A7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2E86A7]/90 disabled:opacity-50"
                >
                  {saving && <Loader2Icon className="animate-spin" size={16} />}
                  {editing ? "Update" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members List */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <PlusIcon className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            No team members yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500">
            Add your first team member to display on the About page.
          </p>
          <button
            onClick={openNew}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2E86A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#2E86A7]/90"
          >
            <PlusIcon size={16} />
            Add Member
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <div
              key={member._id}
              className={`rounded-xl border bg-white p-5 transition-all dark:bg-zinc-900 ${
                member.active
                  ? "border-zinc-200 dark:border-zinc-800"
                  : "border-red-200 opacity-60 dark:border-red-900"
              }`}
            >
              <div className="mb-4 flex items-start gap-4">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#2E86A7]/20"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2E86A7] to-[#1F5F75] text-lg font-bold text-white">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="truncate text-sm text-[#2E86A7]">
                    {member.role}
                  </p>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-[#0077B5]"
                    >
                      <LinkedinIcon size={12} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(index, "up")}
                    disabled={index === 0}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
                    title="Move up"
                  >
                    <ArrowUpIcon size={14} />
                  </button>
                  <button
                    onClick={() => move(index, "down")}
                    disabled={index === members.length - 1}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
                    title="Move down"
                  >
                    <ArrowDownIcon size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(member)}
                    className={`rounded p-1.5 transition-colors ${
                      member.active
                        ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                        : "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    }`}
                    title={member.active ? "Hide from site" : "Show on site"}
                  >
                    {member.active ? (
                      <CheckIcon size={14} />
                    ) : (
                      <XCircleIcon size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => openEdit(member)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-[#2E86A7] dark:hover:bg-zinc-800"
                    title="Edit"
                  >
                    <PencilIcon size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    title="Delete"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
