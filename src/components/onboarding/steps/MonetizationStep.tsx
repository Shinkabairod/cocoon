
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const MonetizationStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const monetizationOptions = [
    { 
      id: 'yes', 
      label: 'Oui, c\'est un objectif principal', 
      description: 'Je veux créer des sources de revenus',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    { 
      id: 'maybe', 
      label: 'Peut-être dans le futur', 
      description: 'J\'y penserai plus tard',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      id: 'already', 
      label: 'Je monétise déjà', 
      description: 'J\'ai des revenus existants',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      id: 'no', 
      label: 'Non, pas du tout', 
      description: 'Ce n\'est pas mon objectif',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-600'
    }
  ];
  
  const handleMonetizationSelect = (monetizationId: string) => {
    updateOnboardingData({ monetization: monetizationId as any });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background pattern - same as landing */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span>Étape 9 sur 11</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Souhaitez-vous <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">monétiser</span> vos connaissances ?
          </h1>
          <p className="text-xl text-gray-600">Dites-nous si vous avez des objectifs financiers</p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {monetizationOptions.map((option) => {
            const isSelected = onboardingData.monetization === option.id;
            
            return (
              <Card 
                key={option.id}
                className={`p-8 cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'border-black bg-gray-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                }`}
                onClick={() => handleMonetizationSelect(option.id)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${option.color}`}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.label}</h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="text-gray-500 border-gray-300 hover:bg-gray-50"
          >
            Retour
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!onboardingData.monetization}
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonetizationStep;
