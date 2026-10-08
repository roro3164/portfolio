import { Methode } from "./Methode";
import { Gift } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CtaFinal } from "./CtaFinal";
import { Faq, type QR } from "./Faq";
import { Fil } from "./Fil";
import { JsonLd } from "./JsonLd";
import { Options, type CleOption } from "./Options";
import { Navigateur } from "./Cadres";
import { BandeauPrimaps, Coche, ProjetsPhares } from "./Sections";
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
              <Link href="/maquette-gratuite" className="btn btn-primary">
                <Gift className="h-4 w-4" aria-hidden="true" />
                Recevoir ma maquette gratuite
              </Link>
              <Link href="#realisations" className="btn btn-ghost">
                Voir des exemples
              </Link>
            </div>
          </div>
          {estCapture(c.visuel) ? (
            <Navigateur src={c.visuel.src} alt={c.visuel.alt} url={c.visuel.url} priority className="lg:rotate-[1deg]" />
          ) : (
            c.visuel
          )}
        </div>
      </section>

      <section className="section bande border-y" aria-labelledby="pourqui-titre">
        <div className="wrap">
          <p className="eyebrow">Pour qui</p>
          <h2 id="pourqui-titre" className="h2 mt-4 max-w-2xl">
            Fait pour vous si…
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.pourQui.map((p) => (
              <div key={p.titre} className="reveal carte-laser lent p-7">
                <h3 className="h3">{p.titre}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="inclus-titre">
        <div className="wrap">
          <p className="eyebrow">Ce qui est inclus</p>
          <h2 id="inclus-titre" className="h2 mt-4 max-w-2xl">
            Tout ce qu&apos;il faut, sans mauvaise surprise.
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {c.inclus.map((i) => (
              <div key={i.titre} className="reveal flex gap-4">
                <Coche />
                <div>
                  <h3 className="text-[1.1rem] font-semibold">{i.titre}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--muted)]">{i.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="argument-titre">
        <div className="wrap">
          <div className="card grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1fr]">
            <h2 id="argument-titre" className="h2 !text-[clamp(1.7rem,3vw,2.5rem)]">
              {c.argument.titre}
            </h2>
            <div className="space-y-4 text-[16.5px] leading-relaxed text-[var(--muted)]">
              {c.argument.paragraphes.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {c.argument.points && (
                <ul className="space-y-2.5 pt-2">
                  {c.argument.points.map((p) => (
                    <li key={p} className="flex gap-3 text-white">
                      <Coche />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
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
