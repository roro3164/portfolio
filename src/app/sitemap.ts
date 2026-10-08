import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";
import { ETUDES } from "@/content/projets";
import { SITE } from "@/lib/site";

const MAJ = new Date("2026-10-08");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (chemin: string, priority: number, lastModified = MAJ) => ({
    url: `${SITE.url}${chemin}`,
    lastModified,
    priority,
  });
  return [
    page("/", 1),
    page("/creation-site-e-commerce", 0.9),
    page("/creation-site-vitrine", 0.9),
    page("/referencement-local", 0.9),
    page("/realisations", 0.8),
    ...ETUDES.map((e) => page(`/realisations/${e.slug}`, 0.7)),
    page("/blog", 0.7),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.6, new Date(a.maj ?? a.date))),
    page("/a-propos", 0.6),
    page("/maquette-gratuite", 0.6),
    page("/mentions-legales", 0.1),
    page("/confidentialite", 0.1),
  ];
}
