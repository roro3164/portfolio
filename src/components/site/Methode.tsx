"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Fleche } from "./Sections";

// Frise de la méthode : la ligne se remplit au défilement, une comète suit
// l'avancement et chaque étape s'allume quand elle est atteinte. Chaque carte
// porte une mini-animation (jouée seulement quand l'étape est atteinte).

function VignetteEchange() {
  return (
    <div className="vignette v-echange">
      <span className="v-bulle v-bulle-client">J&apos;ai un projet de site…</span>
      <span className="v-bulle v-bulle-moi">On en parle ?</span>
      <span className="v-ecrit"><i /><i /><i /></span>
    </div>
  );
}

function VignetteDemo() {
  return (
    <div className="vignette v-demo">
      <div className="v-nav">
        <span className="v-url">votre-site.fr</span>
        <span className="v-enligne">En ligne</span>
      </div>
      <div className="v-page">
        <i className="w-3/5" />
        <i className="w-2/5" />
        <i className="v-page-cta" />
      </div>
    </div>
  );
}

function VignetteConstruction() {
  return (
    <div className="vignette v-construit">
      <div className="v-code">
        <i className="w-1/2" />
        <i className="ml-4 w-3/5" />
        <i className="ml-4 w-2/5" />
        <i className="w-1/3" />
      </div>
      <div className="v-progres">
        <span className="v-progres-barre"><span /></span>
        <span className="v-progres-pct" />
      </div>
    </div>
  );
}

function VignetteSuivi() {
  return (
    <div className="vignette v-suivi">
      <svg viewBox="0 0 240 70" preserveAspectRatio="none" className="v-courbe">
        <path className="v-courbe-aire" d="M0 62 C40 60 60 52 90 48 S140 40 170 26 S215 10 240 6 V70 H0Z" />
        <path className="v-courbe-trait" pathLength={1} d="M0 62 C40 60 60 52 90 48 S140 40 170 26 S215 10 240 6" />
      </svg>
      <span className="v-suivi-chip">Visites ↑</span>
    </div>
  );
}

const ETAPES: { t: string; d: string; livrable: string; vignette: ReactNode; c: "rose" | "violet" | "bleu" | "vert"; offert?: boolean }[] = [
  { t: "On en parle", d: "Votre activité, vos clients, ce que le site doit rapporter.", livrable: "Brief de votre projet", vignette: <VignetteEchange />, c: "rose" },
  { t: "Votre démo gratuite", d: "Un vrai site en ligne, à tester avant de payer quoi que ce soit.", livrable: "Démo en ligne", vignette: <VignetteDemo />, c: "violet", offert: true },
  { t: "Je construis", d: "Devis validé : développement, contenus, catalogue et référencement.", livrable: "Site prêt à tester", vignette: <VignetteConstruction />, c: "bleu" },
  { t: "En ligne et suivi", d: "Mise en ligne, prise en main, puis évolutions et résultats.", livrable: "Suivi des résultats", vignette: <VignetteSuivi />, c: "vert" },
];

export function Methode() {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const calcul = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quand la frise entre aux 3/4 de l'écran, 1 quand sa fin passe à mi-hauteur
      const v = (vh * 0.78 - r.top) / (r.height + vh * 0.18);
      setP(Math.min(1, Math.max(0, v)));
    };
    const surDefilement = () => {
      if (!raf) raf = requestAnimationFrame(calcul);
    };
    calcul();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
      cancelAnimationFrame(raf);
    };
  }, []);

  const n = ETAPES.length;
  const actif = (i: number) => p >= i / (n - 1) - 0.04;
  const courant = ETAPES.reduce((c, _, i) => (actif(i) ? i : c), -1);

  return (
    <section className="section" aria-labelledby="methode-titre">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Méthode</p>
            <h2 id="methode-titre" className="h2 mt-4">
              Un seul interlocuteur, du premier appel à la mise en ligne.
            </h2>
          </div>
          <div className="interlocuteur self-start md:self-auto">
            <Image src="/img/romain-photo.webp" alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-full object-cover object-top" />
            <div>
              <p className="text-[15px] font-semibold text-white">Romain Mornet</p>
              <p className="text-[13.5px] text-[var(--muted)]">Votre contact du brief au suivi</p>
            </div>
          </div>
        </div>

        <ol ref={ref} className="frise relative mt-16 grid gap-6 md:grid-cols-4 md:gap-5" style={{ ["--p" as string]: p }}>
          {/* Rail horizontal (ordinateur) */}
          <span className="frise-rail hidden md:block" aria-hidden="true">
            <span className="frise-rempli" />
            <span className="frise-comete" />
          </span>
          {/* Rail vertical (mobile) */}
          <span className="frise-rail-v md:hidden" aria-hidden="true">
            <span className="frise-rempli-v" />
            <span className="frise-comete-v" />
          </span>

          {ETAPES.map((e, i) => {
            const on = actif(i);
            return (
              <li key={e.t} data-couleur={e.c} data-actif={on} data-courant={i === courant} className="frise-etape relative flex gap-5 pl-0 md:flex-col md:items-center">
                <span className="frise-noeud shrink-0">
                  <span className="frise-num">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <div className={`frise-carte flex flex-1 flex-col md:mt-7 md:w-full ${e.offert ? "carte-laser lent frise-carte-offerte" : ""}`}>
                  <div aria-hidden="true">{e.vignette}</div>
                  <h3 className="mt-5 flex flex-wrap items-center gap-2.5 text-[1.1rem] font-bold tracking-tight">
                    {e.t}
                    {e.offert && <span className="frise-offert">Offert</span>}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--muted)]">{e.d}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                    <span className="frise-livrable">{e.livrable}</span>
                    {e.offert && (
                      <Link href="/demo-gratuite" className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--accent)]">
                        La demander
                        <Fleche className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
