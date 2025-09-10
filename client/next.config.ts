import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['antd'],
  experimental: {
    optimizePackageImports: ['antd']
  }
};

export default nextConfig;
