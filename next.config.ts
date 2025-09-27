import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/admin',
  assetPrefix: '/admin/',
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
  trailingSlash: true,
};

export default nextConfig;
