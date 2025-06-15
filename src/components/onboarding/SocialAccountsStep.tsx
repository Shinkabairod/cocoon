
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Platform } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Instagram, Twitter, Youtube, Linkedin, Globe, Mic, ExternalLink } from "lucide-react";
import { useState } from "react";

const SocialAccountsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [socialAccounts, setSocialAccounts] = useState<{ [key in Platform]?: string }>(
    onboardingData.socialMediaAccounts || {}
  );

  const platforms: { 
    platform: Platform; 
    icon: JSX.Element; 
    placeholder: string; 
    connectUrl?: string;
    color: string;
  }[] = [
    { 
      platform: 'Instagram', 
      icon: <Instagram className="h-5 w-5" />, 
      placeholder: '@username',
      connectUrl: 'https://www.instagram.com/',
      color: 'text-pink-500'
    },
    { 
      platform: 'YouTube', 
      icon: <Youtube className="h-5 w-5" />, 
      placeholder: 'Channel name',
      connectUrl: 'https://www.youtube.com/',
      color: 'text-red-500'
    },
    { 
      platform: 'TikTok', 
      icon: <Globe className="h-5 w-5" />, 
      placeholder: '@username',
      connectUrl: 'https://www.tiktok.com/',
      color: 'text-black'
    },
    { 
      platform: 'Twitter', 
      icon: <Twitter className="h-5 w-5" />, 
      placeholder: '@username',
      connectUrl: 'https://twitter.com/',
      color: 'text-blue-500'
    },
    { 
      platform: 'LinkedIn', 
      icon: <Linkedin className="h-5 w-5" />, 
      placeholder: 'Profile URL',
      connectUrl: 'https://www.linkedin.com/',
      color: 'text-blue-600'
    },
    { 
      platform: 'Blog', 
      icon: <Globe className="h-5 w-5" />, 
      placeholder: 'Blog URL',
      color: 'text-gray-600'
    },
    { 
      platform: 'Podcast', 
      icon: <Mic className="h-5 w-5" />, 
      placeholder: 'Podcast name',
      color: 'text-purple-500'
    }
  ];

  const handleAccountChange = (platform: Platform, value: string) => {
    const updated = { ...socialAccounts, [platform]: value };
    setSocialAccounts(updated);
    updateOnboardingData({ socialMediaAccounts: updated });
  };

  const handleConnectPlatform = (connectUrl: string) => {
    window.open(connectUrl, '_blank', 'noopener,noreferrer');
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <OnboardingLayout 
      title="Comptes Réseaux Sociaux" 
      subtitle="Connectez vos comptes existants (optionnel)"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Cela nous aide à comprendre votre présence actuelle et à fournir des recommandations personnalisées.
        </p>
        
        <div className="space-y-3">
          {platforms.map(({ platform, icon, placeholder, connectUrl, color }) => (
            <Card key={platform} className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`${color}`}>{icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm">{platform}</div>
                    {connectUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleConnectPlatform(connectUrl)}
                        className="h-6 px-2 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Se connecter
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder={placeholder}
                    value={socialAccounts[platform] || ''}
                    onChange={(e) => handleAccountChange(platform, e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-800">
            💡 <strong>Astuce :</strong> Cliquez sur "Se connecter" pour ouvrir directement l'application si vous êtes déjà connecté sur votre téléphone !
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
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
