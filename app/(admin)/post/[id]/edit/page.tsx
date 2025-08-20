"use client";

import { useParams, useRouter } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.replace("/post");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`https://osmium-blog-admin-backend.onrender.com/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");

        const data = await res.json();

        const mappedPost: BlogPost = {
          id: data._id,
          title: data.title,
          summary: data.summary,
          author: data.author,
          date: data.date,
          content: data.content,
          category: data.category,
          // Convert string paths to File objects if you want to allow replacement
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
  }, [id, router]);

  const handleUpdate = async (updatedData: BlogPost) => {
    if (!id) return;

    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("summary", updatedData.summary);
      formData.append("author", updatedData.author);
      formData.append("date", updatedData.date);
      formData.append("content", updatedData.content);
      formData.append("category", updatedData.category);

      // Append images (only if it's a File object)
      updatedData.images.forEach((img) => {
        if (img instanceof File) formData.append("images", img);
      });

      const res = await fetch(`https://osmium-blog-admin-backend.onrender.com/api/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update post");
      }

      alert("Post updated successfully");
      router.push(`/post/${id}`);
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
        <BlogPostForm
          initialData={post}
          onSubmit={handleUpdate}
          isEditing
        />
      </div>
    </div>
  );
}
