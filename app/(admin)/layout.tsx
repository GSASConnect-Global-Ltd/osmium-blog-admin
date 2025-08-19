"use client";

import { BlogLayout } from "@/components/blogLayout/BlogLayout";
import AuthProvider from "@/components/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <BlogLayout>{children}</BlogLayout>
    </AuthProvider>
  );
}
