import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "img.clerk.com"
      }
    ]
  },
  // Updated for Next.js 15
  serverExternalPackages: ["@liveblocks/node"],
};

export default nextConfig;
