import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.satisguessry.com",
      },
    ],
    qualities: [50, 75, 100],
  },
};

export default nextConfig;
