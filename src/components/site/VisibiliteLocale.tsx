"use client";

import { MapPin, Navigation, Phone, Search, Sparkles, Star, TrendingUp } from "lucide-react";
import { Frappe, etatDe } from "./ApercusReferencement";
import { useSequence } from "./SchemasServices";

// Visuel du hero « Référencement local » : une recherche Google Maps se tape,
// les épingles tombent, la fiche (marque fictive « Atelier Morel ») monte de la
// 3e à la 1re place, un appel arrive, les courbes de la fiche montent, puis
// ChatGPT la recommande. Tourne en boucle quand il est visible.

const REQUETE = "menuisier montpellier";
const DUREES = [500, 1200, 600, 700, 900, 900, 800, 700, 1600];

// rang de chaque fiche selon l'étape : l'atelier part 3e, passe 2e puis 1er
const rangs = (etape: number) =>
  etape >= 6 ? { morel: 1, a: 2, b: 3 } : etape >= 5 ? { morel: 2, a: 1, b: 3 } : { morel: 3, a: 1, b: 2 };

function Etoiles({ n = 5 }: { n?: number }) {
  return (
    <span className="inline-flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-[10px] w-[10px] ${i < n ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-[#dadce0] text-[#dadce0]"}`} />
      ))}
    </span>
  );
}

export function VisibiliteLocale() {
  const { ref, etape, a } = useSequence(DUREES, 3200);
  const r = rangs(etape);
  const premier = etape >= 6;

  const fiches = [
    { cle: "morel", nom: "Atelier Morel", note: premier ? "4,9" : "4,6", avis: premier ? "87" : "52", n: 5, moi: true },
    { cle: "a", nom: "Menuiserie Durand", note: "4,4", avis: "31", n: 4, moi: false },
    { cle: "b", nom: "Bois & Agencement", note: "4,2", avis: "18", n: 4, moi: false },
  ] as const;

  return (
    <div ref={ref} className="vl" role="img" aria-label="Illustration : une entreprise passe de la 3e à la 1re place sur Google Maps, puis ChatGPT la recommande">
      <div className="vl-app" aria-hidden="true">
        {/* barre de recherche Google Maps */}
        <div className="vl-recherche">
          <MapPin className="h-4 w-4 shrink-0 text-[#ea4335]" />
          <span className="min-w-0 flex-1 truncate">
            <Frappe texte={REQUETE} etat={etatDe(etape, 1)} pas={55} />
            {etape === 1 && <span className="ref-caret" />}
          </span>
          <Search className="h-4 w-4 shrink-0 text-[#5f6368]" />
        </div>

        {/* carte */}
        <div className="vl-carte">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="170" fill="#eef0eb" />
            <path d="M300 0 C330 50 360 70 400 80 V0Z" fill="#aadaff" />
            <rect x="24" y="96" width="78" height="52" rx="8" fill="#c8e6c9" />
            <path d="M-10 118 C90 92 160 150 260 112 S380 70 420 88" stroke="#fff" strokeWidth="13" fill="none" />
            <path d="M120 -10 L168 180" stroke="#fff" strokeWidth="9" />
            <path d="M262 -10 L238 180" stroke="#fde293" strokeWidth="7" />
            <path d="M-10 42 L410 64" stroke="#fff" strokeWidth="6" />
          </svg>
          {[
            { cle: "a", x: "28%", y: "40%" },
            { cle: "b", x: "76%", y: "74%" },
            { cle: "morel", x: "52%", y: "62%" },
          ].map((p, i) => (
            <span
              key={p.cle}
              className={`vl-epingle ref-tombe ${p.cle === "morel" ? "vl-epingle-moi" : ""} ${p.cle === "morel" && premier ? "vl-epingle-premier" : ""}`}
              style={{ left: p.x, top: p.y, transitionDelay: `${i * 0.12}s` }}
              {...a(2)}
            >
              <span>{r[p.cle as keyof typeof r]}</span>
            </span>
          ))}
        </div>

        {/* résultats : l'atelier remonte */}
        <div className="vl-liste">
          {fiches.map((f) => (
            <div key={f.cle} className={`vl-fiche ts-el ${f.moi ? "vl-fiche-moi" : ""}`} style={{ top: `${(r[f.cle] - 1) * 50}px` }} {...a(3)}>
              <span className={`vl-rang ${f.moi && premier ? "vl-rang-premier" : ""}`}>{r[f.cle]}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[13px] font-semibold text-[#202124]">{f.nom}</span>
                <span className="flex items-center gap-1 text-[11px] text-[#70757a]">
                  <b className="font-semibold text-[#202124]">{f.note}</b> <Etoiles n={f.n} /> ({f.avis}) · Menuisier
                </span>
              </span>
              {f.moi && (
                <span className="flex gap-1">
                  <span className="vl-action">
                    <Phone className="h-3 w-3" />
                  </span>
                  <span className="vl-action">
                    <Navigation className="h-3 w-3" />
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* appel entrant */}
      <div className="vl-flottant vl-appel ts-el" aria-hidden="true" {...a(7)}>
        <span className="vl-flottant-icone bg-[#34a853]">
          <Phone className="h-3.5 w-3.5" />
        </span>
        <span className="leading-tight">
          <b className="block text-[13px]">Appel depuis Google Maps</b>
          <span className="text-[12px] opacity-70">Atelier Morel · il y a 1 min</span>
        </span>
      </div>

      {/* courbes de la fiche */}
      <div className="vl-flottant vl-stats ts-el" aria-hidden="true" {...a(8)}>
        <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
          <TrendingUp className="h-3.5 w-3.5 text-[#34a853]" /> Votre fiche ce mois-ci
        </p>
        {[
          ["Appels", 0.78, "#34a853"],
          ["Itinéraires", 0.62, "#4285f4"],
          ["Visites du site", 0.9, "rgb(var(--m1))"],
        ].map(([l, v, c], k) => (
          <span key={l as string} className="mt-1.5 block">
            <span className="flex justify-between text-[10.5px] opacity-75">
              {l as string} <span className="text-[#34a853]">↑</span>
            </span>
            <span className="vl-jauge">
              <span style={{ width: etape >= 8 ? `${(v as number) * 100}%` : "0%", background: c as string, transitionDelay: `${k * 0.15}s` }} />
            </span>
          </span>
        ))}
      </div>

      {/* recommandation IA */}
      <div className="vl-flottant vl-ia ts-el" aria-hidden="true" {...a(9)}>
        <span className="vl-flottant-icone bg-[linear-gradient(135deg,rgb(var(--m1)),#3b82f6)]">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <span className="text-[12px] leading-snug">
          <span className="block opacity-60">« Quel menuisier à Montpellier ? »</span>
          <Frappe texte="Je vous recommande Atelier Morel, noté 4,9 sur Google." etat={etatDe(etape, 9)} mots pas={110} />
        </span>
      </div>
    </div>
  );
}
