
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { BookOpen, Monitor, Users, Zap } from "lucide-react";
import { LearningStyle } from "@/types/onboarding";

const LearningStyleStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const learningStyles: { id: LearningStyle; label: string; icon: JSX.Element }[] = [
    { 
      id: 'reading', 
      label: 'Reading', 
      icon: <BookOpen className="h-6 w-6" />
    },
    { 
      id: 'visual', 
      label: 'Videos', 
      icon: <Monitor className="h-6 w-6" />
    },
    { 
      id: 'interactive', 
      label: 'Interactive', 
      icon: <Zap className="h-6 w-6" />
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: <Users className="h-6 w-6" />
    }
  ];
  
  const handleStyleSelect = (styleId: LearningStyle) => {
    updateOnboardingData({ learningStyle: styleId });
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
            <span>Step 7 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Learning</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {learningStyles.map((style) => {
              const isSelected = onboardingData.learningStyle === style.id;
              
              return (
                <Card 
                  key={style.id}
                  className={`p-8 cursor-pointer border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleStyleSelect(style.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-xl ${
                      isSelected ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {style.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">{style.label}</h4>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {onboardingData.learningStyle && (
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800 text-center">
                Perfect! We'll adapt to your learning style.
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
            disabled={!onboardingData.learningStyle}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningStyleStep;
