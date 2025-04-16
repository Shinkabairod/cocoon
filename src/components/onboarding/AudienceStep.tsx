
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ImpactGoal, TargetGeneration } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const AudienceStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const generations: { type: TargetGeneration; description: string }[] = [
    { type: 'Gen Z', description: '10-25 ans' },
    { type: 'Millennials', description: '26-40 ans' },
    { type: 'Gen X', description: '41-55 ans' },
    { type: 'Baby Boomers', description: '56-75 ans' },
    { type: 'All Ages', description: 'Tous âges confondus' }
  ];
  
  const impactGoals: ImpactGoal[] = [
    'Educate',
    'Entertain',
    'Inspire',
    'Inform',
    'Provoke thought',
    'Build community',
    'Sell products/services'
  ];
  
  const impactDescriptions: Record<ImpactGoal, string> = {
    'Educate': 'Apprendre de nouvelles compétences à votre audience',
    'Entertain': 'Divertir et faire rire votre audience',
    'Inspire': 'Motiver et inspirer votre audience',
    'Inform': 'Tenir votre audience informée des actualités ou tendances',
    'Provoke thought': 'Stimuler la réflexion et le débat',
    'Build community': 'Créer un sentiment d'appartenance',
    'Sell products/services': 'Promouvoir vos produits ou services'
  };
  
  const handleGenerationSelect = (generation: TargetGeneration) => {
    updateOnboardingData({ targetGeneration: generation });
  };
  
  const handleImpactGoalToggle = (goal: ImpactGoal) => {
    let updatedGoals = [...(onboardingData.impactGoals || [])];
    
    if (updatedGoals.includes(goal)) {
      updatedGoals = updatedGoals.filter(g => g !== goal);
    } else {
      updatedGoals.push(goal);
    }
    
    updateOnboardingData({ impactGoals: updatedGoals });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Audience Cible" 
      subtitle="Définissez qui vous souhaitez atteindre et comment vous voulez les impacter"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Quelle génération souhaitez-vous toucher principalement ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generations.map(({ type, description }) => (
              <Card 
                key={type}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.targetGeneration === type 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleGenerationSelect(type)}
              >
                <div className="font-medium">{type}</div>
                <div className="text-sm text-muted-foreground">{description}</div>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Comment souhaitez-vous impacter votre audience ? (Plusieurs choix possibles)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {impactGoals.map((goal) => {
              const isSelected = onboardingData.impactGoals?.includes(goal);
              
              return (
                <Card 
                  key={goal}
                  className={`p-4 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleImpactGoalToggle(goal)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{goal}</div>
                      <div className="text-sm text-muted-foreground">{impactDescriptions[goal]}</div>
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={!onboardingData.targetGeneration || !(onboardingData.impactGoals?.length)}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default AudienceStep;
