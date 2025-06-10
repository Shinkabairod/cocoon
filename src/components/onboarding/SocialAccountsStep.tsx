
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Platform, SocialMediaAccount } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Youtube, Instagram, MessageCircle, Twitter, Linkedin, Globe, Mic } from "lucide-react";

const SocialAccountsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>(onboardingData.socialAccounts || []);

  const platforms: { platform: Platform; icon: JSX.Element; placeholder: string }[] = [
    { platform: 'YouTube', icon: <Youtube className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'Instagram', icon: <Instagram className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'TikTok', icon: <MessageCircle className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'Twitter', icon: <Twitter className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, placeholder: 'Profile URL' },
    { platform: 'Blog', icon: <Globe className="h-5 w-5" />, placeholder: 'Blog URL' },
    { platform: 'Podcast', icon: <Mic className="h-5 w-5" />, placeholder: 'Podcast Name' }
  ];

  const updateAccount = (platform: Platform, username: string) => {
    const updatedAccounts = accounts.filter(acc => acc.platform !== platform);
    if (username.trim()) {
      updatedAccounts.push({ platform, username: username.trim() });
    }
    setAccounts(updatedAccounts);
  };

  const getAccountUsername = (platform: Platform) => {
    return accounts.find(acc => acc.platform === platform)?.username || '';
  };

  const handleContinue = () => {
    updateOnboardingData({ socialAccounts: accounts });
    nextStep();
  };

  return (
    <OnboardingLayout 
      title="Vos Comptes Existants" 
      subtitle="Connectez vos comptes sociaux existants (optionnel)"
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Cette information nous aide à mieux comprendre votre présence actuelle et à personnaliser nos recommandations.
        </p>
        
        <div className="grid gap-4">
          {platforms.map(({ platform, icon, placeholder }) => (
            <Card key={platform} className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  {icon}
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">{platform}</label>
                  <Input
                    placeholder={placeholder}
                    value={getAccountUsername(platform)}
                    onChange={(e) => updateAccount(platform, e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SocialAccountsStep;
