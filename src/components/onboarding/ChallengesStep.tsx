import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentChallenge, TimeAvailable } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, X, MapPin, Home, Building, Mountain, Coffee, Tree, Waves } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
    { id: 'outdoor', label: 'Extérieur/Nature', icon: <Tree className="h-5 w-5" /> },
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
                <Card 
                  key={challenge}
                  className={`p-3 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : isDisabled
                        ? 'border-border opacity-50'
                        : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => !isDisabled && toggleChallenge(challenge)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{challenge}</div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Combien de temps pouvez-vous consacrer à la création de contenu chaque semaine ?</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeOptions.map((time) => (
              <Card 
                key={time}
                className={`p-3 cursor-pointer border-2 ${
                  onboardingData.timeAvailable === time 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                <div className="font-medium text-sm">{time}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">De quel équipement disposez-vous déjà ?</h3>
          <div className="grid grid-cols-2 gap-3">
            {equipment.map((item) => {
              const isSelected = onboardingData.equipmentOwned?.includes(item);
              
              return (
                <Card 
                  key={item}
                  className={`p-3 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleEquipmentToggle(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{item}</div>
                    {isSelected ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Où prévoyez-vous de tourner principalement votre contenu ?</h3>
          <RadioGroup 
            value={selectedLocation}
            onValueChange={handleLocationSelect}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {filmingLocations.map(location => (
              <div key={location.id} className="flex items-start space-x-2">
                <RadioGroupItem value={location.id} id={location.id} className="mt-1" />
                <Label htmlFor={location.id} className="flex items-center cursor-pointer">
                  <div className="mr-2">{location.icon}</div>
                  <span>{location.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {selectedLocation === 'custom' && (
            <div className="mt-3">
              <Input
                placeholder="Précisez le lieu de tournage"
                value={customLocation}
                onChange={handleCustomLocationChange}
              />
            </div>
          )}
        </div>
        
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
