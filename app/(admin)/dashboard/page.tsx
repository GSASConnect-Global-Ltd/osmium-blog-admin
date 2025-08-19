"use client";

import { FileText, Plus, Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth"; // still used for user info

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth(); // ✅ safe to use (layout already ensured auth)

  // Example static posts (replace with API later)
  const posts = [
    { id: 1, title: "First Post", author: "John Doe", category: "News", date: "2025-08-01" },
    { id: 2, title: "Second Post", author: "Jane Smith", category: "Tech", date: "2025-08-05" },
    { id: 3, title: "Third Post", author: "John Doe", category: "Lifestyle", date: "2025-08-07" },
    { id: 4, title: "Fourth Post", author: "Alex Brown", category: "News", date: "2025-08-10" },
  ];

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: FileText,
      description: "Published blog posts",
    },
    {
      title: "Authors",
      value: new Set(posts.map((post) => post.author)).size,
      icon: Users,
      description: "Active authors",
    },
    {
      title: "Categories",
      value: new Set(posts.map((post) => post.category).filter(Boolean)).size,
      icon: Eye,
      description: "Post categories",
    },
  ];

  const recentPosts = posts.slice(0, 3);

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
        {stats.map((stat) => (
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
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div className="border-b border-neutral-200 p-4">
            <h2 className="font-semibold text-black">Quick Actions</h2>
          </div>
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
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div className="border-b border-neutral-200 p-4">
            <h2 className="font-semibold text-black">Recent Posts</h2>
          </div>
          <div className="p-4">
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-black truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      className="text-sm text-neutral-500 group-hover:text-black transition-colors"
                      onClick={() => router.push(`/post/edit/${post.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-sm">No posts yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
