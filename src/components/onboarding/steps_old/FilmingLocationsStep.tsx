import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { filmingLocations } from "@/components/onboarding/content-type_old/contentTypeData";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FilmingLocationsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    onboardingData.filmingLocations || []
  );
  const [customLocation, setCustomLocation] = useState(onboardingData.customFilmingLocation || '');
  
  const toggleLocation = (location: string) => {
    let updated;
    if (selectedLocations.includes(location)) {
      updated = selectedLocations.filter(l => l !== location);
    } else {
      updated = [...selectedLocations, location];
    }
    setSelectedLocations(updated);
    updateOnboardingData({ filmingLocations: updated });
  };
  
  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomLocation(e.target.value);
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      filmingLocations: selectedLocations,
      customFilmingLocation: customLocation
    });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Filming Locations" 
      subtitle="Where do you plan to film your content?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <MapPin className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select all that apply (at least 1)</p>
          
          <div className="flex flex-wrap gap-2">
            {filmingLocations.map((location) => {
              const isSelected = selectedLocations.includes(location);
              return (
                <Badge
                  key={location}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => toggleLocation(location)}
                >
                  {location}
                </Badge>
              );
            })}
          </div>
        </div>
        
        <div>
          <p className="text-sm mb-3">Or enter a custom location:</p>
          <Input 
            type="text"
            placeholder="Ex: Coffee shop, library"
            value={customLocation}
            onChange={handleCustomLocationChange}
          />
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedLocations.length === 0 && !customLocation}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FilmingLocationsStep;
