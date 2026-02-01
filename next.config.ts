// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   basePath: '/admin',
//   assetPrefix: '/admin/',
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "osmium-blog-admin-backend.onrender.com",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost", // keep localhost for dev
//       },
//     ],
//   },
//   trailingSlash: true,
// };

// export default nextConfig;

import type { NextConfig } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://orrelng.com/api';
const API_HOSTNAME = new URL(API_BASE_URL).hostname;

const nextConfig: NextConfig = {
  basePath: '/admin',
  assetPrefix: '/admin/',
  
  // ✅ Use environment variable for API hostname
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: API_HOSTNAME, // Dynamic from env
      },
      {
        protocol: "http",
        hostname: "localhost", // keep localhost for dev
      },
      // Add any other domains you need
      {
        protocol: "https",
        hostname: "orrelng.com",
      },
    ],
  },
  
  trailingSlash: true,
  
  // ✅ Add environment variables to be available at build time
  env: {
    NEXT_PUBLIC_API_BASE_URL: API_BASE_URL,
  },
};

export default nextConfig;
