
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { filmingLocations } from "@/components/onboarding/content-type/contentTypeData";
import { Check, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const FilmingLocationsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const handleLocationToggle = (location: string) => {
    const currentLocations = onboardingData.filmingLocations || [];
    let updatedLocations;
    
    if (currentLocations.includes(location)) {
      updatedLocations = currentLocations.filter(l => l !== location);
    } else {
      updatedLocations = [...currentLocations, location];
    }
    
    updateOnboardingData({ filmingLocations: updatedLocations });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Filming Locations" 
      subtitle="Where do you plan to primarily shoot your content?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <MapPin className="h-12 w-12 text-primary" />
        </div>
        
        <div className="text-sm mb-3">
          <p>Select all that apply. You can choose multiple locations.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {filmingLocations.map((location) => {
            const isSelected = (onboardingData.filmingLocations || []).includes(location);
            
            return (
              <Card 
                key={location}
                className={`p-4 cursor-pointer border-2 ${
                  isSelected 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleLocationToggle(location)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{location}</span>
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
            disabled={(onboardingData.filmingLocations || []).length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FilmingLocationsStep;
