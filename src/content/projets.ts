// Réalisations. Les études de cas (avec page dédiée) sont les projets phares ;
// les autres apparaissent dans la grille « Autres sites livrés ».

export type Chiffre = { valeur: string; libelle: string };

export type EtudeDeCas = {
  slug: string;
  nom: string;
  titreSeo: string;
  type: "E-commerce" | "Site vitrine + visibilité";
  secteur: string;
  ville: string;
  url: string;
  accroche: string;
  resume: string;
  couverture: string;
  mobile: string;
  ordinateur: { src: string; forme: "macbook-34" | "macbook-face" };
  telephone: { src: string; forme: "iphone-34" | "iphone-cote" };
  galerie: { src: string; alt: string }[];
  chiffres: Chiffre[];
  defi: string;
  solution: string[];
  stack: string[];
  resultat: string;
};

export const ETUDES: EtudeDeCas[] = [
  {
    slug: "lumi-nice",
    nom: "LumiNice",
    titreSeo: "LumiNice : boutique Shopify de 13 500 luminaires",
    type: "E-commerce",
    secteur: "Luminaires et éclairage",
    ville: "Nice",
    url: "https://www.lumi-nice.fr",
    accroche: "Une boutique en ligne de plus de 13 000 luminaires, synchronisée avec les fournisseurs.",
    resume:
      "Showroom de luminaires à Nice depuis 2014, LumiNice vend désormais en ligne près de 15 000 références de grandes marques européennes. Catalogue, stock, prix et avis Google se mettent à jour tout seuls.",
    couverture: "/realisations/lumi-nice-accueil.webp",
    mobile: "/realisations/lumi-nice-mobile.webp",
    ordinateur: { src: "/mockups/lumi-nice-macbook.webp", forme: "macbook-34" },
    telephone: { src: "/mockups/lumi-nice-iphone.webp", forme: "iphone-34" },
    galerie: [
      { src: "/realisations/lumi-nice-catalogue.webp", alt: "Catalogue LumiNice avec filtres par catégorie et par marque" },
      { src: "/realisations/lumi-nice-fiche-produit.webp", alt: "Fiche produit LumiNice : photos, prix, caractéristiques techniques" },
    ],
    chiffres: [
      { valeur: "13 500+", libelle: "produits en ligne" },
      { valeur: "7", libelle: "marques synchronisées" },
      { valeur: "1 h", libelle: "pour mettre le stock à jour" },
      { valeur: "14 900", libelle: "redirections pour garder le référencement" },
    ],
    defi:
      "Le client avait un catalogue énorme, réparti entre plusieurs fournisseurs aux formats différents, et une bonne position sur Google à ne surtout pas perdre. Il fallait passer d'une vitrine à une vraie boutique, sans ressaisir 15 000 fiches à la main.",
    solution: [
      "Boutique Shopify avec un thème entièrement sur-mesure, pensé pour un très gros catalogue : filtres par univers, couleur, matériau et température de lumière.",
      "Import automatique des fiches fournisseurs : textes, caractéristiques, fiches techniques et jusqu'à plusieurs dizaines de milliers de photos.",
      "Stock et prix Nova Luce relus chaque heure par l'API du fournisseur ; les nouveautés arrivent seules chaque nuit.",
      "Avis Google du showroom affichés sur le site et mis à jour chaque nuit.",
      "Pages par marque, par famille de produits et par ville (Nice, Cannes, Antibes, Monaco), données structurées produit et 14 900 redirections pour conserver les positions Google de l'ancien site.",
    ],
    stack: ["Shopify", "Liquid", "API fournisseurs", "GitHub Actions", "SEO technique"],
    resultat:
      "Le client gère son catalogue depuis Shopify comme n'importe quel e-commerçant, et le site se reconstruit seul. Le référencement acquis par l'ancien site est conservé page par page.",
  },
  {
    slug: "maison-ribier",
    nom: "Maison Ribier",
    titreSeo: "Maison Ribier : catalogue e-commerce d'opticien",
    type: "E-commerce",
    secteur: "Opticien et audioprothésiste",
    ville: "Nice",
    url: "https://maisonribier.com",
    accroche: "Un catalogue de lunettes de luxe repensé marque par marque, avec une photo pour chaque coloris.",
    resume:
      "Opticien indépendant haut de gamme, Maison Ribier présente en ligne les collections Cartier, Dior, Tom Ford, Gucci ou Saint Laurent. Le catalogue a été repris de fond en comble pour être aussi soigné que la boutique.",
    couverture: "/realisations/maison-ribier-accueil.webp",
    mobile: "/realisations/maison-ribier-mobile.webp",
    ordinateur: { src: "/mockups/maison-ribier-macbook.webp", forme: "macbook-face" },
    telephone: { src: "/mockups/maison-ribier-iphone.webp", forme: "iphone-cote" },
    galerie: [
      { src: "/realisations/maison-ribier-collection.webp", alt: "Collection Dior lunettes de soleil sur le site Maison Ribier" },
      { src: "/realisations/maison-ribier-fiche-produit.webp", alt: "Fiche produit Cartier avec choix du coloris sur Maison Ribier" },
    ],
    chiffres: [
      { valeur: "455", libelle: "produits en ligne" },
      { valeur: "300", libelle: "nouvelles fiches créées" },
      { valeur: "4 400+", libelle: "photos posées" },
      { valeur: "96 %", libelle: "des coloris avec leurs vues" },
    ],
    defi:
      "Des fiches incomplètes, des photos de tailles différentes, des coloris sans image : pour une clientèle qui achète des montures à plusieurs centaines d'euros, le site ne reflétait pas le niveau de la boutique.",
    solution: [
      "Reprise du catalogue Shopify marque par marque, avec un format photo unique pour toute la boutique.",
      "Une photo par coloris et plusieurs vues par modèle, récupérées auprès des fournisseurs.",
      "Collections de marque automatiques, page « Nos marques » avec logos, recherche par modèle.",
      "Parcours de vente en ligne sur la gamme Diamond Cut, testé jusqu'au paiement.",
    ],
    stack: ["Shopify", "Liquid", "Traitement d'images", "Catalogue produit"],
    resultat:
      "Un catalogue homogène de 455 produits, où chaque coloris a sa photo : le client voit exactement la monture qu'il viendra essayer en boutique.",
  },
  {
    slug: "bistrot-des-musees",
    nom: "Bistrot des Musées",
    titreSeo: "Bistrot des Musées : site et visibilité Google",
    type: "Site vitrine + visibilité",
    secteur: "Restaurant",
    ville: "Montpellier",
    url: "https://www.bistrotdesmusees.fr",
    accroche: "Un site rapide et une fiche Google soignée : deux fois plus de visibilité en un an.",
    resume:
      "Bistrot au cœur de l'Écusson, à Montpellier. Le restaurant n'avait pas de site : il a désormais un site rapide, la réservation en ligne et une fiche Google suivie chaque semaine avec Primaps.",
    couverture: "/realisations/bistrot-des-musees-accueil.webp",
    mobile: "/realisations/bistrot-des-musees-mobile.webp",
    ordinateur: { src: "/mockups/bistrot-des-musees-macbook.webp", forme: "macbook-face" },
    telephone: { src: "/mockups/bistrot-des-musees-iphone.webp", forme: "iphone-34" },
    galerie: [],
    chiffres: [
      { valeur: "×2", libelle: "d'apparitions sur Google" },
      { valeur: "+56 %", libelle: "d'appels reçus" },
      { valeur: "174", libelle: "clics vers le site en 3 mois" },
      { valeur: "2e", libelle: "sur Maps pour « bistrot Montpellier »" },
    ],
    defi:
      "Un restaurant bien noté mais peu visible : pas de site, une fiche Google peu entretenue, et des concurrents mieux placés sur Google Maps dans le même quartier.",
    solution: [
      "Site vitrine rapide, pensé pour le mobile, avec menu, galerie et réservation.",
      "Fiche Google optimisée : catégories, photos, publications régulières et réponses à tous les avis.",
      "Suivi du classement local, point par point sur la carte de Montpellier.",
    ],
    stack: ["Next.js", "Primaps", "SEO local", "Fiche Google"],
    resultat:
      "En trois mois, la fiche a été vue 17 916 fois, deux fois plus que l'année précédente, et le restaurant ressort 2e sur Google Maps pour « bistrot Montpellier ».",
  },
];

