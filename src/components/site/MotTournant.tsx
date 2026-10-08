"use client";

import { useEffect, useState } from "react";

// Mot du titre qui tourne (rotation 3D vers le haut). Les mots sont dessinés en
// CSS (attr data-mot) : seul le mot affiché existe en texte, pour Google.
export function MotTournant({ mots, intervalle = 2400 }: { mots: string[]; intervalle?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % mots.length), intervalle);
    return () => clearInterval(t);
  }, [mots.length, intervalle]);

  return (
    <span className="mot-tournant">
      {/* texte réel (lu par Google et les lecteurs d'écran) : uniquement le mot affiché */}
      <span className="sr-only">{mots[i]}</span>
      {mots.map((m, k) => (
        <span
          key={m}
          aria-hidden="true"
          data-mot={m}
          className="mot-tournant-mot grad"
          data-etat={k === i ? "actif" : k === (i - 1 + mots.length) % mots.length ? "sortant" : "attente"}
        />
      ))}
    </span>
  );
}
