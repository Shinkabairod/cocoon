
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { ContentType } from "@/types/onboarding";
import { contentTypes } from "@/components/onboarding/content-type/contentTypeData";
import { Check, FileType } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContentTypesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const handleTypeToggle = (type: ContentType) => {
    const currentTypes = onboardingData.contentTypes || [];
    let updatedTypes;
    
    if (currentTypes.includes(type)) {
      updatedTypes = currentTypes.filter(t => t !== type);
    } else {
      updatedTypes = [...currentTypes, type];
    }
    
    updateOnboardingData({ contentTypes: updatedTypes });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'Videos':
        return '🎬';
      case 'Blogs':
        return '📝';
      case 'Podcasts':
        return '🎙️';
      case 'Social Media Posts':
        return '📱';
      default:
        return '📄';
    }
  };
  
  return (
    <OnboardingLayout 
      title="Your Content Types" 
      subtitle="What type of content do you want to create?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <FileType className="h-12 w-12 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {contentTypes.map((type) => {
            const isSelected = (onboardingData.contentTypes || []).includes(type);
            
            return (
              <Card 
                key={type}
                className={`p-4 cursor-pointer border-2 ${
                  isSelected 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleTypeToggle(type)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getTypeIcon(type)}</span>
                    <span className="font-medium">{type}</span>
                  </div>
                  {isSelected && <Check className="h-5 w-5 text-primary" />}
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={(onboardingData.contentTypes || []).length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentTypesStep;
