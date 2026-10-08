import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Coche, Fleche } from "./Sections";

export type Service = {
  href: string;
  couleur: "violet" | "vert" | "bleu";
  icone: LucideIcon;
  surtitre: string;
  titre: string;
  texte: string;
  points: string[];
  visuel: { src: string; alt: string; w: number; h: number; cadrage?: string };
};

// Carte de service : visuel produit sur halo coloré, contenu clair, flèche ronde.
export function CarteService({ s }: { s: Service }) {
  const Icone = s.icone;
  return (
    <Link href={s.href} data-couleur={s.couleur} className="reveal group carte-laser lent carte-service flex h-full flex-col">
      <div className="carte-service-visuel relative m-2 overflow-hidden rounded-[14px]">
        <div className="absolute inset-0 grille-points" aria-hidden="true" />
        <Image
          src={s.visuel.src}
          alt={s.visuel.alt}
          width={s.visuel.w}
          height={s.visuel.h}
          sizes="(min-width: 1024px) 380px, 90vw"
          className={`relative mx-auto h-full w-auto object-contain transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.04] ${s.visuel.cadrage ?? ""}`}
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <div className="flex items-center gap-3">
          <span className="icone-service" aria-hidden="true">
            <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
          <span className="text-[13.5px] font-semibold text-[var(--accent)]">{s.surtitre}</span>
        </div>
        <h3 className="mt-4 text-[1.65rem] font-bold leading-tight tracking-tight">{s.titre}</h3>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--muted)]">{s.texte}</p>
        <ul className="mt-5 space-y-2.5">
          {s.points.map((p) => (
            <li key={p} className="flex gap-3 text-[15px]">
              <Coche />
              {p}
            </li>
          ))}
        </ul>
        <span className="mt-auto flex items-center justify-between pt-7">
          <span className="font-semibold text-white">En savoir plus</span>
          <span className="fleche-ronde" aria-hidden="true">
            <Fleche className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}
