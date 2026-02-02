//C:\Next\j\project\Osmium-blog-admin\osmiumblog\hooks\useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("🔷 API_URL:", API_URL);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")?.trim(); // ✅ trim whitespace

      if (!token) {
        router.push("/login");
        return;
      }

      console.log("Token sent to backend:", token); // debug

      try {
        const res = await fetch(`${API_URL}/api/protected`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser({ id: data.userId });
      } catch (err) {
        console.error("Auth failed:", err);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  return { user, loading };
}
