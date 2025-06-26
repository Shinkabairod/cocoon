import React from 'react';
import { Bot, Target, TrendingUp } from 'lucide-react';
import { Feature } from '../types';

export const features: Feature[] = [
  {
    title: "Custom AI Bot",
    description: "An assistant that knows all your expertise and can answer clients 24/7",
    icon: <Bot className="h-7 w-7" />,
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600"
  },
  {
    title: "Tailored Interface",
    description: "A platform built for your needs and those of your clients",
    icon: <Target className="h-7 w-7" />,
    gradient: "from-teal-50 to-teal-100",
    iconColor: "text-teal-600"
  },
  {
    title: "Direct Monetization",
    description: "Sell your services, assistants, and automations effortlessly",
    icon: <TrendingUp className="h-7 w-7" />,
    gradient: "from-rose-50 to-rose-100",
    iconColor: "text-rose-600"
  }
];