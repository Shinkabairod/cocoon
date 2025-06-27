
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Check, Target, TrendingUp, Users, Zap, BookOpen, DollarSign } from "lucide-react";

const ObjectivesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const objectives = [
    { 
      id: 'productivity', 
      label: 'Boost productivity', 
      icon: <Zap className="h-5 w-5" />
    },
    { 
      id: 'skills', 
      label: 'Learn skills', 
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 'business', 
      label: 'Grow business', 
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      id: 'audience', 
      label: 'Build audience', 
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'content', 
      label: 'Create content', 
      icon: <Target className="h-5 w-5" />
    },
    { 
      id: 'revenue', 
      label: 'Generate income', 
      icon: <DollarSign className="h-5 w-5" />
    }
  ];
  
  const selectedObjectives = onboardingData.objectives || [];
  
  const handleObjectiveToggle = (objectiveId: string) => {
    let updatedObjectives = [...selectedObjectives];
    
    if (updatedObjectives.includes(objectiveId)) {
      updatedObjectives = updatedObjectives.filter(id => id !== objectiveId);
    } else {
      updatedObjectives.push(objectiveId);
    }
    
    updateOnboardingData({ objectives: updatedObjectives });
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
            <span>Step 4 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Goals</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            {objectives.map((objective) => {
              const isSelected = selectedObjectives.includes(objective.id);
              
              return (
                <Card 
                  key={objective.id}
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleObjectiveToggle(objective.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                        {objective.icon}
                      </div>
                      <h4 className="font-medium text-gray-900">{objective.label}</h4>
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
              <span className="font-medium">{selectedObjectives.length}</span> selected
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
            disabled={selectedObjectives.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesStep;
