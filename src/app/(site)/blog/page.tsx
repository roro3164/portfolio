import type { Metadata } from "next";
import Link from "next/link";
import { Fil } from "@/components/site/Fil";
import { JsonLd } from "@/components/site/JsonLd";
import { Fleche } from "@/components/site/Sections";
import { ARTICLES, tempsLecture } from "@/content/articles";
import { fil, graphe, ID_ENTREPRISE } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog : création de site, e-commerce et référencement",
  description:
    "Conseils concrets pour votre site : prix, Shopify ou WooCommerce, fiche Google, refonte sans perte de référencement et référencement par l'IA.",
  alternates: { canonical: "/blog" },
};

const ariane = [
  { nom: "Accueil", url: "/" },
  { nom: "Blog", url: "/blog" },
];

const dateFr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  const [une, ...autres] = ARTICLES;
  return (
    <>
      <JsonLd
        data={graphe(
          {
            "@type": "Blog",
            name: "Blog Romain DesignCode",
            url: `${SITE.url}/blog`,
            publisher: { "@id": ID_ENTREPRISE },
            blogPost: ARTICLES.map((a) => ({ "@type": "BlogPosting", headline: a.titre, url: `${SITE.url}/blog/${a.slug}`, datePublished: a.date })),
          },
          fil(ariane),
        )}
      />
      <section className="wrap pb-10 pt-10 lg:pt-14">
        <Fil items={ariane} />
        <p className="eyebrow mt-10">Blog</p>
        <h1 className="h1 mt-5 max-w-3xl !text-[clamp(2.3rem,4.6vw,3.8rem)]">Conseils pour un site qui rapporte.</h1>
        <p className="lead mt-6 max-w-2xl">
          E-commerce, site vitrine, référencement Google : ce que j&apos;applique sur les projets de mes clients, expliqué
          simplement.
        </p>
      </section>

      <section className="wrap pb-28">
        <Link href={`/blog/${une.slug}`} className="group card block p-8 transition-colors hover:bg-[var(--surface-2)] md:p-12">
          <span className="chip">{une.categorie}</span>
          <h2 className="mt-6 max-w-3xl text-[clamp(1.7rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">{une.titre}</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[var(--muted)]">{une.resume}</p>
          <p className="mt-6 flex items-center gap-2 text-[14px] text-[var(--faint)]">
            {dateFr(une.date)} · {tempsLecture(une)} min de lecture
            <Fleche className="ml-auto h-5 w-5 text-[var(--violet-2)] transition-transform group-hover:translate-x-1" />
          </p>
        </Link>
        <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {autres.map((a) => (
            <li key={a.slug} className="reveal">
              <Link href={`/blog/${a.slug}`} className="group card flex h-full flex-col p-7 transition-colors hover:bg-[var(--surface-2)]">
                <span className="eyebrow !text-[11.5px]">{a.categorie}</span>
                <h2 className="mt-4 text-[1.25rem] font-semibold leading-snug tracking-tight">{a.titre}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{a.resume}</p>
                <p className="mt-auto pt-6 text-[13.5px] text-[var(--faint)]">{tempsLecture(a)} min de lecture</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
