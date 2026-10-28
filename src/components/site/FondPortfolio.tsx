"use client";

import { useEffect } from "react";

/**
 * Fond fixe du portfolio : halos de couleur, faisceaux de lumière, grain léger et motifs dans les
 * coins seulement, sur le principe du template Asia Sushi (vagues seigaiha, anneau ouvert, ondes,
 * trame de points) mais en trait fin et aux couleurs du site. Centre dégagé.
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

        {/* Haut droit : anneau ouvert en dégradé (l'ensō du site) */}
        <svg className="pf-anneau" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="pf-anneau-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" />
              <stop offset="1" />
            </linearGradient>
          </defs>
          <path d="M100 14a86 86 0 1 1-78.6 51" stroke="url(#pf-anneau-g)" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 40a60 60 0 1 0 52 30" stroke="url(#pf-anneau-g)" strokeWidth="1" strokeLinecap="round" opacity=".6" />
          <circle cx="21.4" cy="65" r="3.5" fill="url(#pf-anneau-g)" />
        </svg>

        {/* Bas droit : ondes concentriques qui partent du coin */}
        <svg className="pf-ondes" viewBox="0 0 400 400" fill="none">
          <defs>
            <radialGradient id="pf-fondu-bd" cx="1" cy="1" r="1">
              <stop offset=".15" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="pf-m-bd">
              <rect width="400" height="400" fill="url(#pf-fondu-bd)" />
            </mask>
          </defs>
          <g stroke="currentColor" strokeWidth="0.9" mask="url(#pf-m-bd)">
            {Array.from({ length: 16 }, (_, i) => (
              <circle key={i} cx="400" cy="400" r={28 + i * 24} strokeDasharray={i % 3 === 1 ? "2 6" : undefined} />
            ))}
          </g>
        </svg>

        {/* Bas gauche : petite trame de points */}
        <svg className="pf-trame" viewBox="0 0 100 80" fill="currentColor">
          {[10, 30, 50, 70].map((y) => [10, 30, 50, 70, 90].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />))}
        </svg>
        <span className="pf-grain" />
      </div>
    </>
  );
}
