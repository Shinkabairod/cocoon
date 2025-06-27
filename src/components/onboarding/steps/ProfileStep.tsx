
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useState } from "react";
import { User, ArrowLeft, ArrowRight } from "lucide-react";

const ProfileStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  const [fullName, setFullName] = useState(onboardingData.fullName || '');
  
  const handleContinue = () => {
    updateOnboardingData({ fullName });
    nextStep();
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background pattern - same as landing */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span>Étape 2 sur 11</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Faisons <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">connaissance</span>
          </h1>
          <p className="text-xl text-gray-600">Comment souhaitez-vous que votre assistant s'adresse à vous ?</p>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <User className="h-8 w-8 text-gray-700" />
          </div>
        </div>
        
        {/* Form */}
        <div className="max-w-md mx-auto space-y-6 mb-12">
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
              className="text-center text-lg border-gray-300 focus:border-black focus:ring-black"
            />
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Cette information nous permet de personnaliser vos interactions avec l'assistant IA
          </p>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="text-gray-500 border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <Button 
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
            onClick={handleContinue}
            disabled={!fullName.trim()}
          >
            Continuer
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
