
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Platform } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Instagram, Twitter, Youtube, Linkedin, Globe, Mic } from "lucide-react";
import { useState } from "react";

const SocialAccountsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [socialAccounts, setSocialAccounts] = useState<{ [key in Platform]?: string }>(
    onboardingData.socialMediaAccounts || {}
  );

  const platforms: { platform: Platform; icon: JSX.Element; placeholder: string }[] = [
    { platform: 'Instagram', icon: <Instagram className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'YouTube', icon: <Youtube className="h-5 w-5" />, placeholder: 'Channel name' },
    { platform: 'TikTok', icon: <Globe className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'Twitter', icon: <Twitter className="h-5 w-5" />, placeholder: '@username' },
    { platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, placeholder: 'Profile URL' },
    { platform: 'Blog', icon: <Globe className="h-5 w-5" />, placeholder: 'Blog URL' },
    { platform: 'Podcast', icon: <Mic className="h-5 w-5" />, placeholder: 'Podcast name' }
  ];

  const handleAccountChange = (platform: Platform, value: string) => {
    const updated = { ...socialAccounts, [platform]: value };
    setSocialAccounts(updated);
    updateOnboardingData({ socialMediaAccounts: updated });
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <OnboardingLayout 
      title="Social Media Accounts" 
      subtitle="Connect your existing social media accounts (optional)"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This helps us understand your current presence and provide personalized recommendations.
        </p>
        
        <div className="space-y-3">
          {platforms.map(({ platform, icon, placeholder }) => (
            <Card key={platform} className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-primary">{icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{platform}</div>
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
