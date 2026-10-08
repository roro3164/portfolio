import { CalendarCheck, Gift, Globe, MapPin, ShoppingBag, Star, Store } from "lucide-react";
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
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-7 ${compact ? "" : "md:grid-cols-4"}`}>
      {etude.chiffres.map((c) => (
        <div key={c.libelle} className="chiffre flex flex-col-reverse pl-4">
          <dt className="mt-1.5 text-[13.5px] leading-snug text-[var(--muted)]">{c.libelle}</dt>
          <dd className="chiffre-valeur text-[clamp(1.9rem,2.6vw,2.4rem)] font-bold leading-none tracking-tight">{c.valeur}</dd>
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
            ordinateur={{ ...etude.ordinateur, alt: `Site ${etude.nom} sur ${etude.ordinateur.forme === "ipad-paysage" ? "tablette" : "ordinateur"}` }}
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

const FONCTIONS_PRIMAPS = [
  { icone: Globe, libelle: "Site rapide à votre image", couleur: "#4285f4" },
  { icone: MapPin, libelle: "Fiche Google optimisée", couleur: "#34a853" },
  { icone: Star, libelle: "Avis clients suivis", couleur: "#fbbc04" },
  { icone: CalendarCheck, libelle: "Réservations et click & collect", couleur: "#ea4335" },
] as const;

export function BandeauPrimaps() {
  return (
    <section className="section pt-0" aria-labelledby="primaps-titre">
      <div className="wrap">
        <div data-couleur="google" className="reveal carte-laser lent relative grid items-center gap-10 overflow-hidden p-7 [--radius:28px] md:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="primaps-lueurs" aria-hidden="true" />
          <div className="relative">
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
              Mon abonnement tout compris pour les restaurants, sans commission sur vos réservations ni vos commandes. On
              installe tout, vous n&apos;avez rien à gérer.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {FONCTIONS_PRIMAPS.map(({ icone: Icone, libelle, couleur }) => (
                <li key={libelle} className="primaps-fonction" style={{ ["--g" as string]: couleur }}>
                  <span className="primaps-fonction-icone" aria-hidden="true">
                    <Icone className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  {libelle}
                </li>
              ))}
            </ul>
            <a href={SITE.primaps} className="btn btn-primaps mt-9">
              <span className="primaps-btn-logo" aria-hidden="true">
                <Store className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              Découvrir Primaps
              <span className="fleche-ronde !h-8 !w-8">
                <Fleche className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
          <div className="relative">
            <div className="primaps-carte" aria-hidden="true">
              <span className="primaps-repere" style={{ left: "14%", top: "22%", ["--g" as string]: "#ea4335" }} />
              <span className="primaps-repere" style={{ left: "78%", top: "12%", ["--g" as string]: "#4285f4", animationDelay: "1.2s" }} />
              <span className="primaps-repere" style={{ left: "88%", top: "70%", ["--g" as string]: "#34a853", animationDelay: "2.4s" }} />
              <span className="primaps-repere" style={{ left: "6%", top: "76%", ["--g" as string]: "#fbbc04", animationDelay: "3.1s" }} />
            </div>
            <a href={SITE.primaps} aria-label="Voir le site Primaps" className="relative block transition-transform duration-500 hover:-translate-y-1">
              <DuoAppareils
                ordinateur={{ src: "/mockups/primaps-macbook.webp", forme: "macbook-34", alt: "Page d'accueil de Primaps sur un MacBook" }}
                telephone={{ src: "/mockups/primaps-iphone-face.webp", forme: "iphone-face", alt: "Primaps sur iPhone" }}
                sizes="(min-width: 1024px) 560px, 92vw"
              />
            </a>
            <div className="primaps-notif primaps-notif-1" aria-hidden="true" style={{ ["--g" as string]: "#ea4335" }}>
              <span className="primaps-notif-icone"><CalendarCheck className="h-3.5 w-3.5" /></span>
              <span><b>Nouvelle réservation</b><br />4 pers. · ce soir 20 h</span>
            </div>
            <div className="primaps-notif primaps-notif-2" aria-hidden="true" style={{ ["--g" as string]: "#fbbc04" }}>
              <span className="primaps-notif-icone"><Star className="h-3.5 w-3.5" /></span>
              <span><b>Nouvel avis</b><br /><span className="text-[#fbbc04]">★★★★★</span></span>
            </div>
            <div className="primaps-notif primaps-notif-3" aria-hidden="true" style={{ ["--g" as string]: "#34a853" }}>
              <span className="primaps-notif-icone"><ShoppingBag className="h-3.5 w-3.5" /></span>
              <span><b>Commande à emporter</b><br />0 % de commission</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function APropos({ visuel = "photo" }: { visuel?: "photo" | "portrait" }) {
  return (
    <section className="section" aria-labelledby="apropos-titre">
      <div className={`wrap grid items-center gap-12 ${visuel === "portrait" ? "md:grid-cols-[1.25fr_1fr] md:gap-8 lg:gap-10" : "md:grid-cols-[1fr_1fr] lg:gap-16"}`}>
        {visuel === "portrait" ? (
          <div className="relative -mx-2 w-auto sm:mx-0 md:-ml-4 lg:-ml-8">
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
        <div data-couleur="violet">
          <p className="eyebrow">Qui suis-je</p>
          <h2 id="apropos-titre" className="h2 mt-4">
            Romain Mornet, développeur et designer à Montpellier.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--muted)]">
            Je conçois et je développe moi-même chaque site : le design, le code, le catalogue et le référencement. Pas de
            sous-traitance, pas d&apos;intermédiaire : vous parlez directement à la personne qui construit votre site.
          </p>
          <ul className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-3">
            <li className="chiffre pl-4">
              <span className="block text-[1.05rem] font-bold leading-snug tracking-tight text-white">Design et code</span>
              <span className="mt-1 block text-[13.5px] leading-snug text-[var(--muted)]">Pensés ensemble, par la même personne</span>
            </li>
            <li className="chiffre pl-4">
              <span className="block text-[1.05rem] font-bold leading-snug tracking-tight text-white">Shopify et Next.js</span>
              <span className="mt-1 block text-[13.5px] leading-snug text-[var(--muted)]">Le bon outil pour chaque projet</span>
            </li>
            <li className="chiffre pl-4">
              <span className="block text-[1.05rem] font-bold leading-snug tracking-tight text-white">
                Créateur de{" "}
                <a href={SITE.primaps} className="link">
                  Primaps
                </a>
              </span>
              <span className="mt-1 block text-[13.5px] leading-snug text-[var(--muted)]">Les restaurants trouvés sur Google</span>
            </li>
          </ul>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Formation">
            <li className="chip-teinte">Diplômé en développement web</li>
            <li className="chip-teinte">Certifié design UI/UX</li>
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/demo-gratuite" className="btn btn-primary">
              <Gift className="h-[18px] w-[18px]" aria-hidden="true" /> Recevoir ma démo gratuite
            </Link>
            <Link href="/a-propos" className="btn btn-ghost">
              Mon parcours <Fleche />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
