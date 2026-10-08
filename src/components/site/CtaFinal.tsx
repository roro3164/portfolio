import { Gift, Mail } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { DemoTablette } from "./DemoTablette";
import { PastilleDemo } from "./PastilleDemo";

// Appel final : texte + bouton à gauche, à droite une tablette où une démo de
// site se construit élément par élément, en boucle.
export function CtaFinal({
  titre = "Recevez votre démo gratuite.",
  texte = "Présentez-moi votre activité : je crée une vraie démo de votre futur site, en ligne et à votre nom. Vous la testez avant de décider, sans engagement.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <section className="section pt-0">
      <div className="wrap">
        <div className="carte-laser lent relative grid items-center gap-12 overflow-hidden !rounded-[28px] px-6 py-14 [--radius:28px] sm:px-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20 lg:pl-16">
          <div className="halo -left-32 -top-40 h-[420px] w-[620px]" aria-hidden="true" />
          <div className="relative text-center lg:text-left">
            <h2 className="h2 mx-auto max-w-xl lg:mx-0">{titre}</h2>
            <p className="lead mx-auto mt-5 max-w-xl lg:mx-0">{texte}</p>
            <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/demo-gratuite" className="btn btn-primary !min-h-[56px] w-full !px-7 !text-[16.5px] sm:w-auto">
                <Gift className="h-[18px] w-[18px]" aria-hidden="true" />
                Recevoir ma démo gratuite
              </Link>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-[14.5px] text-[var(--muted)] underline-offset-4 hover:text-white hover:underline">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]" aria-hidden="true">
            <DemoTablette />
            <PastilleDemo id="cercle-pastille-cta" className="-right-6 -top-16 hidden scale-[0.78] sm:grid xl:-right-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
