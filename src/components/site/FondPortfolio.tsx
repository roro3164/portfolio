"use client";

import { useEffect } from "react";

/**
 * Fond fixe du portfolio : motifs « design + code » dans les quatre coins, centre dégagé.
 * Haut gauche : grille de plan, cercles de cotes et courbe de Bézier avec ses poignées.
 * Haut droit : trame de points. Bas gauche : accolades et balise de code.
 * Bas droit : réseau de nœuds reliés (les agents). Les motifs restent fixes (le verre posé
 * dessus ne se recalcule pas) ; seuls quelques points scintillent.
 * Le composant pose aussi la lumière qui suit la souris sur les éléments .pf-lueur.
 */
export function FondPortfolio() {
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    let cible: HTMLElement | null = null;
    const bouge = (e: PointerEvent) => {
      const el =
        (e.target as Element | null)?.closest?.<HTMLElement>(".pf-lueur") ??
        null;
      if (cible && cible !== el) cible.removeAttribute("data-lueur");
      cible = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.setAttribute("data-lueur", "");
    };
    document.addEventListener("pointermove", bouge, { passive: true });
    return () => document.removeEventListener("pointermove", bouge);
  }, []);

  return (
    <>
      <div className="pf-progression" aria-hidden="true" />
      <div className="pf-fond" aria-hidden="true">
        <span className="pf-lumiere pf-lumiere-1" />
        <span className="pf-lumiere pf-lumiere-2" />

        {/* Haut gauche : plan de design */}
        <svg
          className="pf-motif pf-motif-hg"
          viewBox="0 0 560 560"
          fill="none"
          stroke="currentColor"
        >
          <defs>
            <pattern
              id="pf-grille"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path d="M28 0H0V28" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="560" height="560" fill="url(#pf-grille)" stroke="none" />
          <circle
            cx="168"
            cy="168"
            r="112"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <circle cx="168" cy="168" r="56" strokeWidth="1" opacity="0.7" />
          <path
            d="M168 20V316M20 168H316"
            strokeWidth="0.8"
            strokeDasharray="2 5"
          />
          <path
            d="M56 420C140 300 250 470 392 196"
            strokeWidth="1.6"
            className="pf-trait"
          />
          <path
            d="M56 420L128 330M392 196L330 120"
            strokeWidth="0.9"
            opacity="0.7"
          />
          <rect x="50" y="414" width="12" height="12" strokeWidth="1.4" />
          <rect x="386" y="190" width="12" height="12" strokeWidth="1.4" />
          <circle cx="128" cy="330" r="4.5" fill="currentColor" />
          <circle cx="330" cy="120" r="4.5" fill="currentColor" />
          <path
            d="M448 56v20M438 66h20M84 504v20M74 514h20M476 448v20M466 458h20"
            strokeWidth="1.2"
          />
          <text
            x="196"
            y="92"
            fill="currentColor"
            stroke="none"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            opacity="0.8"
          >
            224 × 224
          </text>
        </svg>

        {/* Haut droit : trame de points */}
        <svg
          className="pf-motif pf-motif-hd"
          viewBox="0 0 420 420"
          fill="currentColor"
        >
          <defs>
            <pattern
              id="pf-points"
              width="21"
              height="21"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.4" />
            </pattern>
          </defs>
          <rect width="420" height="420" fill="url(#pf-points)" />
          <circle cx="128" cy="86" r="3.5" className="pf-scintille" />
          <circle cx="296" cy="212" r="3.5" className="pf-scintille pf-d2" />
          <circle cx="212" cy="338" r="3.5" className="pf-scintille pf-d3" />
        </svg>

        {/* Bas gauche : code */}
        <svg
          className="pf-motif pf-motif-bg"
          viewBox="0 0 520 440"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M118 70c-34 0-34 22-34 48v38c0 20-12 30-30 30 18 0 30 10 30 30v38c0 26 0 48 34 48"
            strokeWidth="2"
          />
          <path
            d="M292 70c34 0 34 22 34 48v38c0 20 12 30 30 30-18 0-30 10-30 30v38c0 26 0 48-34 48"
            strokeWidth="2"
          />
          <path
            d="M150 132h86M150 166h120M170 200h70M150 234h104M170 268h58"
            strokeWidth="5"
            opacity="0.55"
            className="pf-lignes"
          />
          <path
            d="M104 376l-30 26 30 26M196 376l30 26-30 26M166 368l-34 68"
            strokeWidth="2.2"
          />
          <circle
            cx="428"
            cy="96"
            r="54"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <path d="M410 96h36M428 78v36" strokeWidth="1.2" />
        </svg>

        {/* Bas droit : réseau d'agents */}
        <svg
          className="pf-motif pf-motif-bd"
          viewBox="0 0 520 480"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M260 240L120 120M260 240L404 96M260 240L440 300M260 240L150 380M260 240L330 420M404 96L470 190M120 120L60 230M150 380L60 230M440 300L470 190M330 420L440 300"
            strokeWidth="1"
            strokeDasharray="3 6"
            className="pf-flux"
          />
          <circle cx="260" cy="240" r="30" strokeWidth="1.4" />
          <circle
            cx="260"
            cy="240"
            r="58"
            strokeWidth="0.8"
            strokeDasharray="2 7"
          />
          <circle
            cx="260"
            cy="240"
            r="8"
            fill="currentColor"
            className="pf-scintille"
          />
          {[
            [120, 120],
            [404, 96],
            [440, 300],
            [150, 380],
            [330, 420],
            [470, 190],
            [60, 230],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="9"
              strokeWidth="1.4"
              fill="none"
              className={i % 3 === 0 ? "pf-scintille pf-d2" : undefined}
            />
          ))}
        </svg>
      </div>
    </>
  );
}
