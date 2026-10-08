import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [{ source: "/devis", destination: "/maquette-gratuite", permanent: true }];
  },
};

export default nextConfig;
