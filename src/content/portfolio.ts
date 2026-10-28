// Page /portfolio : version « candidature » des réalisations, pour les recruteurs.
// Les projets clients reprennent les études de cas (src/content/projets.ts).

/** Liens de candidature : un champ vide masque son bouton (rien d'inventé). */
export const CANDIDATURE = {
  cv: "",
  demoPrimaps: "https://www.primaps.fr/invite/portfolio",
};

/** Le concept de Primaps en 4 temps, avec les fonctions de l'offre (lib/marketing/formules.ts de Primaps). */
export const CONCEPT_PRIMAPS = [
  {
    titre: "Être trouvé",
    icone: "trouve",
    points: [
      "Fiche Google optimisée",
      "À jour sur Bing, Apple Plans, TripAdvisor et PagesJaunes",
      "Recommandé quand on demande à ChatGPT où manger",
      "Carte des positions sur Google Maps et suivi de la visibilité",
    ],
  },
  {
    titre: "Donner envie",
    icone: "envie",
    points: [
      "Réponses aux avis Google en moins de 48 h, aidées par l'IA",
      "Site en plusieurs langues, choisi parmi les templates",
      "Menu QR multilangue",
      "1 post par semaine sur Instagram, Facebook et la fiche Google",
    ],
  },
  {
    titre: "Remplir la salle",
    icone: "salle",
    points: [
      "Réservations sans commission",
      "Plan de salle en direct pendant le service",
      "Click & collect payé en ligne, sans commission",
      "Boutons « Réserver » et « Commander » sur la fiche Google",
    ],
  },
  {
    titre: "Faire revenir",
    icone: "revenir",
    points: [
      "Roulette au comptoir pour récolter plus d'avis",
      "Carte de fidélité dans le portefeuille du téléphone",
      "Promos, relances par e-mail et parrainage",
      "Bilan mensuel",
    ],
  },
] as const;

/** Visite du produit : un écran réel de la démo (restaurant fictif « Le Petit Kreuzberg ») par fonction. */
export const VISITE_PRIMAPS = [
  {
    id: "visibilite",
    numero: "01 · Visibilité locale",
    titre: "Où le restaurant apparaît sur Google Maps, rue par rue",
    texte:
      "Primaps interroge Google sur une grille de 49 points autour du restaurant et affiche sa position à chaque endroit, face à ses concurrents. Le restaurateur voit d'un coup d'œil où il perd des clients, avec les priorités pour remonter.",
    points: ["Grille de positions", "Classement des concurrents", "Priorités d'action"],
    src: "/portfolio/primaps/m-visibilite.webp",
    alt: "Primaps, carte des positions Google Maps autour du restaurant",
  },
  {
    id: "avis",
    numero: "02 · Fiche et avis Google",
    titre: "Répondre à chaque avis, avec l'aide de l'IA",
    texte:
      "Tous les avis Google arrivent au même endroit, ceux sans réponse en premier. L'IA propose une réponse ; le restaurateur la relit, la modifie s'il veut, et l'envoie.",
    points: ["Réponses proposées par l'IA", "Note et volume d'avis", "Fiche Google à jour"],
    src: "/portfolio/primaps/m-avis.webp",
    alt: "Primaps, réponses aux avis Google avec l'aide de l'IA",
  },
  {
    id: "site",
    numero: "03 · Site et constructeur",
    titre: "Un vrai site, modifiable au clic",
    texte:
      "Le restaurateur choisit un template, puis change chaque texte et chaque photo directement sur la page. On peut passer à un autre template en gardant tous ses contenus. Le site existe en plusieurs langues, avec le menu en QR code.",
    points: ["Éditeur visuel par blocs", "Changement de template en direct", "Plusieurs langues"],
    src: "/portfolio/clips/editeur.jpg",
    clip: "/portfolio/clips/editeur.mp4",
    alt: "Primaps, constructeur de site : clic sur un titre puis changement de template",
  },
  {
    id: "reservations",
    numero: "04 · Réservations",
    titre: "Le service du soir, table par table",
    texte:
      "Les réservations du site et de la fiche Google tombent directement sur le plan de salle : tables libres, réservées, à table ou en retard, sur la frise du service. Aucune commission par couvert.",
    points: ["Plan de salle à l'échelle", "Frise du service", "Sans commission"],
    src: "/portfolio/primaps/m-reservations.webp",
    alt: "Primaps, plan de salle des réservations pendant le service",
  },
  {
    id: "commandes",
    numero: "05 · Click & collect",
    titre: "Les commandes à emporter, payées d'avance",
    texte:
      "Le client commande et paie sur le site. En cuisine, chaque commande avance de colonne en colonne : reçue, en préparation, prête, récupérée. Là encore, sans commission.",
    points: ["Paiement en ligne", "Suivi en cuisine", "Créneaux de retrait"],
    src: "/portfolio/primaps/m-commandes.webp",
    alt: "Primaps, suivi des commandes click & collect en cuisine",
  },
  {
    id: "fidelite",
    numero: "06 · Roulette et fidélité",
    titre: "Faire revenir les clients",
    texte:
      "La carte de fidélité, à tampons ou à points, s'habille aux couleurs du métier et du restaurant, avec un aperçu en direct sur téléphone. Promos, relances par e-mail et parrainage s'y ajoutent.",
    points: ["Tampons ou points", "Habillage par métier", "Aperçu en direct"],
    src: "/portfolio/primaps/m-fidelite.webp",
    alt: "Primaps, réglages de la carte de fidélité avec aperçu sur téléphone",
  },
];

