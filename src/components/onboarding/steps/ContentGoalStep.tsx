
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentGoal } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";

const ContentGoalStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const contentGoals: ContentGoal[] = [
    'Grow an audience',
    'Share knowledge',
    'Make money',
    'Build a brand',
    'Have fun'
  ];
  
  const handleGoalSelect = (goal: ContentGoal) => {
    updateOnboardingData({ contentGoal: goal });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Objectif" 
      subtitle="Quel est votre principal objectif avec la création de contenu ?"
    >
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 gap-3">
            {contentGoals.map((goal) => (
              <Card 
                key={goal}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.contentGoal === goal 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleGoalSelect(goal)}
              >
                <div className="font-medium">{goal}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!onboardingData.contentGoal}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentGoalStep;
