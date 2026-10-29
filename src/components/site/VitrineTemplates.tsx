"use client";

import { useEffect, useRef, useState } from "react";
import { Iphone, Macbook } from "./Appareils";
import { DEMO_BASE, type DemoMetier } from "@/content/portfolio";

// « Tester les templates » : la vraie démo d'un template (primaps.fr, sans sa barre) tourne dans
// un MacBook (1440 × 900) et un iPhone (390 × 844) ; on choisit le métier et on passe d'un template à l'autre.

/** Iframe rendue à sa taille réelle puis réduite à la largeur de l'écran de l'appareil. */
function Ecran({ src, largeur, hauteur, titre }: { src: string; largeur: number; hauteur: number; titre: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [echelle, setEchelle] = useState(0);
  const [charge, setCharge] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setEchelle(e.contentRect.width / largeur));
    ro.observe(el);
    return () => ro.disconnect();
  }, [largeur]);
  useEffect(() => setCharge(false), [src]);
  return (
    <div ref={ref} className="vt-ecran" style={{ aspectRatio: `${largeur} / ${hauteur}` }}>
      {echelle > 0 && (
        <iframe
          src={src}
          title={titre}
          loading="lazy"
          onLoad={() => setCharge(true)}
          style={{ width: largeur, height: hauteur, transform: `scale(${echelle})`, opacity: charge ? 1 : 0 }}
        />
      )}
      {!charge && <span className="vt-chargement" aria-hidden="true" />}
    </div>
  );
}

export function VitrineTemplates({ metiers }: { metiers: DemoMetier[] }) {
  const [m, setM] = useState(0);
  const [i, setI] = useState(0);
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const maj = () => setLarge(mq.matches);
    maj();
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);

  const metier = metiers[m];
  const n = metier.templates.length;
  const [nom, style] = metier.templates[i];
  const src = `${DEMO_BASE}?m=${metier.id}&i=${i}&cadre=1`;
  const aller = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <div className="vt">
      <div className="vt-metiers" role="tablist" aria-label="Métier">
        {metiers.map((x, k) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={k === m}
            onClick={() => {
              setM(k);
              setI(0);
            }}
          >
            {x.libelle}
            <span>{x.templates.length}</span>
          </button>
        ))}
      </div>

      <div className="vt-scene">
        {/* Sur téléphone, seul l'iPhone : deux sites complets en même temps seraient trop lourds. */}
        {large && (
          <Macbook className="vt-mac">
            <Ecran src={src} largeur={1440} hauteur={900} titre={`${nom}, version ordinateur`} />
          </Macbook>
        )}
        <Iphone className="vt-iphone">
          <Ecran src={src} largeur={390} hauteur={844} titre={`${nom}, version téléphone`} />
        </Iphone>
      </div>

      <div className="vt-nav">
        <button type="button" onClick={() => aller(-1)} aria-label="Template précédent" className="vt-fleche">
          ←
        </button>
        <p aria-live="polite">
          <b>{nom}</b>
          <span>
            {style} · {i + 1}/{n}
          </span>
        </p>
        <button type="button" onClick={() => aller(1)} aria-label="Template suivant" className="vt-fleche">
          →
        </button>
      </div>
      <p className="vt-aide">
        Faites défiler dans l&apos;écran pour parcourir le site.{" "}
        <a href={`${DEMO_BASE}?m=${metier.id}&i=${i}`} target="_blank" rel="noopener noreferrer">
          Ouvrir en plein écran ↗
        </a>
      </p>
    </div>
  );
}
