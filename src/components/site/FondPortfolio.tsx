"use client";

import { useEffect } from "react";

/**
 * Fond fixe du portfolio : halos de couleur, faisceaux de lumière, grille fine de plan
 * avec repères en croix (nette en haut et sur les bords, effacée au centre) et grain léger.
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
        <span className="pf-grille" />
        <span className="pf-croix" />
        <span className="pf-grain" />
      </div>
    </>
  );
}
