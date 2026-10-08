import { Gift } from "lucide-react";
import Link from "next/link";
import { MaquetteSplit } from "./MaquetteSplit";

const ETAPES = [
  ["Vous présentez votre activité", "Quelques lignes suffisent."],
  ["Je dessine votre page d'accueil", "À votre nom, avec vos couleurs et vos photos."],
  ["Vous décidez", "Elle vous plaît : on continue. Sinon, vous ne payez rien."],
];

export function MaquetteOfferte() {
  return (
    <section className="section" aria-labelledby="maquette-titre">
      <div className="wrap">
        <div className="reveal carte-laser lent relative grid items-center gap-12 overflow-hidden p-7 [--radius:30px] md:p-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="halo -left-40 -top-40 h-[420px] w-[420px]" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#8b5cf6] text-white">
                <Gift className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Offert, sans engagement
            </p>
            <h2 id="maquette-titre" className="h2 mt-5">
              Voyez votre futur site <span className="grad">avant de payer</span>.
            </h2>
            <p className="lead mt-5">
              Je dessine gratuitement la page d&apos;accueil de votre site. Vous jugez sur pièce, pas sur une promesse.
            </p>
            <ol className="mt-8 space-y-4">
              {ETAPES.map(([t, d], i) => (
                <li key={t} className="flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6a5acd)] text-[13px] font-bold text-white shadow-[0_0_14px_rgba(139,92,246,0.5)]">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-[15.5px] text-[var(--muted)]">
                    <strong className="font-semibold text-white">{t}.</strong> {d}
                  </p>
                </li>
              ))}
            </ol>
            <Link href="/maquette-gratuite" className="btn btn-primary mt-9 !min-h-[54px] !px-7">
              <Gift className="h-[18px] w-[18px]" aria-hidden="true" />
              Recevoir ma maquette gratuite
            </Link>
          </div>
          <div className="relative">
            <MaquetteSplit
              src="/realisations/bistrot-des-musees-accueil.webp"
              alt="Page d'accueil du Bistrot des Musées, de la maquette au site livré"
              url="votre-futur-site.fr"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
