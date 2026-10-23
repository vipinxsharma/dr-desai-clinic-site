import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allowed next/image qualities: 90 doctor photos, 85 everything else (see IMAGE_SLOTS).
  images: { qualities: [85, 90] },
};

export default nextConfig;