/** Cartes de fidélité (style Apple / Google Wallet) générées aux couleurs de chaque restaurant. */
export const CARTES_FIDELITE = [
  { src: "/portfolio/primaps/carte-fernand.webp", nom: "Bistrot Fernand" },
  { src: "/portfolio/primaps/carte-forno.webp", nom: "Forno Rosso" },
  { src: "/portfolio/primaps/carte-petrin.webp", nom: "Maison Pétrin" },
  { src: "/portfolio/primaps/carte-spot.webp", nom: "Le Spot" },
];

/** Clips des templates, en tête de la grille. */
export const CLIPS_TEMPLATES = [
  {
    clip: "/portfolio/clips/tpl-nina.mp4",
    src: "/portfolio/clips/tpl-nina.jpg",
    libelle: "Restaurant 1",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=nina-bonita&panel=1",
  },
  {
    clip: "/portfolio/clips/tpl-fleuriste.mp4",
    src: "/portfolio/clips/tpl-fleuriste.jpg",
    libelle: "Fleuriste 1",
    lien: "https://www.primaps.fr/preview-templates?s=fleuriste&v=fleuriste-jardin-clair&panel=1",
  },
  {
    clip: "/portfolio/clips/tpl-burger.mp4",
    src: "/portfolio/clips/tpl-burger.jpg",
    libelle: "Burger 7",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=crousti-turquoise&panel=1",
  },
];

export const STACK_PRIMAPS = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase (Postgres, RLS)",
  "Stripe",
  "Resend",
  "Vercel",
  "Sentry",
  "Tailwind CSS",
];

export const AGENCE = {
  src: "/portfolio/primaps/agence.webp",
  points: [
    "Un orchestrateur répartit chaque demande entre sept « chefs » spécialisés : produit, templates, sites clients, prospection, devis, marketing, support.",
    "Chaque chef charge des rôles métier (design, Shopify, SEO, tests…) et lance des sous-agents en parallèle pour les gros volumes.",
    "Chaque agent travaille dans son propre worktree Git, sur sa branche, et livre une pull request avec un aperçu local.",
    "Un bureau en temps réel suit les conversations, les points d'étape et les validations ; rien ne part en production sans mon accord.",
  ],
  stack: [
    "Claude Code",
    "Agents et sous-agents",
    "MCP",
    "Git worktrees",
    "Supabase Realtime",
    "Scripts Bash / Node",
  ],
};

export type Template = {
  src: string;
  libelle: string;
  style: string;
  lien: string;
};

