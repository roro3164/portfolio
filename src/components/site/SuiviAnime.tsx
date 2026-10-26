"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Liste du suivi mensuel qui se coche une ligne après l'autre ; une fois tout
// coché, tout se vide d'un coup et le cycle recommence. La barre suit les coches.
export function SuiviAnime({ lignes }: { lignes: string[] }) {
  const n = lignes.length;
  const [etape, setEtape] = useState(n);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    let visible = false;
    let courante = 0;
    const suivant = () => {
      if (!visible) return;
      if (courante < n) {
        courante += 1;
        setEtape(courante);
        t = setTimeout(suivant, courante === n ? 1800 : 850);
      } else {
        courante = 0;
        setEtape(0);
        t = setTimeout(suivant, 700);
      }
    };
    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearTimeout(t);
      if (visible) {
        courante = 0;
        setEtape(0);
        t = setTimeout(suivant, 600);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, [n]);

  return (
    <div ref={ref}>
      <div className="suivi-barre mt-4" aria-hidden="true">
        <span style={{ width: `${(etape / n) * 100}%` }} />
      </div>
      <ul className="mt-5 space-y-2.5">
        {lignes.map((s, k) => (
          <li key={s} data-coche={k < etape} className="suivi-ligne flex items-center gap-3 text-[14.5px]">
            <span className="suivi-coche" aria-hidden="true">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
