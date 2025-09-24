"use client";

import { FileText, Plus, Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  summary?: string;
  author?: string;
  date?: string;
  images?: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const [stats, setStats] = useState<{
    totalPosts: number;
    totalAuthors: number;
    totalCategories: number;
  } | null>(null);

  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // ✅ Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://osmium-blog-admin-backend.onrender.com/api/blogs/dashboard",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ✅ Fetch recent posts
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(
          "https://osmium-blog-admin-backend.onrender.com/api/blogs/recent",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch recent posts");
        const data = await res.json();
        setRecentPosts(data);
      } catch (err) {
        console.error("❌ Error fetching recent posts:", err);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecent();
  }, []);

  const statCards = [
    {
      title: "Total Posts",
      value: stats?.totalPosts ?? 0,
      icon: FileText,
      description: "Published blog posts",
    },
    {
      title: "Authors",
      value: stats?.totalAuthors ?? 0,
      icon: Users,
      description: "Active authors",
    },
    {
      title: "Categories",
      value: stats?.totalCategories ?? 0,
      icon: Eye,
      description: "Post categories",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-500">
          Welcome {user?.id ? `User ${user.id}` : "to your blog administration panel"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {loading ? (
          <p className="text-neutral-500">Loading stats...</p>
        ) : (
          statCards.map((stat) => (
            <div
              key={stat.title}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-sm font-medium text-neutral-500">
                  {stat.title}
                </h3>
                <stat.icon className="h-5 w-5 text-neutral-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black">{stat.value}</div>
                <p className="text-xs text-neutral-500 mt-1">{stat.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        
{/* Quick Actions */}
<div className="p-4 space-y-3">
  <button
    className="w-full flex items-center px-4 py-2 text-white bg-black hover:bg-neutral-800 rounded-lg transition-colors"
    onClick={() => router.push("/post/create")}
  >
    <Plus className="h-4 w-4 mr-2" />
    Create New Post
  </button>

  <button
    className="w-full flex items-center px-4 py-2 border border-neutral-300 text-black rounded-lg hover:bg-neutral-100 transition-colors"
    onClick={() => router.push("/post")}
  >
    <FileText className="h-4 w-4 mr-2" />
    View All Posts
  </button>

  {/* ✅ Add New User */}
  <button
    className="w-full flex items-center px-4 py-2 border border-neutral-300 text-black rounded-lg hover:bg-neutral-100 transition-colors"
    onClick={() => router.push("/user/create")}
  >
    <Users className="h-4 w-4 mr-2" />
    Add New User
  </button>

  {/* ✅ Hiring Dashboard */}
  <button
    className="w-full flex items-center px-4 py-2 border border-neutral-300 text-black rounded-lg hover:bg-neutral-100 transition-colors"
    onClick={() => router.push("/hiring")}
  >
    <Users className="h-4 w-4 mr-2" />
    Hiring Dashboard
  </button>

  {/* ✅ Applicants Dashboard */}
  <button
    className="w-full flex items-center px-4 py-2 border border-neutral-300 text-black rounded-lg hover:bg-neutral-100 transition-colors"
    onClick={() => router.push("/applicant")}
  >
    <Eye className="h-4 w-4 mr-2" />
    Applicants Dashboard
  </button>
</div>


        {/* ✅ Recent Posts */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div className="border-b border-neutral-200 p-4">
            <h2 className="font-semibold text-black">Recent Posts</h2>
          </div>
          <div className="p-4 space-y-3">
            {loadingRecent ? (
              <p className="text-neutral-500 text-sm">Loading recent posts...</p>
            ) : recentPosts.length === 0 ? (
              <p className="text-neutral-500 text-sm">No posts available yet.</p>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition cursor-pointer"
                  onClick={() => router.push(`/post/${post._id}`)}
                >
                  <h3 className="font-medium text-black">{post.title}</h3>
                  <p className="text-sm text-neutral-500">
                    {post.summary ? post.summary.slice(0, 80) + "..." : "No summary available"}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    By {post.author || "Unknown"} • {post.date || "N/A"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
