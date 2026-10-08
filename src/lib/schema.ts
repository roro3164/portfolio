import { SITE } from "./site";

// Entités schema.org réutilisées : l'entreprise et son fondateur ont des @id
// stables pour que Google et les moteurs IA relient toutes les pages.
export const ID_ENTREPRISE = `${SITE.url}/#entreprise`;
export const ID_PERSONNE = `${SITE.url}/#romain`;
export const ID_SITE = `${SITE.url}/#site`;

export const entreprise = {
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": ID_ENTREPRISE,
  name: SITE.nom,
  alternateName: "Primaps by Romain DesignCode",
  url: SITE.url,
  email: SITE.email,
  image: `${SITE.url}/img/romain-photo.webp`,
  logo: `${SITE.url}/icon.png`,
  description:
    "Création de sites e-commerce (Shopify) et de sites vitrine sur-mesure, design et référencement Google. Éditeur de Primaps, l'abonnement visibilité pour les restaurants.",
  founder: { "@id": ID_PERSONNE },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.ville,
    postalCode: SITE.codePostal,
    addressRegion: SITE.region,
    addressCountry: SITE.pays,
  },
  areaServed: SITE.zones.map((z) => ({ "@type": "Place", name: z })),
  priceRange: "Sur devis",
  identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: SITE.siret.replace(/\s/g, "") },
  sameAs: Object.values(SITE.reseaux),
  knowsAbout: [
    "Création de site e-commerce",
    "Shopify",
    "Création de site vitrine",
    "Next.js",
    "Référencement naturel (SEO)",
    "Référencement local",
    "Fiche Google Business Profile",
    "Design UI/UX",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Création de site e-commerce", url: `${SITE.url}/creation-site-e-commerce` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Création de site vitrine", url: `${SITE.url}/creation-site-vitrine` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Référencement local et fiche Google", url: `${SITE.url}/referencement-local` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Primaps — abonnement visibilité pour restaurants", url: SITE.primaps } },
    ],
  },
};

export const personne = {
  "@type": "Person",
  "@id": ID_PERSONNE,
  name: SITE.fondateur,
  jobTitle: "Développeur web et designer, fondateur de Romain DesignCode et Primaps",
  url: `${SITE.url}/a-propos`,
  image: `${SITE.url}/img/romain-photo.webp`,
  worksFor: { "@id": ID_ENTREPRISE },
  homeLocation: { "@type": "Place", name: SITE.ville },
  sameAs: [SITE.reseaux.linkedin, SITE.reseaux.github, SITE.reseaux.behance],
};

export const siteWeb = {
  "@type": "WebSite",
  "@id": ID_SITE,
  url: SITE.url,
  name: SITE.nom,
  inLanguage: "fr-FR",
  publisher: { "@id": ID_ENTREPRISE },
};

export const fil = (items: { nom: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.nom,
    item: `${SITE.url}${it.url}`,
  })),
});

export const faq = (qr: { q: string; r: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: qr.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
});

export const graphe = (...noeuds: object[]) => ({
  "@context": "https://schema.org",
  "@graph": noeuds,
});
