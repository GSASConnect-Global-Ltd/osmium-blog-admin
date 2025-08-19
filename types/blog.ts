export interface BlogPost {
  id?: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  images: (string | File | null)[]; // array of image URLs or File objects
}

// Type from backend (MongoDB)
export interface BlogPostBackend {
  _id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  images: string[]; // array of URLs
}
