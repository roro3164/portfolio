"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { HubProjectPile } from "./HubProjectPile";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatches(m.matches);
    const handler = () => setMatches(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

interface SiteData {
  imageProject: string;
  logoProject: string;
  title: string;
  url?: string;
}

interface CategoryConfig {
  title: string;
  metiers: string[];
  sites: (SiteData & { imageScale?: number; isPlaceholder?: boolean; metier: string })[];
}

/** Mapping establishment_name (URL) → { categoryIndex, siteIndexToPutFirst } */
const ESTABLISHMENT_TO_CARD: Record<string, { categoryIndex: number; siteIndex: number }> = {
  // Beauté & Bien-être
  Coiffeur: { categoryIndex: 0, siteIndex: 0 },
  Barber: { categoryIndex: 0, siteIndex: 2 },
  Barbershop: { categoryIndex: 0, siteIndex: 2 },
  Esthéticienne: { categoryIndex: 0, siteIndex: 0 },
  Institut: { categoryIndex: 0, siteIndex: 0 },
  // Restauration
  Restaurant: { categoryIndex: 1, siteIndex: 0 },
  "Restaurant de sushis": { categoryIndex: 1, siteIndex: 0 },
  Pizza: { categoryIndex: 1, siteIndex: 0 },
  Snack: { categoryIndex: 1, siteIndex: 0 },
  Crêperie: { categoryIndex: 1, siteIndex: 0 },
  Boulanger: { categoryIndex: 1, siteIndex: 0 },
  Traiteur: { categoryIndex: 1, siteIndex: 0 },
  Pâtissier: { categoryIndex: 1, siteIndex: 1 },
  // Bâtiment
  Plombier: { categoryIndex: 2, siteIndex: 0 },
  Électricien: { categoryIndex: 2, siteIndex: 0 },
  Peintre: { categoryIndex: 2, siteIndex: 0 },
  Menuisier: { categoryIndex: 2, siteIndex: 0 },
  Carreleur: { categoryIndex: 2, siteIndex: 0 },
  Artisanat: { categoryIndex: 2, siteIndex: 0 },
};

function reorderSitesWithFirst<T>(sites: T[], firstIndex: number): T[] {
  if (firstIndex <= 0 || firstIndex >= sites.length) return sites;
  const first = sites[firstIndex];
  const rest = sites.filter((_, i) => i !== firstIndex);
  return [first, ...rest];
}

const CATEGORIES: CategoryConfig[] = [
  {
    title: "Beauté & Bien-être",
    metiers: ["Coiffeur", "Barber", "Esthéticienne", "Institut"],
    sites: [
      {
        imageProject: "/image/projectsContact/salonBeauté.png",
        logoProject: "/image/projectsContact/logoSalonBeauté.png",
        title: "Salon Beauté",
        url: "https://client-salon-beaute-backup-8vldcj6zj-romains-projects-72d8cf83.vercel.app/",
        metier: "Coiffeur",
      },
      {
        imageProject: "/image/projectsContact/InstantCoiffure.png",
        logoProject: "/image/projectsContact/logoInstantCoiffure.png",
        title: "Instant Coiffure",
        url: "https://client-instant-coiffure-backup.vercel.app/",
        metier: "Coiffeur",
      },
      {
        imageProject: "/image/projectsContact/barbershop.png",
        logoProject: "/image/projectsContact/logoBarber.svg",
        title: "Barbershop",
        url: "https://client-barber-shop-backup.vercel.app/",
        metier: "Barber",
      },
    ],
  },
  {
    title: "Restauration et alimentation",
    metiers: ["Restaurant", "Pizza", "Snack", "Crêperie", "Pâtissier", "Boulanger", "Traiteur"],
    sites: [
      {
        imageProject: "/image/projectsContact/fujiSushis.png",
        logoProject: "/image/projectsContact/logoFujiSushi.png",
        title: "Fuji Sushis",
        url: "https://client-fuji-sushis-backup-n7ekhf180-romains-projects-72d8cf83.vercel.app/",
        metier: "Restaurant de sushis",
      },
      {
        imageProject: "/image/projectsContact/eclatGourmnd.png",
        logoProject: "/image/projectsContact/eclatGourmnd.png",
        title: "Éclat Gourmand",
        url: "https://client-adolfina-aguero-patisserie-b.vercel.app/",
        metier: "Pâtissier",
      },
    ],
  },
  {
    title: "Bâtiment et artisanat",
    metiers: ["Plombier", "Électricien", "Peintre", "Menuisier", "Carreleur", "Nettoyage"],
    sites: [
      {
        imageProject: "/image/projectsContact/bioProprete.png",
        logoProject: "/image/projectsContact/bioProprete.png",
        title: "BioPropreté",
        url: "https://client-mdf-propret-backup.vercel.app/",
        metier: "Nettoyage",
      },
    ],
  },
];

function getEstablishmentMatch(establishmentName: string | null): { categoryIndex: number; siteIndex: number } | null {
  if (!establishmentName || typeof establishmentName !== "string") return null;
  const trimmed = establishmentName.trim();
  if (!trimmed) return null;
  const key = Object.keys(ESTABLISHMENT_TO_CARD).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase()
  );
  return key ? ESTABLISHMENT_TO_CARD[key] : null;
}

