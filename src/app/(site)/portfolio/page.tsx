import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Bot,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { DuoAppareils, Iphone } from "@/components/site/Appareils";
import { Navigateur } from "@/components/site/Cadres";
import { LogoPrimaps } from "@/components/site/LogoPrimaps";
import { PortraitSplit } from "@/components/site/PortraitSplit";
import { Coche, Fleche } from "@/components/site/Sections";
import {
  AGENCE,
  CANDIDATURE,
  COMPETENCES,
  ECRANS_PRIMAPS,
  STACK_PRIMAPS,
  TEMPLATES,
} from "@/content/portfolio";
import { ETUDES } from "@/content/projets";
import { SITE } from "@/lib/site";

// Portfolio de candidature : pas dans le menu ni dans le sitemap, non indexé.
/** Une capture pas encore livrée est masquée plutôt qu'affichée cassée. */
const existe = (src: string) =>
  fs.existsSync(path.join(process.cwd(), "public", src));

export const metadata: Metadata = {
  title: "Portfolio de Romain Mornet, développeur full-stack et designer",
  description:
    "Projets de Romain Mornet : Primaps (SaaS pour restaurants), agence d'agents IA, templates de sites et boutiques e-commerce.",
  alternates: { canonical: "/portfolio" },
  robots: { index: false, follow: false },
};

