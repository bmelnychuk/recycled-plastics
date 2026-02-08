import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'rp-public-912943812694.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'rp-public-912943812694.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
