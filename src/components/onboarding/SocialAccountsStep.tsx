
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Platform } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Linkedin,
  Music,
  Play,
  Users
} from "lucide-react";

const SocialAccountsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [socialAccounts, setSocialAccounts] = useState(onboardingData.socialAccounts || {});
  
  const platforms = [
    { name: 'Instagram' as Platform, icon: Instagram, placeholder: '@username' },
    { name: 'YouTube' as Platform, icon: Youtube, placeholder: 'Channel name or URL' },
    { name: 'TikTok' as Platform, icon: Music, placeholder: '@username' },
    { name: 'Twitter' as Platform, icon: Twitter, placeholder: '@username' },
    { name: 'Facebook' as Platform, icon: Facebook, placeholder: 'Page name or URL' },
    { name: 'LinkedIn' as Platform, icon: Linkedin, placeholder: 'Profile or company page' },
    { name: 'Twitch' as Platform, icon: Play, placeholder: 'Channel name' },
    { name: 'Discord' as Platform, icon: Users, placeholder: 'Server invite or username' }
  ];
  
  const handleAccountUpdate = (platform: Platform, value: string) => {
    const updatedAccounts = { ...socialAccounts, [platform]: value };
    setSocialAccounts(updatedAccounts);
    updateOnboardingData({ socialAccounts: updatedAccounts });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Social Media Accounts" 
      subtitle="Connect your existing social media accounts (optional)"
    >
      <div className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg border border-muted">
          <p className="text-sm text-center text-muted-foreground">
            Help us understand your current presence on social media. 
            This will allow us to better personalize your coaching experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map(({ name, icon: Icon, placeholder }) => (
            <Card key={name} className="p-4">
              <div className="flex items-center mb-3">
                <Icon className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-medium">{name}</h4>
              </div>
              <Input
                placeholder={placeholder}
                value={socialAccounts[name] || ''}
                onChange={(e) => handleAccountUpdate(name, e.target.value)}
              />
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
