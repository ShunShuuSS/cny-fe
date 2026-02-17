import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Disable webpack cache for Cloudflare Pages
    config.cache = false;
    return config;
  },
};

export default nextConfig;
