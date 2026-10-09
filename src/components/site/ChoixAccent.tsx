"use client";

import { useSyncExternalStore } from "react";

// Choix de la couleur d'accent du site : violet (par défaut), rose « designer »
// ou bleu « développeur ». Posé en data-accent sur <html>, gardé dans le navigateur.

const COULEURS = [
  { cle: "violet", nom: "Violet", teinte: "#8c82e3" },
  { cle: "rose", nom: "Rose", teinte: "#ec4899" },
  { cle: "bleu", nom: "Bleu", teinte: "#3b82f6" },
] as const;

type Cle = (typeof COULEURS)[number]["cle"];

const lire = (): Cle => (document.documentElement.getAttribute("data-accent") as Cle | null) ?? "violet";
const abonner = (rappel: () => void) => {
  const obs = new MutationObserver(rappel);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] });
  return () => obs.disconnect();
};

export function ChoixAccent({ className = "" }: { className?: string }) {
  const actuel = useSyncExternalStore(abonner, lire, () => "violet" as Cle);

  const choisir = (cle: Cle) => {
    const html = document.documentElement;
    if (cle === "violet") html.removeAttribute("data-accent");
    else html.setAttribute("data-accent", cle);
    try {
      localStorage.setItem("accent", cle);
    } catch {
      // stockage indisponible : le choix vaut pour cette page seulement
    }
  };

  return (
    <div role="group" aria-label="Couleur du site" className={`choix-accent ${className}`}>
      {COULEURS.map((c) => (
        <button
          key={c.cle}
          type="button"
          aria-label={`Couleur ${c.nom.toLowerCase()}`}
          aria-pressed={actuel === c.cle}
          title={c.nom}
          className="choix-accent-pastille"
          style={{ ["--t" as string]: c.teinte }}
          onClick={() => choisir(c.cle)}
        />
      ))}
    </div>
  );
}
