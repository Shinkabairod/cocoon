
import { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "Gratuit",
    period: "",
    features: ["1 bot IA personnalisé", "100 interactions/mois", "Interface de base", "Support communautaire"],
    cta: "Commencer gratuitement",
    popular: false
  },
  {
    name: "Pro",
    price: "29€",
    period: "/mois",
    features: ["3 bots IA personnalisés", "1000 interactions/mois", "Interface personnalisée", "Analytics avancées", "Support prioritaire"],
    cta: "Démarrer l'essai gratuit",
    popular: true
  },
  {
    name: "Expert",
    price: "99€",
    period: "/mois",
    features: ["Bots illimités", "Interactions illimitées", "White-label complet", "API accès", "Support dédié"],
    cta: "Contacter l'équipe",
    popular: false
  }
];
