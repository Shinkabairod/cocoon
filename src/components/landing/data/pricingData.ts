import { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    features: [
      "1 custom AI bot",
      "100 interactions/month",
      "Basic interface",
      "Community support"
    ],
    cta: "Start for free",
    popular: false
  },
  {
    name: "Pro",
    price: "€29",
    period: "/month",
    features: [
      "3 custom AI bots",
      "1000 interactions/month",
      "Custom interface",
      "Advanced analytics",
      "Priority support"
    ],
    cta: "Start free trial",
    popular: true
  },
  {
    name: "Expert",
    price: "€99",
    period: "/month",
    features: [
      "Unlimited bots",
      "Unlimited interactions",
      "Full white-label",
      "API access",
      "Dedicated support"
    ],
    cta: "Contact the team",
    popular: false
  }
];