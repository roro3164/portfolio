import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Moteurs de recherche et assistants IA sont les bienvenus : être lu et cité
// fait partie de la stratégie (GEO). Seules l'API et la page QR sont exclues.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/contact"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
