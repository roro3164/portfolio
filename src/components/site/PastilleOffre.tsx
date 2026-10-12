import Link from "next/link";

// Sceau « 1 démo offerte », sur le modèle de la pastille « 1 mois offert » de primaps.fr :
// disque clair, anneau en dégradé aux couleurs du studio, texte circulaire qui tourne.
// Mène au formulaire de démo gratuite.
export function PastilleOffre({ id = "cercle-offre" }: { id?: string }) {
  return (
    <Link href="/demo-gratuite" className="pastille-offre" aria-label="Recevoir ma démo gratuite : 1 démo offerte, devis gratuit, sans engagement">
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
        <span className="pastille-offre-un">1</span>
        <span className="pastille-offre-libelle">
          démo
          <br />
          offerte
        </span>
      </span>
      <span className="pastille-offre-prix">Devis gratuit</span>
    </Link>
  );
}
