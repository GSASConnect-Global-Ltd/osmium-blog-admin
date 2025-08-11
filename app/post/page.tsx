"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import BlogPostTable from "@/components/BlogPostTable";
import { useState } from "react";

export default function BlogPosts() {
  const router = useRouter();

  // Example static posts — replace with real data fetching later
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "My First Blog",
      category: "News",
      summary: "This is a short summary of the first post.",
      author: "John Doe",
      date: "2025-08-01",
      readTime: "5 min read",
      slug: "my-first-blog",
    },
    {
      id: "2",
      title: "Tech Trends 2025",
      category: "Tech",
      summary: "This is a short summary of the second post.",
      author: "Jane Smith",
      date: "2025-08-05",
      readTime: "8 min read",
      slug: "tech-trends-2025",
    },
  ]);

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
    alert("Post deleted successfully.");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-black/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">Blog Posts</h1>
          <p className="text-black/60 text-sm">Manage and organize your blog content</p>
        </div>
        <button
          onClick={() => router.push("/post/create")}
          className="flex items-center px-5 py-2.5 bg-black text-white rounded-md font-medium hover:bg-black/80 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </button>
      </div>

      {/* Blog Post Table */}
      <BlogPostTable posts={posts} onDelete={handleDelete} />
    </div>
  );
}
