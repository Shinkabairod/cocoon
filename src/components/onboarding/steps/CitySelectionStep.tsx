
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MapPin } from "lucide-react";

const CitySelectionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [city, setCity] = useState(onboardingData.city || '');
  
  const handleContinue = () => {
    updateOnboardingData({ city });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your City" 
      subtitle="Which city are you based in?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <MapPin className="h-16 w-16 text-primary" />
        </div>
        
        <div>
          <Input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-2">
            This helps us suggest location-specific content ideas and connect you with local creators.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!city}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CitySelectionStep;
