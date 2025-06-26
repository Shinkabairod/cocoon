
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { 
  Target, 
  DollarSign, 
  Users, 
  Clock,
  TrendingUp,
  Lightbulb,
  Zap,
  Globe
} from "lucide-react";

const ObjectivesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(onboardingData.objectives || []);
  
  const objectives = [
    {
      id: 'save_time',
      name: 'Gagner du temps',
      icon: <Clock className="h-6 w-6" />,
      description: 'Automatiser les tâches répétitives'
    },
    {
      id: 'increase_productivity',
      name: 'Améliorer ma productivité',
      icon: <Zap className="h-6 w-6" />,
      description: 'Être plus efficace au quotidien'
    },
    {
      id: 'create_content',
      name: 'Créer du contenu',
      icon: <Lightbulb className="h-6 w-6" />,
      description: 'Articles, vidéos, posts sociaux'
    },
    {
      id: 'grow_business',
      name: 'Développer mon activité',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Croissance, nouveaux clients'
    },
    {
      id: 'improve_communication',
      name: 'Améliorer ma communication',
      icon: <Users className="h-6 w-6" />,
      description: 'Emails, présentations, marketing'
    },
    {
      id: 'generate_revenue',
      name: 'Générer des revenus',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Monétiser mes compétences'
    },
    {
      id: 'build_audience',
      name: 'Développer mon audience',
      icon: <Globe className="h-6 w-6" />,
      description: 'Visibilité, notoriété, influence'
    },
    {
      id: 'solve_problems',
      name: 'Résoudre des problèmes',
      icon: <Target className="h-6 w-6" />,
      description: 'Trouver des solutions créatives'
    }
  ];
  
  const toggleObjective = (objectiveId: string) => {
    setSelectedObjectives(prev => 
      prev.includes(objectiveId)
        ? prev.filter(id => id !== objectiveId)
        : [...prev, objectiveId]
    );
  };
  
  const handleContinue = () => {
    updateOnboardingData({ objectives: selectedObjectives });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Quels sont vos objectifs principaux ?" 
      subtitle="Sélectionnez jusqu'à 3 objectifs qui vous motivent le plus"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objectives.map((objective) => {
            const isSelected = selectedObjectives.includes(objective.id);
            const isDisabled = !isSelected && selectedObjectives.length >= 3;
            
            return (
              <Card 
                key={objective.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                } ${
                  isSelected
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => !isDisabled && toggleObjective(objective.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                    }`}>
                      {objective.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{objective.name}</h3>
                      <p className="text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-purple-500 border-purple-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {selectedObjectives.length}/3 objectifs sélectionnés
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleContinue}
            disabled={selectedObjectives.length === 0}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ObjectivesStep;
