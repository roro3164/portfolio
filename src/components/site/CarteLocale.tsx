// Illustration du « pack local » de Google : trois résultats sur la carte,
// votre entreprise en tête. Purement décoratif, aucune donnée réelle.
export function CarteLocale() {
  const resultats = [
    { nom: "Votre entreprise", note: "4,9", avis: "212 avis", moi: true },
    { nom: "Concurrent A", note: "4,3", avis: "87 avis" },
    { nom: "Concurrent B", note: "4,1", avis: "54 avis" },
  ];
  return (
    <div className="browser lg:rotate-[1deg]" role="img" aria-label="Illustration : votre entreprise en tête des résultats Google Maps">
      <div className="browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="browser-url">google.fr/maps · « votre métier + Montpellier »</span>
      </div>
      <div className="relative h-[210px] overflow-hidden bg-[#1c1f26] sm:h-[250px]" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid slice">
          <path d="M-20 170 C120 120 200 210 330 160 S520 90 640 130" stroke="#2c313b" strokeWidth="22" fill="none" />
          <path d="M140 -10 L210 270" stroke="#2a2e37" strokeWidth="14" />
          <path d="M420 -10 L380 270" stroke="#2a2e37" strokeWidth="10" />
          <path d="M-10 60 L620 95" stroke="#262a32" strokeWidth="9" />
          <rect x="460" y="150" width="120" height="70" rx="10" fill="#1f3b2f" opacity=".6" />
        </svg>
        {[
          { x: "58%", y: "42%", moi: true, n: 1 },
          { x: "30%", y: "60%", n: 2 },
          { x: "78%", y: "70%", n: 3 },
        ].map((p) => (
          <span
            key={p.n}
            className={`absolute grid -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-bl-none text-[12px] font-bold ${
              p.moi ? "h-10 w-10 bg-[var(--violet)] text-white shadow-[0_0_0_8px_rgba(143,137,236,0.25)]" : "h-8 w-8 bg-[#3a3f4b] text-[#cfd3dc]"
            }`}
            style={{ left: p.x, top: p.y, transform: "translate(-50%,-100%) rotate(-45deg)" }}
          >
            <span style={{ transform: "rotate(45deg)" }}>{p.n}</span>
          </span>
        ))}
      </div>
      <ul className="divide-y divide-[var(--line)]" aria-hidden="true">
        {resultats.map((r, i) => (
          <li key={r.nom} className={`flex items-center gap-4 px-5 py-4 ${r.moi ? "bg-[rgba(143,137,236,0.08)]" : ""}`}>
            <span className={`font-mono text-[13px] ${r.moi ? "text-[var(--violet-2)]" : "text-[var(--faint)]"}`}>{i + 1}</span>
            <span className="flex-1">
              <span className={`block text-[15px] font-semibold ${r.moi ? "text-white" : "text-[var(--muted)]"}`}>{r.nom}</span>
              <span className="mt-0.5 block text-[13px] text-[var(--faint)]">
                <span className="text-[#f5c451]">★</span> {r.note} · {r.avis}
              </span>
            </span>
            {r.moi && <span className="chip !border-[var(--brand)] !text-[var(--violet-2)]">Top 3</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
