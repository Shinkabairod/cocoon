
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { TargetGeneration } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const AudienceGenerationStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const generations: { type: TargetGeneration; description: string }[] = [
    { type: 'Gen Z', description: '10-25 years old' },
    { type: 'Millennials', description: '26-40 years old' },
    { type: 'Gen X', description: '41-55 years old' },
    { type: 'Baby Boomers', description: '56-75 years old' },
    { type: 'All Ages', description: 'All ages' }
  ];
  
  const handleGenerationSelect = (generation: TargetGeneration) => {
    updateOnboardingData({ targetGeneration: generation });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Audience" 
      subtitle="Which generation do you want to reach primarily?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Users className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <div className="grid grid-cols-1 gap-3">
            {generations.map(({ type, description }) => (
              <Card 
                key={type}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.targetGeneration === type 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleGenerationSelect(type)}
              >
                <div className="font-medium">{type}</div>
                <div className="text-sm text-muted-foreground">{description}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!onboardingData.targetGeneration}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default AudienceGenerationStep;
