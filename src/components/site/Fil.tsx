import Link from "next/link";

// Fil d'Ariane visible ; le BreadcrumbList schema.org est posé par la page.
export function Fil({ items }: { items: { nom: string; url: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[13.5px] text-[var(--faint)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.url} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link href={it.url} className="hover:text-white">
                {it.nom}
              </Link>
            ) : (
              <span aria-current="page" className="text-[var(--muted)]">
                {it.nom}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
