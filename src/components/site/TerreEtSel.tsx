"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

// Le site de démonstration « Terre & Sel » (marque fictive) qui se construit :
// l'adresse se tape, puis chaque élément apparaît un par un, la notification
// « en ligne » arrive, tout se vide et la boucle recommence. Utilisé dans la
// tablette de l'appel final et dans l'ordinateur + le téléphone du hero.

export const URL_DEMO = "terre-et-sel.fr";
export const N_ETAPES = 15; // nombre d'éléments qui apparaissent
const PRODUITS = [
  ["bol", "Bol Sable", "38 €"],
  ["vase", "Vase Garrigue", "64 €"],
  ["assiettes", "Assiettes Écume", "29 €"],
] as const;
const UNIVERS = [
  ["cat-table", "Art de la table"],
  ["cat-deco", "Vases & déco"],
  ["cat-atelier", "Ateliers"],
] as const;

type Attrs = (i: number) => { "data-on"?: string; "data-sort"?: string };

/** Séquence de construction (ne tourne que lorsque l'élément observé est visible). */
export function useConstruction() {
  const ref = useRef<HTMLDivElement>(null);
  const [lettres, setLettres] = useState(URL_DEMO.length);
  const [etape, setEtape] = useState(N_ETAPES);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    let visible = false;
    const cycle = () => {
      setLettres(0);
      setEtape(0);
      let l = 0, e = 0;
      const taper = () => {
        if (!visible) return;
        l += 1;
        setLettres(l);
        if (l < URL_DEMO.length) t = setTimeout(taper, 55);
        else t = setTimeout(montrer, 350);
      };
      const montrer = () => {
        if (!visible) return;
        e += 1;
        setEtape(e);
        if (e < N_ETAPES) t = setTimeout(montrer, e === 1 ? 380 : 260);
        else t = setTimeout(() => { setEtape(-1); t = setTimeout(cycle, 900); }, 3400);
      };
      t = setTimeout(taper, 500);
    };
    const obs = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      clearTimeout(t);
      if (visible) cycle();
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  // un élément d'indice i est visible quand l'étape l'a atteint (-1 = tout s'efface)
  const v: Attrs = (i) => ({ "data-on": etape >= i ? "" : undefined, "data-sort": etape === -1 ? "" : undefined });
  return { ref, lettres, etape, v };
}

/** Met à l'échelle un site dessiné à `largeur` px pour remplir son écran. */
function useEchelle(largeur: number): RefObject<HTMLDivElement | null> {
  const ecran = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ecran.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => el.style.setProperty("--k", String(e.contentRect.width / largeur)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [largeur]);
  return ecran;
}

