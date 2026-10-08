import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";

export const metadata: Metadata = {
  title: { absolute: "Création de site e-commerce et vitrine à Montpellier | Romain DesignCode" },
  description:
    "Boutiques Shopify et sites vitrine sur-mesure à Montpellier, rapides et bien référencés. Maquette de votre site offerte, sans engagement.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Accueil />;
}
