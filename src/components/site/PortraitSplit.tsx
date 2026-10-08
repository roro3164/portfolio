"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Le portrait signature de Romain DesignCode : côté gauche le designer
// (illustration + éclaboussure), côté droit le développeur (photo N&B + code),
// séparés par un trait laser. Au survol (ou via les deux pastilles), un côté
// prend toute la place. À la première apparition, le trait balaie une fois.

const MOTS = [
  ["<html>", "<div>", "React", "</div>"],
  ["<script>", "Node.js", "<footer>", "SQL"],
  ["Shopify", "<header>", "Next.js", "HTML5"],
  ["<h1>", "API", "Git", "TypeScript"],
];

type Zone = "gauche" | "droite" | null;

export function PortraitSplit({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  const [zone, setZone] = useState<Zone>(null);
  const coupe = zone === "gauche" ? 100 : zone === "droite" ? 0 : 50;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const minuteurs: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        minuteurs.push(setTimeout(() => setZone("gauche"), 500));
        minuteurs.push(setTimeout(() => setZone("droite"), 2000));
        minuteurs.push(setTimeout(() => setZone(null), 3500));
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      minuteurs.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
    <div
      className="portrait-split relative aspect-[6/5] w-full select-none"
      style={{ maskImage: "linear-gradient(to bottom, #000 72%, transparent 98%)", WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 98%)" }}
      onMouseLeave={() => setZone(null)}
      role="img"
      aria-label="Romain Mornet, moitié designer en illustration, moitié développeur en photo noir et blanc"
    >
      {/* Côté designer, découpé à gauche du trait */}
      <div
        className="absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ clipPath: `inset(0 ${100 - coupe}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src="/img/eclaboussure.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 620px, 92vw"
          className="object-contain object-[30%_20%] opacity-90"
          priority={priority}
        />
        <Image src="/img/romain-illustration.webp" alt="" fill sizes="(min-width: 1024px) 620px, 92vw" className="object-contain object-bottom" priority={priority} />
      </div>

      {/* Côté développeur, découpé */}
      <div
        className="absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ clipPath: `inset(0 0 0 ${coupe}%)` }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-[4%] top-[14%] bottom-[18%] grid grid-rows-4 font-mono text-[clamp(10px,1.15vw,14px)]">
          {MOTS.map((ligne, i) => (
            <div key={i} className="grid grid-cols-4 items-center justify-items-center">
              {ligne.map((m, j) => (
                <span key={m} className="mot-neon" style={{ animationDelay: `${(i * 4 + j) * 0.37}s` }}>
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
        <Image src="/img/romain-nb.webp" alt="" fill sizes="(min-width: 1024px) 620px, 92vw" className="object-contain object-bottom" priority={priority} />
      </div>

      {/* Trait laser */}
      <div
        className="laser absolute bottom-[6%] top-[4%] w-[2px] -translate-x-1/2 transition-[left] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ left: `${coupe}%` }}
        aria-hidden="true"
      >
        <span className="laser-eclat" />
      </div>

      {/* Zones de survol (souris uniquement) */}
      <div className="absolute inset-y-0 left-0 w-1/2" onMouseEnter={() => setZone("gauche")} aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-1/2" onMouseEnter={() => setZone("droite")} aria-hidden="true" />
    </div>

      {/* Pastilles : montrer un côté (souris, clavier et tactile) */}
      <div className="relative -mt-2 flex justify-center gap-2" onMouseLeave={() => setZone(null)}>
        {(
          [
            ["gauche", "Designer", "rose"],
            ["droite", "Développeur", "bleu"],
          ] as const
        ).map(([z, libelle, couleur]) => (
          <button
            key={z}
            type="button"
            data-couleur={couleur}
            aria-pressed={zone === z}
            className="cote-portrait"
            onMouseEnter={() => setZone(z)}
            onFocus={() => setZone(z)}
            onBlur={() => setZone(null)}
            onClick={() => setZone(zone === z ? null : z)}
          >
            {libelle}
          </button>
        ))}
      </div>
    </div>
  );
}
