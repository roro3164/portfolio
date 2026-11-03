import type { NextConfig } from "next";
import { CTA, DEMO_GRATUITE_ACTIVE } from "./src/lib/offre";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      ...(DEMO_GRATUITE_ACTIVE ? [] : [{ source: "/demo-gratuite", destination: CTA.href, permanent: true }]),
      { source: "/devis", destination: CTA.href, permanent: true },
      { source: "/maquette-gratuite", destination: CTA.href, permanent: true },
    ];
  },
};

export default nextConfig;
