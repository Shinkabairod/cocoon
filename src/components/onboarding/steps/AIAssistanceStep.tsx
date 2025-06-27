
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Check, Lightbulb, TrendingUp, Users, BookOpen, Zap, Target, DollarSign } from "lucide-react";

const AIAssistanceStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const assistanceAreas = [
    { 
      id: 'ideas', 
      label: 'Generate ideas', 
      icon: <Lightbulb className="h-5 w-5" />
    },
    { 
      id: 'strategy', 
      label: 'Strategy', 
      icon: <Target className="h-5 w-5" />
    },
    { 
      id: 'content', 
      label: 'Create content', 
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 'growth', 
      label: 'Growth', 
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'optimization', 
      label: 'Optimization', 
      icon: <Zap className="h-5 w-5" />
    },
    { 
      id: 'monetization', 
      label: 'Monetization', 
      icon: <DollarSign className="h-5 w-5" />
    }
  ];
  
  const selectedAreas = onboardingData.aiAssistanceAreas || [];
  
  const handleAreaToggle = (areaId: string) => {
    let updatedAreas = [...selectedAreas];
    
    if (updatedAreas.includes(areaId)) {
      updatedAreas = updatedAreas.filter(id => id !== areaId);
    } else {
      updatedAreas.push(areaId);
    }
    
    updateOnboardingData({ aiAssistanceAreas: updatedAreas });
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
            <span>Step 9 of 10</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Assistance</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            {assistanceAreas.map((area) => {
              const isSelected = selectedAreas.includes(area.id);
              
              return (
                <Card 
                  key={area.id}
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleAreaToggle(area.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                        {area.icon}
                      </div>
                      <h4 className="font-medium text-gray-900">{area.label}</h4>
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-violet-600" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          
          <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
            <p className="text-sm text-violet-800 text-center">
              <span className="font-medium">{selectedAreas.length}</span> selected
            </p>
          </div>
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
            disabled={selectedAreas.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistanceStep;
