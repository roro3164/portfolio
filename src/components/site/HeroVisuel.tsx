"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Gift, ShoppingBag, Star } from "lucide-react";
import { useEffect, useRef } from "react";

// Visuel du hero : de vrais sites qui défilent dans leurs appareils (LumiNice sur
// ordinateur, Bistrot des Musées sur mobile, menu Niña Bonita), qui flottent et
// suivent légèrement la souris, avec des notifications qui arrivent tour à tour.
// Le badge « Démo offerte » remplace l'ancienne pastille ronde.

const NOTIFS = [
  { icone: ShoppingBag, titre: "Nouvelle commande", texte: "Paiement reçu · 283 €", couleur: "violet", classe: "hero-bulle-1" },
  { icone: CalendarCheck, titre: "Nouvelle réservation", texte: "4 pers. · ce soir 20 h", couleur: "vert", classe: "hero-bulle-2" },
  { icone: Star, titre: "Nouvel avis Google", texte: "★★★★★ « Excellent accueil »", couleur: "bleu", classe: "hero-bulle-3" },
] as const;

export function HeroVisuel() {
  const ref = useRef<HTMLDivElement>(null);

  // inclinaison douce qui suit la souris (amortie)
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
    <div ref={ref} className="hero-visuel relative mx-auto w-full max-w-[640px] pb-10 lg:pb-0">
      {/* Badge « Démo offerte » */}
      <Link href="/demo-gratuite" className="badge-demo group" aria-label="Recevoir ma démo gratuite">
        <span className="badge-demo-icone" aria-hidden="true">
          <Gift className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <span className="leading-tight">
          <span className="badge-demo-titre">Démo offerte</span>
          <span className="block text-[12.5px] text-white/70">Testez votre site avant de payer</span>
        </span>
        <span className="badge-demo-fleche" aria-hidden="true">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
      <div className="hero-scene">
        {/* Ordinateur : la boutique LumiNice défile */}
        <div className="hero-couche hero-couche-1">
          <div className="browser hero-flotte-1">
            <div className="browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="browser-url">lumi-nice.fr</span>
            </div>
            <div className="hero-ecran aspect-[16/10]">
              <Image
                src="/hero/lumi-nice-defile.webp"
                alt="Boutique en ligne LumiNice réalisée par Romain DesignCode"
                width={960}
                height={2400}
                priority
                sizes="(min-width: 1024px) 600px, 92vw"
                className="hero-defile hero-defile-ordi"
              />
            </div>
          </div>
        </div>

        {/* Menu Niña Bonita */}
        <div className="hero-couche hero-couche-2 absolute -bottom-2 -left-6 hidden w-[58%] sm:block lg:-left-14">
          <div className="browser hero-flotte-2 -rotate-[2.5deg]">
            <div className="browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="browser-url">nina-bonita · menu</span>
            </div>
            <div className="hero-ecran aspect-[16/10]">
              <Image
                src="/realisations/nina-bonita-menu.webp"
                alt="Menu du restaurant Niña Bonita, site réalisé par Romain DesignCode"
                fill
                sizes="(min-width: 1024px) 340px, 50vw"
                className="hero-zoom object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Mobile : le Bistrot des Musées défile */}
        <div className="hero-couche hero-couche-3 absolute -bottom-10 -right-3 w-[26%] lg:-right-8">
          <div className="phone hero-flotte-3 rotate-[3deg]">
            <div className="hero-ecran aspect-[390/844]">
              <Image
                src="/hero/bistrot-mobile-defile.webp"
                alt="Site du Bistrot des Musées sur mobile"
                width={390}
                height={2600}
                sizes="180px"
                className="hero-defile hero-defile-tel"
              />
            </div>
          </div>
        </div>

        {/* Notifications qui arrivent tour à tour */}
        {NOTIFS.map((n) => {
          const Icone = n.icone;
          return (
            <div key={n.titre} data-couleur={n.couleur} className={`hero-bulle ${n.classe}`} aria-hidden="true">
              <span className="hero-bulle-icone">
                <Icone className="h-3.5 w-3.5" />
              </span>
              <span className="leading-tight">
                <b className="block text-[12.5px] text-white">{n.titre}</b>
                <span className="text-[11.5px] text-[var(--muted)]">{n.texte}</span>
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
