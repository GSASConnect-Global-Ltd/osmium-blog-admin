"use client";

import { BlogSidebar } from "./BlogSidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white text-black">
      {/* Sidebar */}
      <div className="lg:group">
        <BlogSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-black/10 flex items-center justify-between px-6 bg-white">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-black/10"
          >
            <Menu className="h-6 w-6" />
          </button>

          <h1 className="text-2xl font-bold">Blog Management</h1>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}   
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
