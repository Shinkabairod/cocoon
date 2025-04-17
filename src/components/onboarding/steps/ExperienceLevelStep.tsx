
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ExperienceLevel } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const ExperienceLevelStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const isMobile = useIsMobile();
  
  const experienceLevels: { level: ExperienceLevel; description: string }[] = [
    { 
      level: 'Beginner', 
      description: "I've never created or posted any content before, or I've only made a few posts."
    },
    { 
      level: 'Intermediate', 
      description: "I've been creating content for a while and have some followers, but I'm looking to grow."
    },
    { 
      level: 'Experienced', 
      description: "I have an established audience and am looking to optimize my strategy or expand to new platforms."
    }
  ];
  
  const handleExperienceSelect = (level: ExperienceLevel) => {
    updateOnboardingData({ experienceLevel: level });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Experience" 
      subtitle="Tell us about your content creation experience level"
    >
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 gap-3">
            {experienceLevels.map(({ level, description }) => (
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
                <div className="text-sm text-muted-foreground mt-1">{description}</div>
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
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ExperienceLevelStep;
