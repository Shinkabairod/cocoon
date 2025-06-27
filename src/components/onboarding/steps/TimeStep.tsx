
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { TimeAvailable } from "@/types/onboarding";

const TimeStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const timeOptions: { id: TimeAvailable; label: string; color: string }[] = [
    { 
      id: 'low', 
      label: '<1h per day', 
      color: 'bg-red-100 text-red-600'
    },
    { 
      id: 'medium', 
      label: '1-3h per day', 
      color: 'bg-yellow-100 text-yellow-600'
    },
    { 
      id: 'high', 
      label: '3-5h per day', 
      color: 'bg-green-100 text-green-600'
    },
    { 
      id: 'very-high', 
      label: '5h+ per day', 
      color: 'bg-blue-100 text-blue-600'
    }
  ];
  
  const handleTimeSelect = (timeId: TimeAvailable) => {
    updateOnboardingData({ timeAvailable: timeId });
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
            <span>Step 8 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Time</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            {timeOptions.map((option) => {
              const isSelected = onboardingData.timeAvailable === option.id;
              
              return (
                <Card 
                  key={option.id}
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTimeSelect(option.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${option.color}`}>
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{option.label}</h4>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-violet-600 rounded-full"></div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          
          {onboardingData.timeAvailable && (
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800 text-center">
                We'll adapt to your schedule!
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
            disabled={!onboardingData.timeAvailable}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeStep;
