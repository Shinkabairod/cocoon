
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Platform, SocialMediaAccount } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Linkedin, 
  BookOpen, 
  Headphones, 
  Trash2, 
  PlusCircle 
} from "lucide-react";

const SocialAccountsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>(
    onboardingData.socialMediaAccounts || []
  );
  const [currentPlatform, setCurrentPlatform] = useState<Platform | ''>('');
  const [username, setUsername] = useState('');
  
  const platformIcons: Record<Platform, JSX.Element> = {
    'YouTube': <Youtube className="h-5 w-5 text-red-500" />,
    'Instagram': <Instagram className="h-5 w-5 text-pink-500" />,
    'TikTok': <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69C17.96 6.69 16.56 5.33 16.56 3.69H12.82V15.39C12.82 16.93 11.53 18.18 9.95 18.18C8.36 18.18 7.08 16.93 7.08 15.39C7.08 13.84 8.36 12.59 9.95 12.59C10.33 12.59 10.69 12.67 11.01 12.8V9.03C10.67 8.98 10.33 8.94 9.95 8.94C6.3 8.94 3.34 11.87 3.34 15.39C3.34 18.91 6.3 21.84 9.95 21.84C13.61 21.84 16.56 18.91 16.56 15.39V9.7C17.79 10.63 19.3 11.2 20.93 11.2V7.5C20.44 7.5 19.99 7.5 19.59 6.69Z" fill="#EE1D52"/>
              </svg>,
    'Twitter': <Twitter className="h-5 w-5 text-blue-400" />,
    'LinkedIn': <Linkedin className="h-5 w-5 text-blue-600" />,
    'Blog': <BookOpen className="h-5 w-5 text-green-500" />,
    'Podcast': <Headphones className="h-5 w-5 text-purple-500" />
  };
  
  const platformOptions: Platform[] = [
    'YouTube', 'Instagram', 'TikTok', 'Twitter', 'LinkedIn', 'Blog', 'Podcast'
  ];
  
  const addAccount = () => {
    if (currentPlatform && username) {
      const newAccount: SocialMediaAccount = {
        platform: currentPlatform,
        username
      };
      
      const updatedAccounts = [...accounts, newAccount];
      setAccounts(updatedAccounts);
      updateOnboardingData({ socialMediaAccounts: updatedAccounts });
      
      // Reset form
      setCurrentPlatform('');
      setUsername('');
    }
  };
  
  const removeAccount = (index: number) => {
    const updatedAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(updatedAccounts);
    updateOnboardingData({ socialMediaAccounts: updatedAccounts });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Vos Comptes de Médias Sociaux" 
      subtitle="Connectez vos comptes existants pour des retours immédiats et des analyses personnalisées"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Ajoutez vos comptes de médias sociaux existants</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            <div className="md:col-span-5">
              <div className="flex space-x-2">
                {platformOptions.map((platform) => (
                  <Button
                    key={platform}
                    type="button"
                    variant={currentPlatform === platform ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPlatform(platform)}
                    title={platform}
                  >
                    {platformIcons[platform]}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-5">
              <Input
                placeholder="Nom d'utilisateur ou URL"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-2">
              <Button 
                type="button" 
                className="w-full"
                disabled={!currentPlatform || !username}
                onClick={addAccount}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Ajouter
              </Button>
            </div>
          </div>
          
          {accounts.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-2">Comptes ajoutés</h4>
              {accounts.map((account, index) => (
                <Card key={index} className="p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {platformIcons[account.platform]}
                    <span className="font-medium">{account.username}</span>
                    <span className="text-sm text-muted-foreground">({account.platform})</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeAccount(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 border border-dashed rounded-md">
              <p className="text-muted-foreground">
                Vous n'avez pas encore ajouté de compte. Les comptes liés nous permettront 
                d'analyser votre contenu existant et de vous fournir des recommandations personnalisées.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <h4 className="font-medium mb-2">Pourquoi lier vos comptes ?</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Analyse de votre contenu existant pour des recommandations sur mesure</li>
            <li>Suivi des performances de votre contenu en temps réel</li>
            <li>Suggestions basées sur les tendances spécifiques à vos plateformes</li>
            <li>Optimisation de votre stratégie cross-plateforme</li>
          </ul>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
          >
            {accounts.length > 0 ? "Continuer" : "Ignorer cette étape"}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SocialAccountsStep;
