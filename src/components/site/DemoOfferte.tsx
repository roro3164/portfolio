"use client";

import { Check, Gift, Link2, Mail, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Telephone } from "./Cadres";
import { VideoAuto } from "./VideoAuto";

// L'offre d'entrée. Les 3 étapes s'allument tour à tour (barre de progression) et
// le visuel réagit : brief reçu, démo en ligne avec son lien, démo validée.

const ETAPES = [
  ["Vous présentez votre activité", "Quelques lignes suffisent."],
  ["Je crée votre démo en ligne", "Un vrai site, à votre nom, avec vos textes, vos photos et vos couleurs."],
  ["Vous la testez et vous décidez", "Elle vous plaît : on la finalise. Sinon, vous ne payez rien."],
] as const;

const TOASTS = [
  { icone: Mail, titre: "Brief reçu", texte: "Restaurant · Montpellier" },
  { icone: null, titre: "Votre démo est en ligne", texte: "Ouvrez-la sur votre téléphone" },
  { icone: PartyPopper, titre: "Démo validée", texte: "On passe à la finalisation" },
] as const;

export function DemoOfferte() {
  const ref = useRef<HTMLDivElement>(null);
  const [etape, setEtape] = useState(1);
  const [vue, setVue] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setInterval>;
    const obs = new IntersectionObserver(([e]) => {
      clearInterval(t);
      if (e.isIntersecting) setVue(true);
      if (e.isIntersecting) {
        setEtape(0);
        t = setInterval(() => setEtape((n) => (n + 1) % 3), 3200);
      }
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearInterval(t);
    };
  }, []);

  const toast = TOASTS[etape];
  const IconeToast = toast.icone;

  return (
    <section className="section" aria-labelledby="demo-titre">
      <div className="wrap">
        <div ref={ref} className="reveal relative" data-vue={vue || undefined}>
          {/* halo qui s'allume quand on arrive sur la section */}
          <span className="demo-glow demo-glow-visuel" aria-hidden="true" />
          <span className="demo-glow demo-glow-texte" aria-hidden="true" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="eyebrow">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#8b5cf6] text-white">
                  <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                Offert, sans engagement
              </p>
              <h2 id="demo-titre" className="h2 mt-5">
                Testez votre futur site <span className="grad">avant de payer</span>.
              </h2>
              <p className="lead mt-5">
                Je crée une vraie démo de votre site, en ligne. Vous l&apos;ouvrez sur votre téléphone, vous la montrez autour
                de vous, puis vous décidez.
              </p>

              <ol className="demo-parcours mt-8">
                {ETAPES.map(([t, d], i) => (
                  <li key={t} data-etat={i < etape ? "fait" : i === etape ? "actif" : "attente"} className="demo-parcours-etape">
                    <span className="demo-parcours-num" aria-hidden="true">
                      {i < etape ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15.5px] text-[var(--muted)]">
                        <strong className="font-semibold text-white">{t}.</strong> {d}
                      </p>
                      <span className="demo-parcours-barre" aria-hidden="true">
                        <span />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/demo-gratuite" className="btn btn-primary !min-h-[54px] !px-7">
                  <Gift className="h-[18px] w-[18px]" aria-hidden="true" />
                  Recevoir ma démo gratuite
                </Link>
              </div>
            </div>

            <div className="relative pb-8">
              <div className="browser">
                <div className="browser-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span className="browser-url">bistrot-fernand · démo Primaps</span>
                </div>
                <VideoAuto
                  src="/videos/bistrot-fernand-ordinateur.mp4"
                  poster="/videos/bistrot-fernand-ordinateur.webp"
                  label="Vidéo : navigation sur la démo du site du Bistrot Fernand, de l'accueil au menu"
                  className="aspect-[16/10] object-cover"
                />
              </div>
              <Telephone
                src="/realisations/bistrot-fernand-mobile.webp"
                alt="La démo du Bistrot Fernand sur téléphone"
                className="absolute -bottom-3 -right-2 w-[24%] rotate-[3deg] sm:-right-5"
              />

              {/* lien de partage de la démo */}
              <div className="demo-lien" data-copie={etape === 2 || undefined} aria-hidden="true">
                <Link2 className="h-3.5 w-3.5 shrink-0 text-[#c4b5fd]" />
                <span className="truncate text-[12px] text-white/80">Lien privé de votre démo</span>
                <span className="demo-lien-bouton">{etape === 2 ? "Envoyé ✓" : "Partager"}</span>
              </div>

              {/* notification synchronisée avec l'étape */}
              <div key={etape} className="demo-toast demo-toast-etape absolute -left-2 bottom-[22%] sm:-left-6" aria-hidden="true">
                {IconeToast ? (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[linear-gradient(145deg,#8b5cf6,#6d3fe0)] text-white">
                    <IconeToast className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="demo-toast-point" />
                )}
                <span>
                  <span className="block text-[13px] font-semibold text-white">{toast.titre}</span>
                  <span className="block text-[12px] text-white/60">{toast.texte}</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
