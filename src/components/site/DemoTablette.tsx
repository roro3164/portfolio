"use client";

import { DEMO_GRATUITE_ACTIVE } from "@/lib/offre";
import { Ipad } from "./Appareils";
import { SiteTerreEtSel, URL_DEMO } from "./TerreEtSel";

// iPad en paysage (le même que l'aperçu du constructeur Primaps) avec la démo « Terre & Sel » affichée en entier, fixe :
// l'animation de construction vit dans le hero, ici rien ne bouge.

const TOUT_VISIBLE = () => ({ "data-on": "" });

export function DemoTablette() {
  return (
    <div className="tablette">
      <Ipad>
        <SiteTerreEtSel lettres={URL_DEMO.length} v={TOUT_VISIBLE} className="tablette-ecran" />
      </Ipad>
      <div className="demo-toast tablette-toast tablette-toast-fixe">
        <span className="demo-toast-point" />
        <span className="text-[14px] leading-tight">
          <b className="block text-white">{DEMO_GRATUITE_ACTIVE ? "Votre démo est en ligne" : "Votre site est en ligne"}</b>
          <span className="text-[13px] text-[var(--muted)]">{DEMO_GRATUITE_ACTIVE ? "Prête à tester sur mobile et ordinateur" : "Sur ordinateur et sur mobile"}</span>
        </span>
      </div>
    </div>
  );
}
