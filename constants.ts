
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  themeColor: '#f59e0b', // Tailwind amber-500 default
  cart: [], // Empty cart initialization
  flyingItems: [], // Animation queue initialization
  content: {
    heroTitle: "Un miel authentique, issu de nos ruches familiales",
    heroSubtitle: "Découvrez la richesse des saveurs du Vieux Juigné, récoltées avec passion et respect de l'abeille.",
    heroImage: "https://picsum.photos/seed/apiary/1920/1080",
    aboutText: "Niché au cœur d'une nature préservée, le Rucher Du Vieux Juigné perpétue une tradition apicole respectueuse de l'environnement et du cycle naturel de l'abeille.",
    aboutHistory: "Tout a commencé il y a trois générations, lorsque mon grand-père a installé sa première ruche au fond du jardin. Aujourd'hui, nous continuons cette aventure familiale avec la même passion, en proposant des miels de crus et des essaims de qualité, élevés localement.",
    contactEmail: "contact@rucher-vieux-juigne.fr",
    contactPhone: "06 12 34 56 78",
    contactAddress: "Le Vieux Juigné, 44290",
    socialLinks: [
      { id: '1', platform: 'facebook', url: 'https://facebook.com' },
      { id: '2', platform: 'instagram', url: 'https://instagram.com' }
    ],
    logoUrl: "", // Default empty, will use Hexagon icon
    values: [
      { id: '1', icon: 'Leaf', title: "Naturel", text: "Aucun produit chimique, une récolte respectueuse du rythme de la nature." },
      { id: '2', icon: 'Heart', title: "Passion", text: "Un savoir-faire familial transmis de génération en génération." },
      { id: '3', icon: 'Star', title: "Qualité", text: "Des miels de crus aux saveurs uniques, non mélangés, non chauffés." }
    ]
  },
  faqItems: [
    {
      id: '1',
      question: "Pourquoi mon miel durcit-il (cristallisation) ?",
      answer: "C'est un phénomène 100% naturel, gage de qualité ! Tous les miels finissent par cristalliser. Cela dépend des fleurs butinées. Pour le liquéfier, chauffez-le doucement au bain-marie (max 40°C)."
    },
    {
      id: '2',
      question: "Combien de temps se conserve le miel ?",
      answer: "Le miel se conserve des années ! La législation impose une date (DLUO), mais s'il est stocké à l'abri de l'humidité et de la chaleur, il reste consommable indéfiniment."
    },
    {
      id: '3',
      question: "Faites-vous des visites du rucher ?",
      answer: "Oui, nous organisons des portes ouvertes au printemps et en été. Suivez notre actualité sur le blog ou les réseaux sociaux pour connaître les prochaines dates."
    }
  ],
  products: [
    {
      id: '1',
      name: 'Miel de Printemps',
      description: 'Un miel crémeux et doux, récolté sur les premières fleurs de l’année (colza, aubépine, fruitiers). Idéal pour les tartines.',
      price: 12.50,
      unit: '1 kg',
      image: 'https://picsum.photos/seed/honey1/400/300',
      category: 'miel',
      tags: ['Doux', 'Crémeux', 'Floral'],
      metaTitle: 'Miel de Printemps Crémeux - Récolte Artisanale | Rucher Vieux Juigné',
      metaDescription: 'Achetez notre miel de printemps crémeux, récolté artisanalement au Vieux Juigné. Douceur florale idéale pour les tartines.'
    },
    {
      id: '2',
      name: 'Miel d\'Été',
      description: 'Un miel liquide à la robe dorée, aux arômes plus soutenus de châtaignier et de ronce. Un caractère affirmé.',
      price: 13.50,
      unit: '1 kg',
      image: 'https://picsum.photos/seed/honey2/400/300',
      category: 'miel',
      tags: ['Liquide', 'Corsé', 'Aromatique'],
      metaTitle: 'Miel d\'Été Liquide et Aromatique - Vente Directe Producteur',
      metaDescription: 'Découvrez notre miel d\'été aux notes de châtaignier et ronce. Un miel de caractère récolté en Loire-Atlantique.'
    },
    {
      id: '3',
      name: 'Essaim sur cadres Dadant',
      description: 'Essaim hiverné avec reine de l\'année précédente marquée. Idéal pour débuter ou repeupler un rucher.',
      price: 160.00,
      unit: 'l\'unité',
      image: 'https://picsum.photos/seed/bees1/400/300',
      category: 'essaim',
      tags: ['Dadant', 'Reine Hybride', 'Douceur'],
      metaTitle: 'Achat Essaim Abeilles sur Cadres Dadant - Rucher Vieux Juigné',
      metaDescription: 'Essaims d\'abeilles hivernés sur cadres Dadant à vendre. Reines douces et productives, idéal pour débuter l\'apiculture.'
    }
  ],
  blogPosts: [
    {
      id: '1',
      title: 'Pourquoi les abeilles sont essentielles ?',
      excerpt: 'Au-delà du miel, l\'abeille joue un rôle crucial dans la pollinisation de nos cultures et la biodiversité.',
      content: 'Les abeilles sont responsables de la pollinisation de près de 80% des espèces de plantes à fleurs. Sans elles, notre alimentation serait drastiquement réduite. Dans cet article, nous explorons l\'impact local de nos ruches sur la flore du Vieux Juigné...',
      image: 'https://picsum.photos/seed/blog1/800/400',
      date: '2023-10-15',
      category: 'Environnement',
      metaTitle: 'Pourquoi les abeilles sont essentielles ? | Rucher Vieux Juigné',
      metaDescription: 'Découvrez le rôle crucial des abeilles pour la biodiversité et la pollinisation. Un article pédagogique du Rucher du Vieux Juigné.'
    },
    {
      id: '2',
      title: 'Comment choisir son premier essaim',
      excerpt: 'Démarrer l\'apiculture est une aventure passionnante. Voici nos conseils pour bien choisir vos premières colonies.',
      content: 'Le choix de la race, le format de la ruche (Dadant, Langstroth), et la provenance de l\'essaim sont des critères déterminants. Au Rucher du Vieux Juigné, nous sélectionnons nos reines pour leur douceur et leur productivité...',
      image: 'https://picsum.photos/seed/blog2/800/400',
      date: '2023-11-02',
      category: 'Conseils',
      metaTitle: 'Acheter son premier essaim d\'abeilles : Guide Complet',
      metaDescription: 'Conseils d\'apiculteurs pour choisir son premier essaim sur cadres Dadant. Race, douceur, productivité : on vous dit tout.'
    },
    {
      id: '3',
      title: 'Les secrets du miel de printemps',
      excerpt: 'Blanc, crémeux, floral : découvrez les particularités de notre première récolte de l\'année.',
      content: 'Le miel de printemps cristallise très vite en raison de sa teneur en glucose (colza). Pour le rendre agréable à tartiner, nous pratiquons un brassage à froid, respectueux des propriétés du miel...',
      image: 'https://picsum.photos/seed/blog3/800/400',
      date: '2024-03-20',
      category: 'Produits',
      metaTitle: 'Tout savoir sur le Miel de Printemps crémeux',
      metaDescription: 'Pourquoi le miel de printemps est-il blanc et crémeux ? Découvrez les secrets de fabrication artisanale de notre première récolte.'
    }
  ],
  mediaLibrary: [
    { id: 'm1', name: 'Pot de Miel 1', type: 'image', url: 'https://picsum.photos/seed/honey1/400/300' },
    { id: 'm2', name: 'Pot de Miel 2', type: 'image', url: 'https://picsum.photos/seed/honey2/400/300' },
    { id: 'm3', name: 'Abeilles', type: 'image', url: 'https://picsum.photos/seed/bees1/400/300' },
    { id: 'm4', name: 'Rucher', type: 'image', url: 'https://picsum.photos/seed/apiary/800/600' },
    { id: 'm5', name: 'Apiculteur', type: 'image', url: 'https://picsum.photos/seed/beekeeper/600/600' }
  ]
};