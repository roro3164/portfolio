"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Iphone } from "./Appareils";
import { Clip } from "./Clip";

export type EtapeVisite = {
  id: string;
  numero: string;
  titre: string;
  texte: string;
  points: string[];
  /** Écran 1440 × 900 (ou affiche du clip). */
  src: string;
  clip?: string;
  alt: string;
};

/** Écran du MacBook : toutes les captures empilées, seule l'active est visible (fondu). */
function Ordinateur({ etapes, active }: { etapes: EtapeVisite[]; active: number }) {
  return (
    <div className="vp-ordi">
      <Image src="/portfolio/primaps/macbook-cadre.webp" alt="" width={1446} height={1228} sizes="(min-width: 1024px) 720px, 92vw" className="h-auto w-full" />
      <div className="vp-ordi-ecran">
        {etapes.map((e, i) => (
          <div key={e.id} className="vp-ecran" data-actif={i === active || undefined} aria-hidden={i !== active}>
            {e.clip ? (
              <Clip src={e.clip} poster={e.src} label={e.alt} className="h-full object-cover object-top" />
            ) : (
              <Image src={e.src} alt={e.alt} fill sizes="(min-width: 1024px) 580px, 74vw" className="object-cover object-top" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Visite du produit : le texte défile à gauche, le MacBook reste épinglé à droite et change d'écran. */
export function VisitePrimaps({ etapes }: { etapes: EtapeVisite[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="vp grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <ol className="vp-etapes">
        {etapes.map((e, i) => (
          <li
            key={e.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            data-actif={i === active || undefined}
            className="vp-etape"
          >
            <p className="vp-numero">{e.numero}</p>
            <h3 className="h3 mt-3">{e.titre}</h3>
            <p className="mt-3 text-[16.5px] leading-relaxed text-[var(--muted)]">{e.texte}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {e.points.map((p) => (
                <li key={p} className="vp-puce">
                  {p}
                </li>
              ))}
            </ul>
            {/* Mobile et tablette : l'écran suit chaque étape */}
            <div className="mt-8 lg:hidden">
              <Ordinateur etapes={[e]} active={0} />
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="vp-epingle">
          <div className="relative">
            <div className="vp-halo" aria-hidden="true" />
            <Ordinateur etapes={etapes} active={active} />
            <div className="vp-tel">
              <Iphone>
                <div className="vp-tel-ecran">
                  <Image
                    src="/portfolio/primaps/m-site-mobile.webp"
                    alt="Le site du Petit Kreuzberg sur téléphone, créé avec Primaps"
                    width={390}
                    height={3200}
                    sizes="170px"
                    className="vp-defile"
                  />
                </div>
              </Iphone>
            </div>
          </div>
          <div className="vp-progression" aria-hidden="true">
            {etapes.map((e, i) => (
              <span key={e.id} data-actif={i === active || undefined} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
