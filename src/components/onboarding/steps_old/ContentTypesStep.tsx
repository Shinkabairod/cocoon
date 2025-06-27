import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { contentTypes } from "@/components/onboarding/content-type_old/contentTypeData";
import { ContentType } from "@/types/onboarding";
import { useState } from "react";

interface ContentTypesStepProps {
  onboardingData: any;
  updateOnboardingData: (data: any) => void;
  nextStep: () => void;
}

const ContentTypesStep: React.FC<ContentTypesStepProps> = ({ onboardingData, updateOnboardingData, nextStep }) => {
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>(
    onboardingData.contentTypes || []
  );

  const handleTypeToggle = (type: ContentType) => {
    let updatedTypes = [...selectedTypes];

    if (updatedTypes.includes(type)) {
      updatedTypes = updatedTypes.filter(t => t !== type);
    } else {
      updatedTypes.push(type);
    }

    setSelectedTypes(updatedTypes);
    updateOnboardingData({ contentTypes: updatedTypes });
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <OnboardingLayout
      title="Content Types"
      subtitle="What type of content do you want to create?"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type) => {
            const isSelected = selectedTypes.includes(type);

            return (
              <Card
                key={type}
                className={`p-3 cursor-pointer border-2 ${isSelected ? 'border-primary' : 'border-border hover:border-muted-foreground'
                  }`}
                onClick={() => handleTypeToggle(type)}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{type}</div>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="pt-4 flex justify-center">
          <Button
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedTypes.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentTypesStep;
