import type { Metadata } from "next";
import { BentoServices } from "@/components/site/BentoServices";

// Page de comparaison temporaire (à supprimer une fois le choix fait).
export const metadata: Metadata = { title: "Variantes Services", robots: { index: false, follow: false } };

const VARIANTES = [
  ["A", "Mockups mieux présentés", "mockups"],
  ["B", "Schémas animés", "schemas"],
  ["C", "Grande icône", "icones"],
] as const;

export default function Page() {
  return (
    <>
      {VARIANTES.map(([lettre, nom, style]) => (
        <div key={style} className="border-b border-[var(--line)]">
          <p className="wrap pt-16 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Variante {lettre} · {nom}
          </p>
          <BentoServices style={style} />
        </div>
      ))}
    </>
  );
}
