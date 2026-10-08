import type { Metadata } from "next";
import { Fil } from "@/components/site/Fil";
import { FormulaireDevis } from "@/components/site/FormulaireDevis";
import { JsonLd } from "@/components/site/JsonLd";
import { fil, graphe, ID_ENTREPRISE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demander un devis gratuit pour votre site",
  description:
    "Demandez un devis gratuit pour votre site e-commerce, site vitrine ou référencement local. Réponse sous 24 h, sans engagement. Romain DesignCode, Montpellier.",
  alternates: { canonical: "/devis" },
};

const ariane = [
  { nom: "Accueil", url: "/" },
  { nom: "Demander un devis", url: "/devis" },
];

const ETAPES = [
  ["Je lis votre demande", "et je regarde votre site ou votre fiche Google si vous en avez une."],
  ["Je vous réponds sous 24 h", "avec mes questions et une première idée de solution."],
  ["Vous recevez un devis détaillé", "poste par poste, gratuit et sans engagement."],
];

const PROJETS_VALIDES = ["Site e-commerce", "Site vitrine", "Refonte d'un site", "Référencement local", "Restaurant (Primaps)", "Autre"];

export default async function Devis({ searchParams }: { searchParams: Promise<{ projet?: string }> }) {
  const { projet } = await searchParams;
  return (
    <>
      <JsonLd
        data={graphe(
          { "@type": "ContactPage", name: "Demander un devis", url: `${SITE.url}/devis`, about: { "@id": ID_ENTREPRISE } },
          fil(ariane),
        )}
      />
      <section className="relative overflow-hidden">
        <div className="halo -right-40 -top-40 h-[480px] w-[480px]" aria-hidden="true" />
        <div className="wrap relative grid gap-14 pb-24 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:pt-14">
          <div>
            <Fil items={ariane} />
            <p className="eyebrow mt-10">Devis gratuit</p>
            <h1 className="h1 mt-5 !text-[clamp(2.3rem,4.4vw,3.6rem)]">Parlons de votre projet.</h1>
            <p className="lead mt-6">Quelques lignes suffisent. Plus vous m&apos;en dites, plus ma première réponse sera précise.</p>
            <ol className="mt-10 space-y-6">
              {ETAPES.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--line-2)] text-[13px] font-bold text-[var(--violet-2)]">
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
