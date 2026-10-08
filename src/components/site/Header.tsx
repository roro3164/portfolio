"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [ouvert, setOuvert] = useState(false);
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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(14,13,19,0.78)] backdrop-blur-xl">
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={actif(l.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[14.5px] transition-colors ${
                    actif(l.href) ? "text-white" : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/devis" className="btn btn-primary hidden !min-h-[42px] !px-5 !text-[14.5px] sm:inline-flex">
            Demander un devis
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] lg:hidden"
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

      <div
        id="menu-mobile"
        hidden={!ouvert}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-[var(--bg)] lg:hidden"
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
          <Link href="/devis" className="btn btn-primary mt-8 w-full">
            Demander un devis
          </Link>
          <a href="https://www.primaps.fr" className="btn btn-ghost mt-3 w-full">
            Vous êtes un restaurant ? Primaps
          </a>
        </nav>
      </div>
    </header>
  );
}
