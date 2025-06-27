
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState } from "react";
import { lifeValues } from "@/components/onboarding/content-type/contentTypeData";

const CreatorValuesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedValues, setSelectedValues] = useState<string[]>(
    onboardingData.lifeValues || []
  );
  
  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };
  
  const handleContinue = () => {
    updateOnboardingData({ lifeValues: selectedValues });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Values and Lifestyle" 
      subtitle="What matters most to you in life?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Star className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select all that resonate with you (at least 3)</p>
          
          <div className="flex flex-wrap gap-2">
            {lifeValues.map((value) => {
              const isSelected = selectedValues.includes(value);
              return (
                <Badge
                  key={value}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => toggleValue(value)}
                >
                  {value}
                </Badge>
              );
            })}
          </div>
          
          <p className="text-xs text-muted-foreground mt-3">
            Your values and lifestyle priorities will help us suggest content types that align with what's important to you.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedValues.length < 3}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CreatorValuesStep;
