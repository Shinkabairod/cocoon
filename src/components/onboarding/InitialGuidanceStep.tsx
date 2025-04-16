
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Compass, HelpCircle, Lightbulb, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const InitialGuidanceStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const isMobile = useIsMobile();
  
  const handleDirectionChoice = (hasDirection: boolean) => {
    updateOnboardingData({ 
      hasContentDirection: hasDirection,
      step: 2 // Skip to experience step
    });
  };
  
  return (
    <OnboardingLayout 
      title="Bienvenue sur AI Content Coach" 
      subtitle="Voyons comment nous pouvons vous aider dans votre parcours de création de contenu"
      showBackButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-2">
          <Smartphone className="h-6 w-6 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">Version Mobile Optimisée</span>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Pour commencer, dites-nous où vous en êtes dans votre parcours créatif</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <Card 
              className="p-5 cursor-pointer border-2 hover:border-primary transition-all"
              onClick={() => handleDirectionChoice(true)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <Compass className="h-10 w-10 text-primary" />
                <div>
                  <h4 className="font-medium text-lg mb-2">J'ai déjà une idée précise</h4>
                  <p className="text-muted-foreground text-sm">
                    Je sais quel type de contenu je veux créer et sur quelles plateformes,
                    mais j'ai besoin d'aide pour structurer et optimiser mon approche.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card 
              className="p-5 cursor-pointer border-2 hover:border-primary transition-all"
              onClick={() => handleDirectionChoice(false)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <HelpCircle className="h-10 w-10 text-primary" />
                <div>
                  <h4 className="font-medium text-lg mb-2">Je cherche encore ma voie</h4>
                  <p className="text-muted-foreground text-sm">
                    Je souhaite créer du contenu mais je ne suis pas sûr par où commencer
                    ou quel type de contenu me conviendrait le mieux.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Nous allons adapter notre processus d'onboarding en fonction de votre situation actuelle,
            en vous guidant à travers chaque étape du processus de création de contenu.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default InitialGuidanceStep;
