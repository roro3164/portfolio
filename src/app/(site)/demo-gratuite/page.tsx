import type { Metadata } from "next";
import { DemoTablette } from "@/components/site/DemoTablette";
import { Fil } from "@/components/site/Fil";
import { FormulaireDevis } from "@/components/site/FormulaireDevis";
import { JsonLd } from "@/components/site/JsonLd";
import { fil, graphe, ID_ENTREPRISE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Démo gratuite de votre futur site, en ligne",
  description:
    "Recevez gratuitement une vraie démo de votre futur site, en ligne et à votre nom, à tester avant de décider. Site vitrine ou e-commerce, sans engagement.",
  alternates: { canonical: "/demo-gratuite" },
};

const ariane = [
  { nom: "Accueil", url: "/" },
  { nom: "Démo gratuite", url: "/demo-gratuite" },
];

const ETAPES = [
  ["Vous me présentez votre activité", "en quelques lignes : ce que vous faites, pour qui, votre site actuel si vous en avez un."],
  ["Je crée votre démo en ligne", "un vrai site, à votre nom, avec vos textes, vos photos et vos couleurs."],
  ["Vous la testez, puis vous décidez", "elle vous plaît : je vous envoie un devis détaillé pour la finaliser. Sinon, vous ne payez rien."],
];

const PROJETS_VALIDES = ["Site e-commerce", "Site vitrine", "Refonte d'un site", "Référencement local", "Restaurant (Primaps)", "Autre"];

export default async function DemoGratuite({ searchParams }: { searchParams: Promise<{ projet?: string }> }) {
  const { projet } = await searchParams;
  return (
    <>
      <JsonLd
        data={graphe(
          {
            "@type": "ContactPage",
            name: "Démo gratuite de votre futur site",
            url: `${SITE.url}/demo-gratuite`,
            about: { "@id": ID_ENTREPRISE },
            mainEntity: {
              "@type": "Offer",
              name: "Démo gratuite de votre futur site, en ligne",
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
              Recevez une <span className="grad">démo gratuite</span> de votre futur site.
            </h1>
            <p className="lead mt-6">
              Un vrai site en ligne, que vous testez sur votre téléphone avant de payer quoi que ce soit.
            </p>
            <ol className="demo-etapes mt-10 space-y-6">
              {ETAPES.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="demo-etape-num">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[16px] leading-relaxed text-[var(--muted)]">
                    <strong className="font-semibold text-white">{t}</strong> {d}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-14 hidden max-w-[460px] pl-6 lg:block">
              <DemoTablette />
            </div>
            <p className="mt-14 text-[15px] text-[var(--muted)]">
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
