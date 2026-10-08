export type QR = { q: string; r: string };

export function Faq({ items, titre = "Questions fréquentes" }: { items: QR[]; titre?: string }) {
  return (
    <section className="section" aria-labelledby="faq-titre">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-titre" className="h2 mt-4">
            {titre}
          </h2>
        </div>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {items.map((it) => (
            <details key={it.q} className="faq group">
              <summary className="flex items-center justify-between gap-6 py-6 text-[17.5px] font-semibold">
                <span>{it.q}</span>
                <span
                  aria-hidden="true"
                  className="faq-plus grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--line-2)] text-[var(--violet-2)]"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="block">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="-mt-1 pb-6 pr-12 text-[16.5px] leading-relaxed text-[var(--muted)]">{it.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
