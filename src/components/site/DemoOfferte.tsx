import { Gift } from "lucide-react";
import Link from "next/link";
import { Telephone } from "./Cadres";
import { VideoAuto } from "./VideoAuto";

const ETAPES = [
  ["Vous présentez votre activité", "Quelques lignes suffisent."],
  ["Je crée votre démo en ligne", "Un vrai site, à votre nom, avec vos textes, vos photos et vos couleurs."],
  ["Vous la testez et vous décidez", "Elle vous plaît : on la finalise. Sinon, vous ne payez rien."],
];

export function DemoOfferte() {
  return (
    <section className="section" aria-labelledby="demo-titre">
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
            <h2 id="demo-titre" className="h2 mt-5">
              Testez votre futur site <span className="grad">avant de payer</span>.
            </h2>
            <p className="lead mt-5">
              Je crée une vraie démo de votre site, en ligne. Vous l&apos;ouvrez sur votre
              téléphone, vous la montrez autour de vous, puis vous décidez.
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
            <Link href="/demo-gratuite" className="btn btn-primary mt-9 !min-h-[54px] !px-7">
              <Gift className="h-[18px] w-[18px]" aria-hidden="true" />
              Recevoir ma démo gratuite
            </Link>
          </div>

          <div className="relative pb-8">
            <div className="browser">
              <div className="browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="browser-url">lumi-nice.fr</span>
              </div>
              <VideoAuto
                src="/videos/lumi-nice-ordinateur.mp4"
                poster="/videos/lumi-nice-ordinateur.webp"
                label="Vidéo : navigation sur la boutique LumiNice, de l'accueil à une fiche produit"
                className="aspect-[16/10] object-cover"
              />
            </div>
            <Telephone
              src="/realisations/lumi-nice-mobile.webp"
              alt="La boutique LumiNice sur téléphone"
              className="absolute -bottom-3 -right-2 w-[24%] rotate-[3deg] sm:-right-5"
            />
            <div className="demo-toast absolute -left-2 bottom-[18%] sm:-left-6" aria-hidden="true">
              <span className="demo-toast-point" />
              <span>
                <span className="block text-[13px] font-semibold text-white">Votre démo est en ligne</span>
                <span className="block text-[12px] text-white/60">Ouvrez-la sur votre téléphone</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
