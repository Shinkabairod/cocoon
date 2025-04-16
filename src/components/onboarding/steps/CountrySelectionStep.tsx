
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
  
  // Liste de quelques pays pour la démo
  const popularCountries = [
    'France', 'États-Unis', 'Canada', 'Royaume-Uni', 'Belgique', 
    'Suisse', 'Allemagne', 'Espagne', 'Italie', 'Maroc'
  ];
  
  const handleContinue = () => {
    updateOnboardingData({ country });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Localisation" 
      subtitle="Dans quel pays êtes-vous basé ?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Globe className="h-16 w-16 text-primary" />
        </div>
        
        <div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez votre pays" />
            </SelectTrigger>
            <SelectContent>
              {popularCountries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            Cette information nous aide à personnaliser nos recommandations selon les tendances locales.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!country}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CountrySelectionStep;
