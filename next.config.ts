import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Fallback for older Next.js versions
    domains: [
      'images.unsplash.com', 
      'plus.unsplash.com',
      'unsplash.com', 
      'randomuser.me',
      'res.cloudinary.com',
      'localhost'
    ],
  },
};

export default nextConfig;
