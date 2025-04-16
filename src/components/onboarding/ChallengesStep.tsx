
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentChallenge, TimeAvailable } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const ChallengesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const challenges: ContentChallenge[] = [
    'Where to start',
    'Choosing equipment',
    'Script writing',
    'Filming',
    'Editing',
    'Promotion'
  ];
  
  const timeOptions: TimeAvailable[] = [
    'Less than 1 hour',
    '1-3 hours',
    '3-5 hours',
    '5+ hours'
  ];
  
  const equipment = [
    'Camera/Smartphone',
    'Microphone',
    'Lighting',
    'Tripod',
    'Computer/Laptop',
    'Editing Software'
  ];
  
  const handleChallengeSelect = (challenge: ContentChallenge) => {
    updateOnboardingData({ contentChallenge: challenge });
  };
  
  const handleTimeSelect = (time: TimeAvailable) => {
    updateOnboardingData({ timeAvailable: time });
  };
  
  const handleEquipmentToggle = (item: string) => {
    let updatedEquipment = [...(onboardingData.equipmentOwned || [])];
    
    if (updatedEquipment.includes(item)) {
      updatedEquipment = updatedEquipment.filter(e => e !== item);
    } else {
      updatedEquipment.push(item);
    }
    
    updateOnboardingData({ equipmentOwned: updatedEquipment });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Challenges & Resources" 
      subtitle="Let's understand what you need help with and what you have available"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">What's your biggest challenge with content creation?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <Card 
                key={challenge}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.contentChallenge === challenge 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleChallengeSelect(challenge)}
              >
                <div className="font-medium">{challenge}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">How much time can you dedicate to content creation each week?</h3>
          <div className="grid grid-cols-2 gap-4">
            {timeOptions.map((time) => (
              <Card 
                key={time}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.timeAvailable === time 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                <div className="font-medium">{time}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">What equipment do you have available?</h3>
          <div className="grid grid-cols-2 gap-4">
            {equipment.map((item) => {
              const isSelected = onboardingData.equipmentOwned?.includes(item);
              
              return (
                <Card 
                  key={item}
                  className={`p-4 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleEquipmentToggle(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item}</div>
                    {isSelected ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={
              !onboardingData.contentChallenge || 
              !onboardingData.timeAvailable
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ChallengesStep;
