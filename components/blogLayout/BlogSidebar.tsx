"use client";

import Link from "next/link";
import { LayoutDashboard, Plus, Settings, FileText } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "All Posts", url: "/post", icon: FileText },
  { title: "New Post", url: "/post/create", icon: Plus },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function BlogSidebar() {
  return (
    <aside
      className={`
        group bg-white border-r border-black/10
        transition-all duration-300 ease-in-out
        w-16 hover:w-64
        overflow-hidden
      `}
    >
      {/* Sidebar Header */}
      <div className="border-b border-black/10 px-4 py-5">
        <h2
          className={`
            text-lg font-bold tracking-tight
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          `}
        >
          Blog Admin
        </h2>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <h3
          className={`
            text-xs uppercase font-semibold tracking-wider text-black/50 mb-3
            opacity-0 group-hover:opacity-100
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
                    opacity-0 group-hover:opacity-100
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
  );
}
