"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, FolderOpen, Briefcase, User, Settings } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: "/dashboard/feed", label: "Feed", icon: Home },
    { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
    { href: "/dashboard/resources", label: "Resources", icon: FolderOpen },
    { href: "/dashboard/vacancies", label: "Vacancies", icon: Briefcase },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-black flex flex-col">
        <div className="p-6 border-b border-black">
          <Link href="/">
            <h1 className="text-2xl font-bold">FreelanceConnect</h1>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 mb-1 border border-black transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-black">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 border border-black bg-white flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium text-sm">{session?.user?.name || "Guest User"}</p>
              <p className="text-xs text-gray-600">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}