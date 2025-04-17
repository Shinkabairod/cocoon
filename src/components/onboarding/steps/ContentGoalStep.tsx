
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentGoal } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";

const ContentGoalStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<ContentGoal[]>(
    onboardingData.contentGoals || []
  );
  
  const contentGoals: ContentGoal[] = [
    'Grow an audience',
    'Share knowledge',
    'Make money',
    'Build a brand',
    'Have fun'
  ];
  
  const handleGoalToggle = (goal: ContentGoal) => {
    let updatedGoals = [...selectedGoals];
    
    if (updatedGoals.includes(goal)) {
      // Remove the goal if already selected
      updatedGoals = updatedGoals.filter(g => g !== goal);
    } else if (updatedGoals.length < 2) {
      // Add the goal if less than 2 are selected
      updatedGoals.push(goal);
    }
    
    setSelectedGoals(updatedGoals);
    updateOnboardingData({ contentGoals: updatedGoals });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Goals" 
      subtitle="What are your main goals with content creation? (Select up to 2)"
    >
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 gap-3">
            {contentGoals.map((goal) => {
              const isSelected = selectedGoals.includes(goal);
              const isDisabled = !isSelected && selectedGoals.length >= 2;
              
              return (
                <Card 
                  key={goal}
                  className={`p-4 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : isDisabled
                        ? 'border-border opacity-50'
                        : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => !isDisabled && handleGoalToggle(goal)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{goal}</div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            You can select up to 2 goals that are most important to you.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedGoals.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentGoalStep;
