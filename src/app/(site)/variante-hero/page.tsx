import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";

// Page de comparaison temporaire, à supprimer une fois la variante choisie.
export const metadata: Metadata = { title: "Variante A : portrait dans le hero", robots: { index: false, follow: false } };

export default function Page() {
  return <Accueil variante="hero" />;
}
