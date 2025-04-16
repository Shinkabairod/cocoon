
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PenTool } from "lucide-react";

const BusinessDescriptionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [businessDescription, setBusinessDescription] = useState(onboardingData.businessDescription || '');
  
  const handleContinue = () => {
    updateOnboardingData({ businessDescription });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Description de Votre Activité" 
      subtitle="Décrivez brièvement votre activité ou projet"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <PenTool className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <Textarea
            placeholder="Par exemple: Je suis un coach fitness qui se spécialise dans la nutrition et l'entraînement à domicile..."
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="h-32"
          />
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!businessDescription}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BusinessDescriptionStep;
