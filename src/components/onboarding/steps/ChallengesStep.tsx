
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { 
  Clock, 
  Brain, 
  Target, 
  Users,
  Lightbulb,
  Zap,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const ChallengesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>(onboardingData.challenges || []);
  
  const challenges = [
    {
      id: 'lack_of_time',
      name: 'Manque de temps',
      icon: <Clock className="h-6 w-6" />,
      description: 'Difficile de tout faire dans la journée'
    },
    {
      id: 'repetitive_tasks',
      name: 'Tâches répétitives',
      icon: <Zap className="h-6 w-6" />,
      description: 'Beaucoup de travail manuel et répétitif'
    },
    {
      id: 'content_creation',
      name: 'Création de contenu',
      icon: <Lightbulb className="h-6 w-6" />,
      description: 'Manque d\'inspiration ou de temps pour créer'
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: <Users className="h-6 w-6" />,
      description: 'Emails, réseaux sociaux, présentation'
    },
    {
      id: 'organization',
      name: 'Organisation',
      icon: <Target className="h-6 w-6" />,
      description: 'Planification et gestion des priorités'
    },
    {
      id: 'learning_curve',
      name: 'Apprentissage',
      icon: <Brain className="h-6 w-6" />,
      description: 'Se former rapidement sur de nouveaux sujets'
    },
    {
      id: 'growth',
      name: 'Développement',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Faire grandir son activité ou audience'
    },
    {
      id: 'decision_making',
      name: 'Prise de décision',
      icon: <AlertCircle className="h-6 w-6" />,
      description: 'Analyser les options et choisir'
    }
  ];
  
  const toggleChallenge = (challengeId: string) => {
    setSelectedChallenges(prev => 
      prev.includes(challengeId)
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };
  
  const handleContinue = () => {
    updateOnboardingData({ challenges: selectedChallenges });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Quels sont vos principaux défis ?" 
      subtitle="Identifiez les obstacles que l'IA peut vous aider à surmonter"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {challenges.map((challenge) => {
            const isSelected = selectedChallenges.includes(challenge.id);
            
            return (
              <Card 
                key={challenge.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleChallenge(challenge.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                    }`}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{challenge.name}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
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
            {selectedChallenges.length} défi(s) sélectionné(s)
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleContinue}
            disabled={selectedChallenges.length === 0}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ChallengesStep;
