"use client";

import { useEffect } from "react";

/**
 * Fond fixe du portfolio : halos de couleur, faisceaux de lumière, grain léger et motifs dans les
 * coin haut gauche seulement, sur le principe du décor en coin du template Asia Sushi : un seul motif
 * (vagues seigaiha en trait fin) et un dessin du métier (fenêtre de navigateur, courbe de Bézier).
 * Tout est fixe : le verre posé dessus ne se recalcule pas au défilement.
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
        <span className="pf-halos" />
        <span className="pf-lumiere pf-lumiere-1" />
        <span className="pf-lumiere pf-lumiere-2" />
        {/* Haut gauche : vagues seigaiha en trait fin, effacées vers le centre */}
        <svg className="pf-vagues" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern id="pf-seigaiha" width="64" height="32" patternUnits="userSpaceOnUse">
              <g stroke="currentColor" strokeWidth="0.9">
                {[
                  [0, 32],
                  [64, 32],
                  [32, 16],
                ].map(([cx, cy]) => [30, 22, 14].map((r) => <circle key={`${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />))}
              </g>
            </pattern>
            <radialGradient id="pf-fondu-hg" cx="0" cy="0" r="1">
              <stop offset=".2" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="pf-m-hg">
              <rect width="400" height="400" fill="url(#pf-fondu-hg)" />
            </mask>
          </defs>
          <rect width="400" height="400" fill="url(#pf-seigaiha)" mask="url(#pf-m-hg)" />
        </svg>

        {/* Haut gauche, par-dessus : fenêtre de navigateur et courbe de Bézier avec ses poignées (web et design) */}
        <svg className="pf-dessin" viewBox="0 0 320 240" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="pf-dessin-g" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" />
              <stop offset="1" />
            </linearGradient>
          </defs>
          <g stroke="currentColor" strokeWidth="1">
            <rect x="20" y="40" width="260" height="170" rx="10" />
            <path d="M20 62h260" />
            <rect x="72" y="47" width="150" height="9" rx="4.5" opacity=".6" />
            <rect x="36" y="78" width="104" height="66" rx="5" opacity=".7" />
            <path d="M156 86h96M156 98h70M156 110h84M36 160h120M36 172h80" opacity=".6" />
            <rect x="156" y="124" width="54" height="18" rx="9" opacity=".8" />
            <path d="M40 190 110 120M300 120 190 230" strokeDasharray="2 4" opacity=".7" />
          </g>
          <g fill="currentColor">
            <circle cx="33" cy="51" r="2.4" />
            <circle cx="42" cy="51" r="2.4" />
            <circle cx="51" cy="51" r="2.4" />
          </g>
          <path d="M40 190C110 120 190 230 300 120" stroke="url(#pf-dessin-g)" strokeWidth="1.6" />
          <g stroke="url(#pf-dessin-g)" strokeWidth="1.2" fill="var(--pf-dessin-fond)">
            <rect x="36" y="186" width="8" height="8" rx="1.5" />
            <rect x="296" y="116" width="8" height="8" rx="1.5" />
            <circle cx="110" cy="120" r="3.5" />
            <circle cx="190" cy="230" r="3.5" />
          </g>
          <path d="M306 128v15l4-4 3 7 3-1.4-3-6.8h5.6z" fill="var(--pf-dessin-fond)" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="pf-grain" />
      </div>
    </>
  );
}
