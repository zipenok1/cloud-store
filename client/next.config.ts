import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['antd'],
  experimental: {
    optimizePackageImports: ['antd']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7000',
        pathname: '/static/**',
      },
    ],
  },
};

export default nextConfig;
