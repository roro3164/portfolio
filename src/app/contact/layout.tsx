import type { Metadata } from "next";
import "../styles/globals.css";

// Page d'arrivée des QR codes de prospection : elle garde son ancien style
// et n'est pas indexée (elle doublonnerait l'accueil).
export const metadata: Metadata = {
  title: "Mes réalisations près de chez vous",
  robots: { index: false, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