export function HubMesSites() {
  const isColumn = !useMediaQuery("(min-width: 1200px)");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [urlMatch, setUrlMatch] = useState<{ categoryIndex: number; siteIndex: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const establishmentName = params.get("establishment_name");
    const match = getEstablishmentMatch(establishmentName);
    if (match) {
      setUrlMatch(match);
      setActiveCategoryIndex(match.categoryIndex);
    }
  }, []);

  const currentCategory = CATEGORIES[activeCategoryIndex];

  const getSitesForCategory = (categoryIndex: number, sites: typeof currentCategory.sites) => {
    if (!urlMatch || urlMatch.categoryIndex !== categoryIndex) return sites;
    return reorderSitesWithFirst(sites, urlMatch.siteIndex);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="w-full text-white p-4 pt-0 -mt-4 overflow-x-hidden"
    >
      <div className="flex items-center justify-center gap-2 mb-4 xl1200:mb-6 mt-16 xl1200:mt-0">
        <Globe className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white" strokeWidth={2} aria-hidden />
        <h3 className="text-center text-white font-jakarta font-bold text-xl sm:text-2xl lg:text-3xl">
          Mes dernières réalisations
        </h3>
      </div>

      {isColumn ? (
        <>
          <div className="flex justify-center gap-1 sm:gap-2 mb-2 overflow-x-auto pb-2">
            {CATEGORIES.map((category, index) => (
              <button
                key={category.title}
                type="button"
                onClick={() => setActiveCategoryIndex(index)}
                className={`px-3 py-2 rounded-lg font-jakarta text-sm font-medium transition-all flex flex-col items-center leading-tight ${
                  index === activeCategoryIndex
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {category.title.split(" ").map((word, i) => (
                  <span key={i}>{word}</span>
                ))}
              </button>
            ))}
          </div>
          <div className="pt-2 overflow-visible">
          <div className="w-full overflow-visible touch-pan-y flex justify-center">
            <HubProjectPile
              key={currentCategory.title}
              sites={getSitesForCategory(activeCategoryIndex, currentCategory.sites)}
              sectorTitle={currentCategory.title}
              metiers={currentCategory.metiers}
              columnMode
            />
          </div>
        </div>
        </>
      ) : (
        <div className="grid grid-cols-1 xl1200:grid-cols-3 gap-28 xl1200:gap-10 max-w-[1400px] mx-auto justify-items-center pt-6 xl1200:pt-8">
          {CATEGORIES.map((category, index) => (
            <HubProjectPile
              key={category.title}
              sites={getSitesForCategory(index, category.sites)}
              sectorTitle={category.title}
              metiers={category.metiers}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
