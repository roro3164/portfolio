import Link from "next/link";
import { Mockup } from "@/components/site/Appareils";
import { LayoutTemplate, MapPin, ShoppingBag } from "lucide-react";
import { CarteService, type Service } from "@/components/site/CarteService";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Faq, type QR } from "@/components/site/Faq";
import { JsonLd } from "@/components/site/JsonLd";
import { Options } from "@/components/site/Options";
import { APropos, BandeauPrimaps, Fleche, Methode, ProjetsPhares } from "@/components/site/Sections";
import { faq, graphe } from "@/lib/schema";
import { SITE } from "@/lib/site";


const SERVICES: Service[] = [
  {
    href: "/creation-site-e-commerce",
    couleur: "violet",
    icone: ShoppingBag,
    surtitre: "Vendre en ligne",
    titre: "Site e-commerce",
    texte: "Une boutique Shopify sur-mesure, du petit catalogue à plus de 10\u00a0000 produits.",
    points: ["Design unique à votre marque", "Catalogue importé et synchronisé", "Paiement, livraison, SEO produit"],
    visuel: { src: "/mockups/lumi-nice-macbook.webp", alt: "Boutique LumiNice sur un MacBook", w: 1864, h: 1228 },
  },
  {
    href: "/creation-site-vitrine",
    couleur: "vert",
    icone: LayoutTemplate,
    surtitre: "Être trouvé et contacté",
    titre: "Site vitrine",
    texte: "Un site rapide et à votre image, qui transforme les visiteurs en appels et en devis.",
    points: ["Design sur-mesure", "Formulaire, réservation, rendez-vous", "Rapide sur mobile"],
    visuel: { src: "/mockups/bistrot-des-musees-macbook.webp", alt: "Site du Bistrot des Musées sur un MacBook", w: 1446, h: 1228 },
  },
  {
    href: "/referencement-local",
    couleur: "bleu",
    icone: MapPin,
    surtitre: "Monter sur Google",
    titre: "Référencement local",
    texte: "Fiche Google, avis et pages locales pour passer devant vos concurrents dans votre ville.",
    points: ["Fiche Google optimisée", "Pages par ville et par service", "Suivi des positions chaque mois"],
    visuel: { src: "/mockups/imac-statistiques.webp", alt: "Tableau de statistiques de visibilité sur un iMac", w: 737, h: 720 },
  },
];

const QUESTIONS: QR[] = [
  {
    q: "Combien coûte la création d'un site ?",
    r: "Chaque projet est chiffré sur devis, car le prix dépend surtout du nombre de pages, du catalogue produits et des fonctionnalités (paiement, réservation, synchronisation fournisseurs). Le devis est gratuit, détaillé poste par poste, et vous le recevez rapidement après notre premier échange.",
  },
  {
    q: "Quelle différence entre un site vitrine et un site e-commerce ?",
    r: "Un site vitrine présente votre activité et vous apporte des contacts : appels, demandes de devis, réservations. Un site e-commerce vend directement en ligne, avec panier, paiement et livraison. Si vous hésitez, on peut commencer par un site vitrine et ajouter la boutique plus tard.",
  },
  {
    q: "Pourquoi Shopify pour l'e-commerce ?",
    r: "Shopify gère le paiement, la sécurité, l'hébergement et les mises à jour, et reste simple à utiliser au quotidien. Je développe par-dessus un thème entièrement sur-mesure, pour que votre boutique ne ressemble à aucune autre et soit bien référencée.",
  },
  {
    q: "Combien de temps faut-il pour créer un site ?",
    r: "Comptez quelques semaines pour un site vitrine, davantage pour une boutique avec un gros catalogue. Le planning exact, étape par étape, figure dans le devis, et vous validez le design avant le développement.",
  },
  {
    q: "Est-ce que mon site sera bien référencé sur Google ?",
    r: "Oui, le référencement est pris en compte dès la conception : vitesse, structure des pages, balises, données structurées, pages par ville ou par catégorie et fiche Google. Pour une refonte, les anciennes adresses sont redirigées pour ne pas perdre vos positions.",
  },
  {
    q: "Travaillez-vous uniquement à Montpellier ?",
    r: `Je suis basé à Montpellier et je travaille avec des entreprises de toute la France, à distance ou sur place selon les projets. LumiNice et Maison Ribier, par exemple, sont à Nice.`,
  },
];

