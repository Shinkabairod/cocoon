
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Smartphone, Monitor, Users, TrendingUp, BookOpen, Zap } from "lucide-react";

const ToolsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const tools = [
    { 
      id: 'social', 
      label: 'Réseaux sociaux', 
      description: 'Instagram, LinkedIn, TikTok, Twitter...',
      icon: <Smartphone className="h-5 w-5" />
    },
    { 
      id: 'website', 
      label: 'Site web / Blog', 
      description: 'WordPress, Wix, Notion...',
      icon: <Monitor className="h-5 w-5" />
    },
    { 
      id: 'email', 
      label: 'Email marketing', 
      description: 'Newsletters, séquences automatisées',
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'analytics', 
      label: 'Outils d\'analyse', 
      description: 'Google Analytics, statistiques...',
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      id: 'content', 
      label: 'Création de contenu', 
      description: 'Canva, Adobe, outils de design...',
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 'automation', 
      label: 'Automatisation', 
      description: 'Zapier, Make, workflows...',
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
    <OnboardingLayout 
      title="Vos outils préférés"
      subtitle="Quels types d'outils utilisez-vous ou souhaitez-vous utiliser ?"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const isSelected = selectedTools.includes(tool.id);
            
            return (
              <Card 
                key={tool.id}
                className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-violet-500 bg-violet-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleToolToggle(tool.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{tool.label}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-5 w-5 text-violet-600 flex-shrink-0" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-medium">{selectedTools.length}</span> type(s) d'outils sélectionné(s)
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
            disabled={selectedTools.length === 0}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ToolsStep;
