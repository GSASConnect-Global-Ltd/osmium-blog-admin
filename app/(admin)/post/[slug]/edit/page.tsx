"use client";

import { useParams, useRouter } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      router.replace("/post");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch post");

        const data = await res.json();

        const mappedPost: BlogPost = {
          slug: data.slug,
          title: data.title,
          summary: data.summary,
          author: data.author,
          date: data.date,
          content: data.content,
          category: data.category,
          images: data.images || [null, null, null],
        };

        setPost(mappedPost);
      } catch (error) {
        console.error("❌ Error fetching post:", error);
        alert("Failed to load post");
        router.replace("/post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router]);

  const handleUpdate = async (updatedData: BlogPost) => {
  if (!slug) return;

  try {
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("summary", updatedData.summary);
    formData.append("author", updatedData.author);
    formData.append("date", updatedData.date);
    formData.append("content", updatedData.content);
    formData.append("category", updatedData.category);

    updatedData.images.forEach((img) => {
      if (img instanceof File) formData.append("images", img);
    });

    const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update post");
    }

    // ✅ Wait for backend to return updated post
    const updatedPost = await res.json();

    alert("Post updated successfully");

    // ✅ Use new slug from backend response
    router.push(`/post/${updatedPost.slug}`);
  } catch (error) {
    console.error("❌ Error updating post:", error);
    if (error instanceof Error) alert(error.message);
    else alert("Failed to update post");
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-black text-lg">Loading post...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white">
        <BlogPostForm initialData={post} onSubmit={handleUpdate} isEditing />
      </div>
    </div>
  );
}
