
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Sparkles, Clock, Brain, Zap } from "lucide-react";

const WelcomeStep = () => {
  const { nextStep } = useOnboarding();
  
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      title: "IA Personnalisée",
      description: "Assistant intelligent adapté à votre métier et vos objectifs"
    },
    {
      icon: <Clock className="h-6 w-6 text-green-500" />,
      title: "Optimisation du Temps",
      description: "Automatisez vos tâches répétitives et gagnez en productivité"
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: "Outils Intelligents",
      description: "Créez du contenu, des documents et bien plus en quelques clics"
    }
  ];
  
  return (
    <OnboardingLayout 
      title="Bienvenue sur Cocoon AI" 
      subtitle="Votre assistant IA pour optimiser votre temps et booster votre productivité"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Que vous soyez...</h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Entrepreneur</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Créateur</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Consultant</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">Freelance</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">Manager</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-4">
              <CardContent className="space-y-2">
                <div className="flex justify-center">{feature.icon}</div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            <strong>2 minutes</strong> pour personnaliser votre expérience, 
            <strong> des heures</strong> gagnées chaque semaine !
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={nextStep}
          >
            Commencer la configuration
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default WelcomeStep;
