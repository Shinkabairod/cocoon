
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { useState } from "react";
import { User } from "lucide-react";

const ProfileStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  const [fullName, setFullName] = useState(onboardingData.fullName || '');
  
  const handleContinue = () => {
    updateOnboardingData({ fullName });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Faisons connaissance"
      subtitle="Comment souhaitez-vous que votre assistant s'adresse à vous ?"
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <User className="h-8 w-8 text-violet-600" />
          </div>
        </div>
        
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Votre prénom ou nom complet
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Ex: Marie, Jean Dupont..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-center text-lg"
            />
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Cette information nous permet de personnaliser vos interactions avec l'assistant IA
          </p>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Retour
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-6"
            onClick={handleContinue}
            disabled={!fullName.trim()}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ProfileStep;
