import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: Enable or disable React's Strict Mode
  swcMinify: true, // Use SWC for faster builds and smaller bundle sizes
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  images: {
    domains: ["yourdomain.com"], // Replace with your allowed image domains
  },
  env: {
    CUSTOM_ENV_VAR: "value", // Add your environment variables here
  },
};

export default nextConfig;
