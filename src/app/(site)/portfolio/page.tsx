import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Bot,
  BrainCircuit,
  CalendarCheck,
  Code2,
  Database,
  PenTool,
  Gift,
  Search,
  Sparkles,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { FondPortfolio } from "@/components/site/FondPortfolio";
import { DuoAppareils, Iphone, Macbook } from "@/components/site/Appareils";
import { Clip } from "@/components/site/Clip";
import { MurTemplates } from "@/components/site/MurTemplates";
import { VitrineTemplates } from "@/components/site/VitrineTemplates";
import { VisitePrimaps } from "@/components/site/VisitePrimaps";
import { LogoPrimaps } from "@/components/site/LogoPrimaps";
import { PortraitSplit } from "@/components/site/PortraitSplit";
import { Coche, Fleche } from "@/components/site/Sections";
import {
  AGENCE,
  CANDIDATURE,
  CARTES_FIDELITE,
  COMPETENCES,
  DEMOS_METIERS,
  CONCEPT_PRIMAPS,
  PARCOURS,
  PRINCIPES_DESIGN,
  VISITE_PRIMAPS,
  STACK_PRIMAPS,
  TEMPLATES,
} from "@/content/portfolio";
import { ETUDES } from "@/content/projets";
import { SITE } from "@/lib/site";

// Portfolio de candidature : pas dans le menu ni dans le sitemap, non indexé.
/** Une capture pas encore livrée est masquée plutôt qu'affichée cassée. */
const existe = (src: string) =>
  fs.existsSync(path.join(process.cwd(), "public", src));

const ICONES_CONCEPT = {
  trouve: Search,
  envie: Sparkles,
  salle: CalendarCheck,
  revenir: Gift,
};

export const metadata: Metadata = {
  title: "Portfolio de Romain Mornet, développeur full-stack et designer",
  description:
    "Projets de Romain Mornet : Primaps (SaaS pour restaurants), agence d'agents IA, templates de sites et boutiques e-commerce.",
  alternates: { canonical: "/portfolio" },
  robots: { index: false, follow: false },
};

const ICONES_COMPETENCES = {
  "Front-end": Code2,
  "Back-end & données": Database,
  "IA & automatisation": BrainCircuit,
  "Design & e-commerce": PenTool,
} as const;

const TEINTES = ["violet", "bleu", "vert", "or", "rose", "cyan"];

