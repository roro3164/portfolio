"use client";

import { Moon, Sun } from "lucide-react";

// Bouton clair / sombre. L'icône affichée suit l'attribut data-theme (CSS seul,
// pas d'état React) ; le choix est gardé dans le navigateur du visiteur.
export function BasculeTheme({ className = "" }: { className?: string }) {
  const basculer = () => {
    const html = document.documentElement;
    const clair = html.getAttribute("data-theme") !== "clair";
    if (clair) html.setAttribute("data-theme", "clair");
    else html.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", clair ? "clair" : "sombre");
    } catch {
      // stockage indisponible : le thème vaut pour cette page seulement
    }
  };
  return (
    <button type="button" onClick={basculer} className={`bascule-theme ${className}`} aria-label="Passer en thème clair ou sombre" title="Thème clair / sombre">
      <Sun className="bascule-soleil h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      <Moon className="bascule-lune h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
