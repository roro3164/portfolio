"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gift } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteTerreEtSel, SiteTerreEtSelMobile, useConstruction } from "./TerreEtSel";

// Visuel du hero : le site de démonstration « Terre & Sel » se construit en
// direct dans le MacBook (même animation que la tablette de l'appel final),
// à côté du même site, fixe, sur iPhone ; puis la notification « en ligne »
// arrive. La pastille ronde « Démo offerte » mène au formulaire.

// le téléphone reste fixe : tout son site est affiché d'emblée
const TOUT_VISIBLE = () => ({ "data-on": "" });

export function HeroVisuel() {
  const ref = useRef<HTMLDivElement>(null);
  const construction = useConstruction();

  // léger suivi de la souris (amorti), sur les appareils seulement
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let cx = 0, cy = 0, x = 0, y = 0, raf = 0;
    const boucle = () => {
      x += (cx - x) * 0.07;
      y += (cy - y) * 0.07;
      el.style.setProperty("--hx", x.toFixed(3));
      el.style.setProperty("--hy", y.toFixed(3));
      raf = Math.abs(cx - x) + Math.abs(cy - y) > 0.001 ? requestAnimationFrame(boucle) : 0;
    };
    const bouger = (e: PointerEvent) => {
      cx = (e.clientX / window.innerWidth) * 2 - 1;
      cy = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(boucle);
    };
    window.addEventListener("pointermove", bouger, { passive: true });
    return () => {
      window.removeEventListener("pointermove", bouger);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-visuel relative mx-auto w-full max-w-[660px] pb-6 lg:pb-0">
      <div ref={construction.ref} className="hero-compo">
        {/* MacBook */}
        <div className="hero-ordi">
          <Image src="/mockups/macbook-cadre.webp" alt="" width={1446} height={1228} priority sizes="(min-width: 1024px) 600px, 92vw" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]" />
          <SiteTerreEtSel lettres={construction.lettres} v={construction.v} className="hero-ordi-ecran" largeur={530} />
        </div>

        {/* iPhone */}
        <div className="hero-tel">
          <Image src="/mockups/iphone-cadre.webp" alt="" width={888} height={1760} sizes="(min-width: 1024px) 150px, 26vw" className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]" />
          <SiteTerreEtSelMobile v={TOUT_VISIBLE} className="hero-tel-ecran" />
        </div>

        {/* notification de mise en ligne */}
        <div className="demo-toast hero-toast ts-el" aria-hidden="true" {...construction.v(15)}>
          <span className="demo-toast-point" />
          <span className="text-[14px] leading-tight">
            <b className="block text-white">Votre démo est en ligne</b>
            <span className="text-[13px] text-[var(--muted)]">Sur ordinateur et sur mobile</span>
          </span>
        </div>

        {/* Pastille ronde « Démo offerte » */}
        <Link href="/demo-gratuite" className="rond-demo group" aria-label="Recevoir ma démo gratuite">
          <svg viewBox="0 0 120 120" className="rond-demo-texte" aria-hidden="true">
            <defs>
              <path id="rond-demo-cercle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
            </defs>
            <text textLength={289} lengthAdjust="spacing">
              <textPath href="#rond-demo-cercle" startOffset="0">
                DÉMO OFFERTE • SANS ENGAGEMENT •
              </textPath>
            </text>
          </svg>
          <span className="rond-demo-coeur" aria-hidden="true">
            <Gift className="rond-demo-cadeau h-6 w-6" strokeWidth={2.1} />
            <ArrowUpRight className="rond-demo-fleche h-6 w-6" strokeWidth={2.4} />
          </span>
        </Link>
      </div>
    </div>
  );
}
