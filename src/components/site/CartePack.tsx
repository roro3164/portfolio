import Link from "next/link";
import { Fleche } from "./Sections";

// Carte « pack » reprise de l'ancien site : bord laser coloré, fond gris en verre,
// bandeau de titre en couleur, encadré sombre, étiquettes et puces colorées.
// Les prix sont remplacés par « Idéal pour ».

export type Pack = {
  href: string;
  couleur: "violet" | "vert" | "bleu" | "or";
  titre: string;
  intro: string;
  idealPour: string;
  promesse: string;
  blocs: { etiquette: string; detail?: string; points: string[] }[];
};

export function CartePack({ pack }: { pack: Pack }) {
  return (
    <Link href={pack.href} data-couleur={pack.couleur} className="reveal group carte-laser pack flex h-full flex-col">
      <div className="pack-verre m-[1.5px] flex flex-1 flex-col rounded-[16.5px] px-5 pb-6 pt-5 sm:px-6">
        <div className="pack-coin" aria-hidden="true" />
        <h3 className="pack-titre">{pack.titre}</h3>
        <p className="mt-3 text-center text-[14.5px] italic leading-snug text-white/90">{pack.intro}</p>

        <div className="pack-encadre mt-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Idéal pour</p>
          <p className="mt-1.5 text-[15.5px] font-semibold leading-snug text-white">{pack.idealPour}</p>
          <p className="mt-2 text-[13.5px] text-white/60">{pack.promesse}</p>
        </div>

        <div className="mt-6 space-y-5">
          {pack.blocs.map((b) => (
            <div key={b.etiquette}>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="pack-etiquette">{b.etiquette}</span>
                {b.detail && <span className="text-[15px] font-bold text-white">{b.detail}</span>}
              </p>
              <ul className="mt-3 space-y-2">
                {b.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-white">
                    <span className="pack-puce" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-[var(--accent)]">
          En savoir plus <Fleche className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
