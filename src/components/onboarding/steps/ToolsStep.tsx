
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Check, Smartphone, Monitor, Users, TrendingUp, BookOpen, Zap } from "lucide-react";

const ToolsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const tools = [
    { 
      id: 'social', 
      label: 'Social media', 
      icon: <Smartphone className="h-5 w-5" />
    },
    { 
      id: 'website', 
      label: 'Website', 
      icon: <Monitor className="h-5 w-5" />
    },
    { 
      id: 'email', 
      label: 'Email marketing', 
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      id: 'content', 
      label: 'Content creation', 
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 'automation', 
      label: 'Automation', 
      icon: <Zap className="h-5 w-5" />
    }
  ];
  
  const selectedTools = onboardingData.toolsPreferences || [];
  
  const handleToolToggle = (toolId: string) => {
    let updatedTools = [...selectedTools];
    
    if (updatedTools.includes(toolId)) {
      updatedTools = updatedTools.filter(id => id !== toolId);
    } else {
      updatedTools.push(toolId);
    }
    
    updateOnboardingData({ toolsPreferences: updatedTools });
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
            <span>Step 6 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Tools</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool) => {
              const isSelected = selectedTools.includes(tool.id);
              
              return (
                <Card 
                  key={tool.id}
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleToolToggle(tool.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                        {tool.icon}
                      </div>
                      <h4 className="font-medium text-gray-900">{tool.label}</h4>
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
              <span className="font-medium">{selectedTools.length}</span> selected
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
            disabled={selectedTools.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolsStep;
