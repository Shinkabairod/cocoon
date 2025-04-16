
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ExperienceLevel, ContentGoal } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";

const ExperienceStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const experienceLevels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Experienced'];
  
  const contentGoals: ContentGoal[] = [
    'Grow an audience',
    'Share knowledge',
    'Make money',
    'Build a brand',
    'Have fun'
  ];
  
  const handleExperienceSelect = (level: ExperienceLevel) => {
    updateOnboardingData({ experienceLevel: level });
  };
  
  const handleGoalSelect = (goal: ContentGoal) => {
    updateOnboardingData({ contentGoal: goal });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Let's Get to Know You" 
      subtitle="Tell us about your experience and goals"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">What's your experience with content creation?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        
        <div>
          <h3 className="text-lg font-medium mb-4">What's your primary goal with content creation?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={!onboardingData.experienceLevel || !onboardingData.contentGoal}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ExperienceStep;
