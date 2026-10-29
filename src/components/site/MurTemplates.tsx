import Image from "next/image";

type Vignette = { src: string; libelle: string; style: string; lien: string };

/**
 * Mur de templates en perspective : 4 colonnes qui défilent en sens alternés.
 * Idée reprise du « 3D Marquee » d'Aceternity UI (ui.aceternity.com/components/3d-marquee),
 * réécrite en CSS seul. Chaque colonne est doublée pour boucler ; le double est masqué aux lecteurs d'écran.
 * Images chargées d'office : en 3D le chargement différé du navigateur rate des tuiles, qui restaient vides.
 */
export function MurTemplates({ templates }: { templates: Vignette[] }) {
  const colonnes: Vignette[][] = [[], [], [], []];
  templates.forEach((t, i) => colonnes[i % 4].push(t));

  return (
    <div className="mur" aria-label={`${templates.length} templates, chacun ouvre son aperçu`}>
      <div className="mur-plan">
        {colonnes.map((col, c) => (
          <div key={c} className="mur-col" data-sens={c % 2 ? "bas" : "haut"} style={{ animationDuration: `${46 + c * 6}s` }}>
            {[0, 1].map((copie) =>
              col.map((t) => (
                <a
                  key={`${copie}-${t.src}`}
                  href={t.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mur-tuile"
                  aria-hidden={copie === 1 || undefined}
                  tabIndex={copie === 1 ? -1 : undefined}
                >
                  <Image src={t.src} alt={copie ? "" : `Template ${t.libelle}, ${t.style}`} width={1200} height={750} sizes="320px" loading="eager" fetchPriority="low" className="block h-auto w-full" />
                  <span className="mur-legende">
                    <b>{t.libelle}</b> {t.style}
                  </span>
                </a>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
