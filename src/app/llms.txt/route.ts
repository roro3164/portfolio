import { ARTICLES } from "@/content/articles";
import { ETUDES } from "@/content/projets";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// Résumé du site pour les assistants IA (proposition llms.txt).
export function GET() {
  const u = SITE.url;
  const corps = `# ${SITE.nom}

> ${SITE.nom} est l'entreprise de ${SITE.fondateur}, développeur web et designer basé à ${SITE.ville} (France). Il crée des sites e-commerce Shopify sur-mesure, des sites vitrine et accompagne le référencement local (fiche Google). Il est aussi le fondateur de Primaps (${SITE.primaps}), un abonnement de visibilité en ligne pour les restaurants. Tarifs : sur devis. Offre d'entrée : une démo gratuite du futur site, réellement en ligne, à tester sans engagement (${u}/demo-gratuite). Zone : ${SITE.ville} et toute la France.

## Services
- [Création de site e-commerce](${u}/creation-site-e-commerce) : boutiques Shopify sur-mesure, import et synchronisation de catalogues jusqu'à plus de 10 000 produits, SEO e-commerce.
- [Création de site vitrine](${u}/creation-site-vitrine) : sites sur-mesure rapides (Next.js), pensés pour obtenir des appels et des demandes de devis.
- [Référencement local](${u}/referencement-local) : fiche Google, avis, pages locales, SEO technique, suivi des positions sur Google Maps.
- [Primaps](${SITE.primaps}) : abonnement tout compris pour les restaurants (site, fiche Google, avis, réservation, click & collect sans commission).

## Études de cas
${ETUDES.map((e) => `- [${e.nom}](${u}/realisations/${e.slug}) : ${e.accroche} ${e.chiffres.map((c) => `${c.valeur} ${c.libelle}`).join(" ; ")}.`).join("\n")}

## Articles
${ARTICLES.map((a) => `- [${a.titre}](${u}/blog/${a.slug}) : ${a.resume}`).join("\n")}

## Contact
- Démo gratuite et devis : ${u}/demo-gratuite
- E-mail : ${SITE.email}
- À propos : ${u}/a-propos
- SIRET : ${SITE.siret}
`;
  return new Response(corps, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
