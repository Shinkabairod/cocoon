
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const TimeStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const timeOptions = [
    { 
      id: 'low', 
      label: 'Moins d\'1h par jour', 
      description: 'Je veux des conseils rapides et efficaces',
      color: 'bg-red-100 text-red-600'
    },
    { 
      id: 'medium', 
      label: '1-3h par jour', 
      description: 'J\'ai du temps pour des projets moyens',
      color: 'bg-yellow-100 text-yellow-600'
    },
    { 
      id: 'high', 
      label: '3-5h par jour', 
      description: 'Je peux investir du temps conséquent',
      color: 'bg-green-100 text-green-600'
    },
    { 
      id: 'very-high', 
      label: '5h+ par jour', 
      description: 'C\'est ma priorité principale',
      color: 'bg-blue-100 text-blue-600'
    }
  ];
  
  const handleTimeSelect = (timeId: string) => {
    updateOnboardingData({ timeAvailable: timeId });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre disponibilité"
      subtitle="Combien de temps pouvez-vous consacrer à vos projets ?"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          {timeOptions.map((option) => {
            const isSelected = onboardingData.timeAvailable === option.id;
            
            return (
              <Card 
                key={option.id}
                className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-violet-500 bg-violet-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTimeSelect(option.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${option.color}`}>
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{option.label}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 bg-violet-600 rounded-full"></div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
        
        {onboardingData.timeAvailable && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              Nous adapterons nos recommandations à votre disponibilité !
            </p>
          </div>
        )}
        
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
            disabled={!onboardingData.timeAvailable}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default TimeStep;
