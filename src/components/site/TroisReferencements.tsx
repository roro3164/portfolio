import { MapPin, Search, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ApercuIA, ApercuLocal, ApercuNaturel } from "./ApercusReferencement";
import { Coche } from "./Sections";

// Les trois façons d'être trouvé : sur la carte (local), dans les résultats
// Google (naturel) et dans les réponses des IA (GEO). Chaque carte montre un vrai
// résultat animé, avec la marque fictive « Atelier Morel ».

const PILIERS: {
  couleur: "vert" | "bleu" | "violet";
  icone: LucideIcon;
  nom: string;
  ou: string;
  texte: string;
  points: string[];
  apercu: ReactNode;
}[] = [
  {
    couleur: "vert",
    icone: MapPin,
    nom: "Référencement local",
    ou: "Google Maps et la carte",
    texte: "Quand on cherche « votre métier + votre ville », Google affiche trois entreprises sur la carte. L'objectif : en faire partie.",
    points: ["Fiche Google complète et active", "Avis clients et réponses", "Cohérence nom, adresse, téléphone"],
    apercu: <ApercuLocal />,
  },
  {
    couleur: "bleu",
    icone: Search,
    nom: "Référencement naturel",
    ou: "Les résultats Google",
    texte: "Sous la carte, les liens classiques. Chaque page de votre site répond à une recherche précise de vos clients.",
    points: ["Pages par service et par ville", "Site rapide et bien structuré", "Textes qui répondent aux questions"],
    apercu: <ApercuNaturel />,
  },
  {
    couleur: "violet",
    icone: Sparkles,
    nom: "Référencement IA (GEO)",
    ou: "ChatGPT, Gemini, résumés IA de Google",
    texte: "Vos clients demandent aussi à l'IA « qui me conseilles-tu ? ». On fait en sorte qu'elle vous connaisse et vous cite.",
    points: ["Informations claires et vérifiables", "Données structurées et llms.txt", "Présence sur les sites que l'IA consulte"],
    apercu: <ApercuIA />,
  },
];

export function TroisReferencements() {
  return (
    <section className="section" aria-labelledby="trois-ref-titre">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">Trois façons d&apos;être trouvé</p>
          <h2 id="trois-ref-titre" className="h2 mt-4">
            Sur la carte, dans Google et dans les réponses des IA.
          </h2>
          <p className="lead mt-5">
            Vos clients ne cherchent plus tous de la même façon. Je travaille les trois en même temps, parce qu&apos;ils se
            renforcent : une bonne fiche Google et un bon site sont aussi ce que lisent les IA.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PILIERS.map((p, i) => {
            const Icone = p.icone;
            return (
              <article key={p.nom} data-couleur={p.couleur} className="reveal carte-laser lent flex flex-col overflow-hidden">
                <div className="ref-scene">{p.apercu}</div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="icone-service" aria-hidden="true">
                      <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                    </span>
                    <span className="font-mono text-[13px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="h3 mt-5">{p.nom}</h3>
                  <p className="mt-1 text-[14px] font-semibold text-[var(--accent)]">{p.ou}</p>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)]">{p.texte}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px]">
                        <Coche />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
