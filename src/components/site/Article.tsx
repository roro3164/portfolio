import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { Bloc } from "@/content/articles";
import { Fleche } from "./Sections";

// Mise en forme minimale : **gras** et [texte](url), rien d'autre.
function enLigne(texte: string): ReactNode[] {
  const morceaux: ReactNode[] = [];
  const motif = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let dernier = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = motif.exec(texte))) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index));
    if (m[1]) morceaux.push(<strong key={k++}>{m[1]}</strong>);
    else if (m[3].startsWith("/"))
      morceaux.push(
        <Link key={k++} href={m[3]}>
          {m[2]}
        </Link>,
      );
    else
      morceaux.push(
        <a key={k++} href={m[3]} rel="noopener">
          {m[2]}
        </a>,
      );
    dernier = motif.lastIndex;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return morceaux;
}

export function CorpsArticle({ blocs }: { blocs: Bloc[] }) {
  return (
    <div className="prose-rdc">
      {blocs.map((b, i) => (
        <Fragment key={i}>
          {"p" in b && <p>{enLigne(b.p)}</p>}
          {"h2" in b && <h2 id={ancre(b.h2)}>{b.h2}</h2>}
          {"h3" in b && <h3>{b.h3}</h3>}
          {"ul" in b && (
            <ul>
              {b.ul.map((li) => (
                <li key={li}>{enLigne(li)}</li>
              ))}
            </ul>
          )}
          {"ol" in b && (
            <ol>
              {b.ol.map((li) => (
                <li key={li}>{enLigne(li)}</li>
              ))}
            </ol>
          )}
          {"citation" in b && <blockquote>{enLigne(b.citation)}</blockquote>}
          {"tableau" in b && (
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    {b.tableau.entetes.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.tableau.lignes.map((l) => (
                    <tr key={l.join("|")}>
                      {l.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {"encadre" in b && (
            <aside className="not-prose !mt-12 rounded-2xl border border-[var(--line-2)] bg-[var(--surface)] p-7">
              <p className="text-[1.25rem] font-bold text-white">{b.encadre.titre}</p>
              <p className="mt-2 text-[16px] text-[var(--muted)]">{b.encadre.texte}</p>
              <Link href={b.encadre.lien} className="btn btn-primary mt-5 !no-underline">
                {b.encadre.libelle} <Fleche />
              </Link>
            </aside>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export const ancre = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
