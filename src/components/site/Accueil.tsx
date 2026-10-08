import { Methode } from "./Methode";
import { Gift } from "lucide-react";
import Link from "next/link";
import { BandeLogos } from "@/components/site/BandeLogos";
import { BentoServices } from "@/components/site/BentoServices";
import { DemoOfferte } from "@/components/site/DemoOfferte";
import { MotTournant } from "@/components/site/MotTournant";
import { HeroVisuel } from "@/components/site/HeroVisuel";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Faq, type QR } from "@/components/site/Faq";
import { JsonLd } from "@/components/site/JsonLd";
import { APropos, BandeauPrimaps, Fleche, ProjetsPhares } from "@/components/site/Sections";
import { faq, graphe } from "@/lib/schema";
import { SITE } from "@/lib/site";



const QUESTIONS: QR[] = [
  {
    q: "La démo est-elle vraiment gratuite ?",
    r: "Oui. Vous me présentez votre activité et je crée une vraie démo de votre futur site, en ligne, à votre nom, avec vos textes, vos photos et vos couleurs. Vous la testez sur votre téléphone et votre ordinateur. Si elle vous plaît, je vous envoie un devis détaillé pour la finaliser. Sinon, vous ne payez rien et vous n'êtes engagé à rien.",
  },
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
    q: "Mon entreprise peut-elle être recommandée par ChatGPT ?",
    r: "Oui. De plus en plus de clients demandent directement à ChatGPT, Gemini ou à l'IA de Google « quel professionnel me conseilles-tu ? ». Ces assistants répondent à partir de ce qu'ils trouvent sur le web : votre site, votre fiche Google, vos avis. Je les rends clairs, complets et cohérents pour que l'IA vous connaisse et puisse vous citer. C'est ce qu'on appelle le GEO, le référencement pour les IA.",
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
            <h1 className="h1 mt-6 !text-[clamp(2.25rem,4.9vw,4.3rem)]">
              Des sites qui <br />
              <MotTournant mots={["vendent", "attirent", "rapportent", "convertissent", "se démarquent"]} />,{" "}
              <br />
              <span className="whitespace-nowrap">conçus sur-mesure.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Je crée des boutiques en ligne Shopify et des sites vitrine pour les entreprises qui veulent plus de clients,
              du design jusqu&apos;au référencement sur Google et ChatGPT.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link href="/demo-gratuite" className="btn btn-primary !min-h-[56px] !px-7 !text-[16.5px]">
                <Gift className="h-[18px] w-[18px]" aria-hidden="true" />
                Recevoir ma démo gratuite
              </Link>
            </div>

            <nav aria-label="Services" className="mt-7 flex flex-wrap items-center gap-2.5 text-[14.5px]">
              {[
                { href: "/creation-site-e-commerce", label: "Site e-commerce", couleur: "violet" },
                { href: "/creation-site-vitrine", label: "Site vitrine", couleur: "vert" },
                { href: SITE.primaps, label: "Restaurant ? Primaps", couleur: "google" },
              ].map((l) => (
                <Link key={l.href} href={l.href} data-couleur={l.couleur} className="lien-service group">
                  <span className="lien-service-point" aria-hidden="true" />
                  {l.label}
                  <Fleche className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <HeroVisuel />
        </div>

      </section>

      <BandeLogos />


      <DemoOfferte />

      <BentoServices />

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
