import type { Metadata } from "next";
import { Fil } from "@/components/site/Fil";
import { FormulaireDevis } from "@/components/site/FormulaireDevis";
import { JsonLd } from "@/components/site/JsonLd";
import { fil, graphe, ID_ENTREPRISE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Maquette de site gratuite, sans engagement",
  description:
    "Recevez gratuitement la maquette de la page d'accueil de votre futur site, à votre nom. Site vitrine ou e-commerce, sans engagement. Romain DesignCode, Montpellier.",
  alternates: { canonical: "/maquette-gratuite" },
};

const ariane = [
  { nom: "Accueil", url: "/" },
  { nom: "Maquette gratuite", url: "/maquette-gratuite" },
];

const ETAPES = [
  ["Vous me présentez votre activité", "en quelques lignes : ce que vous faites, pour qui, votre site actuel si vous en avez un."],
  ["Je dessine votre page d'accueil", "à votre nom, avec vos couleurs, vos photos et vos vrais textes."],
  ["Vous décidez, sans engagement", "si elle vous plaît, je vous envoie un devis détaillé. Sinon, vous ne payez rien."],
];

const PROJETS_VALIDES = ["Site e-commerce", "Site vitrine", "Refonte d'un site", "Référencement local", "Restaurant (Primaps)", "Autre"];

export default async function MaquetteGratuite({ searchParams }: { searchParams: Promise<{ projet?: string }> }) {
  const { projet } = await searchParams;
  return (
    <>
      <JsonLd
        data={graphe(
          {
            "@type": "ContactPage",
            name: "Maquette de site gratuite",
            url: `${SITE.url}/maquette-gratuite`,
            about: { "@id": ID_ENTREPRISE },
            mainEntity: {
              "@type": "Offer",
              name: "Maquette gratuite de la page d'accueil de votre site",
              price: "0",
              priceCurrency: "EUR",
              seller: { "@id": ID_ENTREPRISE },
            },
          },
          fil(ariane),
        )}
      />
      <section className="relative overflow-hidden">
        <div className="halo -right-40 -top-40 h-[480px] w-[480px]" aria-hidden="true" />
        <div className="wrap relative grid gap-14 pb-24 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:pt-14">
          <div>
            <Fil items={ariane} />
            <p className="eyebrow mt-10">Gratuit et sans engagement</p>
            <h1 className="h1 mt-5 !text-[clamp(2.3rem,4.4vw,3.6rem)]">
              Recevez la <span className="grad">maquette gratuite</span> de votre futur site.
            </h1>
            <p className="lead mt-6">Vous voyez votre site avant de payer quoi que ce soit. Quelques lignes suffisent pour démarrer.</p>
            <ol className="mt-10 space-y-6">
              {ETAPES.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6a5acd)] text-[14px] font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.5)]">
                    {i + 1}
                  </span>
                  <p className="text-[16px] leading-relaxed text-[var(--muted)]">
                    <strong className="font-semibold text-white">{t}</strong> {d}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[15px] text-[var(--muted)]">
              Vous préférez l&apos;e-mail ?{" "}
              <a href={`mailto:${SITE.email}`} className="link">
                {SITE.email}
              </a>
            </p>
          </div>
          <FormulaireDevis projetInitial={projet && PROJETS_VALIDES.includes(projet) ? projet : undefined} />
        </div>
      </section>
    </>
  );
}
