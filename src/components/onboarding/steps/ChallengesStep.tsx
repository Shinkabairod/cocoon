
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Clock, Target, Users, TrendingUp, Lightbulb, Zap } from "lucide-react";

const ChallengesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const challenges = [
    { 
      id: 'time', 
      label: 'Manque de temps', 
      description: 'Difficile de tout faire dans ma journée',
      icon: <Clock className="h-5 w-5" />
    },
    { 
      id: 'focus', 
      label: 'Difficultés à rester concentré', 
      description: 'Je me laisse facilement distraire',
      icon: <Target className="h-5 w-5" />
    },
    { 
      id: 'ideas', 
      label: 'Manque d\'idées', 
      description: 'Je ne sais pas quoi créer ou faire',
      icon: <Lightbulb className="h-5 w-5" />
    },
    { 
      id: 'motivation', 
      label: 'Perte de motivation', 
      description: 'Difficile de rester motivé sur la durée',
      icon: <Zap className="h-5 w-5" />
    },
    { 
      id: 'audience', 
      label: 'Atteindre mon audience', 
      description: 'Difficile de toucher les bonnes personnes',
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'growth', 
      label: 'Faire grandir mon projet', 
      description: 'Je ne sais pas comment évoluer',
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];
  
  const selectedChallenges = onboardingData.challenges || [];
  
  const handleChallengeToggle = (challengeId: string) => {
    let updatedChallenges = [...selectedChallenges];
    
    if (updatedChallenges.includes(challengeId)) {
      updatedChallenges = updatedChallenges.filter(id => id !== challengeId);
    } else {
      updatedChallenges.push(challengeId);
    }
    
    updateOnboardingData({ challenges: updatedChallenges });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Vos défis actuels"
      subtitle="Quels sont vos principaux obstacles ? (plusieurs choix possibles)"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((challenge) => {
            const isSelected = selectedChallenges.includes(challenge.id);
            
            return (
              <Card 
                key={challenge.id}
                className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-violet-500 bg-violet-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleChallengeToggle(challenge.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                      {challenge.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{challenge.label}</h4>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-5 w-5 text-violet-600 flex-shrink-0" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-medium">{selectedChallenges.length}</span> défi(s) sélectionné(s)
          </p>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Retour
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-6"
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
