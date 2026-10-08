import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutTemplate, MapPin, ShoppingBag, Star, type LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BlocOptions } from "./Options";
import { Fleche } from "./Sections";

// Services en 3 colonnes égales : visuel en haut, contenu en bas, lueur qui suit
// la souris et code couleur des services. Bande options + suivi mensuel dessous.

type Tuile = {
  href: string;
  couleur: "violet" | "vert" | "bleu";
  icone: LucideIcon;
  titre: string;
  texte: string;
  points: string[];
  visuel: ReactNode;
};

const CLASSEMENT = [
  ["1", "Votre entreprise", "4,9", true],
  ["2", "Concurrent", "4,3", false],
  ["3", "Concurrent", "4,1", false],
] as const;

const TUILES: Tuile[] = [
  {
    href: "/creation-site-e-commerce",
    couleur: "violet",
    icone: ShoppingBag,
    titre: "Site e-commerce",
    texte: "Une boutique Shopify sur-mesure, du petit catalogue à plus de 10 000 produits synchronisés.",
    points: ["Shopify sur-mesure", "Catalogue synchronisé", "SEO produit"],
    visuel: (
      <Image
        src="/mockups/lumi-nice-macbook.webp"
        alt="Boutique LumiNice sur MacBook"
        width={1864}
        height={1228}
        sizes="(min-width: 1024px) 300px, 60vw"
        className="absolute -right-12 top-0 w-[74%] max-w-[330px] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-2 group-hover:-translate-y-1"
      />
    ),
  },
  {
    href: "/creation-site-vitrine",
    couleur: "vert",
    icone: LayoutTemplate,
    titre: "Site vitrine",
    texte: "Un site rapide et à votre image, pensé pour obtenir des appels et des demandes de devis.",
    points: ["Design sur-mesure", "Réservation, rendez-vous", "Rapide sur mobile"],
    visuel: (
      <Image
        src="/mockups/bistrot-fernand-iphone-face.webp"
        alt="Site du Bistrot Fernand sur iPhone"
        width={888}
        height={1760}
        sizes="160px"
        className="absolute -top-3 right-8 w-[30%] max-w-[118px] rotate-[8deg] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[4deg]"
      />
    ),
  },
  {
    href: "/referencement-local",
    couleur: "bleu",
    icone: MapPin,
    titre: "Référencement local",
    texte: "Fiche Google, avis et pages locales pour passer devant vos concurrents dans votre ville.",
    points: ["Fiche Google optimisée", "Avis et pages par ville", "Suivi des positions"],
    visuel: (
      <div className="absolute -right-6 top-1 w-[70%] max-w-[270px] space-y-2 transition-transform duration-700 group-hover:-translate-x-2" aria-hidden="true">
        {CLASSEMENT.map(([n, nom, note, moi]) => (
          <div
            key={n}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13.5px] ${
              moi ? "bg-[rgba(59,130,246,0.9)] text-white shadow-[0_10px_28px_-8px_rgba(59,130,246,0.9)]" : "bg-white/[0.06] text-white/55"
            }`}
          >
            <span className="font-bold">{n}</span>
            <span className="flex-1 truncate font-medium">{nom}</span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />
              {note}
            </span>
          </div>
        ))}
      </div>
    ),
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
                  <div className="relative min-h-[190px]">
                    <span className="icone-service relative z-10" aria-hidden="true">
                      <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                    </span>
                    {t.visuel}
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col">
                    <h3 className="text-[1.6rem] font-bold leading-tight tracking-tight">{t.titre}</h3>
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
