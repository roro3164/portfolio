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
          <path id="cercle-pastille" d="M100,100 m-87,0 a87,87 0 1,1 174,0 a87,87 0 1,1 -174,0" />
        </defs>
        <text>
          <textPath href="#cercle-pastille" startOffset="0" textLength="540" lengthAdjust="spacing">
            {texte}
          </textPath>
        </text>
      </svg>
      <span className="pastille-coeur">
        <span className="flex flex-col items-center justify-center gap-1.5 leading-none">
          <Gift className="h-7 w-7 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={2} aria-hidden="true" />
          <span className="flex flex-col items-center gap-[3px] text-[23px] font-extrabold uppercase leading-none tracking-[0.04em]">
            <span className="block">Démo</span>
            <span className="block">offerte</span>
          </span>
        </span>
      </span>
    </Link>
  );
}
