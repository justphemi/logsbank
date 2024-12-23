import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: Enable or disable React's Strict Mode
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
};

export default nextConfig;
