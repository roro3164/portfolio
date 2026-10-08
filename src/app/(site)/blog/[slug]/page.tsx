import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ancre, CorpsArticle } from "@/components/site/Article";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Fil } from "@/components/site/Fil";
import { JsonLd } from "@/components/site/JsonLd";
import { ARTICLES, article, tempsLecture } from "@/content/articles";
import { fil, graphe, ID_ENTREPRISE, ID_PERSONNE } from "@/lib/schema";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = article((await params).slug);
  if (!a) return {};
  return {
    title: a.titreSeo,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", publishedTime: a.date, modifiedTime: a.maj ?? a.date, authors: [SITE.fondateur] },
  };
}

const dateFr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: Props) {
  const a = article((await params).slug);
  if (!a) notFound();
  const ariane = [
    { nom: "Accueil", url: "/" },
    { nom: "Blog", url: "/blog" },
    { nom: a.titreSeo, url: `/blog/${a.slug}` },
  ];
  const sommaire = a.corps.filter((b): b is { h2: string } => "h2" in b).map((b) => b.h2);
  const autres = ARTICLES.filter((x) => x.slug !== a.slug && x.categorie === a.categorie)
    .concat(ARTICLES.filter((x) => x.slug !== a.slug && x.categorie !== a.categorie))
    .slice(0, 2);

  const posting = {
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${a.slug}#article`,
    headline: a.titre,
    description: a.description,
    datePublished: a.date,
    dateModified: a.maj ?? a.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${SITE.url}/blog/${a.slug}`,
    author: { "@id": ID_PERSONNE },
    publisher: { "@id": ID_ENTREPRISE },
    articleSection: a.categorie,
    image: `${SITE.url}/opengraph-image.png`,
  };

  return (
    <>
      <JsonLd data={graphe(posting, fil(ariane))} />
      <article>
        <header className="wrap max-w-[860px] pb-10 pt-10 lg:pt-14">
          <Fil items={ariane} />
          <p className="eyebrow mt-10">{a.categorie}</p>
          <h1 className="mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em]">{a.titre}</h1>
          <p className="lead mt-6">{a.resume}</p>
          <div className="mt-8 flex items-center gap-4 border-y border-[var(--line)] py-5">
            <Image src="/img/romain-photo.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover object-top" />
            <div className="text-[14.5px]">
              <Link href="/a-propos" className="font-semibold hover:underline" rel="author">
                {SITE.fondateur}
              </Link>
              <p className="text-[var(--faint)]">
                <time dateTime={a.date}>{dateFr(a.date)}</time> · {tempsLecture(a)} min de lecture
              </p>
            </div>
          </div>
        </header>

        <div className="wrap grid max-w-[1120px] gap-12 pb-24 lg:grid-cols-[1fr_220px]">
          <div className="max-w-[720px]">
            <CorpsArticle blocs={a.corps} />
          </div>
          <nav aria-label="Sommaire" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow !text-[var(--faint)]">Sommaire</p>
              <ol className="mt-4 space-y-2.5 border-l border-[var(--line)] pl-4 text-[14px]">
                {sommaire.map((s) => (
                  <li key={s}>
                    <a href={`#${ancre(s)}`} className="text-[var(--muted)] hover:text-white">
                      {s}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>
      </article>

      <section className="wrap pb-24" aria-labelledby="lire-aussi">
        <h2 id="lire-aussi" className="h3">
          À lire aussi
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`/blog/${x.slug}`} className="card block h-full p-7 transition-colors hover:bg-[var(--surface-2)]">
                <span className="eyebrow !text-[13px]">{x.categorie}</span>
                <span className="mt-3 block text-[1.15rem] font-semibold leading-snug">{x.titre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaFinal />
    </>
  );
}
