"use client";

import { Edit2, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogPostData {
  id: string;
  title: string;
  category?: string;
  content?: string; // ✅ HTML content
  author: string;
  date: string;
  readTime?: string;
}

interface BlogPostTableProps {
  posts: BlogPostData[];
  onDelete: (id: string) => void;
}

export default function BlogPostTable({ posts, onDelete }: BlogPostTableProps) {
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <div className="border border-black/10 rounded-lg p-10 text-center bg-white">
        <p className="text-black/60 mb-6 text-lg">No blog posts found</p>
        <button
          onClick={() => router.push("/post/create")}
          className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-black/80 transition-colors"
        >
          Create Your First Post
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-black/10 rounded-lg p-6 bg-white hover:shadow-lg transition-all"
        >
          <div className="flex items-start justify-between">
            {/* Post Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-black truncate">
                  {post.title}
                </h3>
                {post.category && (
                  <span className="text-xs px-2 py-0.5 border border-black/20 rounded-full text-black/70">
                    {post.category}
                  </span>
                )}
              </div>

              {/* ✅ Render HTML content */}
              {post.content && (
                <div
                  className="text-black/70 mb-4 line-clamp-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}

              <div className="flex items-center gap-3 text-sm text-black/50">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.readTime && (
                  <>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-start gap-2 ml-4">
              <IconButton
                icon={<Eye className="h-4 w-4" />}
                onClick={() => router.push(`/post/${post.id}`)}
              />
              <IconButton
                icon={<Edit2 className="h-4 w-4" />}
                onClick={() => router.push(`/post/${post.id}/edit`)}
              />
              <IconButton
                icon={<Trash2 className="h-4 w-4 text-red-600" />}
                borderColor="border-red-300"
                hoverBg="hover:bg-red-50"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                    onDelete(post.id);
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IconButton({
  icon,
  onClick,
  borderColor = "border-black/20",
  hoverBg = "hover:bg-black/5",
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  borderColor?: string;
  hoverBg?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 border ${borderColor} rounded-md ${hoverBg} transition-colors`}
    >
      {icon}
    </button>
  );
}
