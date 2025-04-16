
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ExperienceLevel } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const ExperienceLevelStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const isMobile = useIsMobile();
  
  const experienceLevels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Experienced'];
  
  const handleExperienceSelect = (level: ExperienceLevel) => {
    updateOnboardingData({ experienceLevel: level });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Expérience" 
      subtitle="Dites-nous quel est votre niveau en création de contenu"
    >
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 gap-3">
            {experienceLevels.map((level) => (
              <Card 
                key={level}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.experienceLevel === level 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleExperienceSelect(level)}
              >
                <div className="font-medium">{level}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!onboardingData.experienceLevel}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ExperienceLevelStep;