/** Tous les templates complets du catalogue Primaps (aucune « photo en attente »), aperçu réel en lien. */
export const TEMPLATES: Template[] = [
  {
    src: "/portfolio/templates/bistro-nina-bonita.webp",
    libelle: "Restaurant 1",
    style: "Bodega andalouse",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=nina-bonita&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-fernand.webp",
    libelle: "Restaurant 2",
    style: "Bistrot vitré sombre",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=fernand&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-ecusson-sombre.webp",
    libelle: "Restaurant 3",
    style: "Bar à vins pierre et terracotta",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=ecusson-sombre&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-ecusson-clair.webp",
    libelle: "Restaurant 4",
    style: "Bistrot parisien Didone",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=ecusson-clair&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-gastro.webp",
    libelle: "Restaurant 5",
    style: "Bistronomie laiton",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=gastro&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-comedie-clair.webp",
    libelle: "Restaurant 6",
    style: "Méditerranéen sable et ocre",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=comedie-clair&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-burger5.webp",
    libelle: "Restaurant 7",
    style: "Grill kraft et fumée",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=burger5&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-oriental2riad.webp",
    libelle: "Restaurant 8",
    style: "Riad en arches",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=oriental2riad&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-berlinois.webp",
    libelle: "Restaurant 9",
    style: "Classique vert forêt et or",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=berlinois&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-coffee-premium.webp",
    libelle: "Coffee shop 1",
    style: "Coffee shop premium",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=coffee-premium&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-whiskey.webp",
    libelle: "Bar 1",
    style: "Saloon whiskey",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=whiskey&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-asian-izakaya.webp",
    libelle: "Asiatique 1",
    style: "Izakaya laque et or",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=asian-izakaya&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-asia-sushi.webp",
    libelle: "Asiatique 2",
    style: "Sushi bar en scène",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=asia-sushi&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-asia-izakaya.webp",
    libelle: "Asiatique 3",
    style: "Izakaya de nuit, lanternes",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=asia-izakaya&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-asia-zen.webp",
    libelle: "Asiatique 4",
    style: "Table japonaise épurée",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=asia-zen&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-asian-zen.webp",
    libelle: "Asiatique 5",
    style: "Zen washi et vermillon",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=asian-zen&panel=1",
  },
  {
    src: "/portfolio/templates/bistro-asian-wok.webp",
    libelle: "Asiatique 6",
    style: "Wok terracotta",
    lien: "https://www.primaps.fr/preview-templates?s=bistro&v=asian-wok&panel=1",
  },
  {
    src: "/portfolio/templates/pizzeria-forno-sombre.webp",
    libelle: "Pizzeria 2",
    style: "Feu de bois nocturne",
    lien: "https://www.primaps.fr/preview-templates?s=pizzeria&v=forno-sombre&panel=1",
  },
  {
    src: "/portfolio/templates/snack-snack-pop.webp",
    libelle: "Snack 1",
    style: "Pop solaire",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=snack-pop&panel=1",
  },
  {
    src: "/portfolio/templates/snack-kebab2.webp",
    libelle: "Snack 2",
    style: "Kebab charbon et laiton",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=kebab2&panel=1",
  },
  {
    src: "/portfolio/templates/snack-oriental3.webp",
    libelle: "Snack 3",
    style: "Kebab en arche",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=oriental3&panel=1",
  },
  {
    src: "/portfolio/templates/snack-oriental2snack.webp",
    libelle: "Snack 4",
    style: "Affiche street",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=oriental2snack&panel=1",
  },
  {
    src: "/portfolio/templates/snack-crousti.webp",
    libelle: "Burger 1",
    style: "Diner juke-box",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=crousti&panel=1",
  },
  {
    src: "/portfolio/templates/snack-burger2.webp",
    libelle: "Burger 2",
    style: "Béton et affiches",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=burger2&panel=1",
  },
  {
    src: "/portfolio/templates/snack-burger3.webp",
    libelle: "Burger 3",
    style: "Steakhouse noir",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=burger3&panel=1",
  },
  {
    src: "/portfolio/templates/snack-burger4.webp",
    libelle: "Burger 4",
    style: "Comptoir pastel",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=burger4&panel=1",
  },
  {
    src: "/portfolio/templates/snack-crousti-turquoise.webp",
    libelle: "Burger 7",
    style: "Smash pop turquoise",
    lien: "https://www.primaps.fr/preview-templates?s=snack&v=crousti-turquoise&panel=1",
  },
  {
    src: "/portfolio/templates/fleuriste-fleuriste-jardin-clair.webp",
    libelle: "Fleuriste 1",
    style: "Atelier crème et vert",
    lien: "https://www.primaps.fr/preview-templates?s=fleuriste&v=fleuriste-jardin-clair&panel=1",
  },
  {
    src: "/portfolio/templates/fleuriste-fleuriste-serre-sombre.webp",
    libelle: "Fleuriste 2",
    style: "Serre nocturne",
    lien: "https://www.primaps.fr/preview-templates?s=fleuriste&v=fleuriste-serre-sombre&panel=1",
  },
  {
    src: "/portfolio/templates/fleuriste-fleuriste-atelier-clair.webp",
    libelle: "Fleuriste 3",
    style: "Atelier botanique",
    lien: "https://www.primaps.fr/preview-templates?s=fleuriste&v=fleuriste-atelier-clair&panel=1",
  },
  {
    src: "/portfolio/templates/decoration-decoration-papier.webp",
    libelle: "Décoration 1",
    style: "Éditorial papier",
    lien: "https://www.primaps.fr/preview-templates?s=decoration&v=decoration-papier&panel=1",
  },
  {
    src: "/portfolio/templates/patisserie-patisserie-pop-clair.webp",
    libelle: "Pâtisserie 1",
    style: "Pop gourmand",
    lien: "https://www.primaps.fr/preview-templates?s=patisserie&v=patisserie-pop-clair&panel=1",
  },
  {
    src: "/portfolio/templates/boulangerie-boulangerie-pop-clair.webp",
    libelle: "Boulangerie 1",
    style: "Boulangerie de quartier",
    lien: "https://www.primaps.fr/preview-templates?s=boulangerie&v=boulangerie-pop-clair&panel=1",
  },
];

export const COMPETENCES = [
  {
    titre: "Front-end",
    items: [
      "React, Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS, animations (GSAP, Motion)",
      "Accessibilité, performance, responsive",
    ],
  },
  {
    titre: "Back-end & données",
    items: [
      "Supabase : Postgres, RLS, Realtime, fonctions",
      "API REST, webhooks, Stripe",
      "Imports et synchronisations d'API",
      "Tests (Vitest, Playwright), CI, Vercel",
    ],
  },
  {
    titre: "IA & automatisation",
    items: [
      "Agents IA avec Claude Code et MCP",
      "Orchestration multi-agents",
      "Génération et contrôle de contenu",
      "Automatisations planifiées (cron, Actions)",
    ],
  },
  {
    titre: "Design & e-commerce",
    items: [
      "Design UI/UX, systèmes de composants",
      "Templates de sites et maquettes",
      "Shopify : thèmes Liquid sur mesure",
      "SEO technique et local",
    ],
  },
];
