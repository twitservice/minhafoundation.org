import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: false,

  allowedDevOrigins: [
    '*',
    'localhost:3000',
    '127.0.0.1:3000',
  ],

  // experimental features removed - turbo config caused type errors and is no longer needed
  experimental: {},

  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "flagcdn.com",
    //   },

    //   // Local backend for development
    //   // {
    //   //   protocol: "http",
    //   //   hostname: "localhost",
    //   //   port: "8000",
    //   //   pathname: "/storage/**",
    //   // },
    //   // Add your production backend domain when deployed
    //   // {
    //   //   protocol: "https",
    //   //   hostname: "your-production-domain.com",
    //   //   pathname: "/storage/**",
    //   // },
    // ],
  },


};

export default nextConfig;
