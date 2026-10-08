"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Démo qui se construit dans une tablette en paysage : l'adresse se tape, puis
// chaque élément du site (marque fictive « Terre & Sel ») apparaît un par un,
// la notification « en ligne » arrive, tout se vide et la boucle recommence.

const URL_DEMO = "terre-et-sel.fr";
const N = 15; // nombre d'éléments qui apparaissent
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

export function DemoTablette() {
  const ref = useRef<HTMLDivElement>(null);
  const ecran = useRef<HTMLDivElement>(null);
  const [lettres, setLettres] = useState(URL_DEMO.length);
  const [etape, setEtape] = useState(N);

  // le site est dessiné à 470 px de large puis mis à l'échelle de l'écran
  useEffect(() => {
    const el = ecran.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => el.style.setProperty("--k", String(e.contentRect.width / 470)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
        if (e < N) t = setTimeout(montrer, e === 1 ? 380 : 260);
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
  const v = (i: number) => ({ "data-on": etape >= i ? "" : undefined, "data-sort": etape === -1 ? "" : undefined });

  return (
    <div ref={ref} className="tablette">
      <span className="tablette-camera" />
      <div ref={ecran} className="tablette-ecran">
        <div className="tablette-zoom">
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
