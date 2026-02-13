import { useEffect, useState } from "react";
import { MailIcon, CheckCircleIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMsg | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        setContacts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Contact Submissions">
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <MailIcon className="mx-auto mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            No contact submissions yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500">
            Messages from the contact page will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Contact List */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-sm font-medium text-zinc-500">
                  {contacts.length} message{contacts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="max-h-[calc(100vh-280px)] divide-y divide-zinc-200 overflow-y-auto dark:divide-zinc-800">
                {contacts.map((contact) => (
                  <button
                    key={contact._id}
                    onClick={() => setSelected(contact)}
                    className={`w-full px-4 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                      selected?._id === contact._id ? "bg-[#2E86A7]/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                          {contact.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {contact.subject}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-zinc-400">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-zinc-400">
                      {contact.email}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {selected.subject}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      From:{" "}
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {selected.name}
                      </span>{" "}
                      &lt;{selected.email}&gt;
                    </p>
                    <p className="text-xs text-zinc-400">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <a
                    href={`mailto:${
                      selected.email
                    }?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="rounded-lg bg-[#2E86A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#2E86A7]/90"
                  >
                    Reply
                  </a>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                  <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                    {selected.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-center">
                  <CheckCircleIcon className="mx-auto mb-2 h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                  <p className="text-sm text-zinc-500">
                    Select a message to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
