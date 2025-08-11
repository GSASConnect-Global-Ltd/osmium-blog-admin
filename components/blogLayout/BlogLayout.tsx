"use client";

import { BlogSidebar } from "./BlogSidebar";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-white text-black">
      {/* Sidebar */}
      <BlogSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-black/10 flex items-center px-6 bg-white">
          <h1 className="text-2xl font-bold">Blog Management</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
