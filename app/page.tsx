"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Osmium Blog Admin
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your blog posts, settings, and dashboard from here.
        </p>
        <button
          onClick={handleRedirect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
