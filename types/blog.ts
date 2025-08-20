// C:\Next\j\project\Osmium-blog-admin\osmiumblog\types\blog.ts

export interface BlogPost {
  id?: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  content: string;
  category: string;
  images: (string | File | null)[]; // ✅ array of 3 slots
}


