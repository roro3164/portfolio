import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";

export const metadata: Metadata = {
  title: { absolute: "Création de site e-commerce et vitrine à Montpellier | Romain DesignCode" },
  description:
    "Développeur et designer à Montpellier : boutiques Shopify et sites vitrine sur-mesure, rapides et bien référencés sur Google. Devis gratuit sous 24 h.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Accueil variante="hero" />;
}
