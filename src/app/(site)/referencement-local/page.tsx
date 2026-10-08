import type { Metadata } from "next";
import { CarteLocale } from "@/components/site/CarteLocale";
import { PageService, type ContenuService } from "@/components/site/PageService";
import { TroisReferencements } from "@/components/site/TroisReferencements";

export const metadata: Metadata = {
  title: "Référencement local, Google et IA (ChatGPT) à Montpellier",
  description:
    "Être trouvé sur Google Maps et recommandé par ChatGPT : fiche Google, avis, pages locales et visibilité dans les réponses des IA, à Montpellier.",
  alternates: { canonical: "/referencement-local" },
};

const contenu: ContenuService = {
  couleur: "bleu",
  url: "/referencement-local",
  nomCourt: "Référencement Google et IA",
  nomService: "Référencement local, fiche Google et visibilité sur les IA (GEO)",
  eyebrow: "Google Maps · ChatGPT · IA",
  h1: "Référencement local, Google et IA à Montpellier",
  lead:
    "Quand un client cherche votre métier près de chez lui, Google affiche trois entreprises sur la carte. Et de plus en plus, il demande directement à ChatGPT « qui me conseilles-tu ? ». Je travaille les trois : la carte, les résultats Google et les réponses des IA.",
  visuel: <CarteLocale />,
  sectionPlus: <TroisReferencements />,
  pourQui: [
    {
      titre: "Vos concurrents passent devant",
      texte: "Vous êtes bien noté mais invisible sur la carte, alors que des entreprises moins bonnes sortent en premier.",
    },
    {
      titre: "Vous avez une adresse ou une zone",
      texte: "Commerce, artisan, cabinet, restaurant : vos clients viennent de votre ville et de ses alentours.",
    },
    {
      titre: "Votre fiche Google est à l'abandon",
      texte: "Horaires approximatifs, peu de photos, avis sans réponse : autant de signaux que Google utilise pour vous classer.",
    },
  ],
  inclus: [
    {
      titre: "Audit de départ",
      texte: "Où vous apparaissez aujourd'hui, sur quelles recherches, face à quels concurrents, et ce qui vous freine.",
    },
    {
      titre: "Fiche Google optimisée",
      texte: "Catégories, services, description, horaires, photos et publications régulières, dans les règles de Google.",
    },
    {
      titre: "Avis clients",
      texte: "Une méthode simple pour obtenir plus d'avis, et des réponses à chacun, positif comme négatif.",
    },
    {
      titre: "Pages locales",
      texte: "Des pages utiles par service et par ville desservie, reliées entre elles, plutôt qu'une seule page générique.",
    },
    {
      titre: "SEO technique",
      texte: "Vitesse, indexation, données structurées, cohérence du nom, de l'adresse et du téléphone partout sur le web.",
    },
    {
      titre: "Suivi des positions",
      texte: "Votre classement mesuré point par point sur la carte de votre ville, et un point clair chaque mois.",
    },
    {
      titre: "Recommandé par ChatGPT",
      texte: "Vos clients posent leurs questions à ChatGPT, Gemini ou Perplexity. On fait en sorte que ces assistants connaissent votre entreprise et puissent la citer.",
    },
    {
      titre: "Présent dans les réponses IA de Google",
      texte: "En haut de Google, un résumé écrit par l'IA répond souvent avant les liens. Des pages claires et des réponses précises vous donnent une chance d'y figurer.",
    },
    {
      titre: "Une fiche d'identité pour les IA",
      texte: "Données structurées, fichier llms.txt, informations identiques partout : les IA comprennent sans hésiter qui vous êtes, ce que vous faites et où.",
    },
  ],
  argument: {
    titre: "Ce que regarde Google pour classer les entreprises locales.",
    paragraphes: [
      "Google classe les résultats locaux selon trois critères qu'il décrit lui-même : la pertinence (votre fiche correspond-elle à la recherche ?), la distance (êtes-vous proche de la personne qui cherche ?) et la notoriété (avis, liens, présence sur le web).",
      "On ne peut pas changer votre adresse, mais on peut travailler tout le reste : une fiche complète et active, des avis réguliers, et un site qui confirme à Google ce que vous faites et où.",
    ],
    points: ["Aucune promesse de « 1re place garantie »", "Uniquement des méthodes acceptées par Google", "Des résultats mesurés, pas des impressions"],
  },
  projets: ["bistrot-des-musees", "lumi-nice"],
  titreProjets: "Visibilité locale : des résultats mesurés.",
  faq: [
    {
      q: "En combien de temps voit-on des résultats ?",
      r: "Les premiers effets d'une fiche Google bien remplie se voient souvent en quelques semaines. Pour des recherches très concurrentielles, il faut plutôt compter plusieurs mois de travail régulier.",
    },
    {
      q: "Pouvez-vous garantir la première place ?",
      r: "Non, et personne ne le peut honnêtement : le classement dépend aussi de la position de la personne qui cherche. Je m'engage sur le travail fourni et je vous montre les résultats mesurés chaque mois.",
    },
    {
      q: "Achetez-vous de faux avis ?",
      r: "Jamais. Les faux avis sont interdits par Google et par la loi, et peuvent faire suspendre votre fiche. On met en place une méthode pour que vos vrais clients laissent leur avis.",
    },
    {
      q: "Faut-il forcément un site pour être bien référencé localement ?",
      r: "Une fiche Google seule peut suffire pour démarrer, mais un site rapide et bien structuré renforce nettement votre position, surtout sur les recherches qui ne contiennent pas votre nom.",
    },
    {
      q: "Mon entreprise peut-elle apparaître dans les réponses de ChatGPT ?",
      r: "Oui, c'est possible. ChatGPT, Gemini ou les réponses IA de Google s'appuient sur ce qu'ils trouvent sur le web : votre site, votre fiche Google, vos avis, les annuaires. Si ces informations sont claires, complètes et identiques partout, l'IA peut vous recommander quand quelqu'un demande « quel est le meilleur [votre métier] à [votre ville] ? ». Personne ne contrôle ces réponses, mais on peut nettement augmenter vos chances.",
    },
    {
      q: "Qu'est-ce que le GEO ?",
      r: "Le GEO (Generative Engine Optimization), c'est le référencement pour les intelligences artificielles : faire en sorte que ChatGPT, Gemini, Perplexity ou les résumés IA de Google connaissent votre entreprise et la citent. C'est le prolongement du référencement Google classique, pas une technique à part : un site rapide, des réponses claires, des avis et une fiche Google solide.",
    },
    {
      q: "Je suis restaurateur, est-ce adapté ?",
      r: "Oui, et pour les restaurants j'ai même créé Primaps : un abonnement qui regroupe fiche Google, avis, site, réservation et click & collect, avec un suivi mensuel.",
    },
  ],
  cta: {
    titre: "Où en êtes-vous sur Google ?",
    texte: "Envoyez-moi le nom de votre entreprise et votre ville. Je regarde votre fiche et votre site, et je vous dis ce qui vous freine.",
  },
  primaps: true,
};

export default function Page() {
  return <PageService c={contenu} />;
}
