
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { contentCategories } from "@/components/onboarding/content-type_old/contentTypeData";
import { Badge } from "@/components/ui/badge";
import { TagIcon } from "lucide-react";
import { useState } from "react";

const ContentCategoriesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    onboardingData.contentCategories || []
  );
  
  const toggleCategory = (category: string) => {
    let updated;
    if (selectedCategories.includes(category)) {
      updated = selectedCategories.filter(c => c !== category);
    } else {
      updated = [...selectedCategories, category];
    }
    setSelectedCategories(updated);
    updateOnboardingData({ contentCategories: updated });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Content Categories" 
      subtitle="What topics do you want to focus on?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <TagIcon className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select all that apply (at least 1)</p>
          
          <div className="flex flex-wrap gap-2">
            {contentCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <Badge
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              );
            })}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedCategories.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentCategoriesStep;