function Pastilles({ items, couleurs = false }: { items: string[]; couleurs?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <li key={s} className="chip-teinte" data-couleur={couleurs ? TEINTES[i % TEINTES.length] : undefined}>
          {couleurs && <i aria-hidden="true" />}
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
    <div className="pf">
      <FondPortfolio />
      {/* 1. Qui je suis */}
      <section className="relative overflow-hidden">
        <div
          className="halo -right-40 top-10 h-[480px] w-[480px]"
          aria-hidden="true"
        />
        <div className="wrap relative grid items-center gap-12 pb-10 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:pt-16">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Portfolio · {SITE.ville}
            </p>
            <h1 className="h1 mt-5 max-w-4xl !text-[clamp(2.3rem,4.8vw,4rem)]">
              Romain Mornet, développeur <span className="whitespace-nowrap">full-stack</span>{" "}
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
          </div>
          <div className="pf-portrait relative -mx-5 sm:-mx-2 lg:-mr-16 lg:-ml-4">
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
                Un restaurant jongle d&apos;habitude entre une fiche Google, un
                site, un outil de réservation, une plateforme de commande et une
                carte de fidélité en papier, qui ne se parlent pas. Primaps
                réunit tout dans un seul tableau de bord et relie chaque étape :
                le client qui le trouve sur Google réserve sur son site, puis
                revient grâce à sa carte de fidélité.
              </p>
              <p className="mt-4 text-[15px] text-[var(--faint)]">
                Conçu, designé et développé seul, de la base de données à
                l&apos;interface.
              </p>
            </div>
            <div className="lg:justify-self-end">
              {CANDIDATURE.demoPrimaps ? (
                <a
                  href={CANDIDATURE.demoPrimaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary pf-faisceau !min-h-[56px] !px-7"
                >
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                  Tester la démo
                </a>
              ) : null}
            </div>
          </div>

          <ol className="boucle mt-14">
            {CONCEPT_PRIMAPS.map((c, i) => {
              const Icone = ICONES_CONCEPT[c.icone];
              return (
                <li key={c.titre} className="boucle-carte pf-lueur reveal">
                  <span className="pf-spot" aria-hidden="true" />
                  <span className="boucle-num">0{i + 1}</span>
                  <span className="boucle-icone">
                    <Icone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold text-[var(--fort)]">
                    {c.titre}
                  </h3>
                  <ul className="mt-4">
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>

          <div className="mt-24 max-w-2xl">
            <p className="eyebrow">Le produit en vrai</p>
            <h3 className="h2 mt-4">Une visite, fonction par fonction</h3>
            <p className="lead mt-5">
              Les écrans de la démo, sur un restaurant fictif : Le Petit
              Kreuzberg.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <VisitePrimaps etapes={VISITE_PRIMAPS} />
          </div>

          <div className="reveal mt-16 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
            <div className="mx-auto w-[230px] lg:mx-0">
              <Iphone>
                <Clip
                  src="/portfolio/clips/roulette.mp4"
                  poster="/portfolio/clips/roulette.jpg"
                  label="La roulette Primaps sur téléphone : la roue tourne et le client gagne un café"
                  className="aspect-[520/1126]"
                />
              </Iphone>
            </div>
            <div>
              <p className="vp-numero">06 · Roulette et fidélité</p>
              <h3 className="h3 mt-3">Faire revenir les clients</h3>
              <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-[var(--muted)]">
                Le client scanne le QR du comptoir, tourne la roue et gagne un
                lot, puis ajoute sa carte de fidélité dans le portefeuille de son
                téléphone. Chaque carte, à tampons ou à points, est générée aux
                couleurs et au logo du restaurant. Promos, relances par e-mail et
                parrainage s&apos;y ajoutent.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {["Roulette au comptoir", "Tampons ou points", "Portefeuille du téléphone", "Promos et relances par e-mail"].map((p) => (
                  <li key={p} className="vp-puce">
                    {p}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 grid max-w-[760px] grid-cols-2 gap-4 sm:grid-cols-4">
                {CARTES_FIDELITE.map((c) => (
                  <li key={c.src}>
                    <Image
                      src={c.src}
                      alt={`Carte de fidélité ${c.nom}`}
                      width={642}
                      height={1322}
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 22vw, 44vw"
                      className="h-auto w-full rounded-2xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
                    />
                    <p className="mt-2 text-center text-[13.5px] text-[var(--muted)]">
                      {c.nom}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="h3">Stack technique</h3>
            <div className="mt-4">
              <Pastilles items={STACK_PRIMAPS} />
            </div>
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
          <div className="carte-laser pf-lueur lent relative flex flex-col overflow-hidden p-7 [--radius:28px] md:p-12 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
            <span className="pf-spot" aria-hidden="true" />
            {/* Sur téléphone, la vidéo passe juste sous le titre (order) ; sur ordinateur, elle est à droite. */}
            <div className="contents lg:relative lg:block">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  IA appliquée
                </p>
                <h2 id="agence-titre" className="h2 mt-4">
                  Une agence d&apos;agents IA qui travaille sur Primaps
                </h2>
              </div>
              <ul className="order-3 mt-8 space-y-3 lg:mt-6">
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
              <div className="order-4 mt-7">
                <Pastilles items={AGENCE.stack} couleurs />
              </div>
            </div>
            {existe(AGENCE.src) && (
              <Macbook className="relative order-2 mt-8 lg:-mr-6 lg:mt-0">
                <Clip
                  src={AGENCE.clip}
                  poster={AGENCE.src}
                  label="Le bureau de l'agence en pixel art, puis la messagerie : un chef qui écrit sa réponse en direct, la file des conversations et un livrable à valider"
                />
              </Macbook>
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
          </div>
          <div className="mt-12">
            <MurTemplates templates={TEMPLATES} />
          </div>
          <div className="wrap">
            <div className="reveal card pf-verre pf-lueur relative mt-14 overflow-hidden !p-5 sm:!p-8 lg:!p-10">
              <span className="pf-spot" aria-hidden="true" />
              <div className="grid gap-8">
                <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
                  <div>
                  <p className="eyebrow">Tester les templates</p>
                  <h3 className="h2 mt-4 !text-[clamp(1.7rem,3vw,2.4rem)]">
                    Choisissez un métier, passez d&apos;un template à l&apos;autre
                  </h3>
                  </div>
                  <p className="text-[16px] leading-relaxed text-[var(--muted)] lg:justify-self-end lg:max-w-md">
                    Chaque démo est un vrai site rempli avec une maison fictive,
                    en version ordinateur et téléphone : on la fait défiler avec
                    ses animations, et les flèches changent de template.
                  </p>
                </div>
                <VitrineTemplates metiers={DEMOS_METIERS} />
              </div>
            </div>
          </div>
          <div className="wrap">
            <ol className="mt-16 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPES_DESIGN.map((p, i) => (
                <li key={p.titre} className="reveal bg-[var(--bg)]/80 p-6 backdrop-blur">
                  <p className="font-mono text-[12.5px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[1.08rem] font-bold leading-snug text-white">{p.titre}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--muted)]">{p.texte}</p>
                </li>
              ))}
            </ol>
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
                  <p className="font-mono text-[13px] text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")} / {String(ETUDES.length).padStart(2, "0")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="pack-etiquette">{p.type}</span>
                    <span className="chip-teinte">
                      {p.secteur} · {p.ville}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.9rem] font-bold leading-tight tracking-tight">
                    {p.nom}
                  </h3>
                  <p className="mt-3 text-[16.5px] leading-relaxed text-white">{p.accroche}</p>
                  {p.chiffres.length > 0 && (
                    <dl className="mt-6 grid grid-cols-2 gap-3">
                      {p.chiffres.slice(0, 4).map((c) => (
                        <div key={c.libelle} className="card pf-verre !rounded-2xl !p-4">
                          <dt className="sr-only">{c.libelle}</dt>
                          <dd className="grad text-[1.45rem] font-bold leading-none">{c.valeur}</dd>
                          <dd className="mt-1.5 text-[13px] leading-snug text-[var(--muted)]">{c.libelle}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <details className="group/etude mt-6 border-t border-white/10 pt-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white [&::-webkit-details-marker]:hidden">
                      Le problème, ce que j&apos;ai fait, le résultat
                      <span className="text-[var(--accent)] transition-transform group-open/etude:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--muted)]">
                      <span className="font-semibold text-white">Le problème. </span>
                      {p.defi}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {p.solution.map((r) => (
                        <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-[var(--muted)]">
                          <Coche />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--muted)]">
                      <span className="font-semibold text-white">Le résultat. </span>
                      {p.resultat}
                    </p>
                  </details>
                  <div className="mt-6">
                    <Pastilles items={p.stack} />
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
                    Voir le site en ligne
                    <Fleche className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Parcours */}
      <section className="section scroll-mt-24 pt-0" aria-labelledby="parcours-titre">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Parcours</p>
            <h2 id="parcours-titre" className="h2 mt-4">
              Une double casquette, design et code
            </h2>
            <p className="lead mt-5 max-w-md">
              C&apos;est ce qui fait la différence : la même personne dessine le site, le code et le met en ligne.
            </p>
          </div>
          <ol className="relative grid gap-4 border-l border-white/10 pl-8">
            {PARCOURS.map((e, i) => (
              <li key={e.titre} className="reveal relative">
                <span className="absolute -left-[41px] top-5 grid h-5 w-5 place-items-center rounded-full border border-[var(--violet)] bg-[var(--bg)]" aria-hidden="true">
                  <i className="block h-2 w-2 rounded-full bg-[var(--violet-2)] shadow-[0_0_12px_var(--violet)]" />
                </span>
                <div className="card pf-verre pf-lueur relative p-6">
                  <span className="pf-spot" aria-hidden="true" />
                  <p className="font-mono text-[12.5px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[1.15rem] font-bold text-white">{e.titre}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--muted)]">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Compétences */}
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
            {COMPETENCES.map((c) => {
              const Icone = ICONES_COMPETENCES[c.titre as keyof typeof ICONES_COMPETENCES] ?? Code2;
              return (
                <div key={c.titre} data-couleur={c.couleur} className="reveal carte-laser lent pf-lueur relative p-6">
                  <span className="pf-spot" aria-hidden="true" />
                  <span className="icone-service" aria-hidden="true">
                    <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[1.15rem] font-bold text-white">{c.titre}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[15px] leading-relaxed text-[var(--muted)]">
                        <Coche />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Contact */}
      <section className="section pt-0" aria-labelledby="contact-titre">
        <div className="wrap">
          <div className="carte-laser pf-lueur lent relative overflow-hidden px-6 py-14 text-center [--radius:28px] sm:px-12">
            <span className="pf-spot" aria-hidden="true" />
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
    </div>
  );
}
