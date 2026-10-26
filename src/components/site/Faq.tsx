import { Mail } from "lucide-react";
import Image from "next/image";
import { SITE } from "@/lib/site";

export type QR = { q: string; r: string };

// FAQ en cartes numérotées ; l'ouverture s'anime en douceur (navigateurs récents).
// À gauche, un encart personnel pour poser une autre question.
export function Faq({ items, titre = "Questions fréquentes" }: { items: QR[]; titre?: string }) {
  return (
    <section className="section" aria-labelledby="faq-titre">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-titre" className="h2 mt-4">
            {titre}
          </h2>
          <div className="faq-contact mt-10">
            <div className="flex items-center gap-4">
              <Image src="/img/romain-photo.webp" alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover object-top" />
              <div>
                <p className="text-[16px] font-semibold text-white">Une autre question ?</p>
                <p className="text-[14px] text-[var(--muted)]">Je vous réponds personnellement.</p>
              </div>
            </div>
            <a href={`mailto:${SITE.email}`} className="faq-contact-lien group mt-5">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{SITE.email}</span>
            </a>
          </div>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <details key={it.q} className="faq group">
              <summary className="flex items-center gap-5 px-5 py-5 text-[17px] font-semibold sm:px-6">
                <span className="faq-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{it.q}</span>
                <span aria-hidden="true" className="faq-plus grid h-8 w-8 shrink-0 place-items-center rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="block">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="faq-reponse px-5 pb-6 text-[16px] leading-relaxed text-[var(--muted)] sm:pl-[4.6rem] sm:pr-16">{it.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
