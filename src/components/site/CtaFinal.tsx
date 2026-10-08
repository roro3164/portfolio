import { Gift } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/site";

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
        <div className="carte-laser lent relative overflow-hidden !rounded-[28px] px-6 py-16 text-center [--radius:28px] sm:px-12 md:py-20">
          <div className="halo -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2" aria-hidden="true" />
          <div className="relative">
            <h2 className="h2 mx-auto max-w-2xl">{titre}</h2>
            <p className="lead mx-auto mt-5 max-w-xl">{texte}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/demo-gratuite" className="btn btn-primary w-full sm:w-auto">
                <Gift className="h-4 w-4" aria-hidden="true" />
                Recevoir ma démo gratuite
              </Link>
              <a href={`mailto:${SITE.email}`} className="btn btn-ghost w-full sm:w-auto">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
