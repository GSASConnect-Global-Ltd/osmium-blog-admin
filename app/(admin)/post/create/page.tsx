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
      formData.append("content", data.content);
      formData.append("category", data.category);

      // Append images (3 slots)
      data.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        }
      });

      // Debugging FormData
      for (const pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log("➡️ FormData File:", pair[0], pair[1].name);
        } else {
          console.log("➡️ FormData:", pair[0], pair[1]);
        }
      }

      // POST request to create blog
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create post");
      }

      const newPost = await res.json();

      // Navigate using the blog's slug, not ID
      router.push(`/post/${newPost.blog.slug}`);
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
