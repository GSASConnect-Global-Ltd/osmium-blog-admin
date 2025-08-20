import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "osmium-blog-admin-backend.onrender.com",
      },
      {
        protocol: "http",
        hostname: "localhost", // keep localhost for dev
      },
    ],
  },
};

export default nextConfig;
