
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Monitor, Users, Zap } from "lucide-react";
import { LearningStyle } from "@/types/onboarding";

const LearningStyleStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const learningStyles: { id: LearningStyle; label: string; description: string; icon: JSX.Element }[] = [
    { 
      id: 'reading', 
      label: 'Lecture et documentation', 
      description: 'Articles, guides, tutoriels écrits',
      icon: <BookOpen className="h-6 w-6" />
    },
    { 
      id: 'visual', 
      label: 'Contenu visuel', 
      description: 'Vidéos, diagrammes, infographies',
      icon: <Monitor className="h-6 w-6" />
    },
    { 
      id: 'interactive', 
      label: 'Apprentissage interactif', 
      description: 'Exercices pratiques, quiz, défis',
      icon: <Zap className="h-6 w-6" />
    },
    { 
      id: 'community', 
      label: 'Échanges communautaires', 
      description: 'Discussions, retours, collaboration',
      icon: <Users className="h-6 w-6" />
    }
  ];
  
  const handleStyleSelect = (styleId: LearningStyle) => {
    updateOnboardingData({ learningStyle: styleId });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre style d'apprentissage"
      subtitle="Comment préférez-vous apprendre et recevoir de l'aide ?"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {learningStyles.map((style) => {
            const isSelected = onboardingData.learningStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleStyleSelect(style.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-xl ${
                    isSelected ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {style.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{style.label}</h4>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {onboardingData.learningStyle && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 text-center">
              Parfait ! Nous adapterons l'assistant à votre style d'apprentissage.
            </p>
          </div>
        )}
        
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
            disabled={!onboardingData.learningStyle}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default LearningStyleStep;
