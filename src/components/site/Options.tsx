import { Calendar, CreditCard, FileText, Globe, MapPin, Newspaper, PenLine, RefreshCw, ShoppingBag, type LucideIcon } from "lucide-react";

import { SuiviAnime } from "./SuiviAnime";

// Options à la carte (sans prix : tout est chiffré au devis) et suivi mensuel.
// Les options défilent sur deux rangées en sens opposé, le suivi se coche tout seul.

type Couleur = "violet" | "vert" | "bleu";

const TOUTES: Record<string, { icone: LucideIcon; libelle: string; couleur: Couleur }> = {
  reservation: { icone: Calendar, libelle: "Réservation / rendez-vous", couleur: "vert" },
  clickCollect: { icone: ShoppingBag, libelle: "Click & collect / livraison", couleur: "violet" },
  paiement: { icone: CreditCard, libelle: "Paiement en ligne", couleur: "violet" },
  synchro: { icone: RefreshCw, libelle: "Synchronisation fournisseurs", couleur: "bleu" },
  multilingue: { icone: Globe, libelle: "Site multilingue", couleur: "bleu" },
  pages: { icone: FileText, libelle: "Pages supplémentaires", couleur: "vert" },
  villes: { icone: MapPin, libelle: "Pages par ville", couleur: "bleu" },
  redaction: { icone: PenLine, libelle: "Rédaction des contenus", couleur: "vert" },
  blog: { icone: Newspaper, libelle: "Blog et articles SEO", couleur: "violet" },
};

export type CleOption = keyof typeof TOUTES;

const SUIVI = [
  "2 publications Google par semaine",
  "Réponse à vos avis clients",
  "Suivi de votre positionnement",
  "Maintenance et hébergement",
  "Petites modifications incluses",
  "Support WhatsApp prioritaire",
];

function Rangee({ cles, inverse = false }: { cles: CleOption[]; inverse?: boolean }) {
  const pastilles = (cachee: boolean) => (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={cachee || undefined}>
      {cles.map((cle) => {
        const { icone: Icone, libelle, couleur } = TOUTES[cle];
        return (
          <li key={cle} data-couleur={couleur} className="option-pastille">
            <span className="option-pastille-icone" aria-hidden="true">
              <Icone className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            {libelle}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="options-masque overflow-hidden">
      <div className={`flex w-max ${inverse ? "defile-inverse" : "defile"} options-defile`}>
        {pastilles(false)}
        {pastilles(true)}
      </div>
    </div>
  );
}

/** Contenu du bloc (réutilisé dans la grille Services et sur les pages services). */
export function BlocOptions({
  options = ["reservation", "clickCollect", "paiement", "multilingue", "villes", "pages", "redaction", "blog"],
  titre = "À la carte, selon votre activité",
  niveauTitre = "p",
}: {
  options?: CleOption[];
  titre?: string;
  niveauTitre?: "p" | "h2";
}) {
  const Titre = niveauTitre;
  const a = options.filter((_, k) => k % 2 === 0);
  const b = options.filter((_, k) => k % 2 === 1);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-center">
      <div className="min-w-0">
        <Titre id={niveauTitre === "h2" ? "options-titre" : undefined} className="text-[clamp(1.25rem,1.9vw,1.55rem)] font-bold tracking-tight text-white">
          {titre}
        </Titre>
        <p className="mt-1.5 text-[14.5px] text-white/60">Uniquement les fonctions utiles à votre activité, chiffrées dans le devis.</p>
        <div className="options-zone mt-6 space-y-3">
          <Rangee cles={a.length ? a : options} />
          <Rangee cles={b.length ? b : options} inverse />
        </div>
      </div>

      <div className="suivi-carte">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[15.5px] font-semibold text-white">Suivi mensuel, sans engagement</p>
          <span className="suivi-direct shrink-0 whitespace-nowrap" aria-hidden="true">
            <span className="suivi-direct-point" />
            En cours
          </span>
        </div>
        <SuiviAnime lignes={SUIVI} />
      </div>
    </div>
  );
}

/** Section autonome (pages services). */
export function Options({ options, titre = "Ajoutez ce dont vous avez besoin." }: { options?: CleOption[]; titre?: string }) {
  return (
    <section className="section pt-0" aria-labelledby="options-titre">
      <div className="wrap">
        <div className="reveal tuile tuile-neutre p-7 md:p-10">
          <BlocOptions options={options} titre={titre} niveauTitre="h2" />
        </div>
      </div>
    </section>
  );
}
