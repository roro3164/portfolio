import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DuoAppareils } from "@/components/site/Appareils";
import { Navigateur } from "@/components/site/Cadres";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Fil } from "@/components/site/Fil";
import { JsonLd } from "@/components/site/JsonLd";
import { Chiffres, Coche, couleurType, Fleche } from "@/components/site/Sections";
import { ETUDES, etude } from "@/content/projets";
import { fil, graphe, ID_ENTREPRISE, ID_PERSONNE } from "@/lib/schema";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return ETUDES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = etude((await params).slug);
  if (!e) return {};
  return {
    title: e.titreSeo,
    description: `Étude de cas : ${e.accroche.charAt(0).toLowerCase()}${e.accroche.slice(1)} Le défi, la solution et les chiffres.`,
    alternates: { canonical: `/realisations/${e.slug}` },
    openGraph: { images: [{ url: e.couverture, width: 1440, height: 900, alt: e.nom }] },
  };
}

export default async function EtudeDeCasPage({ params }: Props) {
  const e = etude((await params).slug);
  if (!e) notFound();
  const i = ETUDES.findIndex((x) => x.slug === e.slug);
  const suivante = ETUDES[(i + 1) % ETUDES.length];
  const ariane = [
    { nom: "Accueil", url: "/" },
    { nom: "Réalisations", url: "/realisations" },
    { nom: e.nom, url: `/realisations/${e.slug}` },
  ];
  const oeuvre = {
    "@type": "CreativeWork",
    name: `Site ${e.nom}`,
    url: `${SITE.url}/realisations/${e.slug}`,
    about: { "@type": "Organization", name: e.nom, url: e.url },
    creator: [{ "@id": ID_PERSONNE }, { "@id": ID_ENTREPRISE }],
    image: `${SITE.url}${e.couverture}`,
    description: e.resume,
    keywords: e.stack.join(", "),
    inLanguage: "fr-FR",
  };

  return (
    <>
      <JsonLd data={graphe(oeuvre, fil(ariane))} />
      <article data-couleur={couleurType(e.type)}>
        <header className="relative overflow-hidden">
          <div className="halo -left-40 -top-40 h-[480px] w-[480px]" aria-hidden="true" />
          <div className="wrap relative pt-10 lg:pt-14">
            <Fil items={ariane} />
            <div className="mt-10 flex flex-wrap gap-2">
              <span className="pack-etiquette">{e.type}</span>
              <span className="chip-teinte">
                {e.secteur} · {e.ville}
              </span>
            </div>
            <h1 className="h1 mt-6 max-w-4xl !text-[clamp(2.3rem,4.8vw,4rem)]">
              {e.nom}
              <span className="block text-[0.55em] font-semibold leading-tight tracking-tight text-[var(--muted)]">{e.accroche}</span>
            </h1>
            <p className="lead mt-6 max-w-2xl">{e.resume}</p>
            <a href={e.url} target="_blank" rel="noopener" className="btn btn-ghost mt-8">
              Voir le site en ligne <Fleche />
            </a>
          </div>
          <div className="wrap relative mt-14 pb-10">
            <div className="mx-auto max-w-[980px]">
              <DuoAppareils
                ordinateur={{ ...e.ordinateur, alt: `Site ${e.nom} sur ${e.ordinateur.forme === "ipad-paysage" ? "tablette" : "ordinateur"}` }}
                telephone={{ ...e.telephone, alt: `Site ${e.nom} sur mobile` }}
                priority
                sizes="(min-width: 1024px) 900px, 92vw"
              />
            </div>
          </div>
        </header>

        <section className="wrap pt-14" aria-label="Chiffres clés">
          <Chiffres etude={e} />
        </section>

        <section className="section">
          <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Le défi</p>
              <p className="mt-5 text-[1.3rem] leading-snug text-white">{e.defi}</p>
              <p className="eyebrow mt-12">Technologies</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.stack.map((s) => (
                  <li key={s} className="chip-teinte">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h2 !text-[clamp(1.7rem,3vw,2.4rem)]">Ce que j&apos;ai construit</h2>
              <ul className="mt-8 space-y-5">
                {e.solution.map((s) => (
                  <li key={s} className="flex gap-4 text-[17px] leading-relaxed text-[#d9d7e4]">
                    <Coche />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="card mt-10 p-7">
                <p className="eyebrow">Le résultat</p>
                <p className="mt-3 text-[17px] leading-relaxed text-white">{e.resultat}</p>
              </div>
            </div>
          </div>
        </section>

        {e.galerie.length > 0 && (
          <section className="section pt-0" aria-label="Captures du site">
            <div className="wrap grid gap-8 md:grid-cols-2">
              {e.galerie.map((g) => (
                <figure key={g.src} className="reveal">
                  <Navigateur src={g.src} alt={g.alt} url={e.url} sizes="(min-width: 768px) 560px, 100vw" />
                  <figcaption className="mt-3 text-[14px] text-[var(--muted)]">{g.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </article>

      <section className="wrap pb-24">
        <Link
          href={`/realisations/${suivante.slug}`}
          className="group card flex items-center justify-between gap-6 p-7 transition-colors hover:bg-[var(--surface-2)]"
        >
          <span>
            <span className="eyebrow">Projet suivant</span>
            <span className="mt-2 block text-[1.6rem] font-bold tracking-tight">{suivante.nom}</span>
            <span className="text-[15px] text-[var(--muted)]">{suivante.accroche}</span>
          </span>
          <Fleche className="h-6 w-6 shrink-0 text-[var(--violet-2)] transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <CtaFinal />
    </>
  );
}
