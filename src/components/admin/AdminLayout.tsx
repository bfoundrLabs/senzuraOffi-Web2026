import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  MailIcon,
  BriefcaseIcon,
  UsersIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  FolderOpenIcon,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboardIcon },
  { label: "Projects", href: "/admin/projects", icon: FolderOpenIcon },
  { label: "Blogs", href: "/admin/blogs", icon: FileTextIcon },
  { label: "Contacts", href: "/admin/contacts", icon: MailIcon },
  { label: "Careers", href: "/admin/careers", icon: BriefcaseIcon },
  { label: "Applications", href: "/admin/applications", icon: UsersIcon },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setAdmin(data.admin))
      .catch(() => router.replace("/admin"));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
  };

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-200 bg-white transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-900 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
          <Link
            href="/admin/dashboard"
            className="text-lg font-bold text-zinc-900 dark:text-white"
          >
            <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
              Senzura
            </span>{" "}
            Admin
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <XIcon size={20} className="text-zinc-500" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive =
              router.pathname === item.href ||
              router.pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#2E86A7]/10 text-[#2E86A7]"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2E86A7] to-[#1F5F75] text-xs font-bold text-white">
              {(admin.name || admin.email || "A").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                {admin.name || "Admin User"}
              </p>
              <p className="truncate text-xs text-zinc-500">{admin.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOutIcon size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <MenuIcon size={20} className="text-zinc-600 dark:text-zinc-400" />
          </button>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {title}
          </h1>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
