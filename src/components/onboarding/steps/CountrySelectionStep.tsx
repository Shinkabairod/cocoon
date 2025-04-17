
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import { Globe } from "lucide-react";

const CountrySelectionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [country, setCountry] = useState(onboardingData.country || '');
  
  // List of some countries for the demo
  const popularCountries = [
    'United States', 'Canada', 'United Kingdom', 'France', 'Germany', 
    'Spain', 'Italy', 'Australia', 'Japan', 'Brazil', 'Mexico', 
    'India', 'South Africa', 'Nigeria', 'Sweden', 'Netherlands'
  ];
  
  const handleContinue = () => {
    updateOnboardingData({ country });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Location" 
      subtitle="Which country are you based in?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Globe className="h-16 w-16 text-primary" />
        </div>
        
        <div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {popularCountries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            This helps us personalize our recommendations based on local trends.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!country}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CountrySelectionStep;
