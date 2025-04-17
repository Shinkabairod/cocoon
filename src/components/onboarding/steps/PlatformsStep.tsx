
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Platform } from "@/types/onboarding";
import { platforms } from "@/components/onboarding/content-type/contentTypeData";
import { Check, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const PlatformsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const handlePlatformToggle = (platform: Platform) => {
    const currentPlatforms = onboardingData.platforms || [];
    let updatedPlatforms;
    
    if (currentPlatforms.includes(platform)) {
      updatedPlatforms = currentPlatforms.filter(p => p !== platform);
    } else {
      updatedPlatforms = [...currentPlatforms, platform];
    }
    
    updateOnboardingData({ platforms: updatedPlatforms });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'YouTube':
        return '▶️';
      case 'Instagram':
        return '📸';
      case 'TikTok':
        return '🎵';
      case 'Twitter':
        return '🐦';
      case 'LinkedIn':
        return '💼';
      case 'Blog':
        return '📝';
      case 'Podcast':
        return '🎙️';
      default:
        return '🌐';
    }
  };
  
  return (
    <OnboardingLayout 
      title="Your Platforms" 
      subtitle="Where do you want to share your content?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Share2 className="h-12 w-12 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {platforms.map((platform) => {
            const isSelected = (onboardingData.platforms || []).includes(platform);
            
            return (
              <Card 
                key={platform}
                className={`p-4 cursor-pointer border-2 ${
                  isSelected 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handlePlatformToggle(platform)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getPlatformIcon(platform)}</span>
                    <span className="font-medium">{platform}</span>
                  </div>
                  {isSelected && <Check className="h-5 w-5 text-primary" />}
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={(onboardingData.platforms || []).length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PlatformsStep;
