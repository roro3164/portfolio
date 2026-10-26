// Logo Primaps, identique à celui de primaps.fr : le symbole (épingle étoilée
// entourée des arcs Google), puis le mot « Primaps » en dégradé bleu.
export function LogoPrimaps({ taille = "1em", className = "" }: { taille?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.28em] whitespace-nowrap align-[-0.18em] ${className}`} style={{ fontSize: taille }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- symbole inline, à la taille du texte */}
      <img src="/logos/primaps-symbole.webp" alt="" aria-hidden="true" width={256} height={255} className="h-[1.3em] w-[1.3em] object-contain" />
      <span
        className="bg-clip-text font-bold tracking-[-0.03em] text-transparent"
        style={{ backgroundImage: "linear-gradient(180deg,#6098F6 0%,#4285F4 55%,#3977DF 100%)" }}
      >
        Primaps
      </span>
    </span>
  );
}
