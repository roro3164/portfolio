"use client";

import { Code2, MessagesSquare, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Frise de la méthode : la ligne se remplit au défilement, une comète suit
// l'avancement et chaque étape s'allume quand elle est atteinte.

const ETAPES: { t: string; d: string; livrable: string; icone: LucideIcon; c: "violet" | "bleu" | "vert" }[] = [
  { t: "On en parle", d: "Votre activité, vos clients, ce que le site doit rapporter.", livrable: "Brief de votre projet", icone: MessagesSquare, c: "violet" },
  { t: "Votre démo gratuite", d: "Un vrai site en ligne, à tester avant de payer quoi que ce soit.", livrable: "Démo en ligne", icone: PenTool, c: "violet" },
  { t: "Je construis", d: "Devis validé : développement, contenus, catalogue et référencement.", livrable: "Site prêt à tester", icone: Code2, c: "bleu" },
  { t: "En ligne et suivi", d: "Mise en ligne, prise en main, puis évolutions et résultats.", livrable: "Suivi des résultats", icone: Rocket, c: "vert" },
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

  return (
    <section className="section" aria-labelledby="methode-titre">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Méthode</p>
          <h2 id="methode-titre" className="h2 mt-4">
            Un seul interlocuteur, du premier appel à la mise en ligne.
          </h2>
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
            const Icone = e.icone;
            const on = actif(i);
            return (
              <li key={e.t} data-couleur={e.c} data-actif={on} className="frise-etape relative flex gap-5 pl-0 md:flex-col md:items-center">
                <span className="frise-noeud shrink-0">
                  <span className="frise-num">{i + 1}</span>
                </span>
                <div className="frise-carte flex-1 md:mt-7 md:w-full">
                  <span className="icone-service !h-9 !w-9" aria-hidden="true">
                    <Icone className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-[1.1rem] font-bold tracking-tight">{e.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--muted)]">{e.d}</p>
                  <span className="frise-livrable mt-4">{e.livrable}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