export type AutreProjet = { nom: string; secteur: string; image: string; url?: string };

export const AUTRES: AutreProjet[] = [
  { nom: "Salon Beauté", secteur: "Institut de beauté", image: "/realisations/salon-beaute.webp", url: "https://client-salon-beaute-backup-8vldcj6zj-romains-projects-72d8cf83.vercel.app/" },
  { nom: "Éclat Gourmand", secteur: "Pâtisserie", image: "/realisations/eclat-gourmand.webp", url: "https://client-adolfina-aguero-patisserie-b.vercel.app/" },
  { nom: "Bistrot Fernand", secteur: "Restaurant", image: "/realisations/bistrot-fernand.webp" },
  { nom: "Snack Menu", secteur: "Restauration rapide", image: "/realisations/snack-menu.webp" },
  { nom: "Instant Coiffure", secteur: "Salon de coiffure", image: "/realisations/instant-coiffure.webp" },
  { nom: "Barbershop", secteur: "Barbier", image: "/realisations/barbershop.webp" },
  { nom: "Fuji Sushis", secteur: "Restaurant japonais", image: "/realisations/fuji-sushis.webp" },
  { nom: "BioPropreté", secteur: "Nettoyage écologique", image: "/realisations/bio-proprete.webp" },
];

export const etude = (slug: string) => ETUDES.find((e) => e.slug === slug);
