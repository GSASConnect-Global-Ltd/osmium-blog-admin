"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
  "Technology",
  "Development",
  "Design",
  "Business",
  "Lifestyle",
  "Tutorial",
];

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

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: BlogPost) => void;
  isEditing?: boolean;
}

export default function BlogPostForm({
  initialData = {},
  onSubmit,
  isEditing = false,
}: BlogPostFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<BlogPost>({
    title: initialData.title || "",
    summary: initialData.summary || "",
    author: initialData.author || "",
    date: initialData.date || new Date().toISOString().split("T")[0],
    readTime: initialData.readTime || "",
    category: initialData.category || "",
    slug: initialData.slug || "",
    image: initialData.image || "",
  });

  const updateField = (field: keyof BlogPost, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.summary.trim() || !formData.author.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/post")}
        className="flex items-center gap-2 text-sm border border-black text-black px-3 py-2 mb-4 rounded-md hover:bg-black hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Posts
      </button>

      <h1 className="text-3xl font-bold mb-6 text-black">
        {isEditing ? "Edit Post" : "Create New Post"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 border border-black"
      >
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Title *"
            id="title"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter post title"
            required
          />

          <FormInput
            label="Author *"
            id="author"
            value={formData.author}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="Author name"
            required
          />

          <FormSelect
            label="Category"
            id="category"
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            options={CATEGORIES}
          />

          <FormInput
            label="Read Time"
            id="readTime"
            value={formData.readTime}
            onChange={(e) => updateField("readTime", e.target.value)}
            placeholder="e.g., 5 min read"
          />

          <FormInput
            label="Date"
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateField("date", e.target.value)}
          />

          <FormInput
            label="Featured Image URL"
            id="image"
            value={formData.image}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Summary */}
        <FormTextarea
          label="Summary *"
          id="summary"
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Write a brief summary of the post"
          required
        />

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-black/80 transition-colors text-sm"
          >
            {isEditing ? "Update Post" : "Create Post"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/post")}
            className="border border-black text-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* --- UI Helper Components --- */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

function FormInput({ label, id, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full border border-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

function FormSelect({ label, id, value, onChange, options }: FormSelectProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
      >
        <option value="">Select category</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

function FormTextarea({ label, id, ...props }: FormTextareaProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        rows={4}
        className="w-full border border-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
