import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      { source: "/devis", destination: "/demo-gratuite", permanent: true },
      { source: "/maquette-gratuite", destination: "/demo-gratuite", permanent: true },
    ];
  },
};

export default nextConfig;
