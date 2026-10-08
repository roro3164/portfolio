import Image from "next/image";
import Link from "next/link";
import { ETUDES, type EtudeDeCas } from "@/content/projets";
import { SITE } from "@/lib/site";
import { Navigateur, Telephone } from "./Cadres";
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
      <circle cx="9" cy="9" r="8.25" stroke="var(--brand)" strokeWidth="1.5" />
      <path d="m5.5 9.2 2.2 2.2 4.8-4.8" stroke="var(--violet-2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

/** Une étude de cas en grand : capture desktop + mobile, chiffres, lien. */
export function ProjetPhare({ etude, inverse = false, titreNiveau = "h3" }: { etude: EtudeDeCas; inverse?: boolean; titreNiveau?: "h2" | "h3" }) {
  const Titre = titreNiveau;
  return (
    <article className="reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`relative lg:col-span-7 ${inverse ? "lg:order-2" : ""}`}>
        <Link href={`/realisations/${etude.slug}`} aria-label={`Voir l'étude de cas ${etude.nom}`} className="block transition-transform duration-500 hover:-translate-y-1">
          <Navigateur src={etude.couverture} alt={`Page d'accueil du site ${etude.nom}`} url={etude.url} />
        </Link>
        <Telephone
          src={etude.mobile}
          alt={`Le site ${etude.nom} sur mobile`}
          className={`absolute -bottom-8 hidden w-[150px] sm:block md:w-[170px] ${inverse ? "-left-4 lg:-left-8" : "-right-4 lg:-right-8"}`}
        />
      </div>
      <div className={`lg:col-span-5 ${inverse ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap gap-2">
          <span className="chip">{etude.type}</span>
          <span className="chip">
            {etude.secteur} · {etude.ville}
          </span>
        </div>
        <Titre className="mt-5 text-[2rem] font-bold leading-tight tracking-tight">{etude.nom}</Titre>
        <p className="mt-3 text-[1.15rem] leading-snug text-white">{etude.accroche}</p>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">{etude.resume}</p>
        <div className="mt-7">
          <Chiffres etude={etude} compact />
        </div>
        <Link href={`/realisations/${etude.slug}`} className="group mt-7 inline-flex items-center gap-2 font-semibold text-[var(--violet-2)]">
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
        <div className="reveal carte-laser grid items-center gap-8 p-8 [--radius:28px] md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <p className="eyebrow">Vous êtes un restaurant ?</p>
            <h2 id="primaps-titre" className="mt-4 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-tight tracking-tight">
              Pour les restaurants, il y a Primaps.
            </h2>
            <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-[var(--muted)]">
              Primaps est mon abonnement tout compris pour les restaurants : site rapide, fiche Google optimisée, avis,
              réservations et click &amp; collect sans commission. On installe tout, vous n&apos;avez rien à gérer.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a href={SITE.primaps} className="btn btn-violet w-full md:w-auto">
              Découvrir Primaps <Fleche />
            </a>
            <Link href="/realisations/bistrot-des-musees" className="text-[14.5px] text-[var(--muted)] underline-offset-4 hover:text-white hover:underline">
              Exemple : le Bistrot des Musées
            </Link>
          </div>
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
    <section className="section border-y border-[var(--line)] bg-[var(--bg-2)]" aria-labelledby="methode-titre">
      <div className="wrap">
        <p className="eyebrow">Méthode</p>
        <h2 id="methode-titre" className="h2 mt-4 max-w-2xl">
          Un seul interlocuteur, du premier appel à la mise en ligne.
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4">
          {etapes.map((e, i) => (
            <li key={e.t} className="bg-[var(--bg-2)] p-7">
              <span className="font-mono text-[13px] text-[var(--violet-2)]">0{i + 1}</span>
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
