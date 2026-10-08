import type { Metadata } from "next";
import { PageService, type ContenuService } from "@/components/site/PageService";

export const metadata: Metadata = {
  title: "Création de site e-commerce Shopify à Montpellier",
  description:
    "Boutique Shopify sur-mesure à Montpellier : thème unique, catalogue importé et synchronisé, paiement, livraison et référencement Google. Devis gratuit.",
  alternates: { canonical: "/creation-site-e-commerce" },
};

const contenu: ContenuService = {
  couleur: "violet",
  url: "/creation-site-e-commerce",
  nomCourt: "Création de site e-commerce",
  nomService: "Création de site e-commerce Shopify",
  eyebrow: "Site e-commerce · Shopify",
  h1: "Création de site e-commerce sur-mesure à Montpellier",
  lead:
    "Je crée des boutiques Shopify qui vendent : un design unique, un catalogue propre et à jour, et un référencement pensé pour que vos produits remontent sur Google. De 50 à plus de 10 000 produits.",
  visuel: { src: "/realisations/lumi-nice-catalogue.webp", alt: "Catalogue de la boutique en ligne LumiNice avec filtres", url: "lumi-nice.fr/catalogue" },
  pourQui: [
    {
      titre: "Vous avez une boutique physique",
      texte: "Showroom, magasin, opticien, caviste : vous voulez vendre aussi en ligne, sans gérer deux stocks et deux catalogues séparés.",
    },
    {
      titre: "Vous avez un gros catalogue",
      texte: "Des centaines ou des milliers de références, plusieurs fournisseurs, des prix qui bougent : il faut des imports et des mises à jour automatiques.",
    },
    {
      titre: "Votre boutique actuelle ne vend pas",
      texte: "Site lent, fiches incomplètes, mal référencé : on refait la boutique en conservant vos positions Google grâce aux redirections.",
    },
  ],
  inclus: [
    {
      titre: "Thème Shopify sur-mesure",
      texte: "Un design dessiné pour votre marque, pas un modèle acheté. Vous le modifiez ensuite depuis l'éditeur Shopify, sans code.",
    },
    {
      titre: "Catalogue importé proprement",
      texte: "Fiches, variantes, photos, caractéristiques et documents importés depuis vos fichiers ou les catalogues de vos fournisseurs.",
    },
    {
      titre: "Stock et prix synchronisés",
      texte: "Quand un fournisseur propose une API ou un flux, le stock, les prix et les nouveautés se mettent à jour tout seuls.",
    },
    {
      titre: "Paiement et livraison",
      texte: "Paiement sécurisé, frais de port, livraison offerte au-delà d'un montant, retrait en boutique : réglés selon votre fonctionnement.",
    },
    {
      titre: "SEO e-commerce",
      texte: "Pages catégories et marques optimisées, titres et descriptions produit, données structurées, plan du site et redirections.",
    },
    {
      titre: "Filtres et recherche",
      texte: "Filtres par catégorie, marque, couleur ou matière, et une recherche qui trouve les produits même avec une faute de frappe.",
    },
    {
      titre: "Rapide sur mobile",
      texte: "La majorité des visites viennent du téléphone : pages légères, images optimisées, panier simple.",
    },
    {
      titre: "Conformité",
      texte: "Conditions générales de vente, mentions légales, gestion des cookies et droit de rétractation mis en place dès le lancement.",
    },
    {
      titre: "Prise en main et suivi",
      texte: "Je vous montre comment gérer commandes et produits, puis je reste disponible pour faire évoluer la boutique.",
    },
  ],
  argument: {
    titre: "Pourquoi Shopify, et pourquoi sur-mesure ?",
    paragraphes: [
      "Shopify s'occupe de ce qui ne doit jamais tomber en panne : le paiement, la sécurité, l'hébergement et les mises à jour. Vous gérez vos commandes depuis un ordinateur ou depuis l'application sur votre téléphone.",
      "Par-dessus, je développe un thème entièrement sur-mesure et les automatisations dont votre catalogue a besoin. Vous gardez la simplicité de Shopify, avec une boutique qui ne ressemble à aucune autre.",
    ],
    points: [
      "La boutique et le nom de domaine sont à votre nom",
      "Aucune commission de ma part sur vos ventes",
      "Une plateforme qui supporte des dizaines de milliers de produits",
    ],
  },
  options: ["paiement", "synchro", "clickCollect", "multilingue", "redaction", "blog"],
  projets: ["lumi-nice", "maison-ribier"],
  titreProjets: "Deux boutiques en ligne, deux défis différents.",
  faq: [
    {
      q: "Combien coûte une boutique Shopify sur-mesure ?",
      r: "Le prix dépend du nombre de produits, de la façon dont ils arrivent (saisie, fichier, API fournisseur) et des fonctionnalités. Je vous envoie un devis détaillé et gratuit après un premier échange. S'y ajoute l'abonnement Shopify, payé directement par vous à Shopify.",
    },
    {
      q: "Est-ce que je serai propriétaire de ma boutique ?",
      r: "Oui. La boutique Shopify, le nom de domaine et les contenus sont à votre nom. Si vous changez de prestataire, vous gardez tout.",
    },
    {
      q: "Pouvez-vous gérer un catalogue de plusieurs milliers de produits ?",
      r: "Oui. Pour LumiNice, j'ai mis en ligne plus de 13 500 luminaires de 7 marques, avec le stock et les prix d'un fournisseur relus chaque heure par son API. Les gros catalogues se gèrent par import et synchronisation, pas à la main.",
    },
    {
      q: "Je suis sur WooCommerce, Wix ou PrestaShop : peut-on migrer ?",
      r: "Oui. On reprend vos produits, vos clients si besoin, et surtout vos adresses de pages : chaque ancienne URL est redirigée vers la nouvelle pour conserver votre référencement.",
    },
    {
      q: "Est-ce que je pourrai modifier la boutique moi-même ?",
      r: "Oui. Produits, prix, photos, bannières et textes se modifient depuis l'administration Shopify et l'éditeur de thème, sans toucher au code. Pour les évolutions plus importantes, je reste disponible.",
    },
  ],
  cta: {
    titre: "Vous voulez vendre en ligne ?",
    texte: "Dites-moi ce que vous vendez, combien de produits vous avez et d'où ils viennent. Je vous réponds sous 24 h avec une première proposition.",
  },
};

export default function Page() {
  return <PageService c={contenu} />;
}
