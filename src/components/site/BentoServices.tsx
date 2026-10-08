import Image from "next/image";
import Link from "next/link";
import { Calendar, CreditCard, FileText, Globe, LayoutTemplate, MapPin, PenLine, ShoppingBag, Star } from "lucide-react";
import { Fleche } from "./Sections";

// Services en grille « bento » : une grande tuile e-commerce, deux tuiles
// vitrine / référencement, et une bande options + suivi mensuel. Code couleur des services.

const OPTIONS = [
  { icone: Calendar, libelle: "Réservation / RDV" },
  { icone: ShoppingBag, libelle: "Click & collect" },
  { icone: CreditCard, libelle: "Paiement en ligne" },
  { icone: Globe, libelle: "Multilingue" },
  { icone: MapPin, libelle: "Pages par ville" },
  { icone: FileText, libelle: "Pages en plus" },
  { icone: PenLine, libelle: "Rédaction" },
];

function Pied({ libelle = "Découvrir" }: { libelle?: string }) {
  return (
    <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
      {libelle}
      <span className="fleche-ronde !h-8 !w-8">
        <Fleche className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </span>
  );
}

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

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* E-commerce : grande tuile */}
          <Link href="/creation-site-e-commerce" data-couleur="violet" className="reveal group tuile relative overflow-hidden lg:col-span-7 lg:row-span-2 lg:min-h-[460px]">
            <div className="relative z-10 max-w-[400px] p-8 md:p-10">
              <span className="icone-service" aria-hidden="true">
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <h3 className="mt-6 whitespace-nowrap text-[clamp(1.9rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-tight">Site e-commerce</h3>
              <p className="mt-3 text-[16.5px] leading-relaxed text-white/75">
                Une boutique Shopify sur-mesure, du petit catalogue à plus de 10&nbsp;000 produits synchronisés.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {["Shopify sur-mesure", "Catalogue synchronisé", "SEO produit"].map((t) => (
                  <li key={t} className="chip-teinte">
                    {t}
                  </li>
                ))}
              </ul>
              <Pied />
            </div>
            <Image
              src="/mockups/lumi-nice-macbook.webp"
              alt="Boutique LumiNice sur MacBook"
              width={1864}
              height={1228}
              sizes="(min-width: 1024px) 560px, 90vw"
              className="pointer-events-none relative -mb-4 ml-auto -mr-6 w-[92%] max-w-[600px] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-1 group-hover:-translate-y-2 sm:w-[70%] lg:absolute lg:-bottom-6 lg:-right-8 lg:m-0 lg:w-[58%]"
            />
          </Link>

          {/* Site vitrine */}
          <Link href="/creation-site-vitrine" data-couleur="vert" className="reveal group tuile relative min-h-[220px] overflow-hidden lg:col-span-5">
            <div className="relative z-10 max-w-[64%] p-8">
              <span className="icone-service" aria-hidden="true">
                <LayoutTemplate className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-[1.6rem] font-bold leading-tight tracking-tight">Site vitrine</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-white/75">Rapide, à votre image, pensé pour obtenir des appels et des devis.</p>
              <Pied />
            </div>
            <Image
              src="/mockups/bistrot-fernand-iphone-face.webp"
              alt="Site du Bistrot Fernand sur iPhone"
              width={888}
              height={1760}
              sizes="180px"
              className="pointer-events-none absolute -bottom-16 right-6 w-[30%] max-w-[150px] rotate-[6deg] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[3deg]"
            />
          </Link>

          {/* Référencement local */}
          <Link href="/referencement-local" data-couleur="bleu" className="reveal group tuile relative min-h-[220px] overflow-hidden lg:col-span-5">
            <div className="relative z-10 p-8 pb-4 sm:max-w-[62%] sm:pb-8">
              <span className="icone-service" aria-hidden="true">
                <MapPin className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-[1.6rem] font-bold leading-tight tracking-tight">Référencement local</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-white/75">Fiche Google, avis et pages locales pour passer devant vos concurrents.</p>
              <Pied />
            </div>
            <div className="pointer-events-none relative mx-8 mb-8 space-y-2 transition-transform duration-700 group-hover:-translate-y-1.5 sm:absolute sm:bottom-8 sm:right-6 sm:m-0 sm:w-[34%] sm:max-w-[200px]" aria-hidden="true">
              {[
                ["1", "Votre entreprise", "4,9", true],
                ["2", "Concurrent", "4,3", false],
                ["3", "Concurrent", "4,1", false],
              ].map(([n, nom, note, moi]) => (
                <div
                  key={n as string}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] ${
                    moi ? "bg-[rgba(59,130,246,0.9)] text-white shadow-[0_8px_24px_-6px_rgba(59,130,246,0.8)]" : "bg-white/[0.06] text-white/55"
                  }`}
                >
                  <span className="font-bold">{n}</span>
                  <span className="flex-1 truncate font-medium">{nom}</span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" />
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </Link>

          {/* Options + suivi mensuel */}
          <div className="reveal tuile tuile-neutre grid gap-8 p-8 lg:col-span-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="text-[15px] font-semibold text-white">À la carte, selon votre activité</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {OPTIONS.map(({ icone: Icone, libelle }) => (
                  <li key={libelle} className="option-violette !py-2 !text-[13px]">
                    <Icone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                    {libelle}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-[15px] font-semibold text-white">Suivi mensuel, sans engagement</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">
                Maintenance, hébergement, publications Google, réponses aux avis et petites modifications : je m&apos;occupe de
                votre site toute l&apos;année.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
