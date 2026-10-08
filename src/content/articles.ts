// Articles du blog. Le texte des paragraphes accepte **gras** et [lien](url).
// Chaque article cible une recherche précise et renvoie vers une page service.

export type Bloc =
  | { p: string }
  | { h2: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { citation: string }
  | { tableau: { entetes: string[]; lignes: string[][] } }
  | { encadre: { titre: string; texte: string; lien: string; libelle: string } };

export type Article = {
  slug: string;
  titre: string;
  titreSeo: string;
  description: string;
  date: string;
  maj?: string;
  categorie: "E-commerce" | "Site vitrine" | "Référencement";
  resume: string;
  corps: Bloc[];
};

export const ARTICLES: Article[] = [
  {
    slug: "prix-creation-site-internet",
    titre: "Combien coûte un site internet ? Ce qui fait vraiment varier le prix",
    titreSeo: "Prix d'un site internet : ce qui fait varier le budget",
    description:
      "Pourquoi deux devis de site vont du simple au décuple : pages, catalogue, fonctionnalités, design, SEO et coûts récurrents expliqués simplement.",
    date: "2026-10-08",
    categorie: "Site vitrine",
    resume:
      "Deux devis pour « un site internet » peuvent aller du simple au décuple. Voici les postes qui font réellement le prix, et les coûts récurrents à ne pas oublier.",
    corps: [
      {
        p: "« Combien coûte un site ? » C'est la première question de presque tous les entrepreneurs, et la réponse honnête est : ça dépend de ce que le site doit faire. Un site de cinq pages pour un artisan et une boutique de 10 000 produits synchronisée avec des fournisseurs n'ont rien à voir. Voici les postes qui font réellement varier un devis, pour que vous puissiez comparer des propositions qui ne se ressemblent pas.",
      },
      { h2: "1. Le type de site" },
      {
        p: "C'est le premier facteur. Un **site vitrine** présente votre activité et vous apporte des contacts. Un **site e-commerce** vend en ligne : il faut un catalogue, un panier, le paiement, la livraison, les conditions de vente et la gestion des commandes. À taille égale, une boutique demande nettement plus de travail.",
      },
      { h2: "2. Le nombre de pages et de produits" },
      {
        p: "Chaque page doit être conçue, rédigée, intégrée et référencée. Pour un site vitrine, la différence entre 5 et 25 pages (par exemple une page par service et par ville) est importante. Pour une boutique, ce n'est pas tant le nombre de produits qui compte que **la façon dont ils arrivent** :",
      },
      {
        ul: [
          "saisis à la main : simple, mais long au-delà de quelques dizaines de produits ;",
          "importés depuis un fichier (Excel, CSV) : il faut nettoyer et structurer les données ;",
          "synchronisés avec un fournisseur par API : plus technique à mettre en place, mais le stock et les prix se mettent ensuite à jour tout seuls.",
        ],
      },
      { h2: "3. Le design : modèle ou sur-mesure" },
      {
        p: "Un modèle (template) acheté est moins cher, mais votre site ressemblera à des centaines d'autres et devra s'adapter à ses contraintes. Un design sur-mesure part de votre activité et de vos clients : il coûte plus cher à concevoir, mais chaque page est pensée pour faire passer à l'action.",
      },
      { h2: "4. Les fonctionnalités" },
      {
        p: "Réservation en ligne, prise de rendez-vous, devis en ligne, espace client, multilingue, filtres produits avancés, connexion à un logiciel de caisse : chaque fonctionnalité ajoute du développement et des tests. Demandez-vous lesquelles vous rapportent vraiment des clients, et gardez les autres pour plus tard.",
      },
      { h2: "5. Les textes et les photos" },
      {
        p: "Un site sans bons textes ne convertit pas et se référence mal. Soit vous les rédigez, soit le prestataire vous aide, soit il les écrit entièrement : cela change le prix. Même chose pour les photos : vos propres photos professionnelles valent toujours mieux que des images de banque d'images.",
      },
      { h2: "6. Le référencement" },
      {
        p: "Un site « référencé » peut vouloir dire beaucoup de choses. Au minimum : un site rapide, des balises propres, un plan du site envoyé à Google et des données structurées. Au-delà : des pages pensées pour des recherches précises, la fiche Google, les avis, et un suivi dans le temps. Vérifiez ce que recouvre le mot dans chaque devis.",
      },
      { h2: "Les coûts récurrents à prévoir" },
      { p: "Le prix de création n'est pas le seul coût. Selon le site, prévoyez :" },
      {
        tableau: {
          entetes: ["Poste", "Ce que c'est"],
          lignes: [
            ["Nom de domaine", "L'adresse de votre site (.fr, .com), à renouveler chaque année."],
            ["Hébergement", "Le serveur qui affiche votre site. Parfois inclus, parfois facturé à part."],
            ["Abonnement plateforme", "Pour une boutique Shopify, l'abonnement mensuel à Shopify, payé directement par vous."],
            ["Frais de paiement", "Un pourcentage prélevé sur chaque vente par le service de paiement."],
            ["Maintenance et évolutions", "Mises à jour, nouvelles pages, corrections : au forfait ou à la demande."],
          ],
        },
      },
      { h2: "Comment comparer deux devis" },
      {
        ol: [
          "Vérifiez que les deux devis couvrent le même périmètre (pages, produits, fonctionnalités, textes).",
          "Demandez qui sera propriétaire du nom de domaine, du site et des contenus.",
          "Demandez ce qui se passe en cas de refonte : les anciennes pages seront-elles redirigées ?",
          "Regardez des sites réellement livrés, et leurs résultats, pas seulement des maquettes.",
        ],
      },
      {
        encadre: {
          titre: "Besoin d'un chiffrage précis ?",
          texte: "Décrivez votre projet en quelques lignes : je vous réponds sous 24 h avec un devis détaillé poste par poste.",
          lien: "/devis",
          libelle: "Demander un devis gratuit",
        },
      },
    ],
  },
  {
    slug: "shopify-ou-woocommerce",
    titre: "Shopify ou WooCommerce : que choisir pour sa boutique en ligne en 2026 ?",
    titreSeo: "Shopify ou WooCommerce : que choisir en 2026 ?",
    description:
      "Shopify ou WooCommerce ? Coûts, maintenance, sécurité, référencement et gros catalogues : le comparatif concret pour choisir votre boutique.",
    date: "2026-10-08",
    categorie: "E-commerce",
    resume:
      "Les deux solutions font tourner des millions de boutiques. La bonne dépend surtout de qui va s'occuper de la boutique au quotidien, et de ce que vous vendez.",
    corps: [
      {
        p: "Shopify et WooCommerce sont les deux solutions les plus utilisées pour créer une boutique en ligne. Elles ne fonctionnent pas du tout de la même façon, et le bon choix dépend moins des fonctionnalités que de votre organisation : qui va gérer la boutique, combien de temps vous voulez consacrer à la technique, et ce que vous vendez.",
      },
      { h2: "La différence de fond" },
      {
        p: "**Shopify** est une plateforme hébergée : vous payez un abonnement mensuel, et Shopify s'occupe des serveurs, de la sécurité, des mises à jour et du paiement. **WooCommerce** est une extension gratuite de WordPress : vous installez le site sur votre propre hébergement, et vous (ou votre prestataire) êtes responsable de tout le reste.",
      },
      {
        tableau: {
          entetes: ["", "Shopify", "WooCommerce"],
          lignes: [
            ["Hébergement", "Inclus", "À prendre et à gérer"],
            ["Mises à jour et sécurité", "Gérées par Shopify", "À faire régulièrement (WordPress, extensions, thème)"],
            ["Coût de départ", "Abonnement mensuel", "Extension gratuite, mais hébergement et extensions payantes"],
            ["Paiement", "Intégré", "Par extensions"],
            ["Liberté technique", "Grande, dans le cadre de Shopify", "Totale"],
            ["Prise en main au quotidien", "Très simple, appli mobile", "Plus technique"],
          ],
        },
      },
      { h2: "Quand choisir Shopify" },
      {
        ul: [
          "Vous voulez vendre sans vous occuper de la technique ni des mises à jour.",
          "Vous avez une boutique physique et voulez un seul outil pour la caisse et le site.",
          "Votre catalogue est important : Shopify ne limite pas le nombre de produits.",
          "Vous voulez gérer vos commandes depuis votre téléphone.",
        ],
      },
      {
        p: "C'est la solution que je recommande dans la plupart des cas pour les commerçants. Pour [LumiNice](/realisations/lumi-nice), plus de 13 500 luminaires tournent sur Shopify, avec un thème sur-mesure et le stock d'un fournisseur relu chaque heure.",
      },
      { h2: "Quand choisir WooCommerce" },
      {
        ul: [
          "Votre site est d'abord un site de contenu (blog, magazine) avec un peu de vente.",
          "Vous avez déjà un site WordPress bien référencé et une équipe pour le maintenir.",
          "Vous avez des besoins très spécifiques que Shopify ne permet pas.",
        ],
      },
      { h2: "Et le référencement ?" },
      {
        p: "Les deux se référencent bien, à condition d'être bien construits. Ce qui fait la différence, c'est la vitesse, la structure des catégories, la qualité des fiches produits et les données structurées. Un Shopify mal configuré se classera moins bien qu'un WooCommerce soigné, et inversement.",
      },
      { h2: "Le piège à éviter" },
      {
        p: "Choisir sur le seul critère du prix de départ. Une boutique WooCommerce « gratuite » demande un hébergement, des extensions et une maintenance régulière ; une boutique Shopify a un abonnement mais très peu de maintenance. Comparez le coût sur trois ans, temps passé compris.",
      },
      {
        encadre: {
          titre: "Vous hésitez encore ?",
          texte: "Expliquez-moi ce que vous vendez et comment vous travaillez : je vous dis franchement quelle solution vous convient.",
          lien: "/creation-site-e-commerce",
          libelle: "Création de site e-commerce",
        },
      },
    ],
  },
  {
    slug: "apparaitre-premier-google-maps",
    titre: "Comment apparaître en premier sur Google Maps : le guide de la fiche Google",
    titreSeo: "Apparaître en premier sur Google Maps",
    description:
      "Comment Google classe les entreprises sur Maps, et les actions concrètes pour remonter : fiche Google complète, avis, photos et site.",
    date: "2026-10-08",
    categorie: "Référencement",
    resume:
      "Google le dit lui-même : il classe les entreprises locales selon la pertinence, la distance et la notoriété. Voici comment agir sur chacun de ces leviers.",
    corps: [
      {
        p: "Quand quelqu'un cherche « plombier Montpellier » ou « restaurant près de moi », Google affiche une carte avec trois entreprises. Ces trois places attirent la majorité des clics. La bonne nouvelle : on peut travailler pour y entrer, sans budget publicitaire.",
      },
      { h2: "Les trois critères de Google" },
      {
        p: "Google explique dans son aide que le classement local repose sur trois critères :",
      },
      {
        ul: [
          "**La pertinence** : votre fiche correspond-elle à ce que la personne cherche ?",
          "**La distance** : êtes-vous proche de la personne ou du lieu recherché ?",
          "**La notoriété** : êtes-vous connu ? Avis, liens vers votre site, articles, présence sur le web.",
        ],
      },
      {
        p: "Vous ne pouvez pas changer votre adresse. Mais la pertinence et la notoriété se travaillent.",
      },
      { h2: "1. Une fiche Google complète et exacte" },
      {
        ol: [
          "**Le nom** : votre vrai nom commercial, celui de votre devanture et de vos factures. Ajouter des mots-clés dans le nom est interdit et peut faire suspendre la fiche.",
          "**La catégorie principale** : la plus précise possible (« Pizzeria » plutôt que « Restaurant »). Ajoutez des catégories secondaires pertinentes.",
          "**Les services ou le menu**, avec des descriptions.",
          "**Les horaires**, y compris les horaires exceptionnels des jours fériés.",
          "**La description**, claire, avec votre activité et votre zone.",
          "**Le lien vers votre site**, et la page la plus pertinente.",
        ],
      },
      { h2: "2. Des avis, réguliers, et des réponses" },
      {
        p: "Le nombre d'avis, leur note et leur régularité comptent. Un avis récent vaut plus qu'un vieil avis. Demandez systématiquement un avis à vos clients satisfaits, avec un lien direct ou un QR code au comptoir. Et répondez à tous, y compris aux avis négatifs, calmement et avec des faits.",
      },
      {
        citation:
          "N'achetez jamais de faux avis : c'est interdit par Google et sanctionné par la loi comme pratique commerciale trompeuse. Une fiche peut être suspendue du jour au lendemain.",
      },
      { h2: "3. Des photos et des publications" },
      {
        p: "Ajoutez régulièrement de vraies photos : devanture, intérieur, équipe, produits, réalisations. Les publications Google (actualités, offres, événements) montrent que la fiche est vivante.",
      },
      { h2: "4. Un site qui confirme ce que dit la fiche" },
      {
        p: "Google croise votre fiche avec votre site. Une page par service, une mention claire de votre ville et de votre zone, les mêmes coordonnées que sur la fiche, et des données structurées « LocalBusiness » l'aident à comprendre qui vous êtes. Un site rapide sur mobile renforce le tout.",
      },
      { h2: "5. Les mêmes informations partout" },
      {
        p: "Nom, adresse et téléphone doivent être identiques sur votre fiche, votre site, Pages Jaunes, Facebook, les annuaires de votre métier. Les incohérences sèment le doute chez Google.",
      },
      { h2: "En combien de temps ?" },
      {
        p: "Une fiche enfin complète produit souvent des effets en quelques semaines. Sur des recherches très concurrentielles, il faut plusieurs mois de travail régulier. Le [Bistrot des Musées](/realisations/bistrot-des-musees), à Montpellier, a doublé ses apparitions sur Google en un an et ressort 2e pour « bistrot Montpellier ».",
      },
      {
        encadre: {
          titre: "Où en êtes-vous sur la carte ?",
          texte: "Envoyez-moi le nom de votre entreprise : je regarde votre fiche et je vous dis ce qui vous freine.",
          lien: "/referencement-local",
          libelle: "Référencement local",
        },
      },
    ],
  },
  {
    slug: "refonte-site-sans-perdre-referencement",
    titre: "Refonte de site : comment ne pas perdre son référencement Google",
    titreSeo: "Refonte de site sans perdre son référencement",
    description:
      "Inventaire des pages, redirections 301, contenus et suivi : la méthode pour refaire votre site sans perdre vos positions sur Google.",
    date: "2026-10-08",
    categorie: "Référencement",
    resume:
      "Le danger d'une refonte, ce n'est pas le nouveau design : ce sont les anciennes adresses qui disparaissent. Voici la méthode pour garder vos positions.",
    corps: [
      {
        p: "Beaucoup d'entreprises refont leur site et voient leurs visites Google chuter dans les semaines qui suivent. Presque toujours pour la même raison : les anciennes adresses de pages ont disparu, et Google ne sait plus où trouver ce qu'il avait classé.",
      },
      { h2: "Pourquoi une refonte peut faire perdre des positions" },
      {
        p: "Google classe des **pages**, pas des sites. Chaque page bien placée a une adresse (URL), des liens qui pointent vers elle et un historique. Si cette adresse renvoie une erreur 404 après la refonte, tout cet acquis est perdu.",
      },
      { h2: "Étape 1 : faire l'inventaire de l'existant" },
      {
        ul: [
          "Toutes les URL du site actuel (plan du site, outil d'exploration).",
          "Les pages qui reçoivent des visites depuis Google (Search Console).",
          "Les pages qui ont des liens depuis d'autres sites.",
          "Les mots-clés sur lesquels vous êtes bien placé.",
        ],
      },
      { h2: "Étape 2 : rediriger chaque ancienne page" },
      {
        p: "Chaque ancienne adresse doit pointer, par une **redirection 301** (permanente), vers la page nouvelle la plus proche. Pas vers l'accueil par défaut : une fiche produit vers la même fiche produit, une catégorie vers la même catégorie. Google indique que les redirections permanentes transmettent la valeur des anciennes pages.",
      },
      {
        p: "Pour la refonte de [LumiNice](/realisations/lumi-nice), près de **14 900 redirections** ont été créées, une par ancienne page produit, catégorie et marque, pour que le passage à la nouvelle boutique ne coûte aucune position.",
      },
      { h2: "Étape 3 : garder ce qui fonctionne dans les contenus" },
      {
        p: "Si une page est bien classée, c'est que son contenu répond à une recherche. Améliorez-le, mais ne supprimez pas les informations qui la font ressortir. Conservez les titres et intertitres qui contiennent les mots-clés importants.",
      },
      { h2: "Étape 4 : soigner la technique dès le lancement" },
      {
        ul: [
          "Un plan du site (sitemap) à jour, envoyé dans la Search Console.",
          "Des balises title et description pour chaque page.",
          "Des données structurées (entreprise, produits, fil d'Ariane, FAQ).",
          "Un site rapide : Google mesure l'affichage (LCP), la réactivité (INP) et la stabilité (CLS).",
          "Aucune page importante bloquée par le fichier robots.txt ou une balise noindex.",
        ],
      },
      { h2: "Étape 5 : surveiller les semaines suivantes" },
      {
        p: "Dans la Search Console, surveillez les erreurs 404, les pages exclues et l'évolution des clics. Une légère baisse les premiers jours est normale ; une chute qui dure signale une redirection manquante ou une page bloquée.",
      },
      {
        encadre: {
          titre: "Vous préparez une refonte ?",
          texte: "Je reprends l'inventaire de votre site actuel avant de commencer, et je redirige chaque page.",
          lien: "/devis?projet=Refonte%20d%27un%20site",
          libelle: "Parler de ma refonte",
        },
      },
    ],
  },
  {
    slug: "gros-catalogue-e-commerce",
    titre: "Mettre en ligne 13 500 produits : retour d'expérience sur un gros catalogue e-commerce",
    titreSeo: "Gros catalogue e-commerce : retour d'expérience",
    description:
      "Mettre 13 500 produits en ligne sur Shopify : imports fournisseurs, stock synchronisé par API, filtres et SEO. Retour d'expérience LumiNice.",
    date: "2026-10-08",
    categorie: "E-commerce",
    resume:
      "Avec des milliers de références, on ne crée plus des fiches : on construit des tuyaux. Retour d'expérience sur la boutique LumiNice.",
    corps: [
      {
        p: "LumiNice est un showroom de luminaires à Nice. Son catalogue : près de 15 000 références de sept grandes marques européennes. Le défi n'était pas de faire une belle boutique, mais de faire en sorte qu'elle reste juste, jour après jour, sans que le client passe ses journées à ressaisir des fiches.",
      },
      { h2: "Le principe : une seule source de vérité" },
      {
        p: "Avec un gros catalogue, la première décision est de savoir **où vit la donnée**. Pour LumiNice, Shopify est devenu la référence : textes, prix et photos y sont gérés, et tout le reste (le site, les filtres, la recherche) se reconstruit à partir de lui. Le client modifie un produit dans Shopify comme n'importe quel e-commerçant, et le site suit.",
      },
      { h2: "Importer sans tout ressaisir" },
      {
        p: "Chaque fournisseur a son format : une API pour l'un, un fichier ou un portail revendeur pour les autres. Pour chacun, un script récupère les fiches (titres, caractéristiques, documents techniques, photos), les met au même format, puis les envoie dans Shopify par lots. Les erreurs d'import (poids manquants, prix incohérents, photos absentes) sont repérées par un audit automatique avant la mise en ligne.",
      },
      { h2: "Le stock qui se met à jour seul" },
      {
        p: "Pour le fournisseur principal, qui propose une API, le stock et les prix sont relus **toutes les heures**, et les nouveautés sont créées chaque nuit. Un produit en rupture ne peut plus être commandé, et la date de retour en stock s'affiche quand le fournisseur la donne.",
      },
      { h2: "Des filtres qui servent vraiment" },
      {
        p: "Sur 13 500 produits, la navigation est décisive. Les filtres ont été construits autour de la façon dont les clients cherchent un luminaire : univers (intérieur, extérieur), type, marque, couleur, matériau, température de lumière. Chaque produit reçoit aussi des mots-clés de recherche, pour être trouvé même avec un synonyme.",
      },
      { h2: "Le référencement à grande échelle" },
      {
        ul: [
          "Des pages par marque et par famille de produits, avec un vrai texte d'introduction.",
          "Des titres de fiches construits sur un même modèle : marque, modèle, référence, type.",
          "Des données structurées produit avec disponibilité et livraison réelles.",
          "Des pages par ville de la Côte d'Azur pour la recherche locale.",
          "Près de 14 900 redirections depuis l'ancien site pour conserver les positions.",
        ],
      },
      { h2: "Ce qu'il faut retenir" },
      {
        ol: [
          "Décidez où vit la donnée avant d'écrire la moindre ligne.",
          "Automatisez tout ce qui change souvent : stock, prix, nouveautés.",
          "Auditez les imports : sur des milliers de fiches, les erreurs ne se voient pas à l'œil nu.",
          "Pensez les filtres comme vos clients cherchent, pas comme le fournisseur classe.",
        ],
      },
      {
        encadre: {
          titre: "Vous avez un gros catalogue ?",
          texte: "Dites-moi d'où viennent vos produits : on regarde ensemble comment les mettre en ligne et les garder à jour.",
          lien: "/creation-site-e-commerce",
          libelle: "Création de site e-commerce",
        },
      },
    ],
  },
  {
    slug: "site-vitrine-qui-convertit",
    titre: "Site vitrine : 10 éléments qui transforment les visiteurs en clients",
    titreSeo: "Site vitrine : 10 éléments pour plus de clients",
    description:
      "Promesse claire, preuves, appel à l'action, vitesse, mobile, pages par service : les 10 éléments d'un site vitrine qui rapporte des clients.",
    date: "2026-10-08",
    categorie: "Site vitrine",
    resume:
      "Un site vitrine n'a qu'un objectif : que le visiteur vous contacte. Voici les dix éléments qui font la différence entre un site joli et un site qui rapporte.",
    corps: [
      {
        p: "Beaucoup de sites vitrine sont beaux et ne rapportent rien. Le visiteur arrive, ne comprend pas tout de suite ce que fait l'entreprise, cherche le téléphone, et repart chez un concurrent. Voici les dix éléments qui changent ça.",
      },
      { h2: "1. Une promesse claire en haut de page" },
      {
        p: "En trois secondes, le visiteur doit savoir ce que vous faites, pour qui et où. « Plombier chauffagiste à Montpellier, dépannage sous 2 h » vaut mieux que « Votre partenaire de confiance ».",
      },
      { h2: "2. Un bouton d'action visible partout" },
      {
        p: "Appeler, demander un devis, réserver : une seule action principale, visible dès l'arrivée et répétée en bas de chaque page. Sur mobile, le numéro doit s'appeler en un clic.",
      },
      { h2: "3. Des preuves" },
      {
        p: "Avis clients, photos de réalisations, chiffres, logos de clients, années d'expérience. Les visiteurs croient ce qu'ils voient, pas ce que vous affirmez.",
      },
      { h2: "4. Une page par service" },
      {
        p: "Une page « Nos services » qui liste tout ne se classe sur rien. Une page dédiée à chaque service, avec ses questions fréquentes, peut se classer sur la recherche correspondante.",
      },
      { h2: "5. Votre zone d'intervention" },
      {
        p: "Indiquez clairement votre ville et les communes desservies. C'est ce qui permet à Google de vous montrer aux bonnes personnes.",
      },
      { h2: "6. La vitesse" },
      {
        p: "Un site lent perd des visiteurs avant même d'avoir affiché sa première image. Images optimisées, code léger, hébergement rapide : c'est aussi un critère que Google mesure.",
      },
      { h2: "7. Le mobile d'abord" },
      {
        p: "La majorité des visites viennent du téléphone. Concevez d'abord pour un écran de poche : textes lisibles, boutons assez grands, pas de menus compliqués.",
      },
      { h2: "8. De vraies photos" },
      {
        p: "Votre équipe, vos locaux, vos réalisations. Les photos de banque d'images se repèrent tout de suite et n'inspirent pas confiance.",
      },
      { h2: "9. Un formulaire court" },
      {
        p: "Nom, contact, message. Chaque champ en plus fait perdre des demandes. Vous poserez les autres questions par téléphone.",
      },
      { h2: "10. Le lien avec votre fiche Google" },
      {
        p: "Mêmes coordonnées, mêmes horaires, lien vers le site depuis la fiche. Le site et la fiche se renforcent mutuellement sur Google Maps. Pour aller plus loin, lisez notre guide pour [apparaître en premier sur Google Maps](/blog/apparaitre-premier-google-maps).",
      },
      {
        encadre: {
          titre: "Votre site coche-t-il ces cases ?",
          texte: "Envoyez-moi son adresse : je vous dis en quelques lignes ce qui vous fait perdre des clients.",
          lien: "/creation-site-vitrine",
          libelle: "Création de site vitrine",
        },
      },
    ],
  },
  {
    slug: "referencement-ia-geo",
    titre: "Référencement et IA : comment être cité par ChatGPT et les réponses de Google",
    titreSeo: "Être cité par ChatGPT et Google AI (GEO)",
    description:
      "GEO : ce qui compte pour être cité par ChatGPT et les réponses IA de Google. Contenus factuels, données structurées, entité claire, avis.",
    date: "2026-10-08",
    categorie: "Référencement",
    resume:
      "Vos clients posent maintenant leurs questions à ChatGPT, Perplexity ou aux réponses IA de Google. On appelle GEO l'art d'y apparaître. Voici ce qui marche, sans fantasme.",
    corps: [
      {
        p: "« Quel est le meilleur opticien à Nice ? », « Qui peut créer ma boutique Shopify à Montpellier ? » : ces questions sont de plus en plus posées à des assistants IA plutôt que tapées dans Google. Ces outils résument le web et citent quelques sources. Être parmi elles, c'est ce qu'on appelle le **GEO** (Generative Engine Optimization).",
      },
      { h2: "Ce qui ne change pas" },
      {
        p: "La plupart des assistants IA s'appuient sur des moteurs de recherche pour trouver leurs sources. Un site bien référencé, rapide et utile reste donc la base. Le GEO n'est pas une technique à part : c'est du bon référencement, avec quelques réflexes en plus.",
      },
      { h2: "1. Des réponses directes et factuelles" },
      {
        p: "Les IA citent les passages qui répondent clairement à une question. Écrivez des phrases autonomes et précises : qui vous êtes, ce que vous faites, où, pour qui, avec quels résultats. Une FAQ bien rédigée est idéale.",
      },
      { h2: "2. Une entité claire" },
      {
        p: "Les IA doivent comprendre que votre site, votre fiche Google, votre LinkedIn et les articles qui parlent de vous désignent la même entreprise. Utilisez partout le même nom, la même adresse, et décrivez-vous de la même façon. Les données structurées schema.org (Organization, LocalBusiness, Person) relient tout cela.",
      },
      { h2: "3. Des preuves vérifiables" },
      {
        p: "Chiffres, études de cas, avis clients, auteur identifié : les contenus qui montrent une expérience réelle sont privilégiés. Un article signé, avec des exemples concrets, sera plus volontiers repris qu'un texte générique.",
      },
      { h2: "4. Laisser entrer les bons robots" },
      {
        p: "Vérifiez que votre fichier robots.txt n'empêche pas les robots des moteurs de recherche et des assistants d'accéder à vos pages. Certains sites les bloquent sans le savoir.",
      },
      { h2: "5. Exister ailleurs que sur votre site" },
      {
        p: "Les IA croisent les sources. Avis Google, annuaires professionnels, articles de presse locale, interventions sur des sites de votre secteur : plus votre entreprise est mentionnée de façon cohérente, plus elle a de chances d'être recommandée.",
      },
      { h2: "Et le fichier llms.txt ?" },
      {
        p: "Le fichier llms.txt est une proposition récente : un résumé du site destiné aux IA. Il ne coûte rien à mettre en place, mais il n'est pas un standard et rien ne garantit que les grands moteurs le lisent. À considérer comme un bonus, pas comme une stratégie.",
      },
      {
        encadre: {
          titre: "Votre entreprise est-elle visible pour les IA ?",
          texte: "Je vérifie votre site, vos données structurées et votre présence en ligne, et je vous dis quoi corriger.",
          lien: "/referencement-local",
          libelle: "Référencement local",
        },
      },
    ],
  },
];

export const article = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export const tempsLecture = (a: Article) => {
  const mots = a.corps
    .map((b) => Object.values(b).flat().map((v) => (typeof v === "string" ? v : JSON.stringify(v))).join(" "))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(mots / 220));
};
