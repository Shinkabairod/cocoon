
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Globe, Users, Target, User, Laptop } from "lucide-react";
import { Link } from "react-router-dom";

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  
  return (
    <OnboardingLayout 
      title="Tout est prêt ! Votre Coach AI est configuré" 
      subtitle="Voici un résumé de ce que nous avons appris sur vous"
      showBackButton={false}
    >
      <div className="space-y-8">
        <Card className="p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> À propos de vous
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Expérience:</span> {onboardingData.experienceLevel}</li>
                <li><span className="font-medium text-foreground">Objectif:</span> {onboardingData.contentGoal}</li>
                <li><span className="font-medium text-foreground">Pays:</span> {onboardingData.country}</li>
                <li><span className="font-medium text-foreground">Type d'activité:</span> {onboardingData.businessType}</li>
                <li><span className="font-medium text-foreground">Temps disponible:</span> {onboardingData.timeAvailable}</li>
                <li><span className="font-medium text-foreground">Principal défi:</span> {onboardingData.contentChallenge}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Préférences de contenu
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Types de contenu:</span> {onboardingData.contentTypes?.join(', ')}</li>
                <li><span className="font-medium text-foreground">Plateformes:</span> {onboardingData.platforms?.join(', ')}</li>
                <li><span className="font-medium text-foreground">Niche:</span> {onboardingData.niche}</li>
                <li><span className="font-medium text-foreground">Monétisation:</span> {onboardingData.monetization}</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Votre audience
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Génération cible:</span> {onboardingData.targetGeneration}</li>
                <li><span className="font-medium text-foreground">Objectifs d'impact:</span> {onboardingData.impactGoals?.join(', ')}</li>
                <li>
                  <span className="font-medium text-foreground">Comptes liés:</span> {
                    onboardingData.socialMediaAccounts?.length 
                      ? onboardingData.socialMediaAccounts.map(a => `${a.platform} (${a.username})`).join(', ')
                      : 'Aucun compte lié'
                  }
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Objectifs personnels
              </h3>
              <div className="text-muted-foreground border-l-2 border-primary/20 pl-3 italic">
                "{onboardingData.personalGoal}"
              </div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-coach-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Votre coach personnel AI a été créé !</h3>
            <p className="text-muted-foreground mt-2">
              En fonction de vos préférences, nous avons créé une expérience personnalisée pour vous.
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-2">Prochaines étapes :</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Explorez votre tableau de bord et familiarisez-vous avec votre coach AI</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Générez votre premier script de contenu personnalisé</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Configurez votre calendrier de contenu et commencez à planifier</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Accédez à des ressources d'apprentissage adaptées à vos besoins</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Link to="/dashboard" className="w-full max-w-xs">
            <Button className="gradient-bg w-full">
              Accéder au tableau de bord <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
