
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentChallenge, TimeAvailable } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { useState } from "react";
import { MapPin, Home, Building, Mountain, Coffee, Trees, Waves } from "lucide-react";
import ChallengeSelectorCard from "./ChallengeSelectorCard";
import TimeAvailableSelector from "./TimeAvailableSelector";
import EquipmentSelector from "./EquipmentSelector";
import FilmingLocationSelector from "./FilmingLocationSelector";

const ChallengesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedChallenges, setSelectedChallenges] = useState<ContentChallenge[]>(
    onboardingData.contentChallenges || []
  );
  const [customLocation, setCustomLocation] = useState(onboardingData.customFilmingLocation || '');
  const [selectedLocation, setSelectedLocation] = useState(onboardingData.filmingLocation || '');
  
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
    'Editing Software',
    'iPad/Tablet',
    'Drone',
    'GoPro/Action Cam',
    'Green Screen',
    'Stabilizer/Gimbal',
    'Audio Interface'
  ];
  
  const filmingLocations = [
    { id: 'home', label: 'À domicile', icon: <Home className="h-5 w-5" /> },
    { id: 'studio', label: 'Studio dédié', icon: <Building className="h-5 w-5" /> },
    { id: 'outdoor', label: 'Extérieur/Nature', icon: <Trees className="h-5 w-5" /> },
    { id: 'urban', label: 'Environnement urbain', icon: <MapPin className="h-5 w-5" /> },
    { id: 'travel', label: 'Lors de voyages', icon: <Mountain className="h-5 w-5" /> },
    { id: 'cafe', label: 'Café/Espace de coworking', icon: <Coffee className="h-5 w-5" /> },
    { id: 'beach', label: 'Plage/Bord de mer', icon: <Waves className="h-5 w-5" /> },
    { id: 'custom', label: 'Autre (préciser)', icon: <MapPin className="h-5 w-5" /> }
  ];
  
  const toggleChallenge = (challenge: ContentChallenge) => {
    const updatedChallenges = selectedChallenges.includes(challenge)
      ? selectedChallenges.filter(c => c !== challenge)
      : [...selectedChallenges, challenge];
    
    setSelectedChallenges(updatedChallenges);
    updateOnboardingData({ contentChallenges: updatedChallenges });
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
  
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    
    if (locationId !== 'custom') {
      const locationName = filmingLocations.find(loc => loc.id === locationId)?.label || '';
      updateOnboardingData({ 
        filmingLocation: locationId,
        filmingLocationName: locationName,
        customFilmingLocation: ''
      });
      setCustomLocation('');
    } else {
      updateOnboardingData({ 
        filmingLocation: 'custom',
        customFilmingLocation: customLocation 
      });
    }
  };
  
  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomLocation(e.target.value);
    updateOnboardingData({ customFilmingLocation: e.target.value });
  };
  
  const handleContinue = () => {
    if (selectedLocation === 'custom') {
      updateOnboardingData({ customFilmingLocation: customLocation });
    }
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Vos Défis & Ressources" 
      subtitle="Identifions vos obstacles et les ressources dont vous disposez"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Quels sont vos plus grands défis dans la création de contenu ? (2 choix max)</h3>
          <div className="grid grid-cols-2 gap-3">
            {challenges.map((challenge) => {
              const isSelected = selectedChallenges.includes(challenge);
              const isDisabled = !isSelected && selectedChallenges.length >= 2;
              
              return (
                <ChallengeSelectorCard
                  key={challenge}
                  challenge={challenge}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onToggle={toggleChallenge}
                />
              );
            })}
          </div>
        </div>
        
        <TimeAvailableSelector
          timeOptions={timeOptions}
          selectedTime={onboardingData.timeAvailable}
          onTimeSelect={handleTimeSelect}
        />
        
        <EquipmentSelector
          equipment={equipment}
          selectedEquipment={onboardingData.equipmentOwned}
          onEquipmentToggle={handleEquipmentToggle}
        />
        
        <FilmingLocationSelector
          locations={filmingLocations}
          selectedLocation={selectedLocation}
          customLocation={customLocation}
          onLocationSelect={handleLocationSelect}
          onCustomLocationChange={handleCustomLocationChange}
        />
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={
              selectedChallenges.length === 0 || 
              !onboardingData.timeAvailable ||
              !selectedLocation ||
              (selectedLocation === 'custom' && !customLocation)
            }
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ChallengesStep;
