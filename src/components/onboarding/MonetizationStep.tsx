
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Monetization } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";

const MonetizationStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const monetizationOptions: Monetization[] = [
    'Yes',
    'No',
    'Not sure yet'
  ];
  
  const handleMonetizationSelect = (option: Monetization) => {
    updateOnboardingData({ monetization: option });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Monetization" 
      subtitle="Tell us about your plans to monetize your content"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Are you interested in monetizing your content?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monetizationOptions.map((option) => (
              <Card 
                key={option}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.monetization === option 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleMonetizationSelect(option)}
              >
                <div className="font-medium">{option}</div>
              </Card>
            ))}
          </div>
        </div>
        
        {onboardingData.monetization === 'Yes' && (
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Monetization options we'll help you explore:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Ad revenue (YouTube, blogs)</li>
              <li>Sponsored content</li>
              <li>Affiliate marketing</li>
              <li>Digital products and courses</li>
              <li>Membership and subscription models</li>
              <li>Brand partnerships</li>
            </ul>
          </div>
        )}
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={!onboardingData.monetization}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default MonetizationStep;