export function Accueil() {
  return (
    <>
      <JsonLd data={graphe(faq(QUESTIONS))} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="halo -right-40 -top-40 h-[560px] w-[560px]" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
          <div>
            <p className="eyebrow">Développeur &amp; designer web · {SITE.ville}</p>
            <h1 className="h1 mt-6">
              Des sites qui <span className="grad">vendent</span>, conçus sur-mesure.
            </h1>
            <p className="lead mt-6 max-w-xl">
              Je crée des boutiques en ligne Shopify et des sites vitrine pour les entreprises qui veulent plus de clients,
              du design jusqu&apos;au référencement Google.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Link
                href="/creation-site-e-commerce"
                data-couleur="violet"
                className="group card flex items-center justify-between gap-4 p-5 transition-colors hover:border-[var(--line-2)] hover:bg-[var(--surface-2)]"
              >
                <span>
                  <span className="block text-[13px] text-[var(--muted)]">Je veux vendre en ligne</span>
                  <span className="mt-1 block text-[17px] font-semibold">Site e-commerce</span>
                </span>
                <Fleche className="text-[var(--accent)] transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/creation-site-vitrine"
                data-couleur="vert"
                className="group card flex items-center justify-between gap-4 p-5 transition-colors hover:border-[var(--line-2)] hover:bg-[var(--surface-2)]"
              >
                <span>
                  <span className="block text-[13px] text-[var(--muted)]">Je veux plus de contacts</span>
                  <span className="mt-1 block text-[17px] font-semibold">Site vitrine</span>
                </span>
                <Fleche className="text-[var(--accent)] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-5 text-[14.5px] text-[var(--muted)]">
              Vous êtes un restaurant ?{" "}
              <a href={SITE.primaps} className="link">
                Découvrez Primaps
              </a>
              , l&apos;abonnement tout compris.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[660px] pb-6 lg:-mr-4">
            <div className="absolute inset-x-[8%] bottom-[8%] top-[18%] -z-10 rounded-full bg-[rgba(139,92,246,0.4)] blur-[80px]" aria-hidden="true" />
            <div className="ml-[10%] mr-[6%]">
              <Mockup
                a={{ src: "/mockups/lumi-nice-macbook.webp", forme: "macbook-34", alt: "Boutique en ligne LumiNice réalisée par Romain DesignCode" }}
                sizes="(min-width: 1024px) 560px, 84vw"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[14%]">
              <Mockup a={{ src: "/mockups/maison-ribier-iphone.webp", forme: "iphone-cote", alt: "Site Maison Ribier sur iPhone" }} sizes="120px" priority />
            </div>
            <div className="absolute -bottom-2 right-0 w-[27%]">
              <Mockup a={{ src: "/mockups/bistrot-des-musees-iphone.webp", forme: "iphone-34", alt: "Site du Bistrot des Musées sur iPhone" }} sizes="200px" priority />
            </div>
          </div>
        </div>

        {/* Preuves */}
        <div className="bande border-y">
          <ul className="wrap grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            {[
              ["13 500+", "produits mis en ligne pour LumiNice"],
              ["×2", "de visibilité Google pour le Bistrot des Musées"],
              ["455", "fiches produits refaites pour Maison Ribier"],
              ["100 %", "conçu et codé par moi, sans sous-traitance"],
            ].map(([v, l]) => (
              <li key={l} className="pr-4">
                <span className="block text-[1.75rem] font-bold tracking-tight">{v}</span>
                <span className="mt-1 block text-[13.5px] leading-snug text-[var(--muted)]">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" aria-labelledby="services-titre">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h2 id="services-titre" className="h2 mt-4 max-w-3xl">
            Un site pensé pour rapporter des clients, pas seulement pour être joli.
          </h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((sv) => (
              <CarteService key={sv.href} s={sv} />
            ))}
          </div>
        </div>
      </section>

      <Options />

      <ProjetsPhares
        slugs={["lumi-nice", "maison-ribier", "bistrot-des-musees"]}
        titre="Des projets concrets, avec des chiffres."
        intro="Une boutique de 13 500 luminaires, un catalogue de lunettes de luxe, un bistrot qui double sa visibilité : voici ce que je construis."
      />

      <Methode />
      <APropos visuel="portrait" />
      <BandeauPrimaps />
      <Faq items={QUESTIONS} />
      <CtaFinal />
    </>
  );
}
