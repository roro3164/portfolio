// Réglage unique de l'offre « démo gratuite » : passer à true remet partout les boutons,
// les textes, la page /demo-gratuite et son entrée du plan du site (next.config.ts le lit aussi).
export const DEMO_GRATUITE_ACTIVE = false;

export const CTA = DEMO_GRATUITE_ACTIVE
  ? { href: "/demo-gratuite", court: "Ma démo gratuite", long: "Recevoir ma démo gratuite" }
  : { href: "/contact", court: "Me contacter", long: "Me contacter" };
