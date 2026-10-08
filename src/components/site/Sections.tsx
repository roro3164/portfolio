import Image from "next/image";
import Link from "next/link";
import { ETUDES, type EtudeDeCas } from "@/content/projets";
import { SITE } from "@/lib/site";
import { DuoAppareils } from "./Appareils";
import { LogoPrimaps } from "./LogoPrimaps";
import { PortraitSplit } from "./PortraitSplit";

/* Blocs partagés entre l'accueil et les pages services. */

export function Fleche({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Coche() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mt-[3px] shrink-0">
      <circle cx="9" cy="9" r="8.25" stroke="rgba(var(--l1),0.65)" strokeWidth="1.5" />
      <path d="m5.5 9.2 2.2 2.2 4.8-4.8" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chiffres({ etude, compact = false }: { etude: EtudeDeCas; compact?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] ${compact ? "" : "md:grid-cols-4"}`}>
      {etude.chiffres.map((c) => (
        <div key={c.libelle} className="bg-[var(--surface)] p-5">
          <dt className="sr-only">{c.libelle}</dt>
          <dd>
            <span className="block text-[1.9rem] font-bold leading-none tracking-tight">{c.valeur}</span>
            <span className="mt-2 block text-[13.5px] leading-snug text-[var(--muted)]">{c.libelle}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export const couleurType = (type: EtudeDeCas["type"]) => (type === "E-commerce" ? "violet" : "vert");

/** Une étude de cas en grand : capture desktop + mobile, chiffres, lien. */
export function ProjetPhare({ etude, inverse = false, titreNiveau = "h3" }: { etude: EtudeDeCas; inverse?: boolean; titreNiveau?: "h2" | "h3" }) {
  const Titre = titreNiveau;
  return (
    <article data-couleur={couleurType(etude.type)} className="reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`relative lg:col-span-7 ${inverse ? "lg:order-2" : ""}`}>
        <Link href={`/realisations/${etude.slug}`} aria-label={`Voir l'étude de cas ${etude.nom}`} className="block transition-transform duration-500 hover:-translate-y-1">
          <DuoAppareils
            ordinateur={{ ...etude.ordinateur, alt: `Site ${etude.nom} sur ordinateur` }}
            telephone={{ ...etude.telephone, alt: `Site ${etude.nom} sur mobile` }}
            telephoneAGauche={inverse}
          />
        </Link>
      </div>
      <div className={`lg:col-span-5 ${inverse ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap gap-2">
          <span className="pack-etiquette">{etude.type}</span>
          <span className="chip-teinte">
            {etude.secteur} · {etude.ville}
          </span>
        </div>
        <Titre className="mt-5 text-[2rem] font-bold leading-tight tracking-tight">{etude.nom}</Titre>
        <p className="mt-3 text-[1.15rem] leading-snug text-white">{etude.accroche}</p>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">{etude.resume}</p>
        <div className="mt-7">
          <Chiffres etude={etude} compact />
        </div>
        <Link href={`/realisations/${etude.slug}`} className="group mt-7 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
          Lire l&apos;étude de cas
          <Fleche className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function ProjetsPhares({ slugs, titre, intro }: { slugs: string[]; titre: string; intro?: string }) {
  const liste = slugs.map((s) => ETUDES.find((e) => e.slug === s)!).filter(Boolean);
  return (
    <section className="section" aria-labelledby="projets-titre">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Réalisations</p>
            <h2 id="projets-titre" className="h2 mt-4">
              {titre}
            </h2>
            {intro && <p className="lead mt-5">{intro}</p>}
          </div>
          <Link href="/realisations" className="btn btn-ghost self-start md:self-auto">
            Toutes les réalisations <Fleche />
          </Link>
        </div>
        <div className="mt-16 space-y-28 lg:mt-20 lg:space-y-36">
          {liste.map((e, i) => (
            <ProjetPhare key={e.slug} etude={e} inverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BandeauPrimaps() {
  return (
    <section className="section pt-0" aria-labelledby="primaps-titre">
      <div className="wrap">
        <div data-couleur="google" className="reveal carte-laser lent grid items-center gap-10 overflow-hidden p-7 [--radius:28px] md:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="pastilles-google" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
              Vous êtes un restaurant ?
            </p>
            <h2 id="primaps-titre" className="mt-4 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-tight tracking-tight">
              Pour les restaurants, il y a <LogoPrimaps className="ml-[0.1em]" />
            </h2>
            <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-[var(--muted)]">
              Primaps est mon abonnement tout compris pour les restaurants : site rapide, fiche Google optimisée, avis,
              réservations et click &amp; collect sans commission. On installe tout, vous n&apos;avez rien à gérer.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={SITE.primaps} className="btn btn-google">
                Découvrir Primaps <Fleche />
              </a>
              <Link href="/realisations/bistrot-des-musees" className="text-[14.5px] text-[var(--muted)] underline-offset-4 hover:text-white hover:underline">
                Exemple : le Bistrot des Musées
              </Link>
            </div>
          </div>
          <a href={SITE.primaps} aria-label="Voir le site Primaps" className="relative block transition-transform duration-500 hover:-translate-y-1">
            <DuoAppareils
              ordinateur={{ src: "/mockups/primaps-macbook.webp", forme: "macbook-34", alt: "Page d'accueil de Primaps sur un MacBook" }}
              telephone={{ src: "/mockups/primaps-iphone.webp", forme: "iphone-34", alt: "Primaps sur iPhone" }}
              sizes="(min-width: 1024px) 560px, 92vw"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Methode() {
  const etapes = [
    {
      t: "On en parle",
      d: "Un appel ou un rendez-vous pour comprendre votre activité, vos clients et ce que le site doit rapporter. Vous recevez un devis clair, poste par poste.",
    },
    {
      t: "Vous voyez avant que je code",
      d: "Je dessine les pages clés de votre site. Vous validez le design, les textes et le parcours avant le moindre développement.",
    },
    {
      t: "Je construis et je référence",
      d: "Développement, contenus, photos, catalogue produits, réglages SEO : le site est pensé pour Google dès la première ligne.",
    },
    {
      t: "En ligne, et suivi",
      d: "Mise en ligne, prise en main, puis suivi : mises à jour, nouvelles pages, mesure des résultats. Vous n'êtes jamais seul avec votre site.",
    },
  ];
  return (
    <section className="section bande border-y" aria-labelledby="methode-titre">
      <div className="wrap">
        <p className="eyebrow">Méthode</p>
        <h2 id="methode-titre" className="h2 mt-4 max-w-2xl">
          Un seul interlocuteur, du premier appel à la mise en ligne.
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.2)] md:grid-cols-2 lg:grid-cols-4">
          {etapes.map((e, i) => (
            <li key={e.t} className="bg-[rgba(21,19,31,0.92)] p-7">
              <span className="text-[15px] font-bold text-[var(--accent)]">0{i + 1}</span>
              <h3 className="h3 mt-5">{e.t}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">{e.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function APropos({ visuel = "photo" }: { visuel?: "photo" | "portrait" }) {
  return (
    <section className="section" aria-labelledby="apropos-titre">
      <div className="wrap grid items-center gap-12 md:grid-cols-[1fr_1fr] lg:gap-16">
        {visuel === "portrait" ? (
          <div className="relative mx-auto w-full max-w-[560px]">
            <PortraitSplit />
          </div>
        ) : (
        <div className="reveal relative mx-auto w-full max-w-[420px]">
          <div className="halo -inset-10" aria-hidden="true" />
          <Image
            src="/img/romain-photo.webp"
            alt="Romain Mornet, fondateur de Romain DesignCode"
            width={1029}
            height={1324}
            sizes="(min-width: 768px) 420px, 90vw"
            className="relative h-auto w-full rotate-[-2deg] rounded-[22px]"
          />
        </div>
        )}
        <div>
          <p className="eyebrow">Qui suis-je</p>
          <h2 id="apropos-titre" className="h2 mt-4">
            Romain Mornet, développeur et designer à Montpellier.
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[var(--muted)]">
            <p>
              Je conçois et je développe moi-même chaque site : le design, le code, le catalogue et le référencement. Pas
              de sous-traitance, pas d&apos;intermédiaire : vous parlez directement à la personne qui construit votre site.
            </p>
            <p>
              Autodidacte, diplômé en développement web et certifié en design UI/UX, je travaille avec Shopify pour
              l&apos;e-commerce et Next.js pour les sites sur-mesure. J&apos;ai aussi créé{" "}
              <a href={SITE.primaps} className="link">
                Primaps
              </a>
              , une plateforme qui aide les restaurants à être trouvés sur Google.
            </p>
          </div>
          <Link href="/a-propos" className="btn btn-ghost mt-8">
            Mon parcours <Fleche />
          </Link>
        </div>
      </div>
    </section>
  );
}
