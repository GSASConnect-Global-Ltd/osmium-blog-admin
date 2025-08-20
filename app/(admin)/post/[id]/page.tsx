"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";

export default function SinglePostPage() {
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
          images: (data.images || []).map(
            (img: string | null) => (img ? `https://osmium-blog-admin-backend.onrender.com${img}` : null)
          ),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-black text-lg">Loading post...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => router.push("/post")}
        className="text-sm border border-black text-black px-3 py-2 rounded-md hover:bg-black hover:text-white transition mb-6"
      >
        Back to Posts
      </button>

      <h1 className="text-4xl font-bold text-black mb-4">{post.title}</h1>

      {/* Metadata */}
      <div className="text-sm text-black/50 mb-6 flex flex-wrap gap-4">
        <span>By {post.author}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>Category: {post.category}</span>
      </div>

      {/* Featured Images */}
      <div className="space-y-4 mb-6">
        {post.images.map(
          (img, i) =>
            img && (
              <div key={i} className="relative w-full h-64 rounded-md overflow-hidden border border-black/10">
                <Image
                  src={img as string} // already full URL
                  alt={`Blog image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )
        )}
      </div>

      {/* Summary */}
      <p className="text-black/70 text-lg mb-6 italic">{post.summary}</p>

      {/* Full Content */}
      <div className="text-black/90 text-lg whitespace-pre-line space-y-4">
        {post.content.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
}
