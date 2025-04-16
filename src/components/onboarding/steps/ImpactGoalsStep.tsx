
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ImpactGoal } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Target } from "lucide-react";

const ImpactGoalsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const impactGoals: ImpactGoal[] = [
    'Educate',
    'Entertain',
    'Inspire',
    'Inform',
    'Provoke thought',
    'Build community',
    'Sell products/services'
  ];
  
  const impactDescriptions: Record<ImpactGoal, string> = {
    'Educate': 'Apprendre de nouvelles compétences à votre audience',
    'Entertain': 'Divertir et faire rire votre audience',
    'Inspire': 'Motiver et inspirer votre audience',
    'Inform': 'Tenir votre audience informée des actualités ou tendances',
    'Provoke thought': 'Stimuler la réflexion et le débat',
    'Build community': 'Créer un sentiment d\'appartenance',
    'Sell products/services': 'Promouvoir vos produits ou services'
  };
  
  const handleImpactGoalToggle = (goal: ImpactGoal) => {
    let updatedGoals = [...(onboardingData.impactGoals || [])];
    
    if (updatedGoals.includes(goal)) {
      updatedGoals = updatedGoals.filter(g => g !== goal);
    } else {
      updatedGoals.push(goal);
    }
    
    updateOnboardingData({ impactGoals: updatedGoals });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Objectifs d'Impact" 
      subtitle="Comment souhaitez-vous impacter votre audience ?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Target className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <div className="grid grid-cols-1 gap-3">
            {impactGoals.map((goal) => {
              const isSelected = onboardingData.impactGoals?.includes(goal);
              
              return (
                <Card 
                  key={goal}
                  className={`p-4 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleImpactGoalToggle(goal)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{goal}</div>
                      <div className="text-sm text-muted-foreground">{impactDescriptions[goal]}</div>
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!(onboardingData.impactGoals?.length)}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ImpactGoalsStep;
