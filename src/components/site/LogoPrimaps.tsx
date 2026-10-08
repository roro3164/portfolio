import { Store } from "lucide-react";

// Logo Primaps, identique à celui de primaps.fr : tuile bleue + icône boutique,
// puis le mot « Primaps » avec une couleur Google par lettre.
const LETTRES = [
  ["P", "#4285F4"],
  ["r", "#4285F4"],
  ["i", "#4285F4"],
  ["m", "#34A853"],
  ["a", "#4285F4"],
  ["p", "#EA4335"],
  ["s", "#FBBC04"],
] as const;

export function LogoPrimaps({ taille = "1em", className = "" }: { taille?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.32em] whitespace-nowrap align-[-0.12em] ${className}`} style={{ fontSize: taille }}>
      <span
        aria-hidden="true"
        className="grid h-[1.15em] w-[1.15em] place-items-center rounded-[0.32em] bg-[#4285F4] text-white"
        style={{ boxShadow: "0 0.12em 0.45em rgba(66,133,244,0.45)" }}
      >
        <Store className="h-[0.6em] w-[0.6em]" strokeWidth={1.9} />
      </span>
      <span className="sr-only">Primaps</span>
      <span aria-hidden="true" className="font-semibold tracking-[-0.02em]">
        {LETTRES.map(([l, c], i) => (
          <span key={i} style={{ color: c }}>
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}
