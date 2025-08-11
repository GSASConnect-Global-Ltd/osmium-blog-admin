"use client";

import BlogPostForm from "@/components/BlogPostForm";

// Match the type from BlogPostForm's props
interface BlogPost {
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
}

export default function NewPost() {
  const handleCreatePost = (data: BlogPost) => {
    console.log("New post data:", data);
    // TODO: Add API call here
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <BlogPostForm onSubmit={handleCreatePost} />
    </div>
  );
}
