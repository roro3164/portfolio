"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Gift, Heart, MousePointer2, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSequence } from "./SchemasServices";

// Visuel du hero : le site LumiNice se construit élément par élément sous les
// yeux (structure, en-tête, photo, titre, boutons, produits, mise en ligne),
// devant les vrais mockups MacBook et iPhone de Maison Ribier. La pastille
// ronde « Démo offerte » mène au formulaire.

const LUMI = "/hero/luminice";
const ETAPES = ["Structure", "En-tête", "Photo", "Titre", "Textes", "Boutons", "Produits", "Vérification", "En ligne"];
const DUREES = [700, 700, 800, 700, 600, 800, 900, 600];
const PRODUITS = [
  { src: `${LUMI}/clizia.webp`, nom: "Clizia Mama", marque: "Slamp" },
  { src: `${LUMI}/lollo.webp`, nom: "La Lollo", marque: "Slamp" },
  { src: `${LUMI}/tulipe.webp`, nom: "Tulipe", marque: "Suspension" },
] as const;

function ConstructionLumiNice() {
  const { ref, etape, a } = useSequence(DUREES, 3200);
  const n = ETAPES.length - 1;
  const pas = Math.max(0, etape);
  const enLigne = etape >= n;

  return (
    <div ref={ref} className="lb">
      {/* avancement de la construction */}
      <div className="lb-avancement" aria-hidden="true">
        <span className="lb-avancement-icone" data-fini={enLigne || undefined}>
          {enLigne ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <span className="lb-rouage" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <b className="text-[12.5px] text-white">{enLigne ? "Site en ligne" : "Construction du site"}</b>
            <span className="tabular-nums text-[11px] text-white/55">{Math.round((pas / n) * 100)} %</span>
          </span>
          <span className="lb-barre">
            <span style={{ width: `${(pas / n) * 100}%` }} />
          </span>
          <span className="mt-1 block text-[11px] text-[var(--muted)]">{ETAPES[pas]}</span>
        </span>
      </div>

      <div className="browser lb-navigateur">
        <div className="browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="browser-url">lumi-nice.fr</span>
        </div>
        <div className="lb-ecran" aria-hidden="true">
          {/* structure en pointillés */}
          <span className="lb-squelette" style={{ inset: "1.6cqw 2cqw auto 2cqw", height: "5cqw" }} />
          <span className="lb-squelette" style={{ inset: "8.6cqw 2cqw auto 2cqw", height: "34cqw" }} />
          <span className="lb-squelette" style={{ inset: "45cqw auto auto 2cqw", width: "30cqw", height: "15cqw" }} />
          <span className="lb-squelette" style={{ inset: "45cqw auto auto 35cqw", width: "30cqw", height: "15cqw" }} />
          <span className="lb-squelette" style={{ inset: "45cqw auto auto 68cqw", width: "30cqw", height: "15cqw" }} />

          {/* en-tête */}
          <header className="lb-entete ts-el" {...a(1)}>
            <span className="flex items-center gap-[1cqw]">
              <Image src={`${LUMI}/logo.webp`} alt="" width={48} height={48} className="h-[4cqw] w-[4cqw]" />
              <span className="lb-logo">
                LumiNice
                <small>ÉCLAIRAGE · DEPUIS 2014</small>
              </span>
            </span>
            <span className="lb-nav">
              <span>Produits</span>
              <span>Marques</span>
              <span>Catalogues</span>
              <span>Showroom</span>
            </span>
            <span className="flex items-center gap-[1.2cqw]">
              <Search className="h-[1.8cqw] w-[1.8cqw] text-[#b8933f]" />
              <span className="lb-contact">Contact</span>
              <Heart className="h-[1.8cqw] w-[1.8cqw] text-[#3a2f22]" />
            </span>
          </header>

          {/* photo du hero */}
          <div className="lb-photo ts-el ts-el-image" {...a(2)}>
            <Image src={`${LUMI}/hero.webp`} alt="" fill sizes="480px" className="object-cover" />
            <span className="lb-photo-voile" />
            <div className="lb-texte">
              <span className="lb-puce ts-el" {...a(4)}>
                <i /> SHOWROOM À NICE · DEPUIS 2014
              </span>
              <p className="lb-titre ts-el" {...a(3)}>
                L&apos;art de la <em>lumière</em>, sublimé.
              </p>
              <p className="lb-sous-titre ts-el" {...a(4)}>15 000 luminaires des plus belles maisons européennes</p>
              <span className="mt-[2cqw] flex gap-[1.4cqw]">
                <span className="lb-bouton lb-bouton-or ts-el" data-clic={etape === 8 || undefined} {...a(5)}>
                  Découvrir nos produits <ArrowRight className="h-[1.6cqw] w-[1.6cqw]" />
                </span>
                <span className="lb-bouton lb-bouton-verre ts-el" {...a(5)}>
                  Visiter le showroom
                </span>
              </span>
            </div>
          </div>

          {/* produits */}
          <div className="lb-produits">
            {PRODUITS.map((p, i) => (
              <span key={p.nom} className="lb-produit ts-el" style={{ transitionDelay: `${i * 0.12}s` }} {...a(6)}>
                <span className="relative block h-full w-[11cqw] shrink-0 overflow-hidden rounded-[1cqw]">
                  <Image src={p.src} alt="" fill sizes="60px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[1.4cqw] font-semibold uppercase tracking-[0.14em] text-[#b8933f]">{p.marque}</span>
                  <span className="block font-serif text-[2.3cqw] leading-tight text-[#2b2118]">{p.nom}</span>
                </span>
              </span>
            ))}
          </div>

          {/* curseur qui vient cliquer, puis le site passe en ligne */}
          <span
            className="sx-curseur"
            data-visible={(etape >= 7 && etape < 9) || undefined}
            data-clic={etape === 8 || undefined}
            style={{ left: etape >= 7 ? "27%" : "60%", top: etape >= 7 ? "53%" : "80%" }}
          >
            <MousePointer2 className="h-4 w-4" />
          </span>
          <span className="lb-toast ts-el" {...a(8)}>
            <span className="grid h-[3.6cqw] w-[3.6cqw] place-items-center rounded-full bg-[#22c55e] text-white">
              <Check className="h-[2cqw] w-[2cqw]" strokeWidth={3} />
            </span>
            Site publié sur lumi-nice.fr
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroVisuel() {
  const ref = useRef<HTMLDivElement>(null);

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
      <div className="hero-compo">
        {/* Maison Ribier : vrais mockups MacBook + iPhone */}
        <div className="hero-ribier-ordi">
          <Image
            src="/mockups/maison-ribier-macbook.webp"
            alt="Site Maison Ribier réalisé par Romain DesignCode, sur MacBook"
            width={1446}
            height={1228}
            priority
            sizes="(min-width: 1024px) 400px, 60vw"
            className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
          />
        </div>
        <div className="hero-ribier-tel">
          <Image
            src="/mockups/maison-ribier-iphone-face.webp"
            alt="Site Maison Ribier sur iPhone"
            width={888}
            height={1760}
            sizes="(min-width: 1024px) 120px, 20vw"
            className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* LumiNice qui se construit */}
        <div className="hero-lumi">
          <ConstructionLumiNice />
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
