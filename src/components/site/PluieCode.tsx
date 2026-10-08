"use client";

import { useEffect, useRef } from "react";

// Pluie de code façon « Matrix », en violet, derrière le portrait du développeur.
// Chaque colonne fait tomber des chiffres et des symboles ; certaines épellent
// un mot du métier (React, Shopify…). Tête claire, traîne violette qui s'efface.
// Canvas transparent : la traîne s'efface par « destination-out ».

const GLYPHES = "0101010110<>/{}[]=;:+*#$&%01ABCDEF0123456789";
const MOTS = ["React", "Next.js", "Shopify", "<div>", "SQL", "Liquid", "API", "Git", "SEO", "</>", "Node", "HTML5", "CSS", "JSON"];

type Colonne = { y: number; vitesse: number; source: string | null; i: number; dernier: string; attente: number };

export function PluieCode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, taille = 14, colonnes: Colonne[] = [];
    let raf = 0, visible = false, dernier = 0;

    const hasard = (a: number, b: number) => a + Math.random() * (b - a);
    const nouvelle = (y = hasard(-14, 0)): Colonne => ({
      y,
      vitesse: hasard(0.55, 1.25),
      source: Math.random() < 0.2 ? MOTS[Math.floor(Math.random() * MOTS.length)] : null,
      i: 0,
      dernier: "",
      attente: 0,
    });

    const dimensionner = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      taille = Math.max(11, Math.min(15, w / 42));
      const n = Math.floor(w / (taille * 1.15));
      colonnes = Array.from({ length: n }, () => nouvelle(hasard(-h / taille / 3, h / taille)));
      ctx.font = `600 ${taille}px ui-monospace, "Geist Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      if (reduit) figer();
    };

    const caractere = (c: Colonne) => {
      if (c.source) {
        const ch = c.source[c.i % c.source.length];
        c.i += 1;
        return ch;
      }
      return GLYPHES[Math.floor(Math.random() * GLYPHES.length)];
    };

    const pas = () => {
      // efface doucement l'image précédente (traîne)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.075)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      const pasX = w / colonnes.length;
      colonnes.forEach((c, k) => {
        c.attente += c.vitesse;
        if (c.attente < 1) return;
        c.attente -= 1;
        const x = pasX * (k + 0.5);
        const y = c.y * taille;
        // le caractère précédent repasse en violet
        if (c.dernier) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = c.source ? "rgba(196, 181, 253, 0.95)" : "rgba(139, 92, 246, 0.85)";
          ctx.fillText(c.dernier, x, y - taille);
        }
        // tête lumineuse
        const ch = caractere(c);
        ctx.shadowColor = "rgba(167, 139, 250, 0.95)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#f3efff";
        ctx.fillText(ch, x, y);
        c.dernier = ch;
        c.y += 1;
        if (y > h * 0.7 && Math.random() > 0.93) colonnes[k] = nouvelle();
      });
      ctx.shadowBlur = 0;
    };

    const figer = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 60; i++) pas();
    };

    const boucle = (t: number) => {
      raf = 0;
      if (t - dernier > 55) {
        dernier = t;
        pas();
      }
      if (visible) raf = requestAnimationFrame(boucle);
    };

    const ro = new ResizeObserver(dimensionner);
    ro.observe(canvas);
    dimensionner();

    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduit && !raf) raf = requestAnimationFrame(boucle);
    });
    obs.observe(canvas);

    return () => {
      ro.disconnect();
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