function Pastilles({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="chip-teinte">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Liens({ centre = false }: { centre?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${centre ? "justify-center" : ""}`}
    >
      {CANDIDATURE.cv && (
        <a
          href={CANDIDATURE.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <FileText className="h-[18px] w-[18px]" aria-hidden="true" />
          Mon CV
        </a>
      )}
      <a
        href={`mailto:${SITE.email}`}
        className={`btn ${CANDIDATURE.cv ? "btn-ghost" : "btn-primary"}`}
      >
        <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
        Me contacter
      </a>
      <a
        href={SITE.reseaux.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
      >
        <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
        LinkedIn
      </a>
      <a
        href={SITE.reseaux.github}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
      >
        <Github className="h-[18px] w-[18px]" aria-hidden="true" />
        GitHub
      </a>
    </div>
  );
}

export default function Portfolio() {
  return (
    <>
      {/* 1. Qui je suis */}
      <section className="relative overflow-hidden">
        <div
          className="halo -right-40 top-10 h-[480px] w-[480px]"
          aria-hidden="true"
        />
        <div className="wrap relative grid items-center gap-12 pb-10 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Portfolio · {SITE.ville}
            </p>
            <h1 className="h1 mt-5 max-w-4xl !text-[clamp(2.3rem,4.8vw,4rem)]">
              Romain Mornet, développeur full-stack{" "}
              <span className="grad">&amp; designer</span>.
            </h1>
            <p className="lead mt-6 max-w-2xl">
              Je conçois et je code des sites, un SaaS et des agents IA, du
              design de l&apos;interface jusqu&apos;à la base de données. Ici :
              le logiciel que j&apos;ai créé, ses templates et des projets
              livrés pour des clients.
            </p>
            <div className="mt-9">
              <Liens />
            </div>
            <nav
              aria-label="Sommaire"
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-[var(--muted)]"
            >
              {[
                ["#primaps", "Primaps"],
                ["#agence", "Agence d'agents IA"],
                ["#templates", "Templates"],
                ["#clients", "Projets clients"],
                ["#competences", "Compétences"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="underline-offset-4 hover:text-[var(--fort)] hover:underline"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="relative -mx-2 sm:mx-0 lg:-mr-6">
            <PortraitSplit priority />
          </div>
        </div>
      </section>

      {/* 2. Primaps, projet phare */}
      <section
        id="primaps"
        className="section scroll-mt-24"
        aria-labelledby="primaps-titre"
      >
        <div className="wrap">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">Projet phare · SaaS</p>
              <h2 id="primaps-titre" className="h2 mt-4">
                <LogoPrimaps /> : le logiciel tout-en-un des restaurants
              </h2>
              <p className="lead mt-5 max-w-2xl">
                Conçu, designé et développé seul. Un restaurateur y gère sa
                fiche Google, son site, ses réservations, ses commandes à
                emporter, sa roulette et sa carte de fidélité, depuis un seul
                tableau de bord.
              </p>
            </div>
            <div className="lg:justify-self-end">
              {CANDIDATURE.demoPrimaps ? (
                <a
                  href={CANDIDATURE.demoPrimaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !min-h-[56px] !px-7"
                >
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                  Tester la démo
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {ECRANS_PRIMAPS.filter((e) => existe(e.src)).map((e, i) => (
              <figure
                key={e.src}
                className="reveal md:[&:last-child:nth-child(odd)]:col-span-2"
              >
                <Navigateur
                  src={e.src}
                  alt={`Primaps, ${e.titre.toLowerCase()}`}
                  url="primaps.fr/dashboard"
                  priority={i < 2}
                  sizes="(min-width: 768px) 600px, 92vw"
                />
                <figcaption className="mt-4">
                  <span className="font-semibold text-white">{e.titre}</span>
                  <span className="text-[var(--muted)]"> · {e.texte}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="h3">Stack technique</h3>
              <div className="mt-4">
                <Pastilles items={STACK_PRIMAPS} />
              </div>
            </div>
            {existe("/portfolio/primaps/dashboard-mobile.webp") && (
              <div className="mx-auto w-[200px] lg:mx-0">
                <Iphone>
                  <div className="relative aspect-[390/844]">
                    <Image
                      src="/portfolio/primaps/dashboard-mobile.webp"
                      alt="Primaps sur téléphone"
                      fill
                      sizes="200px"
                      className="object-cover object-top"
                    />
                  </div>
                </Iphone>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Agence d'agents IA */}
      <section
        id="agence"
        className="section scroll-mt-24 pt-0"
        aria-labelledby="agence-titre"
      >
        <div className="wrap">
          <div className="carte-laser lent relative grid items-center gap-10 overflow-hidden p-7 [--radius:28px] md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative">
              <p className="eyebrow flex items-center gap-2">
                <Bot className="h-4 w-4" aria-hidden="true" />
                IA appliquée
              </p>
              <h2 id="agence-titre" className="h2 mt-4">
                Une agence d&apos;agents IA qui travaille sur Primaps
              </h2>
              <ul className="mt-6 space-y-3">
                {AGENCE.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-[16px] leading-relaxed text-[var(--muted)]"
                  >
                    <Coche />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Pastilles items={AGENCE.stack} />
              </div>
            </div>
            {existe(AGENCE.src) && (
              <Navigateur
                src={AGENCE.src}
                alt="Trombinoscope de l'agence : Hugo, les chefs de secteur et leurs rôles"
                url="primaps.fr/operator/agence/equipe"
                sizes="(min-width: 1024px) 640px, 92vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* 3. Templates */}
      {TEMPLATES.length > 0 && (
        <section
          id="templates"
          className="section scroll-mt-24 pt-0"
          aria-labelledby="templates-titre"
        >
          <div className="wrap">
            <p className="eyebrow">Design de templates</p>
            <h2 id="templates-titre" className="h2 mt-4 max-w-3xl">
              {TEMPLATES.length} templates de sites, chacun avec sa direction
              artistique
            </h2>
            <p className="lead mt-5 max-w-2xl">
              Restaurants, snacks, pizzerias, fleuristes, boulangerie… Je les
              dessine et je les intègre dans le constructeur de Primaps, à
              partir d&apos;une bibliothèque de sections et d&apos;effets
              communs : chaque texte et chaque photo se modifie au clic. Chaque
              aperçu s&apos;ouvre en vrai, avec ses animations.
            </p>
            <div className="mt-12 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {TEMPLATES.map((t) => (
                <a
                  key={t.src}
                  href={t.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group reveal block"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={t.src}
                      alt={`Template ${t.libelle}`}
                      width={1200}
                      height={750}
                      sizes="(min-width: 1280px) 300px, (min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-semibold text-white">
                      {t.libelle}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[14px] text-[var(--accent)]">
                      Voir l&apos;aperçu{" "}
                      <Fleche className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </p>
                  <p className="text-[14.5px] text-[var(--muted)]">{t.style}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Projets clients (les études de cas du site) */}
      <section
        id="clients"
        className="section scroll-mt-24 pt-0"
        aria-labelledby="clients-titre"
      >
        <div className="wrap">
          <p className="eyebrow">Projets clients</p>
          <h2 id="clients-titre" className="h2 mt-4 max-w-3xl">
            Des sites livrés pour des commerçants
          </h2>
          <p className="lead mt-5 max-w-2xl">
            Pour chaque projet : le problème, ce que j&apos;ai fait, le
            résultat.
          </p>

          <div className="mt-14 space-y-24 lg:space-y-32">
            {ETUDES.map((p, i) => (
              <article
                key={p.slug}
                className="reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  className={`relative lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}
                >
                  <Link
                    href={`/realisations/${p.slug}`}
                    aria-label={`Étude de cas ${p.nom}`}
                    className="block transition-transform duration-500 hover:-translate-y-1"
                  >
                    <DuoAppareils
                      ordinateur={{
                        ...p.ordinateur,
                        alt: `Site ${p.nom} sur ordinateur`,
                      }}
                      telephone={{
                        ...p.telephone,
                        alt: `Site ${p.nom} sur mobile`,
                      }}
                      telephoneAGauche={i % 2 === 1}
                    />
                  </Link>
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                  <div className="flex flex-wrap gap-2">
                    <span className="pack-etiquette">{p.type}</span>
                    <span className="chip-teinte">
                      {p.secteur} · {p.ville}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.8rem] font-bold leading-tight tracking-tight">
                    {p.nom}
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">
                    <span className="font-semibold text-white">
                      Le problème.{" "}
                    </span>
                    {p.defi}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {p.solution.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-[15.5px] leading-relaxed text-[var(--muted)]"
                      >
                        <Coche />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[16px] leading-relaxed text-white">
                    {p.resultat}
                  </p>
                  {p.chiffres.length > 0 && (
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                      {p.chiffres.map((c) => (
                        <div key={c.libelle}>
                          <dt className="sr-only">{c.libelle}</dt>
                          <dd className="text-[1.6rem] font-bold leading-none text-white">
                            {c.valeur}
                          </dd>
                          <dd className="mt-1 text-[13.5px] text-[var(--muted)]">
                            {c.libelle}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="mt-6">
                    <Pastilles items={p.stack} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Compétences */}
      <section
        id="competences"
        className="section scroll-mt-24 pt-0"
        aria-labelledby="competences-titre"
      >
        <div className="wrap">
          <p className="eyebrow">Compétences</p>
          <h2 id="competences-titre" className="h2 mt-4">
            Du design à la production
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COMPETENCES.map((c) => (
              <div key={c.titre} className="card p-6">
                <h3 className="text-[1.15rem] font-bold text-white">
                  {c.titre}
                </h3>
                <ul className="mt-4 space-y-2">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="text-[15px] leading-relaxed text-[var(--muted)]"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact */}
      <section className="section pt-0" aria-labelledby="contact-titre">
        <div className="wrap">
          <div className="carte-laser lent relative overflow-hidden px-6 py-14 text-center [--radius:28px] sm:px-12">
            <div
              className="halo -left-32 -top-40 h-[420px] w-[620px]"
              aria-hidden="true"
            />
            <h2 id="contact-titre" className="h2 relative mx-auto max-w-2xl">
              Un poste ou une mission à me proposer ?
            </h2>
            <p className="lead relative mx-auto mt-5 max-w-xl">
              Développement full-stack, IA ou UI/UX, en poste ou en freelance, à{" "}
              {SITE.ville} ou Toulouse.
            </p>
            <div className="relative mt-9">
              <Liens centre />
            </div>
            <p className="relative mt-6 text-[14.5px] text-[var(--muted)]">
              {SITE.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
