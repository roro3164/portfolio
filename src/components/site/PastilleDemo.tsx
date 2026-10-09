import { ArrowUpRight, Gift } from "lucide-react";
import Link from "next/link";

// Pastille « Démo offerte » façon sceau : onde qui s'échappe, anneau laser,
// deux filets fins qui encadrent le texte circulaire (qui tourne), disque
// central brillant avec un reflet qui passe. Au survol, le cadeau devient une flèche.
export function PastilleDemo({ className = "", id = "cercle-pastille" }: { className?: string; id?: string }) {
  return (
    <Link href="/demo-gratuite" aria-label="Recevoir ma démo gratuite" className={`pastille-demo group ${className}`}>
      <span className="pastille-onde" aria-hidden="true" />
      <span className="pastille-anneau" aria-hidden="true" />
      <svg className="pastille-filets" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="94" />
        <circle cx="100" cy="100" r="74.5" />
      </svg>
      <svg className="pastille-texte" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id={id} d="M100,100 m-81,0 a81,81 0 1,1 162,0 a81,81 0 1,1 -162,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} startOffset="0" textLength="502" lengthAdjust="spacing">
            <tspan className="pastille-texte-fort">DÉMO GRATUITE</tspan>
            <tspan className="pastille-texte-etoile"> ✦ </tspan>
            <tspan>SANS ENGAGEMENT</tspan>
            <tspan className="pastille-texte-etoile"> ✦ </tspan>
          </textPath>
        </text>
      </svg>
      <span className="pastille-coeur">
        <span className="pastille-reflet" aria-hidden="true" />
        <span className="relative flex flex-col items-center justify-center leading-none">
          <span className="pastille-icone" aria-hidden="true">
            <Gift className="pastille-cadeau h-[18px] w-[18px]" strokeWidth={2.2} />
            <ArrowUpRight className="pastille-fleche h-[18px] w-[18px]" strokeWidth={2.6} />
          </span>
          <span className="mt-2 text-[15px] font-semibold uppercase tracking-[0.32em] text-white/85">Démo</span>
          <span className="mt-1 text-[25px] font-extrabold uppercase tracking-[0.02em]">Offerte</span>
        </span>
      </span>
    </Link>
  );
}