/** Version ordinateur / tablette, dessinée à `largeur` px (470 par défaut) puis mise à l'échelle. */
export function SiteTerreEtSel({ lettres, v, className = "", largeur = 470 }: { lettres: number; v: Attrs; className?: string; largeur?: number }) {
  const ecran = useEchelle(largeur);
  return (
    <div ref={ecran} className={className}>
      <div className="tablette-zoom" style={{ width: largeur }}>
        <div className="tablette-url">
          <span className="tablette-url-champ">
            {URL_DEMO.slice(0, lettres)}
            <span className="tablette-curseur" />
          </span>
        </div>
        <div className="ts-site">
          <div className="ts-entete ts-el" {...v(1)}>
            <span className="leading-none">
              <span className="ts-serif block text-[13px]">Terre &amp; Sel</span>
              <span className="block text-[5.5px] tracking-[0.2em] text-[#9b8a74]">CÉRAMIQUE · MONTPELLIER</span>
            </span>
            <span className="hidden gap-2.5 text-[8.5px] text-[#5d5144] sm:flex">
              <span>Boutique</span>
              <span>Ateliers</span>
              <span>L&apos;atelier</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="ts-recherche">Rechercher…</span>
              <span className="ts-panier">Panier · 0</span>
            </span>
          </div>
          <div className="ts-hero ts-el ts-el-image" {...v(2)}>
            <Image src="/demo-cta/hero.webp" alt="" fill sizes="480px" className="object-cover" />
            <div className="ts-hero-texte">
              <span className="ts-el rounded-full bg-white/80 px-2 py-0.5 text-[6px] font-semibold tracking-[0.16em] text-[#7a4a2a]" {...v(3)}>
                FAIT MAIN À MONTPELLIER
              </span>
              <span className="ts-serif ts-el mt-1.5 text-[20px] leading-[1.05] text-[#2b2118]" {...v(4)}>
                La céramique qui <em className="text-[#b35a33]">habille</em> votre table.
              </span>
              <span className="ts-el mt-1.5 max-w-[210px] text-[7.5px] leading-snug text-[#4d4135]" {...v(5)}>
                Bols, vases et assiettes tournés à la main, en petites séries.
              </span>
              <span className="ts-el mt-2.5 flex gap-1.5" {...v(6)}>
                <span className="ts-btn">Découvrir la boutique →</span>
                <span className="ts-btn ts-btn-2">Réserver un atelier</span>
              </span>
            </div>
          </div>
          <div className="ts-bande ts-el" {...v(7)}>
            <span>✦ Pièces uniques</span>
            <span>✦ Livraison offerte dès 60 €</span>
            <span>✦ Paiement sécurisé</span>
          </div>
          <div className="px-3 pb-2 pt-1.5">
            <div className="ts-el flex items-center justify-between" {...v(8)}>
              <span className="ts-serif text-[12px] text-[#2b2118]">Nos univers</span>
              <span className="text-[7.5px] font-semibold text-[#b35a33]">Tout voir →</span>
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {UNIVERS.map(([f, nom], k) => (
                <span key={f} className="ts-univers ts-el" {...v(9 + k)}>
                  <Image src={`/demo-cta/${f}.webp`} alt="" width={20} height={20} className="h-[18px] w-[18px] rounded-full object-cover" />
                  {nom}
                </span>
              ))}
            </div>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {PRODUITS.map(([f, nom, prix], k) => (
                <span key={f} className="ts-produit ts-el" {...v(12 + k)}>
                  <span className="relative block h-[34px] overflow-hidden rounded-[5px]">
                    <Image src={`/demo-cta/${f}.webp`} alt="" fill sizes="120px" className="object-cover" />
                  </span>
                  <span className="mt-1 flex items-center justify-between gap-1">
                    <span className="truncate text-[8px] font-semibold text-[#2b2118]">{nom}</span>
                    <span className="text-[8px] font-semibold text-[#b35a33]">{prix}</span>
                  </span>
                  <span className="ts-ajout">Ajouter au panier</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Version téléphone, dessinée à 200 px de large, construite au même rythme. */
export function SiteTerreEtSelMobile({ v, className = "" }: { v: Attrs; className?: string }) {
  const ecran = useEchelle(200);
  return (
    <div ref={ecran} className={className}>
      <div className="tsm-zoom ts-site">
        <div className="tsm-statut">
          <span>9:41</span>
          <span className="tsm-ile" />
          <span className="flex items-center gap-[3px]">
            <i className="tsm-reseau" />
            <i className="tsm-pile" />
          </span>
        </div>
        <div className="tsm-entete ts-el" {...v(1)}>
          <span className="leading-none">
            <span className="ts-serif block text-[12px]">Terre &amp; Sel</span>
            <span className="block text-[4.5px] tracking-[0.2em] text-[#9b8a74]">CÉRAMIQUE · MONTPELLIER</span>
          </span>
          <span className="tsm-menu">
            <i />
            <i />
          </span>
        </div>
        <div className="tsm-hero ts-el ts-el-image" {...v(2)}>
          <Image src="/demo-cta/hero.webp" alt="" fill sizes="200px" className="object-cover object-[70%_50%]" />
        </div>
        <div className="px-[10px] pt-[8px]">
          <span className="ts-el inline-block rounded-full bg-[#efe6d8] px-[6px] py-[2px] text-[5px] font-semibold tracking-[0.16em] text-[#7a4a2a]" {...v(3)}>
            FAIT MAIN À MONTPELLIER
          </span>
          <p className="ts-serif ts-el mt-[5px] text-[17px] leading-[1.05]" {...v(4)}>
            La céramique qui <em className="text-[#b35a33]">habille</em> votre table.
          </p>
          <p className="ts-el mt-[5px] text-[7px] leading-snug text-[#4d4135]" {...v(5)}>
            Bols, vases et assiettes tournés à la main.
          </p>
          <span className="ts-el mt-[8px] flex flex-col gap-[4px]" {...v(6)}>
            <span className="ts-btn text-center">Découvrir la boutique →</span>
            <span className="ts-btn ts-btn-2 text-center">Réserver un atelier</span>
          </span>
        </div>
        <div className="ts-bande ts-el mt-[10px]" {...v(7)}>
          <span>✦ Pièces uniques</span>
          <span>✦ Paiement sécurisé</span>
        </div>
        <div className="grid grid-cols-2 gap-[6px] px-[10px] pt-[8px]">
          {PRODUITS.slice(0, 2).map(([f, nom, prix], k) => (
            <span key={f} className="ts-produit ts-el" {...v(12 + k)}>
              <span className="relative block h-[52px] overflow-hidden rounded-[5px]">
                <Image src={`/demo-cta/${f}.webp`} alt="" fill sizes="90px" className="object-cover" />
              </span>
              <span className="mt-1 flex items-center justify-between gap-1">
                <span className="truncate text-[7px] font-semibold text-[#2b2118]">{nom}</span>
                <span className="text-[7px] font-semibold text-[#b35a33]">{prix}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
