
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const MonetizationStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const monetizationOptions = [
    { 
      id: 'yes', 
      label: 'Yes, main goal', 
      description: 'I want to create revenue streams',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    { 
      id: 'maybe', 
      label: 'Maybe in the future', 
      description: 'I\'ll think about it later',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      id: 'already', 
      label: 'Already monetizing', 
      description: 'I have existing revenue',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      id: 'no', 
      label: 'Not at all', 
      description: 'This is not my goal',
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
      <div className="relative max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span>Step 8 of 10</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Monetize</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {monetizationOptions.map((option) => {
              const isSelected = onboardingData.monetization === option.id;
              
              return (
                <Card 
                  key={option.id}
                  className={`p-8 cursor-pointer border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleMonetizationSelect(option.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-xl ${option.color}`}>
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.label}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-violet-600 rounded-full"></div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          
          {onboardingData.monetization && (
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800 text-center">
                Perfect! We'll adapt to your goals.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Back
          </Button>
          <Button 
            className="bg-black hover:bg-gray-800 text-white px-8 py-3"
            onClick={handleContinue}
            disabled={!onboardingData.monetization}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonetizationStep;
