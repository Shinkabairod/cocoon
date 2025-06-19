
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useOnboardingComplete } from "@/hooks/useOnboardingComplete";
import OnboardingLayout from "./OnboardingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Users, Target, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  const { completeOnboarding, isProcessing, isCompleted } = useOnboardingComplete();
  const navigate = useNavigate();
  
  const handleComplete = async () => {
    await completeOnboarding();
    
    // Rediriger vers le dashboard après completion
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const getHighlights = () => {
    const highlights = [];
    
    if (onboardingData.experienceLevel) {
      highlights.push({
        icon: <Users className="h-5 w-5" />,
        label: "Niveau d'expérience",
        value: onboardingData.experienceLevel
      });
    }
    
    if (onboardingData.contentGoal) {
      highlights.push({
        icon: <Target className="h-5 w-5" />,
        label: "Objectif principal",
        value: onboardingData.contentGoal
      });
    }
    
    if (onboardingData.niche) {
      highlights.push({
        icon: <FileText className="h-5 w-5" />,
        label: "Niche",
        value: onboardingData.niche
      });
    }
    
    if (onboardingData.platforms && onboardingData.platforms.length > 0) {
      highlights.push({
        icon: <FileText className="h-5 w-5" />,
        label: "Plateformes",
        value: onboardingData.platforms.join(", ")
      });
    }
    
    return highlights;
  };

  if (isCompleted) {
    return (
      <OnboardingLayout 
        title="🎉 Bienvenue dans Cocoon AI !" 
        subtitle="Votre espace personnalisé a été créé avec succès"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Configuration terminée !</h3>
            <p className="text-muted-foreground">
              Votre structure Obsidian personnalisée a été créée et vos données sont sauvegardées.
              Redirection vers votre dashboard...
            </p>
          </div>
        </div>
      </OnboardingLayout>
    );
  }
  
  return (
    <OnboardingLayout 
      title="Récapitulatif de votre profil" 
      subtitle="Vérifiez vos informations avant de finaliser votre configuration"
    >
      <div className="space-y-6">
        {/* Highlights du profil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getHighlights().map((highlight, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-coach-primary">
                    {highlight.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{highlight.label}</p>
                    <p className="font-medium">{highlight.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informations sur ce qui sera créé */}
        <Card className="border-coach-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-coach-primary" />
              Ce qui sera créé pour vous
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Structure Obsidian personnalisée (15+ fichiers organisés)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Sauvegarde sécurisée sur Hugging Face (vaults/user_{'{user_id}'})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Configuration IA optimisée pour vos besoins</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Dashboard personnalisé avec recommandations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Défis identifiés */}
        {onboardingData.contentChallenges && onboardingData.contentChallenges.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Défis à résoudre en priorité</h4>
              <div className="space-y-1">
                {onboardingData.contentChallenges.map((challenge, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {index + 1}. {challenge}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Bouton de finalisation */}
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-sm"
            onClick={handleComplete}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Création de votre espace...
              </>
            ) : (
              'Finaliser mon onboarding'
            )}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
