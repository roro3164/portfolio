import type { Metadata } from "next";
import { PageService, type ContenuService } from "@/components/site/PageService";

export const metadata: Metadata = {
  title: "Création de site vitrine sur-mesure à Montpellier",
  description:
    "Création de site vitrine à Montpellier : design unique, rapide sur mobile, textes optimisés pour Google, devis ou réservation en ligne. Devis gratuit.",
  alternates: { canonical: "/creation-site-vitrine" },
};

const contenu: ContenuService = {
  url: "/creation-site-vitrine",
  nomCourt: "Création de site vitrine",
  nomService: "Création de site vitrine",
  eyebrow: "Site vitrine · sur-mesure",
  h1: "Création de site vitrine à Montpellier",
  lead:
    "Un site internet rapide et à votre image, qui explique clairement ce que vous faites et transforme les visiteurs en appels, demandes de devis ou réservations. Conçu pour être trouvé sur Google dès le lancement.",
  visuel: { src: "/realisations/bistrot-des-musees-accueil.webp", alt: "Site vitrine du Bistrot des Musées à Montpellier", url: "bistrotdesmusees.fr" },
  pourQui: [
    {
      titre: "Vous n'avez pas encore de site",
      texte: "Vos clients vous cherchent sur Google et tombent sur vos concurrents. Un site clair, avec vos services, vos photos et vos coordonnées, change tout.",
    },
    {
      titre: "Votre site date ou ne rapporte rien",
      texte: "Lent, pas adapté au téléphone, introuvable sur Google : on le refait en gardant ce qui fonctionne et en redirigeant les anciennes pages.",
    },
    {
      titre: "Vous voulez une image haut de gamme",
      texte: "Artisan, architecte, cabinet, commerce : votre site doit être à la hauteur de votre travail, pas ressembler à un modèle vu partout.",
    },
  ],
  inclus: [
    {
      titre: "Design unique",
      texte: "Une maquette dessinée pour votre activité, validée avec vous avant le développement.",
    },
    {
      titre: "Textes qui convainquent",
      texte: "Je vous aide à écrire des textes clairs, qui répondent aux questions de vos clients et contiennent les bons mots-clés.",
    },
    {
      titre: "Contact simplifié",
      texte: "Formulaire de devis, appel en un clic, prise de rendez-vous ou réservation en ligne selon votre métier.",
    },
    {
      titre: "Très rapide",
      texte: "Développé avec Next.js : pages qui s'affichent instantanément, même sur mobile en 4G. Google le mesure et le récompense.",
    },
    {
      titre: "Référencement de base",
      texte: "Structure des pages, balises, données structurées, plan du site, pages par service et par ville, lien avec votre fiche Google.",
    },
    {
      titre: "Hébergement et mise en ligne",
      texte: "Mise en ligne sur votre nom de domaine, certificat de sécurité, sauvegardes et statistiques de visite.",
    },
  ],
  argument: {
    titre: "Un site vitrine qui travaille pour vous, même la nuit.",
    paragraphes: [
      "Un bon site vitrine ne se contente pas d'être beau. Il répond aux trois questions de vos futurs clients : est-ce que vous faites ce que je cherche, est-ce que vous êtes sérieux, et comment je vous contacte.",
      "Chaque page est donc construite autour d'une action : appeler, demander un devis, réserver. Et chaque page est pensée pour une recherche Google précise, pour que ces clients vous trouvent.",
    ],
    points: ["Pas de modèle générique", "Le nom de domaine et le site sont à vous", "Un seul interlocuteur, du design au code"],
  },
  options: ["reservation", "clickCollect", "multilingue", "pages", "villes", "redaction"],
  projets: ["bistrot-des-musees"],
  titreProjets: "Un site vitrine qui a doublé la visibilité d'un restaurant.",
  faq: [
    {
      q: "Combien coûte un site vitrine ?",
      r: "Le prix dépend du nombre de pages, des fonctionnalités (réservation, prise de rendez-vous, multilingue) et de l'aide à la rédaction. Le devis est gratuit et détaillé poste par poste.",
    },
    {
      q: "Pourrai-je modifier mon site moi-même ?",
      r: "Selon le projet, vous modifiez vous-même vos textes et vos photos, ou je m'en charge dans le cadre du suivi. On le décide ensemble au moment du devis.",
    },
    {
      q: "Pourquoi ne pas utiliser Wix ou WordPress ?",
      r: "Ces outils sont pratiques, mais les sites qu'ils produisent sont souvent lents et se ressemblent. Un site sur-mesure en Next.js est plus rapide, plus sûr et plus facile à référencer.",
    },
    {
      q: "J'ai déjà un site : allez-vous perdre mon référencement ?",
      r: "Non. Avant la refonte, je relève toutes vos pages existantes et je redirige chacune vers sa nouvelle adresse. Google transfère ainsi la valeur des anciennes pages vers les nouvelles.",
    },
    {
      q: "Je suis restaurateur, que me conseillez-vous ?",
      r: "Pour les restaurants, Primaps est plus adapté : un abonnement qui comprend le site, la fiche Google, les avis, la réservation et le click & collect sans commission.",
    },
  ],
  cta: {
    titre: "Votre futur site commence par un échange.",
    texte: "Présentez-moi votre activité et vos clients. Je vous réponds sous 24 h avec une première idée de site et un devis.",
  },
  primaps: true,
};

export default function Page() {
  return <PageService c={contenu} />;
}
