"use client";

import { useEffect } from "react";

/**
 * Fond fixe du portfolio : halos de couleur, faisceaux de lumière, grain léger et motifs dans les
 * coin haut gauche seulement, sur le principe du décor en coin du template Asia Sushi, mais en motif
 * tech : alvéoles hexagonales emboîtées en trait fin.
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
        {/* Haut gauche : alvéoles hexagonales emboîtées en trait fin, effacées vers le centre */}
        <svg className="pf-alveoles" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern id="pf-alveoles" width="34.64" height="60" patternUnits="userSpaceOnUse">
              <g stroke="currentColor" strokeWidth="0.9">
                {[
                  [0, 0],
                  [34.64, 0],
                  [17.32, 30],
                  [0, 60],
                  [34.64, 60],
                ].map(([cx, cy]) =>
                  [19, 11].map((r) => (
                    <polygon
                      key={`${cx}-${cy}-${r}`}
                      points={[0, 1, 2, 3, 4, 5]
                        .map((k) => `${cx + r * Math.cos((Math.PI / 3) * k - Math.PI / 2)},${cy + r * Math.sin((Math.PI / 3) * k - Math.PI / 2)}`)
                        .join(" ")}
                    />
                  )),
                )}
              </g>
              <circle cx="17.32" cy="30" r="1.6" fill="currentColor" />
            </pattern>
            <radialGradient id="pf-fondu-hg" cx="0" cy="0" r="1">
              <stop offset=".2" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="pf-m-hg">
              <rect width="400" height="400" fill="url(#pf-fondu-hg)" />
            </mask>
          </defs>
          <rect width="400" height="400" fill="url(#pf-alveoles)" mask="url(#pf-m-hg)" />
        </svg>

        <span className="pf-grain" />
      </div>
    </>
  );
}
