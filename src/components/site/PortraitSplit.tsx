"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PluieCode } from "./PluieCode";

// Le portrait signature de Romain DesignCode : à gauche le designer (illustration
// + éclaboussure), à droite le développeur (photo N&B + code qui défile).
// La frontière est un fondu doux qui suit la souris (ou le doigt) avec un amorti,
// et respire toute seule au repos. Un léger parallaxe donne de la profondeur.
// Tout passe par des variables CSS (--p, --mx, --my) : aucun rendu React par image.


type Force = "designer" | "developpeur" | null;

export function PortraitSplit({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  const racine = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const force = useRef<Force>(null);
  const survol = useRef<{ x: number; y: number } | null>(null);
  const [cote, setCote] = useState<Force>(null);
  const rafraichir = useRef<() => void>(() => {});

  useEffect(() => {
    const el = racine.current;
    const sc = scene.current;
    if (!el || !sc) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let p = 0.5, mx = 0, my = 0;
    let raf = 0, visible = false, dernierCote: Force = null;
    const t0 = performance.now();

    const image = (t: number) => {
      raf = 0;
      const s = (t - t0) / 1000;
      // cible de la frontière
      let cible = 0.5 + 0.1 * Math.sin(s * 0.9) + 0.03 * Math.sin(s * 2.3);
      let cmx = 0.35 * Math.sin(s * 0.6), cmy = 0.25 * Math.cos(s * 0.5);
      if (survol.current) {
        cible = survol.current.x;
        cmx = survol.current.x * 2 - 1;
        cmy = survol.current.y * 2 - 1;
      }
      if (force.current === "designer") cible = 1;
      if (force.current === "developpeur") cible = 0;
      const k = reduit ? 1 : 0.085;
      p += (cible - p) * k;
      mx += (cmx - mx) * (reduit ? 1 : 0.06);
      my += (cmy - my) * (reduit ? 1 : 0.06);
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--mx", mx.toFixed(4));
      el.style.setProperty("--my", my.toFixed(4));
      el.style.setProperty("--bord", String(Math.min(1, Math.min(p, 1 - p) * 12)));
      const c: Force = p > 0.85 ? "designer" : p < 0.15 ? "developpeur" : null;
      if (c !== dernierCote) {
        dernierCote = c;
        setCote(c);
      }
      if (visible && !reduit) raf = requestAnimationFrame(image);
    };
    const relancer = () => {
      if (!raf) raf = requestAnimationFrame(image);
    };

    // première apparition : un balayage complet, puis retour au repos
    const minuteurs: ReturnType<typeof setTimeout>[] = [];
    let premiere = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) relancer();
        if (visible && premiere && !reduit && e.intersectionRatio >= 0.4) {
          premiere = false;
          minuteurs.push(setTimeout(() => (force.current = "designer"), 400));
          minuteurs.push(setTimeout(() => (force.current = "developpeur"), 1700));
          minuteurs.push(setTimeout(() => (force.current = null), 3000));
        }
      },
      { threshold: [0, 0.4] },
    );
    obs.observe(el);
    rafraichir.current = () => (reduit ? image(performance.now()) : relancer());

    const position = (ev: PointerEvent) => {
      const r = sc.getBoundingClientRect();
      survol.current = {
        x: Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)),
        y: Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height)),
      };
      force.current = null;
      if (reduit) image(performance.now());
    };
    const quitter = () => {
      survol.current = null;
      if (reduit) image(performance.now());
    };
    sc.addEventListener("pointermove", position);
    sc.addEventListener("pointerdown", position);
    sc.addEventListener("pointerleave", quitter);
    sc.addEventListener("pointercancel", quitter);
    image(performance.now());

    return () => {
      obs.disconnect();
      minuteurs.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      sc.removeEventListener("pointermove", position);
      sc.removeEventListener("pointerdown", position);
      sc.removeEventListener("pointerleave", quitter);
      sc.removeEventListener("pointercancel", quitter);
    };
  }, []);

  const choisir = (c: Exclude<Force, null>) => {
    survol.current = null;
    force.current = force.current === c ? null : c;
    setCote(force.current);
    rafraichir.current();
  };

  return (
    <div ref={racine} className={`portrait-fluide ${className}`} style={{ ["--p" as string]: 0.5 }}>
      <div
        ref={scene}
        className="portrait-scene relative aspect-[6/5] w-full select-none"
        role="img"
        aria-label="Romain Mornet, moitié designer en illustration, moitié développeur en photo noir et blanc"
      >
        {/* Côté développeur (dessous) : code qui défile + photo N&B */}
        <div className="portrait-calque portrait-dev" aria-hidden="true">
          <PluieCode className="portrait-code" />
          <div className="portrait-photo">
            <Image src="/img/romain-nb.webp" alt="" fill sizes="(min-width: 1024px) 720px, 92vw" className="object-contain object-bottom" priority={priority} />
          </div>
        </div>

        {/* Côté designer (dessus), révélé par un fondu qui suit --p */}
        <div className="portrait-calque portrait-designer" aria-hidden="true">
          <div className="portrait-eclaboussure">
            <Image src="/img/eclaboussure.webp" alt="" fill sizes="(min-width: 1024px) 720px, 92vw" className="object-contain object-[30%_20%]" priority={priority} />
          </div>
          <div className="portrait-photo">
            <Image src="/img/romain-illustration.webp" alt="" fill sizes="(min-width: 1024px) 720px, 92vw" className="object-contain object-bottom" priority={priority} />
          </div>
        </div>

        {/* Frontière lumineuse */}
        <div className="portrait-ligne" aria-hidden="true">
          <span className="portrait-poignee">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>

      {/* Pastilles : montrer un côté (souris, clavier et tactile) */}
      <div className="relative -mt-2 flex justify-center gap-2">
        {(
          [
            ["designer", "Designer", "rose"],
            ["developpeur", "Développeur", "bleu"],
          ] as const
        ).map(([c, libelle, couleur]) => (
          <button key={c} type="button" data-couleur={couleur} aria-pressed={cote === c} className="cote-portrait" onClick={() => choisir(c)}>
            {libelle}
          </button>
        ))}
      </div>
    </div>
  );
}
