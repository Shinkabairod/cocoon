
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Lightbulb, TrendingUp, Users, BookOpen, Zap, Target } from "lucide-react";

const AIAssistanceStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const assistanceAreas = [
    { 
      id: 'ideas', 
      label: 'Génération d\'idées', 
      description: 'Brainstorming, concepts créatifs',
      icon: <Lightbulb className="h-5 w-5" />
    },
    { 
      id: 'strategy', 
      label: 'Stratégie et planification', 
      description: 'Plans d\'action, roadmaps',
      icon: <Target className="h-5 w-5" />
    },
    { 
      id: 'content', 
      label: 'Création de contenu', 
      description: 'Rédaction, scripts, posts',
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 'growth', 
      label: 'Croissance et marketing', 
      description: 'Acquisition, engagement',
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      id: 'community', 
      label: 'Gestion de communauté', 
      description: 'Interaction, support',
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'optimization', 
      label: 'Optimisation et productivité', 
      description: 'Workflows, automatisation',
      icon: <Zap className="h-5 w-5" />
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
    <OnboardingLayout 
      title="Domaines d'assistance IA"
      subtitle="Dans quels domaines souhaitez-vous que l'IA vous aide le plus ?"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {assistanceAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.id);
            
            return (
              <Card 
                key={area.id}
                className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-violet-500 bg-violet-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAreaToggle(area.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                      {area.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{area.label}</h4>
                      <p className="text-sm text-gray-600">{area.description}</p>
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
        
        <div className="bg-gradient-to-r from-violet-50 to-blue-50 p-4 rounded-lg border border-violet-200">
          <p className="text-sm text-violet-800 text-center">
            <span className="font-medium">{selectedAreas.length}</span> domaine(s) sélectionné(s) • 
            L'IA se spécialisera dans ces domaines pour vous
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
            disabled={selectedAreas.length === 0}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default AIAssistanceStep;
