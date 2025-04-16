
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentType, Platform } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ContentTypeStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [niche, setNiche] = useState(onboardingData.niche || '');
  
  const contentTypes: ContentType[] = [
    'Videos', 
    'Blogs', 
    'Podcasts', 
    'Social Media Posts'
  ];
  
  const platforms: Platform[] = [
    'YouTube',
    'Instagram',
    'TikTok',
    'Twitter',
    'LinkedIn',
    'Blog',
    'Podcast'
  ];
  
  const handleContentTypeToggle = (type: ContentType) => {
    let updatedTypes = [...(onboardingData.contentTypes || [])];
    
    if (updatedTypes.includes(type)) {
      updatedTypes = updatedTypes.filter(t => t !== type);
    } else {
      updatedTypes.push(type);
    }
    
    updateOnboardingData({ contentTypes: updatedTypes });
  };
  
  const handlePlatformToggle = (platform: Platform) => {
    let updatedPlatforms = [...(onboardingData.platforms || [])];
    
    if (updatedPlatforms.includes(platform)) {
      updatedPlatforms = updatedPlatforms.filter(p => p !== platform);
    } else {
      updatedPlatforms.push(platform);
    }
    
    updateOnboardingData({ platforms: updatedPlatforms });
  };
  
  const handleContinue = () => {
    updateOnboardingData({ niche });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Content Preferences" 
      subtitle="Tell us what content you want to create"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">What type of content would you like to create?</h3>
          <div className="grid grid-cols-2 gap-4">
            {contentTypes.map((type) => {
              const isSelected = onboardingData.contentTypes?.includes(type);
              
              return (
                <Card 
                  key={type}
                  className={`p-4 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleContentTypeToggle(type)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{type}</div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Which platforms are you interested in?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const isSelected = onboardingData.platforms?.includes(platform);
              
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
                    <div className="font-medium">{platform}</div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">What niche or topic are you focusing on?</h3>
          <Input
            placeholder="E.g., Fitness, Technology, Cooking, Fashion..."
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={
              !onboardingData.contentTypes?.length || 
              !onboardingData.platforms?.length || 
              !niche
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentTypeStep;
