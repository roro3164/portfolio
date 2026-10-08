import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutTemplate, MapPin, ShoppingBag, type LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BlocOptions } from "./Options";
import { SchemaEcommerce, SchemaReferencement, SchemaVitrine } from "./SchemasServices";
import { Fleche } from "./Sections";

// Services en 3 colonnes égales : schéma animé en haut, contenu en bas, lueur qui
// suit la souris et code couleur des services. Bande options + suivi mensuel dessous.

type Tuile = {
  href: string;
  couleur: "violet" | "vert" | "bleu";
  icone: LucideIcon;
  titre: string;
  texte: string;
  points: string[];
  schema: ReactNode;
};

const TUILES: Tuile[] = [
  {
    href: "/creation-site-e-commerce",
    couleur: "violet",
    icone: ShoppingBag,
    titre: "Site e-commerce",
    texte: "Une boutique Shopify sur-mesure, du petit catalogue à plus de 10 000 produits synchronisés.",
    points: ["Shopify sur-mesure", "Catalogue synchronisé", "SEO produit"],
    schema: <SchemaEcommerce />,
  },
  {
    href: "/creation-site-vitrine",
    couleur: "vert",
    icone: LayoutTemplate,
    titre: "Site vitrine",
    texte: "Un site rapide et à votre image, pensé pour obtenir des appels et des demandes de devis.",
    points: ["Design sur-mesure", "Réservation, rendez-vous", "Rapide sur mobile"],
    schema: <SchemaVitrine />,
  },
  {
    href: "/referencement-local",
    couleur: "bleu",
    icone: MapPin,
    titre: "Référencement local",
    texte: "Fiche Google, avis et pages locales pour passer devant vos concurrents dans votre ville.",
    points: ["Fiche Google optimisée", "Avis et pages par ville", "Suivi des positions"],
    schema: <SchemaReferencement />,
  },
];

export function BentoServices() {
  return (
    <section className="section" aria-labelledby="services-titre">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">Services</p>
          <h2 id="services-titre" className="h2 mt-4">
            Un site pensé pour rapporter des clients, pas seulement pour être joli.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TUILES.map((t) => {
            const Icone = t.icone;
            return (
              <div key={t.href} data-couleur={t.couleur} className="reveal relative rounded-[26px]">
                <Link href={t.href} className="group tuile relative flex h-full flex-col overflow-hidden p-7">
                  <div className="relative flex h-[210px] items-center justify-center">
                    {t.schema}
                  </div>
                  <span className="icone-service relative z-10 mt-4" aria-hidden="true">
                    <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <div className="relative z-10 flex flex-1 flex-col">
                    <h3 className="mt-5 text-[1.6rem] font-bold leading-tight tracking-tight">{t.titre}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-white/75">{t.texte}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {t.points.map((p) => (
                        <li key={p} className="chip-teinte">
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[15px] font-semibold text-white">
                      Découvrir
                      <span className="fleche-ronde !h-8 !w-8">
                        <Fleche className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </div>
                </Link>
                <GlowingEffect spread={44} proximity={90} borderWidth={10} blur={16} className="z-10" />
                <GlowingEffect spread={44} proximity={90} borderWidth={2} className="z-10" />
              </div>
            );
          })}
        </div>

        <div className="reveal tuile tuile-neutre mt-5 p-7 md:p-9">
          <BlocOptions />
        </div>
      </div>
    </section>
  );
}
