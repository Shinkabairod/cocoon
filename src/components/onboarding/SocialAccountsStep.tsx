
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Platform } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Instagram, Youtube, Linkedin, Globe, Mic, ExternalLink } from "lucide-react";
import { useState } from "react";

// X (Twitter) logo component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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
      icon: <XLogo className="h-5 w-5" />, 
      placeholder: '@username',
      connectUrl: 'https://twitter.com/',
      color: 'text-black'
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
      title="Social Media Accounts" 
      subtitle="Connect your existing accounts (optional)"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This helps us understand your current presence and provide personalized recommendations.
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
                        Connect
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
            💡 <strong>Tip:</strong> Click "Connect" to open the app directly if you're already logged in on your phone!
          </p>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SocialAccountsStep;
