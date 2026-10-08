import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Fil } from "@/components/site/Fil";
import { JsonLd } from "@/components/site/JsonLd";
import { PortraitSplit } from "@/components/site/PortraitSplit";
import { Coche, Fleche } from "@/components/site/Sections";
import { BarChart3, Code2, KeyRound, MapPin, MessageCircle, PenTool } from "lucide-react";
import { fil, graphe, ID_PERSONNE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Romain Mornet, développeur et designer web à Montpellier",
  description:
    "Romain Mornet, fondateur de Romain DesignCode et Primaps : développeur full-stack et designer UI/UX à Montpellier, spécialiste Shopify et SEO local.",
  alternates: { canonical: "/a-propos" },
};

const ariane = [
  { nom: "Accueil", url: "/" },
  { nom: "À propos", url: "/a-propos" },
];

const COMPETENCES = [
  { titre: "Design", couleur: "rose", icone: PenTool, items: ["Design UI/UX, maquettes Figma", "Identité visuelle et direction artistique", "Parcours pensés pour convertir"] },
  { titre: "Développement", couleur: "violet", icone: Code2, items: ["Shopify : thèmes Liquid sur-mesure", "Next.js, React, TypeScript", "Imports, API et automatisations"] },
  { titre: "Visibilité", couleur: "bleu", icone: MapPin, items: ["Référencement naturel et local", "Fiche Google et avis", "Mesure : Search Console, Analytics"] },
];

export default function APropos() {
  return (
    <>
      <JsonLd
        data={graphe(
          { "@type": "ProfilePage", url: `${SITE.url}/a-propos`, name: "À propos de Romain Mornet", mainEntity: { "@id": ID_PERSONNE } },
          fil(ariane),
        )}
      />
      <section className="relative overflow-hidden">
        <div className="halo -right-40 top-20 h-[480px] w-[480px]" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1fr_1fr] lg:pt-14">
          <div>
            <Fil items={ariane} />
            <p className="eyebrow mt-10">À propos</p>
            <h1 className="h1 mt-5 !text-[clamp(2.3rem,4.6vw,3.8rem)]">
              Je m&apos;appelle Romain, et je construis des sites qui rapportent.
            </h1>
            <div className="mt-8 space-y-5 text-[17.5px] leading-relaxed text-[var(--muted)]">
              <p>
                Je suis développeur full-stack et designer UI/UX, installé à Montpellier. Sous le nom{" "}
                <strong className="text-white">Romain DesignCode</strong>, je crée des boutiques en ligne Shopify et des
                sites vitrine pour des entreprises de toute la France.
              </p>
              <p>
                Autodidacte au départ, j&apos;ai complété mon parcours par un diplôme en développement web et une
                certification en design UI/UX. Cette double casquette, c&apos;est ce qui fait la différence : la même
                personne dessine votre site, le code et le référence.
              </p>
              <p>
                En travaillant avec des restaurants, j&apos;ai vu qu&apos;ils avaient tous le même besoin : être trouvés sur
                Google sans y passer leurs soirées. J&apos;ai donc créé{" "}
                <a href={SITE.primaps} className="link">
                  Primaps
                </a>
                , un abonnement qui réunit leur site, leur fiche Google, leurs avis et leurs réservations.
              </p>
            </div>
          </div>
          <div className="relative -mx-2 sm:mx-0 lg:-mr-6">
            <PortraitSplit priority />
          </div>
        </div>
      </section>

      <section className="section bande border-y" aria-labelledby="competences-titre">
        <div className="wrap">
          <p className="eyebrow">Compétences</p>
          <h2 id="competences-titre" className="h2 mt-4">
            Trois métiers, un seul interlocuteur.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {COMPETENCES.map((c) => {
              const Icone = c.icone;
              return (
                <div key={c.titre} data-couleur={c.couleur} className="reveal carte-laser lent overflow-hidden p-0">
                  <div className="competence-apercu" aria-hidden="true">
                    {c.titre === "Design" && (
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-[40px] leading-none text-white">Aa</span>
                        <span className="flex gap-1.5">
                          {["#ec4899", "#8b5cf6", "#f6f1e9", "#2b2118", "#b35a33"].map((t) => (
                            <i key={t} className="block h-7 w-7 rounded-full ring-2 ring-white/10" style={{ background: t }} />
                          ))}
                        </span>
                      </div>
                    )}
                    {c.titre === "Développement" && (
                      <pre className="competence-code">
                        <span className="text-[#c4b5fd]">export</span> <span className="text-[#93c5fd]">function</span>{" "}
                        <span className="text-[#f9a8d4]">Boutique</span>() {"{"}
                        {"\n  "}
                        <span className="text-[#93c5fd]">return</span> &lt;<span className="text-[#86efac]">Catalogue</span>{" "}
                        <span className="text-[#fcd34d]">produits</span>={"{"}13500{"}"} /&gt;
                        {"\n}"}
                      </pre>
                    )}
                    {c.titre === "Visibilité" && (
                      <div className="competence-resultat">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#4285f4] text-[12px] font-bold text-white">1</span>
                        <span className="leading-tight">
                          <b className="block text-[13px] text-white">Votre entreprise</b>
                          <span className="text-[11.5px] text-[#fbbc04]">★★★★★</span>
                          <span className="text-[11.5px] text-white/60"> 4,9 · Ouvert</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <span className="icone-service" aria-hidden="true">
                        <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                      </span>
                      <h3 className="h3">{c.titre}</h3>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {c.items.map((it) => (
                        <li key={it} className="flex gap-3 text-[15.5px]">
                          <Coche />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="facon-titre">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Engagements</p>
            <h2 id="facon-titre" className="h2 mt-4">
              Ma façon de travailler.
            </h2>
            <p className="lead mt-5 max-w-md">
              Trois règles simples que j&apos;applique sur chaque projet, du premier échange au suivi.
            </p>
          </div>
          <div>
            <ol className="grid gap-4">
              {(
                [
                  [MessageCircle, "Je vous parle franchement.", "Si un outil existant suffit à votre besoin, je vous le dis, même si c'est moins de travail pour moi."],
                  [BarChart3, "Je mesure ce que je fais.", "Visites, appels, ventes, positions sur Google : chaque projet a des chiffres, et vous les voyez."],
                  [KeyRound, "Vous restez propriétaire.", "Nom de domaine, boutique, contenus : tout est à votre nom. Vous n'êtes jamais prisonnier de votre prestataire."],
                ] as const
              ).map(([Icone, t, d], i) => (
                <li key={t} className="reveal inclus-tuile flex gap-5" data-couleur="violet">
                  <span className="icone-service !h-11 !w-11 shrink-0" aria-hidden="true">
                    <Icone className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-mono text-[12.5px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="h3 mt-1">{t}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-[var(--muted)]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/realisations" className="group mt-8 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
              Voir mes réalisations
              <Fleche className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
