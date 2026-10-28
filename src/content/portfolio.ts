// Page /portfolio : version « candidature » des réalisations, pour les recruteurs.
// Les projets clients reprennent les études de cas (src/content/projets.ts).

/** Liens de candidature : un champ vide masque son bouton (rien d'inventé). */
export const CANDIDATURE = {
  cv: "",
  demoPrimaps: "",
};

export type Ecran = { src: string; titre: string; texte: string };

export const ECRANS_PRIMAPS: Ecran[] = [
  { src: "/portfolio/primaps/dashboard.webp", titre: "Tableau de bord", texte: "Fiche Google, site, réservations et commandes réunis sur un seul écran." },
  { src: "/portfolio/primaps/reservations.webp", titre: "Réservations", texte: "Agenda du service et plan de salle à l'échelle, tables fusionnables." },
  { src: "/portfolio/primaps/commandes.webp", titre: "Click & collect", texte: "Commandes payées en ligne, créneaux de retrait, suivi en cuisine." },
  { src: "/portfolio/primaps/roulette.webp", titre: "Roulette", texte: "Jeu au comptoir par QR code : lots et probabilités réglés par le restaurateur." },
  { src: "/portfolio/primaps/fidelite.webp", titre: "Carte de fidélité", texte: "Tampons ou points, carte dans Apple Wallet et Google Wallet." },
  { src: "/portfolio/primaps/constructeur.webp", titre: "Constructeur de site", texte: "Éditeur visuel par blocs : chaque texte et chaque photo se modifie au clic." },
];

export const STACK_PRIMAPS = ["Next.js", "React", "TypeScript", "Supabase (Postgres, RLS)", "Stripe", "Resend", "Vercel", "Sentry", "Tailwind CSS"];

export const AGENCE = {
  src: "/portfolio/primaps/agence.webp",
  points: [
    "Un orchestrateur répartit chaque demande entre sept « chefs » spécialisés : produit, templates, sites clients, prospection, devis, marketing, support.",
    "Chaque chef charge des rôles métier (design, Shopify, SEO, tests…) et lance des sous-agents en parallèle pour les gros volumes.",
    "Chaque agent travaille dans son propre worktree Git, sur sa branche, et livre une pull request avec un aperçu local.",
    "Un bureau en temps réel suit les conversations, les points d'étape et les validations ; rien ne part en production sans mon accord.",
  ],
  stack: ["Claude Code", "Agents et sous-agents", "MCP", "Git worktrees", "Supabase Realtime", "Scripts Bash / Node"],
};

export type Template = { src: string; libelle: string; style: string; lien: string };

export const TEMPLATES: Template[] = [];

export const COMPETENCES = [
  { titre: "Front-end", items: ["React, Next.js (App Router)", "TypeScript", "Tailwind CSS, animations (GSAP, Motion)", "Accessibilité, performance, responsive"] },
  { titre: "Back-end & données", items: ["Supabase : Postgres, RLS, Realtime, fonctions", "API REST, webhooks, Stripe", "Imports et synchronisations d'API", "Tests (Vitest, Playwright), CI, Vercel"] },
  { titre: "IA & automatisation", items: ["Agents IA avec Claude Code et MCP", "Orchestration multi-agents", "Génération et contrôle de contenu", "Automatisations planifiées (cron, Actions)"] },
  { titre: "Design & e-commerce", items: ["Design UI/UX, systèmes de composants", "Templates de sites et maquettes", "Shopify : thèmes Liquid sur mesure", "SEO technique et local"] },
];
