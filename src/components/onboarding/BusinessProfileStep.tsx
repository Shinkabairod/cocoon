
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { BusinessType, Country } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Building, Globe, Store, Briefcase, School, Heart } from "lucide-react";

const BusinessProfileStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [country, setCountry] = useState(onboardingData.country || '');
  const [businessDescription, setBusinessDescription] = useState(onboardingData.businessDescription || '');
  
  const businessTypes: { type: BusinessType; icon: JSX.Element }[] = [
    { type: 'Personal Brand', icon: <Briefcase className="h-5 w-5" /> },
    { type: 'Small Business', icon: <Store className="h-5 w-5" /> },
    { type: 'Startup', icon: <Building className="h-5 w-5" /> },
    { type: 'Established Company', icon: <Building className="h-5 w-5" /> },
    { type: 'Educational Institution', icon: <School className="h-5 w-5" /> },
    { type: 'Non-Profit', icon: <Heart className="h-5 w-5" /> },
    { type: 'Other', icon: <Globe className="h-5 w-5" /> }
  ];
  
  // Liste de quelques pays pour la démo (à étendre dans la version finale)
  const popularCountries = [
    'France', 'États-Unis', 'Canada', 'Royaume-Uni', 'Belgique', 
    'Suisse', 'Allemagne', 'Espagne', 'Italie', 'Maroc'
  ];
  
  const handleBusinessTypeSelect = (type: BusinessType) => {
    updateOnboardingData({ businessType: type });
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      country, 
      businessDescription 
    });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Profil Professionnel" 
      subtitle="Aidez-nous à mieux comprendre votre activité et votre marché"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Dans quel pays êtes-vous basé ?</h3>
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
        
        <div>
          <h3 className="text-lg font-medium mb-4">Comment définiriez-vous votre activité ?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {businessTypes.map(({ type, icon }) => (
              <Card 
                key={type}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.businessType === type 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleBusinessTypeSelect(type)}
              >
                <div className="flex items-center space-x-2">
                  {icon}
                  <div className="font-medium">{type}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Décrivez brièvement votre activité ou projet</h3>
          <Textarea
            placeholder="Par exemple: Je suis un coach fitness qui se spécialise dans la nutrition et l'entraînement à domicile..."
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="h-32"
          />
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={!country || !onboardingData.businessType || !businessDescription}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BusinessProfileStep;
