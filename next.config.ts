import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "img.clerk.com"
      }
    ]
  },
  // Ensure proper handling of serverless functions
  experimental: {
    serverComponentsExternalPackages: ["@liveblocks/node"]
  },
  // Optimize for Vercel deployment
  swcMinify: true,
  // Handle API routes properly
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
