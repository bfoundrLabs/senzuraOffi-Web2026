import { useEffect, useState } from "react";
import { UsersIcon, FileTextIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Application {
  _id: string;
  careerTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  resumeFileName?: string;
  createdAt: string;
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);

  useEffect(() => {
    fetch("/api/career-applications")
      .then((r) => r.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Career Applications">
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <UsersIcon className="mx-auto mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            No applications yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500">
            Career applications from applicants will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* List */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-sm font-medium text-zinc-500">
                  {applications.length} application
                  {applications.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="max-h-[calc(100vh-280px)] divide-y divide-zinc-200 overflow-y-auto dark:divide-zinc-800">
                {applications.map((app) => (
                  <button
                    key={app._id}
                    onClick={() => setSelected(app)}
                    className={`w-full px-4 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                      selected?._id === app._id ? "bg-[#2E86A7]/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                          {app.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          Applied for: {app.careerTitle}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {app.resumeUrl && (
                          <FileTextIcon size={14} className="text-[#2E86A7]" />
                        )}
                        <span className="text-xs text-zinc-400">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Applied for:{" "}
                    <span className="font-medium text-[#2E86A7]">
                      {selected.careerTitle}
                    </span>
                  </p>
                  <p className="text-xs text-zinc-400">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase text-zinc-500">
                        Email
                      </label>
                      <p className="mt-1 text-sm text-zinc-900 dark:text-white">
                        {selected.email}
                      </p>
                    </div>
                    {selected.phone && (
                      <div>
                        <label className="text-xs font-medium uppercase text-zinc-500">
                          Phone
                        </label>
                        <p className="mt-1 text-sm text-zinc-900 dark:text-white">
                          {selected.phone}
                        </p>
                      </div>
                    )}
                  </div>

                  {selected.coverLetter && (
                    <div>
                      <label className="text-xs font-medium uppercase text-zinc-500">
                        Cover Letter
                      </label>
                      <div className="mt-2 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                        <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                          {selected.coverLetter}
                        </p>
                      </div>
                    </div>
                  )}

                  {selected.resumeUrl && (
                    <div>
                      <label className="text-xs font-medium uppercase text-zinc-500">
                        Resume / CV
                      </label>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 rounded-lg bg-[#2E86A7]/10 px-4 py-2.5">
                          <FileTextIcon size={18} className="text-[#2E86A7]" />
                          <span className="text-sm font-medium text-[#2E86A7]">
                            CV Attached
                          </span>
                        </div>
                        <a
                          href={selected.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#2E86A7] px-3 py-2 text-sm font-medium text-[#2E86A7] transition-colors hover:bg-[#2E86A7] hover:text-white"
                        >
                          View CV
                        </a>
                        <a
                          href={selected.resumeUrl}
                          download={selected.resumeFileName || "resume.pdf"}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2E86A7] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2E86A7]/90"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  )}

                  <a
                    href={`mailto:${
                      selected.email
                    }?subject=Re: Application for ${encodeURIComponent(
                      selected.careerTitle,
                    )} at Senzura Codelabs`}
                    className="mt-4 inline-block rounded-lg bg-[#2E86A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#2E86A7]/90"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-500">
                  Select an application to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
