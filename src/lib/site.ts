// Identité de l'entreprise : une seule source pour les pages, le schema.org,
// le sitemap et llms.txt. Le nom, la ville et le contact doivent rester
// identiques à la fiche Google (cohérence NAP).

export const SITE = {
  url: "https://romaindesigncode.fr",
  nom: "Romain DesignCode",
  fondateur: "Romain Mornet",
  email: "romaindesigncode@gmail.com",
  ville: "Montpellier",
  region: "Occitanie",
  codePostal: "34000",
  pays: "FR",
  siren: "988 682 415",
  siret: "988 682 415 00019",
  zones: ["Montpellier", "Hérault", "Occitanie", "Nice", "Côte d'Azur", "France"],
  primaps: "https://www.primaps.fr",
  reseaux: {
    linkedin: "https://www.linkedin.com/in/romain-mornet/",
    github: "https://github.com/roro3164",
    behance: "https://www.behance.net/romainmornet",
    instagram: "https://www.instagram.com/romaindesigncode",
  },
} as const;

export const NAV = [
  { href: "/creation-site-e-commerce", label: "E-commerce" },
  { href: "/creation-site-vitrine", label: "Site vitrine" },
  { href: "/referencement-local", label: "Référencement" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
] as const;
