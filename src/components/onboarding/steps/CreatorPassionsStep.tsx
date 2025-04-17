
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useState } from "react";
import { passions } from "@/components/onboarding/content-type/contentTypeData";

const CreatorPassionsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedPassions, setSelectedPassions] = useState<string[]>(
    onboardingData.passions || []
  );
  
  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };
  
  const handleContinue = () => {
    updateOnboardingData({ passions: selectedPassions });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Let's Find Your Perfect Creator Path" 
      subtitle="First, tell us about your passions and interests"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select all that interest you (at least 3)</p>
          
          <div className="flex flex-wrap gap-2">
            {passions.map((passion) => {
              const isSelected = selectedPassions.includes(passion);
              return (
                <Badge
                  key={passion}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => togglePassion(passion)}
                >
                  {passion}
                </Badge>
              );
            })}
          </div>
          
          <p className="text-xs text-muted-foreground mt-3">
            These will help us determine what content types might suit you best.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedPassions.length < 3}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CreatorPassionsStep;
