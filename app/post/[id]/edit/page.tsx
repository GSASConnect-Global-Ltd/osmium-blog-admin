"use client";

import { useParams, useRouter } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";
import { useEffect, useState } from "react";

// Local type definition for post data
type BlogPostFormData = {
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
};

// Dummy placeholder data functions — replace with your real API calls
const getPost = (id: string): BlogPostFormData | null => {
  return {
    title: "My First Blog",
    summary: "This is a summary of the blog post.",
    author: "John Doe",
    date: "2025-08-11",
    readTime: "5 min read",
    category: "Technology",
    slug: "my-first-blog",
    image: "https://example.com/image.jpg",
  };
};

const updatePost = (id: string, data: BlogPostFormData) => {
  console.log("Updating post", id, data);
  // API call would go here
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<BlogPostFormData | null>(null);

  useEffect(() => {
    if (!id) {
      router.replace("/post");
      return;
    }

    const foundPost = getPost(id);
    if (!foundPost) {
      router.replace("/post");
      return;
    }

    setPost(foundPost);
  }, [id, router]);

  const handleUpdate = (updatedData: BlogPostFormData) => {
    updatePost(id, updatedData);
    router.push("/post");
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-black text-lg">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Edit Post</h1>
          <button
            onClick={() => router.push("/post")}
            className="text-sm border border-black text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
          >
            Back to Posts
          </button>
        </div>

        {/* Form */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
          <BlogPostForm
            initialData={post}
            onSubmit={handleUpdate}
            isEditing
          />
        </div>
      </div>
    </div>
  );
}
