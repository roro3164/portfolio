import Link from "next/link";

// Sceau « Démo offerte », sur le modèle de la pastille « 1 mois offert » de primaps.fr :
// disque clair, anneau en dégradé aux couleurs du studio, texte circulaire qui tourne.
// Mène au formulaire de démo gratuite.
export function PastilleOffre({ id = "cercle-offre", decorative = false }: { id?: string; decorative?: boolean }) {
  return (
    <Link
      href="/demo-gratuite"
      className="pastille-offre"
      aria-label="Recevoir ma démo gratuite : démo offerte, devis gratuit, sans engagement"
      // Posée dans une zone décorative (aria-hidden) : on la retire aussi du parcours clavier.
      tabIndex={decorative ? -1 : undefined}
    >
      <svg viewBox="0 0 160 160" className="pastille-offre-anneau" aria-hidden="true">
        <defs>
          <path id={id} d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} startOffset="0" textLength="386" lengthAdjust="spacing">
            VOTRE FUTUR SITE EN DÉMO · SANS ENGAGEMENT ·
          </textPath>
        </text>
      </svg>
      <span className="pastille-offre-centre">
        <span className="pastille-offre-petit">Démo</span>
        <span className="pastille-offre-grand">Offerte</span>
      </span>
      <span className="pastille-offre-prix">Devis gratuit</span>
    </Link>
  );
}
