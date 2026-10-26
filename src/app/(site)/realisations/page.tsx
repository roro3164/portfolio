import type { Metadata } from "next";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Fil } from "@/components/site/Fil";
import { JsonLd } from "@/components/site/JsonLd";
import { ProjetPhare } from "@/components/site/Sections";
import { ETUDES } from "@/content/projets";
import { fil, graphe, ID_ENTREPRISE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réalisations : sites e-commerce et sites vitrine",
  description:
    "Portfolio de Romain DesignCode : boutiques Shopify (LumiNice, Maison Ribier), sites vitrine et sites de restaurants, avec les chiffres de chaque projet.",
  alternates: { canonical: "/realisations" },
};

const ariane = [
  { nom: "Accueil", url: "/" },
  { nom: "Réalisations", url: "/realisations" },
];

export default function Realisations() {
  const liste = {
    "@type": "CollectionPage",
    name: "Réalisations",
    url: `${SITE.url}/realisations`,
    about: { "@id": ID_ENTREPRISE },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: ETUDES.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}/realisations/${e.slug}`,
        name: e.nom,
      })),
    },
  };

  return (
    <>
      <JsonLd data={graphe(liste, fil(ariane))} />
      <section className="wrap pb-6 pt-10 lg:pt-14">
        <Fil items={ariane} />
        <p className="eyebrow mt-10">Réalisations</p>
        <h1 className="h1 mt-5 max-w-4xl !text-[clamp(2.3rem,4.8vw,4rem)]">Des sites livrés, des résultats mesurés.</h1>
        <p className="lead mt-6 max-w-2xl">
          Boutiques en ligne et sites vitrine : chaque projet est conçu, développé et référencé par moi. Voici les plus
          marquants, avec leurs chiffres.
        </p>
      </section>

      <section className="section !pt-16" aria-label="Études de cas">
        <div className="wrap space-y-28 lg:space-y-36">
          {ETUDES.map((e, i) => (
            <ProjetPhare key={e.slug} etude={e} inverse={i % 2 === 1} titreNiveau="h2" />
          ))}
        </div>
      </section>

      <CtaFinal titre="Votre projet pourrait être le prochain." />
    </>
  );
}
