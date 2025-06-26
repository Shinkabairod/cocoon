
import React from 'react';
import { Bot, Target, TrendingUp } from 'lucide-react';
import { Feature } from '../types';

export const features: Feature[] = [
  {
    title: "Bot IA Personnalisé",
    description: "Un assistant qui connaît toutes tes compétences et peut répondre à tes clients 24/7",
    icon: <Bot className="h-7 w-7" />,
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600"
  },
  {
    title: "Interface Sur Mesure",
    description: "Une plateforme selon tes besoins et ceux de tes clients",
    icon: <Target className="h-7 w-7" />,
    gradient: "from-teal-50 to-teal-100",
    iconColor: "text-teal-600"
  },
  {
    title: "Monétisation Directe",
    description: "Vends tes services, assistants et automatisations sans rien faire",
    icon: <TrendingUp className="h-7 w-7" />,
    gradient: "from-rose-50 to-rose-100",
    iconColor: "text-rose-600"
  }
];
