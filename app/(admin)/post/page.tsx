"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import BlogPostTable from "@/components/BlogPostTable";
import { useState, useEffect } from "react";

interface BlogPostData {
  id: string;
  title: string;
  category?: string;
  summary?: string;
  author: string;
  date: string;
  readTime?: string;
  images?: string[];
}

// Backend post type
interface BackendPost {
  _id: string;
  title: string;
  category?: string;
  summary?: string;
  author: string;
  date: string;
  readTime?: string;
  images?: string[];
}

export default function BlogPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://osmium-blog-admin-backend.onrender.com/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data: BackendPost[] = await res.json();

        // Map _id to id for frontend consistency
        const mapped: BlogPostData[] = data.map((post) => ({
          id: post._id,
          title: post.title,
          category: post.category,
          summary: post.summary,
          author: post.author,
          date: post.date,
          readTime: post.readTime,
          images: post.images,
        }));

        setPosts(mapped);
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
        alert("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`https://osmium-blog-admin-backend.onrender.com/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((post) => post.id !== id));
      alert("Post deleted successfully.");
    } catch (error) {
      console.error("❌ Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  if (loading) {
    return <p className="text-center text-black/60">Loading posts...</p>;
  }

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
