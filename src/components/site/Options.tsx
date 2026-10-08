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
        <div className="reveal tuile tuile-neutre grid gap-8 p-8 md:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h2 id="options-titre" className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-bold leading-tight tracking-tight">
              {titre}
            </h2>
            <p className="mt-2 text-[15px] text-white/65">Uniquement les fonctions utiles à votre activité, chiffrées dans le devis.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {options.map((cle) => {
                const { icone: Icone, libelle } = TOUTES[cle];
                return (
                  <li key={cle} className="option-violette !py-2 !text-[13px]">
                    <Icone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                    {libelle}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-[15px] font-semibold text-white">Suivi mensuel, sans engagement</p>
            <ul className="mt-3 space-y-2">
              {SUIVI.map((x) => (
                <li key={x} className="flex gap-3 text-[14.5px] text-white/75">
                  <Coche />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
