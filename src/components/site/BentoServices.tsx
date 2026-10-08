import Link from "next/link";
import type { ReactNode } from "react";
import { Clock, MapPin, Phone, type LucideIcon } from "lucide-react";
import { BlocOptions } from "./Options";
import { SchemaEcommerce, SchemaReferencement, SchemaVitrine } from "./SchemasServices";
import { Fleche } from "./Sections";

// Services présentés comme les réalisations : grand schéma animé d'un côté,
// étiquettes, titre, accroche et points clés de l'autre, en alternance.
// Bande options + suivi mensuel dessous.

type Service = {
  href: string;
  couleur: "violet" | "vert" | "bleu";
  objectif: string;
  precision: string;
  titre: string;
  lien: string;
  accroche: string;
  resume: string;
  points: { titre: string; texte: string }[];
  schema: ReactNode;
  badge: { icone: LucideIcon; texte: string };
};

const SERVICES: Service[] = [
  {
    href: "/creation-site-e-commerce",
    couleur: "violet",
    objectif: "Vendre en ligne",
    precision: "Shopify · sur-mesure",
    titre: "Site e-commerce",
    lien: "Découvrir le site e-commerce",
    accroche: "Une boutique qui encaisse des commandes, même la nuit.",
    resume:
      "Du petit catalogue à plus de 10 000 produits synchronisés avec vos fournisseurs : paiement sécurisé, fiches pensées pour Google, gestion simple au quotidien.",
    points: [
      { titre: "Shopify sur\u2011mesure", texte: "À votre marque, pas un thème générique" },
      { titre: "Catalogue synchronisé", texte: "Stocks et prix fournisseurs à jour" },
      { titre: "SEO produit", texte: "Chaque fiche trouvable sur Google" },
    ],
    schema: <SchemaEcommerce />,
    badge: { icone: Clock, texte: "Boutique ouverte 24 h/24" },
  },
  {
    href: "/creation-site-vitrine",
    couleur: "vert",
    objectif: "Être contacté",
    precision: "Artisans · commerces · indépendants",
    titre: "Site vitrine",
    lien: "Découvrir le site vitrine",
    accroche: "Un site qui fait sonner votre téléphone.",
    resume:
      "Rapide et à votre image, pensé pour obtenir des appels et des demandes de devis : textes clairs, boutons visibles, formulaire simple.",
    points: [
      { titre: "Design sur\u2011mesure", texte: "À votre image, pas un modèle" },
      { titre: "Réservation, rendez-vous", texte: "Vos clients réservent seuls" },
      { titre: "Rapide sur mobile", texte: "Là où vos clients vous cherchent" },
    ],
    schema: <SchemaVitrine />,
    badge: { icone: Phone, texte: "Appel en 1 clic depuis le mobile" },
  },
  {
    href: "/referencement-local",
    couleur: "bleu",
    objectif: "Être trouvé",
    precision: "Google · avis · pages locales",
    titre: "Référencement local",
    lien: "Découvrir le référencement local",
    accroche: "Passez devant vos concurrents sur Google.",
    resume:
      "Quand on cherche votre métier dans votre ville, c'est vous qu'on trouve : fiche Google optimisée, avis clients, pages par ville et suivi des positions.",
    points: [
      { titre: "Fiche Google optimisée", texte: "Catégories, services, photos, posts" },
      { titre: "Avis et pages par ville", texte: "Plus de confiance, plus de zones" },
      { titre: "Suivi des positions", texte: "Vous voyez la progression" },
    ],
    schema: <SchemaReferencement />,
    badge: { icone: MapPin, texte: "Objectif : le top 3 sur Google Maps" },
  },
];

function LigneService({ s, i, inverse }: { s: Service; i: number; inverse: boolean }) {
  const Badge = s.badge.icone;
  return (
    <article data-couleur={s.couleur} className="reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`relative lg:col-span-7 ${inverse ? "lg:order-2" : ""}`}>
        <Link href={s.href} aria-label={s.lien} className="scene-service carte-laser lent">
          <span className="scene-fond" aria-hidden="true" />
          <span className="scene-index" aria-hidden="true">
            {String(i + 1).padStart(2, "0")} <span className="text-white/35">/ {String(SERVICES.length).padStart(2, "0")}</span>
          </span>
          <div className="scene-schema">{s.schema}</div>
        </Link>
        <span className={`scene-badge ${inverse ? "scene-badge-gauche" : ""}`} aria-hidden="true">
          <span className="icone-service !h-8 !w-8 !rounded-full">
            <Badge className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          {s.badge.texte}
        </span>
      </div>
      <div className={`lg:col-span-5 ${inverse ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap gap-2">
          <span className="pack-etiquette">{s.objectif}</span>
          <span className="chip-teinte">{s.precision}</span>
        </div>
        <h3 className="mt-5 text-[2rem] font-bold leading-tight tracking-tight">{s.titre}</h3>
        <p className="mt-3 text-[1.15rem] leading-snug text-white">{s.accroche}</p>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">{s.resume}</p>
        <ul className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-3">
          {s.points.map((p) => (
            <li key={p.titre} className="chiffre pl-4">
              <span className="block text-[1.05rem] font-bold leading-snug tracking-tight text-white">{p.titre}</span>
              <span className="mt-1 block text-[13.5px] leading-snug text-[var(--muted)]">{p.texte}</span>
            </li>
          ))}
        </ul>
        <Link href={s.href} className="group mt-7 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
          {s.lien}
          <Fleche className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
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

        <div className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
          {SERVICES.map((s, i) => (
            <LigneService key={s.href} s={s} i={i} inverse={i % 2 === 1} />
          ))}
        </div>

        <div className="reveal tuile tuile-neutre mt-24 p-7 md:p-9 lg:mt-32">
          <BlocOptions />
        </div>
      </div>
    </section>
  );
}
