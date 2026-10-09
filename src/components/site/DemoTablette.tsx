"use client";

import { SiteTerreEtSel, useConstruction } from "./TerreEtSel";

// Démo qui se construit dans une tablette en paysage : l'adresse se tape, puis
// chaque élément du site (marque fictive « Terre & Sel ») apparaît un par un,
// la notification « en ligne » arrive, tout se vide et la boucle recommence.

export function DemoTablette() {
  const { ref, lettres, v } = useConstruction();

  return (
    <div ref={ref} className="tablette">
      <span className="tablette-camera" />
      <SiteTerreEtSel lettres={lettres} v={v} className="tablette-ecran" />
      <div className="demo-toast tablette-toast ts-el" {...v(15)}>
        <span className="demo-toast-point" />
        <span className="text-[14px] leading-tight">
          <b className="block text-white">Votre démo est en ligne</b>
          <span className="text-[13px] text-[var(--muted)]">Prête à tester sur mobile et ordinateur</span>
        </span>
      </div>
    </div>
  );
}
