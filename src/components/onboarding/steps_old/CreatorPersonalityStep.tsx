
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { personalityTraits } from "@/components/onboarding/content-type/contentTypeData";

const CreatorPersonalityStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedTraits, setSelectedTraits] = useState<string[]>(
    onboardingData.personalityTraits || []
  );
  
  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };
  
  const handleContinue = () => {
    updateOnboardingData({ personalityTraits: selectedTraits });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Creator Personality" 
      subtitle="Which of these traits describe you best?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <UserCircle className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select all that apply to you (at least 3)</p>
          
          <div className="flex flex-wrap gap-2">
            {personalityTraits.map((trait) => {
              const isSelected = selectedTraits.includes(trait);
              return (
                <Badge
                  key={trait}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => toggleTrait(trait)}
                >
                  {trait}
                </Badge>
              );
            })}
          </div>
          
          <p className="text-xs text-muted-foreground mt-3">
            Your personality traits will help us recommend content formats that play to your strengths.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedTraits.length < 3}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CreatorPersonalityStep;
