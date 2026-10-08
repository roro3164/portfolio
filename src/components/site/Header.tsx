"use client";

import { Gift } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [ouvert, setOuvert] = useState(false);
  const [resserre, setResserre] = useState(false);

  // Comme sur l'ancien site : transparent en haut de page, pilule de verre au défilement.
  useEffect(() => {
    const surDefilement = () => setResserre(window.scrollY > 40);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);
  const chemin = usePathname();

  useEffect(() => setOuvert(false), [chemin]);
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  const actif = (href: string) => chemin === href || chemin.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 pt-3">
      <div className="wrap">
      <div
        className={`entete flex h-[62px] items-center justify-between gap-6 rounded-full pl-6 pr-2 ${
          resserre || ouvert ? "entete-verre mx-auto xl:w-[88%]" : "mx-auto w-full"
        }`}
      >
        <Logo hauteur={28} />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={actif(l.href) ? "page" : undefined}
                  className={`lien-neon whitespace-nowrap rounded-full px-2.5 py-2 text-[14.5px] xl:px-3.5 ${
                    actif(l.href) ? "text-white" : "text-[#cfcde0]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/demo-gratuite" className="btn btn-primary hidden !min-h-[44px] !px-5 !text-[14.5px] sm:inline-flex">
            <Gift className="h-4 w-4" aria-hidden="true" />
            Ma démo gratuite
          </Link>
          <button
            type="button"
            className="mr-1 grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <span className="relative block h-3 w-[18px]">
              <span className={`absolute left-0 h-[1.5px] w-full bg-white transition-transform ${ouvert ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-full bg-white transition-transform ${ouvert ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!ouvert}
        className="menu-verre fixed inset-x-0 bottom-0 top-[80px] z-40 overflow-y-auto lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="wrap flex flex-col py-6">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-[var(--line)] py-4 text-2xl font-semibold tracking-tight"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/demo-gratuite" className="btn btn-primary mt-8 w-full">
            <Gift className="h-4 w-4" aria-hidden="true" />
            Ma démo gratuite
          </Link>
          <a href="https://www.primaps.fr" className="btn btn-ghost mt-3 w-full">
            Vous êtes un restaurant ? Primaps
          </a>
        </nav>
      </div>
    </header>
  );
}
