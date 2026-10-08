import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const COLONNES = [
  {
    titre: "Services",
    liens: [
      { href: "/creation-site-e-commerce", label: "Création de site e-commerce" },
      { href: "/creation-site-vitrine", label: "Création de site vitrine" },
      { href: "/referencement-local", label: "Référencement Google et ChatGPT" },
      { href: SITE.primaps, label: "Primaps, pour les restaurants" },
    ],
  },
  {
    titre: "Découvrir",
    liens: [
      { href: "/realisations", label: "Réalisations" },
      { href: "/realisations/lumi-nice", label: "Étude de cas LumiNice" },
      { href: "/realisations/maison-ribier", label: "Étude de cas Maison Ribier" },
      { href: "/blog", label: "Blog" },
      { href: "/a-propos", label: "À propos" },
    ],
  },
  {
    titre: "Contact",
    liens: [
      { href: "/demo-gratuite", label: "Démo gratuite" },
      { href: `mailto:${SITE.email}`, label: SITE.email },
      { href: SITE.reseaux.linkedin, label: "LinkedIn" },
      { href: SITE.reseaux.instagram, label: "Instagram" },
      { href: SITE.reseaux.github, label: "GitHub" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-2)]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo hauteur={34} />
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
            Sites e-commerce et sites vitrine sur-mesure, conçus et référencés depuis {SITE.ville}. Éditeur de{" "}
            <a href={SITE.primaps} className="link">
              Primaps
            </a>
            .
          </p>
        </div>
        {COLONNES.map((c) => (
          <div key={c.titre}>
            <p className="eyebrow !text-[var(--faint)]">{c.titre}</p>
            <ul className="mt-4 space-y-2.5">
              {c.liens.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="text-[15px] text-[var(--muted)] transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="break-all text-[15px] text-[var(--muted)] transition-colors hover:text-white">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="wrap flex flex-col gap-2 py-6 text-[13.5px] text-[var(--faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.nom} · {SITE.fondateur} · SIRET {SITE.siret}
          </p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-white">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
