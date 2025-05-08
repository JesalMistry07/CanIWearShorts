import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    ANALYTICS_API: process.env.ANALYTICS_API,
    WEATHER_API: process.env.WEATHER_API,
  },
};

export default nextConfig;
