import Image from "next/image";
import { Globe, MapPin, Search, Sparkles, Star, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Coche } from "./Sections";

// Les trois façons d'être trouvé : sur la carte (local), dans les résultats
// Google (naturel) et dans les réponses des IA (GEO). Chaque carte montre un vrai
// résultat, avec la marque fictive « Atelier Morel ».

function Etoiles() {
  return (
    <span className="inline-flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[9px] w-[9px] fill-[#fbbc04] text-[#fbbc04]" />
      ))}
    </span>
  );
}

const ApercuLocal = () => (
  <div className="ref-apercu">
    <div className="ref-carte-plan">
      <span className="ref-pin" style={{ left: "22%", top: "40%" }} />
      <span className="ref-pin" style={{ left: "70%", top: "30%" }} />
      <span className="ref-pin ref-pin-moi" style={{ left: "48%", top: "58%" }}>
        <MapPin className="h-3 w-3" />
      </span>
    </div>
    {[
      ["Atelier Morel", "4,9", "87", true],
      ["Autre menuisier", "4,3", "21", false],
    ].map(([nom, note, avis, moi]) => (
      <div key={nom as string} className={`ref-ligne ${moi ? "ref-ligne-moi" : ""}`}>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[12.5px] font-semibold">{nom}</span>
          <span className="flex items-center gap-1 text-[10.5px] opacity-80">
            {note} <Etoiles /> ({avis}) · Menuisier
          </span>
        </span>
        {moi && <span className="ref-badge">Ouvert</span>}
      </div>
    ))}
  </div>
);

const ApercuNaturel = () => (
  <div className="ref-apercu">
    <div className="ref-recherche">
      <Search className="h-3.5 w-3.5" /> cuisine sur-mesure chêne montpellier
    </div>
    <div className="ref-resultat">
      <p className="flex items-center gap-1.5 text-[10.5px] text-[#4d5156]">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-[#e8eaed]">
          <Globe className="h-2.5 w-2.5" />
        </span>
        atelier-morel · Cuisines
      </p>
      <p className="mt-1 text-[13px] leading-snug text-[#1a0dab]">Cuisine sur-mesure en chêne massif à Montpellier</p>
      <p className="mt-1 text-[10.5px] leading-snug text-[#4d5156]">
        Cuisines dessinées et fabriquées dans notre atelier. Devis gratuit, pose comprise…
      </p>
    </div>
    <div className="ref-resultat opacity-45">
      <span className="block h-2 w-1/3 rounded bg-[#dadce0]" />
      <span className="mt-2 block h-2.5 w-4/5 rounded bg-[#c6d2f5]" />
      <span className="mt-2 block h-2 w-3/4 rounded bg-[#e8eaed]" />
    </div>
  </div>
);

const ApercuIA = () => (
  <div className="ref-apercu">
    <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#ececf1] px-3 py-2 text-[11.5px] text-[#202123]">
      Quel menuisier pour une cuisine sur-mesure à Montpellier ?
    </p>
    <div className="mt-2.5 flex gap-2">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] text-white">
        <Sparkles className="h-3 w-3" />
      </span>
      <div className="text-[11.5px] leading-snug text-[#202123]">
        Je vous recommande <b>Atelier Morel</b> : noté 4,9 sur Google, spécialisé dans les cuisines en bois massif.
        <span className="mt-1.5 flex items-center gap-1.5">
          <span className="relative h-4 w-4 overflow-hidden rounded-full">
            <Image src="/demo-services/cuisine.webp" alt="" fill sizes="16px" className="object-cover" />
          </span>
          <span className="rounded-full bg-[#ececf1] px-2 py-0.5 text-[9.5px] text-[#555]">Sources : site, fiche Google, avis</span>
        </span>
      </div>
    </div>
  </div>
);

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
