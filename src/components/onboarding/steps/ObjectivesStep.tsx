
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Target, TrendingUp, Users, Zap, BookOpen, DollarSign } from "lucide-react";

const ObjectivesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  
  const objectives = [
    { 
      id: 'productivity', 
      label: 'Améliorer ma productivité', 
      description: 'Optimiser mon temps et mes processus',
      icon: <Zap className="h-5 w-5" />
    },
    { 
      id: 'skills', 
      label: 'Développer mes compétences', 
      description: 'Apprendre de nouvelles choses',
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 'business', 
      label: 'Faire croître mon activité', 
      description: 'Développer mon entreprise ou projet',
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      id: 'audience', 
      label: 'Construire une audience', 
      description: 'Créer une communauté engagée',
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'content', 
      label: 'Créer du contenu', 
      description: 'Produire du contenu de qualité',
      icon: <Target className="h-5 w-5" />
    },
    { 
      id: 'revenue', 
      label: 'Générer des revenus', 
      description: 'Monétiser mes compétences ou créations',
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
    <OnboardingLayout 
      title="Vos objectifs principaux"
      subtitle="Sélectionnez ce que vous souhaitez accomplir (plusieurs choix possibles)"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {objectives.map((objective) => {
            const isSelected = selectedObjectives.includes(objective.id);
            
            return (
              <Card 
                key={objective.id}
                className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-violet-500 bg-violet-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleObjectiveToggle(objective.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${isSelected ? 'text-violet-600' : 'text-gray-500'}`}>
                      {objective.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{objective.label}</h4>
                      <p className="text-sm text-gray-600">{objective.description}</p>
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
            <span className="font-medium">{selectedObjectives.length}</span> objectif(s) sélectionné(s)
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
            disabled={selectedObjectives.length === 0}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ObjectivesStep;
