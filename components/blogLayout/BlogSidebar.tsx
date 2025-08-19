"use client";

import Link from "next/link";
import { LayoutDashboard, Plus, Settings, FileText, X } from "lucide-react";

interface BlogSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "All Posts", url: "/post", icon: FileText },
  { title: "New Post", url: "/post/create", icon: Plus },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function BlogSidebar({ open, setOpen }: BlogSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full bg-white border-r border-black/10
          transition-all duration-300 ease-in-out z-50
          ${open ? "w-64" : "w-0"}
          lg:group lg:w-6 lg:hover:w-64
          overflow-hidden
        `}
      >
        {/* Sidebar Header */}
        <div className="border-b border-black/10 px-4 py-5 flex items-center justify-between">
          <h2
            className={`
              text-lg font-bold tracking-tight
              opacity-0 lg:opacity-0 ${open ? "opacity-100" : ""}
              lg:group-hover:opacity-100
              transition-opacity duration-200
            `}
          >
            Blog Admin
          </h2>

          {/* Close button on mobile */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 hover:bg-black/10 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <h3
            className={`
              text-xs uppercase font-semibold tracking-wider text-black/50 mb-3
              opacity-0 lg:opacity-0 ${open ? "opacity-100" : ""}
              lg:group-hover:opacity-100
              transition-opacity duration-200
            `}
          >
            Navigation
          </h3>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-black/70 hover:bg-black/5 hover:text-black transition-colors"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span
                    className={`
                      whitespace-nowrap
                      opacity-0 lg:opacity-0 ${open ? "opacity-100" : ""}
                      lg:group-hover:opacity-100
                      transition-opacity duration-200
                    `}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
