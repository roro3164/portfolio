import { Gift } from "lucide-react";
import Link from "next/link";

// Pastille « Démo offerte » : texte circulaire qui tourne, anneau laser, disque central.
export function PastilleDemo({ className = "" }: { className?: string }) {
  const texte = "DÉMO GRATUITE · SANS ENGAGEMENT · ";
  return (
    <Link href="/demo-gratuite" aria-label="Recevoir ma démo gratuite" className={`pastille-demo group ${className}`}>
      <span className="pastille-anneau" aria-hidden="true" />
      <svg className="pastille-texte" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="cercle-pastille" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text>
          <textPath href="#cercle-pastille" startOffset="0" textLength="496" lengthAdjust="spacing">
            {texte}
          </textPath>
        </text>
      </svg>
      <span className="pastille-coeur">
        <Gift className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={2} aria-hidden="true" />
        <span className="mt-1 block text-[13px] font-bold uppercase tracking-[0.14em] text-white/85">Démo</span>
        <span className="block text-[25px] font-extrabold leading-none tracking-tight">offerte</span>
      </span>
    </Link>
  );
}
