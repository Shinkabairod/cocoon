
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { LearningStyle } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const LearningStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [personalGoal, setPersonalGoal] = useState(onboardingData.personalGoal || '');
  
  const learningStyles: LearningStyle[] = [
    'Step-by-step guides',
    'Video tutorials',
    'Articles',
    'Interactive exercises'
  ];
  
  const handleLearningStyleSelect = (style: LearningStyle) => {
    updateOnboardingData({ learningStyle: style });
  };
  
  const handleFeedbackToggle = (checked: boolean) => {
    updateOnboardingData({ wantsFeedback: checked });
  };
  
  const handleContinue = () => {
    updateOnboardingData({ personalGoal });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Learning Preferences" 
      subtitle="Help us understand how you prefer to learn"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">How would you like to learn about content creation?</h3>
          <div className="grid grid-cols-2 gap-4">
            {learningStyles.map((style) => (
              <Card 
                key={style}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.learningStyle === style 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleLearningStyleSelect(style)}
              >
                <div className="font-medium">{style}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Would you like to receive feedback on your content?</h3>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="feedback" 
                checked={onboardingData.wantsFeedback}
                onCheckedChange={handleFeedbackToggle}
              />
              <Label htmlFor="feedback">Yes, I'd like to receive feedback on my content</Label>
            </div>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">What would success look like for you in the next 6 months?</h3>
          <Textarea
            placeholder="E.g., Start a YouTube channel with 1,000 subscribers, Create a blog with consistent weekly posts..."
            value={personalGoal}
            onChange={(e) => setPersonalGoal(e.target.value)}
            className="h-32"
          />
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={
              !onboardingData.learningStyle || 
              onboardingData.wantsFeedback === undefined ||
              !personalGoal
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default LearningStep;
