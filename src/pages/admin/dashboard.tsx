import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileTextIcon,
  MailIcon,
  BriefcaseIcon,
  UsersIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  FolderOpenIcon,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface DashboardStats {
  projects: number;
  blogs: number;
  contacts: number;
  careers: number;
  applications: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    blogs: 0,
    contacts: 0,
    careers: 0,
    applications: 0,
  });
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects?all=true").then((r) => r.json()),
      fetch("/api/blogs?all=true").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
      fetch("/api/careers?all=true").then((r) => r.json()),
      fetch("/api/career-applications").then((r) => r.json()),
    ])
      .then(([projects, blogs, contacts, careers, applications]) => {
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          careers: Array.isArray(careers) ? careers.length : 0,
          applications: Array.isArray(applications) ? applications.length : 0,
        });
        setRecentContacts(Array.isArray(contacts) ? contacts.slice(0, 5) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderOpenIcon,
      href: "/admin/projects",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      label: "Blog Posts",
      value: stats.blogs,
      icon: FileTextIcon,
      href: "/admin/blogs",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Contact Messages",
      value: stats.contacts,
      icon: MailIcon,
      href: "/admin/contacts",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Active Careers",
      value: stats.careers,
      icon: BriefcaseIcon,
      href: "/admin/careers",
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Applications",
      value: stats.applications,
      icon: UsersIcon,
      href: "/admin/applications",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <Link key={card.label} href={card.href}>
                <div className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color}`}
                    >
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRightIcon
                      size={16}
                      className="text-zinc-400 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white">
                    {card.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{card.label}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent contacts */}
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <TrendingUpIcon size={18} className="text-[#2E86A7]" />
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                  Recent Contact Messages
                </h2>
              </div>
              <Link
                href="/admin/contacts"
                className="text-sm font-medium text-[#2E86A7] hover:underline"
              >
                View all
              </Link>
            </div>
            {recentContacts.length === 0 ? (
              <div className="p-6 text-center text-sm text-zinc-500">
                No contact submissions yet.
              </div>
            ) : (
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {recentContacts.map((contact: any) => (
                  <div
                    key={contact._id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-600 dark:bg-emerald-900/20">
                      {contact.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                        {contact.name} — {contact.subject}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {contact.email}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-zinc-400">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
