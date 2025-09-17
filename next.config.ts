import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com', 
      'unsplash.com', 
      'randomuser.me',
      'res.cloudinary.com'
    ],
  },
};

export default nextConfig;
