"use client";

import BlogPostForm from "@/components/BlogPostForm";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog";

export default function NewPost() {
  const router = useRouter();

  const handleCreatePost = async (data: BlogPost) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("summary", data.summary);
      formData.append("author", data.author);
      formData.append("date", data.date);
      formData.append("readTime", data.readTime);
      formData.append("category", data.category);

      // Append images (3 slots)
      data.images.forEach((img, i) => {
        if (img) formData.append("images", img);
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create post");
      }

      const newPost = await res.json();
      router.push(`/post/${newPost.blog._id}`);
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
      else alert("Unexpected error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <BlogPostForm onSubmit={handleCreatePost} />
    </div>
  );
}
