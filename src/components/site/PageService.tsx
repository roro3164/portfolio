import { Methode } from "./Methode";
import {
  Boxes,
  Gem,
  Gift,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Rocket,
  ShoppingBag,
  Star,
  Store,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CtaFinal } from "./CtaFinal";
import { Faq, type QR } from "./Faq";
import { Fil } from "./Fil";
import { JsonLd } from "./JsonLd";
import { Options, type CleOption } from "./Options";
import { Navigateur } from "./Cadres";
import { BandeauPrimaps, Coche, Fleche, ProjetsPhares } from "./Sections";
import { SchemaEcommerce, SchemaReferencement, SchemaVitrine } from "./SchemasServices";
import { faq, fil, graphe, ID_ENTREPRISE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export type ContenuService = {
  url: string;
  nomCourt: string;
  nomService: string;
  eyebrow: string;
  h1: string;
  lead: string;
  visuel: { src: string; alt: string; url: string } | ReactNode;
  pourQui: { titre: string; texte: string }[];
  inclus: { titre: string; texte: string }[];
  argument: { titre: string; paragraphes: string[]; points?: string[] };
  projets: string[];
  titreProjets: string;
  faq: QR[];
  cta: { titre: string; texte: string };
  primaps?: boolean;
  options?: CleOption[];
  couleur: "violet" | "vert" | "bleu";
};

// Habillage propre à chaque service (code couleur) : icônes des profils,
// notifications du hero et schéma animé de l'argument.
const HABILLAGE: Record<
  ContenuService["couleur"],
  { icones: LucideIcon[]; notifs: { icone: LucideIcon; titre: string; texte: string }[]; schema: ReactNode }
> = {
  violet: {
    icones: [Store, Boxes, TrendingDown],
    notifs: [
      { icone: ShoppingBag, titre: "Nouvelle commande", texte: "Paiement reçu" },
      { icone: RefreshCw, titre: "Stock synchronisé", texte: "Il y a 2 minutes" },
    ],
    schema: <SchemaEcommerce />,
  },
  vert: {
    icones: [Rocket, RefreshCw, Gem],
    notifs: [
      { icone: Mail, titre: "Nouvelle demande de devis", texte: "Via le formulaire" },
      { icone: Phone, titre: "Appel entrant", texte: "Depuis votre site" },
    ],
    schema: <SchemaVitrine />,
  },
  bleu: {
    icones: [TrendingUp, MapPin, TriangleAlert],
    notifs: [
      { icone: MapPin, titre: "1er sur Google Maps", texte: "« votre métier + ville »" },
      { icone: Star, titre: "Nouvel avis 5 ★", texte: "Sur votre fiche Google" },
    ],
    schema: <SchemaReferencement />,
  },
};

const estCapture = (v: ContenuService["visuel"]): v is { src: string; alt: string; url: string } =>
  typeof v === "object" && v !== null && "src" in v;

export function PageService({ c }: { c: ContenuService }) {
  const ariane = [
    { nom: "Accueil", url: "/" },
    { nom: c.nomCourt, url: c.url },
  ];
  const service = {
    "@type": "Service",
    "@id": `${SITE.url}${c.url}#service`,
    name: c.nomService,
    serviceType: c.nomService,
    description: c.lead,
    url: `${SITE.url}${c.url}`,
    provider: { "@id": ID_ENTREPRISE },
    areaServed: SITE.zones.map((z) => ({ "@type": "Place", name: z })),
    offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", description: "Sur devis" } },
  };

  const h = HABILLAGE[c.couleur];

  return (
    <>
      <JsonLd data={graphe(service, fil(ariane), faq(c.faq))} />
      <div data-couleur={c.couleur}>

      <section className="relative overflow-hidden">
        <div className="halo -right-48 -top-48 h-[520px] w-[520px]" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-14">
          <div>
            <Fil items={ariane} />
            <p className="eyebrow mt-10">{c.eyebrow}</p>
            <h1 className="h1 mt-5 !text-[clamp(2.3rem,4.8vw,4rem)]">{c.h1}</h1>
            <p className="lead mt-6 max-w-xl">{c.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo-gratuite" className="btn btn-primary">
                <Gift className="h-4 w-4" aria-hidden="true" />
                Recevoir ma démo gratuite
              </Link>
              <Link href="#realisations" className="btn btn-ghost">
                Voir des exemples
              </Link>
            </div>
          </div>
          <div className="relative">
            {estCapture(c.visuel) ? (
              <Navigateur src={c.visuel.src} alt={c.visuel.alt} url={c.visuel.url} priority className="lg:rotate-[1deg]" />
            ) : (
              c.visuel
            )}
            {h.notifs.map((n, k) => {
              const Icone = n.icone;
              return (
                <div key={n.titre} className={`hero-notif hero-notif-${k + 1}`} aria-hidden="true">
                  <span className="hero-notif-icone">
                    <Icone className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-tight">
                    <b className="block text-[13px] text-white">{n.titre}</b>
                    <span className="text-[12px] text-[var(--muted)]">{n.texte}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bande border-y" aria-labelledby="pourqui-titre">
        <div className="wrap">
          <p className="eyebrow">Pour qui</p>
          <h2 id="pourqui-titre" className="h2 mt-4 max-w-2xl">
            Fait pour vous si…
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.pourQui.map((p, i) => {
              const Icone = h.icones[i] ?? Store;
              return (
                <div key={p.titre} className="reveal carte-laser lent flex flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="icone-service !h-12 !w-12 !rounded-2xl" aria-hidden="true">
                      <Icone className="h-[22px] w-[22px]" strokeWidth={2} />
                    </span>
                    <span className="font-mono text-[13px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="h3 mt-6">{p.titre}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">{p.texte}</p>
                  <Link href="/demo-gratuite" className="group mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-[var(--accent)]">
                    C&apos;est votre cas ? Recevez votre démo
                    <Fleche className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="inclus-titre">
        <div className="wrap">
          <p className="eyebrow">Ce qui est inclus</p>
          <h2 id="inclus-titre" className="h2 mt-4 max-w-2xl">
            Tout ce qu&apos;il faut, sans mauvaise surprise.
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.inclus.map((it, i) => (
              <li key={it.titre} className="reveal inclus-tuile">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="inclus-coche" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <path d="m3.5 8.4 2.9 2.9 6.1-6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-4 text-[1.1rem] font-semibold">{it.titre}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{it.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="argument-titre">
        <div className="wrap">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <h2 id="argument-titre" className="h2 !text-[clamp(1.7rem,3vw,2.5rem)]">
                {c.argument.titre}
              </h2>
              <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-[var(--muted)]">
                {c.argument.paragraphes.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {c.argument.points && (
                <ul className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-3">
                  {c.argument.points.map((p) => (
                    <li key={p} className="chiffre pl-4 text-[14.5px] font-semibold leading-snug text-white">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="reveal lg:col-span-6">
              <div className="scene-service carte-laser lent" aria-hidden="true">
                <span className="scene-fond" />
                <div className="scene-schema">{h.schema}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {c.options && <Options options={c.options} />}

      <div id="realisations" className="scroll-mt-20">
        <ProjetsPhares slugs={c.projets} titre={c.titreProjets} />
      </div>

      <Methode />
      {c.primaps && <div className="pt-24"><BandeauPrimaps /></div>}
      <Faq items={c.faq} />
      </div>
      <CtaFinal titre={c.cta.titre} texte={c.cta.texte} />
    </>
  );
}
