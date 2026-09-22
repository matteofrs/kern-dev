export const SITE = {
  name: "kern dev",
  tagline: "Studio de développement web",
  email: "bonjour@kerndev.fr",
  phone: "+33 6 12 34 56 78",
  city: "Lyon, France",
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  long: string;
  price: string;
  delay: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "sites-vitrines",
    index: "01",
    title: "Sites vitrines",
    short:
      "Des sites qui ne ressemblent à personne d'autre. Direction artistique sur-mesure, motion soigné, performance chirurgicale.",
    long:
      "Votre site est souvent la première poignée de main avec vos clients. Nous concevons des vitrines à forte identité : direction artistique originale, typographie expressive, animations au service du sens — jamais de template. Chaque page est optimisée pour convertir et mesurée sur des métriques réelles (Core Web Vitals, taux de contact).",
    price: "à partir de 4 500 €",
    delay: "3 à 5 semaines",
    features: [
      "Direction artistique & identité visuelle dédiée",
      "Next.js, performance 95+ Lighthouse",
      "Motion design & micro-interactions",
      "SEO technique complet, balisage sémantique",
      "CMS léger éditable par vos équipes",
      "Accessibilité WCAG AA",
    ],
  },
  {
    slug: "saas",
    index: "02",
    title: "Produits SaaS",
    short:
      "De l'idée au produit en production : architecture solide, interface irréprochable, itérations rapides.",
    long:
      "Nous construisons des applications SaaS complètes : de l'architecture multi-tenant à la facturation Stripe, en passant par un design system qui tient la route. Notre approche : des socles éprouvés, zéro dette cosmétique, et un produit qui peut évoluer pendant des années sans réécriture.",
    price: "à partir de 15 000 €",
    delay: "8 à 14 semaines",
    features: [
      "Architecture Next.js + PostgreSQL multi-tenant",
      "Auth, rôles, facturation Stripe intégrés",
      "Design system & composants documentés",
      "Tests automatisés et CI/CD",
      "Monitoring, alerting et analytics produit",
      "Accompagnement post-lancement",
    ],
  },
  {
    slug: "automatisation-ia",
    index: "03",
    title: "Automatisations IA",
    short:
      "Des pipelines IA qui travaillent pendant que vous dormez : tri, rédaction, extraction, support augmenté.",
    long:
      "Nous branchons l'IA sur vos vrais processus métier — pas des démos. Qualification de leads, génération de documents, extraction de données, assistants internes : nous concevons des chaînes fiables, supervisées et mesurables, avec vos données qui restent sous votre contrôle.",
    price: "à partir de 6 000 €",
    delay: "4 à 8 semaines",
    features: [
      "Audit de vos processus et cas d'usage prioritaires",
      "Pipelines LLM robustes (RAG, agents, outils)",
      "Intégration à vos outils (CRM, Slack, Notion…)",
      "Garde-fous, supervision humaine, journaux",
      "Tableaux de bord de mesure d'impact",
      "Formation de vos équipes",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: "Vitrine" | "SaaS" | "IA";
  year: string;
  client: string;
  result: string;
  palette: [string, string];
};

export const PROJECTS: Project[] = [
  {
    slug: "braserade",
    title: "Braserade",
    category: "Vitrine",
    year: "2026",
    client: "Restaurant gastronomique, Annecy",
    result: "+64 % de réservations en ligne",
    palette: ["#ff5c1f", "#3a1500"],
  },
  {
    slug: "ledgerloop",
    title: "LedgerLoop",
    category: "SaaS",
    year: "2025",
    client: "Comptabilité automatisée PME",
    result: "2 400 comptes actifs en 9 mois",
    palette: ["#2fe0b8", "#02241c"],
  },
  {
    slug: "atrium-avocats",
    title: "Atrium Avocats",
    category: "Vitrine",
    year: "2025",
    client: "Cabinet d'avocats, Lyon",
    result: "3× plus de demandes qualifiées",
    palette: ["#c8b48a", "#1c1410"],
  },
  {
    slug: "sifflote",
    title: "Sifflotte",
    category: "IA",
    year: "2026",
    client: "Outils internes, industrie pharmaceutique",
    result: "11 h économisées par agent / semaine",
    palette: ["#9a7bff", "#150d2e"],
  },
  {
    slug: "velostat",
    title: "Velostat",
    category: "SaaS",
    year: "2024",
    client: "Analytique flottes de vélos",
    result: "Temps de chargement divisé par 5",
    palette: ["#ffd23f", "#2a1e00"],
  },
  {
    slug: "courantfaible",
    title: "Courant Faible",
    category: "IA",
    year: "2025",
    client: "Studio photo, tri & retouche automatisés",
    result: "−78 % de tri manuel",
    palette: ["#ff7ad9", "#2b0a22"],
  },
];
