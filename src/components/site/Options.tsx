import { Calendar, CreditCard, FileText, Globe, MapPin, Newspaper, PenLine, RefreshCw, ShoppingBag, type LucideIcon } from "lucide-react";
import { Coche } from "./Sections";

// Options à la carte et suivi mensuel, sans prix : tout est chiffré au devis.
const TOUTES: Record<string, { icone: LucideIcon; libelle: string }> = {
  reservation: { icone: Calendar, libelle: "Réservation / rendez-vous" },
  clickCollect: { icone: ShoppingBag, libelle: "Click & collect / livraison" },
  paiement: { icone: CreditCard, libelle: "Paiement en ligne" },
  synchro: { icone: RefreshCw, libelle: "Synchronisation fournisseurs" },
  multilingue: { icone: Globe, libelle: "Site multilingue" },
  pages: { icone: FileText, libelle: "Pages supplémentaires" },
  villes: { icone: MapPin, libelle: "Pages par ville" },
  redaction: { icone: PenLine, libelle: "Rédaction des contenus" },
  blog: { icone: Newspaper, libelle: "Blog et articles SEO" },
};

export type CleOption = keyof typeof TOUTES;

const SUIVI = [
  "1 publication Google par semaine",
  "Réponse à vos avis clients",
  "Suivi de votre positionnement",
  "Maintenance et hébergement",
  "Petites modifications incluses",
  "Support WhatsApp prioritaire",
];

export function Options({
  options = ["reservation", "clickCollect", "multilingue", "pages", "villes", "redaction"],
  titre = "Ajoutez ce dont vous avez besoin.",
}: {
  options?: CleOption[];
  titre?: string;
}) {
  return (
    <section className="section pt-0" aria-labelledby="options-titre">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" aria-hidden="true" />
              Options
            </p>
            <h2 id="options-titre" className="mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-tight tracking-tight">
              {titre}
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[var(--muted)]">
              Votre site est construit sur-mesure : on ajoute uniquement les fonctions utiles à votre activité, chiffrées
              dans le devis.
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {options.map((cle) => {
                const { icone: Icone, libelle } = TOUTES[cle];
                return (
                  <li key={cle} className="option-violette">
                    <Icone className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />
                    {libelle}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="carte-laser lent p-7 md:p-8">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" aria-hidden="true" />
              Suivi mensuel
            </p>
            <h3 className="mt-4 text-[1.4rem] font-bold tracking-tight">Votre site entretenu toute l&apos;année.</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">
              En option, je m&apos;occupe de votre site et de votre visibilité chaque mois, sans engagement.
            </p>
            <ul className="mt-6 space-y-3">
              {SUIVI.map((s) => (
                <li key={s} className="flex gap-3 text-[15.5px]">
                  <Coche />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
