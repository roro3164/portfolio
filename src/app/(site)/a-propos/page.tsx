import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Fil } from "@/components/site/Fil";
import { JsonLd } from "@/components/site/JsonLd";
import { Coche } from "@/components/site/Sections";
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
  { titre: "Design", items: ["Design UI/UX, maquettes Figma", "Identité visuelle et direction artistique", "Parcours pensés pour convertir"] },
  { titre: "Développement", items: ["Shopify : thèmes Liquid sur-mesure", "Next.js, React, TypeScript", "Imports, API et automatisations"] },
  { titre: "Visibilité", items: ["Référencement naturel et local", "Fiche Google et avis", "Mesure : Search Console, Analytics"] },
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
        <div className="wrap relative grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pt-14">
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
          <div className="relative mx-auto w-full max-w-[400px]">
            <Image
              src="/img/romain-photo.webp"
              alt="Portrait de Romain Mornet"
              width={1029}
              height={1324}
              priority
              sizes="(min-width: 1024px) 400px, 80vw"
              className="h-auto w-full rotate-[2deg] rounded-[22px]"
            />
          </div>
        </div>
      </section>

      <section className="section border-y border-[var(--line)] bg-[var(--bg-2)]" aria-labelledby="competences-titre">
        <div className="wrap">
          <p className="eyebrow">Compétences</p>
          <h2 id="competences-titre" className="h2 mt-4">
            Trois métiers, un seul interlocuteur.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {COMPETENCES.map((c) => (
              <div key={c.titre} className="card p-7">
                <h3 className="h3">{c.titre}</h3>
                <ul className="mt-5 space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15.5px]">
                      <Coche />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="facon-titre">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <h2 id="facon-titre" className="h2">
            Ma façon de travailler.
          </h2>
          <div className="space-y-8">
            {[
              ["Je vous parle franchement.", "Si un outil existant suffit à votre besoin, je vous le dis, même si c'est moins de travail pour moi."],
              ["Je mesure ce que je fais.", "Visites, appels, ventes, positions sur Google : chaque projet a des chiffres, et vous les voyez."],
              ["Vous restez propriétaire.", "Nom de domaine, boutique, contenus : tout est à votre nom. Vous n'êtes jamais prisonnier de votre prestataire."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-[var(--brand)] pl-6">
                <h3 className="h3">{t}</h3>
                <p className="mt-2 text-[16.5px] leading-relaxed text-[var(--muted)]">{d}</p>
              </div>
            ))}
            <Link href="/realisations" className="link inline-block">
              Voir mes réalisations
            </Link>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
