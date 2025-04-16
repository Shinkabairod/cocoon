
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentType, Platform, ContentCategory } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const ContentTypeStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [niche, setNiche] = useState(onboardingData.niche || '');
  const [selectedCategories, setSelectedCategories] = useState<ContentCategory[]>(
    onboardingData.contentCategories || []
  );
  
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
  
  const contentCategories: ContentCategory[] = [
    'Éducatif',
    'Divertissement',
    'Mode',
    'Beauté',
    'Lifestyle',
    'Tech',
    'Finance',
    'Fitness',
    'Santé',
    'Voyage',
    'Cuisine',
    'Business',
    'Art',
    'Gaming',
    'Parentalité',
    'Sports',
    'Musique',
    'Écologie',
    'DIY/Bricolage',
    'Immobilier'
  ];
  
  const popularNiches = [
    'Fitness à domicile',
    'Cuisine végétarienne',
    'Tech pour débutants',
    'Finance personnelle',
    'Voyages budget',
    'Mode durable',
    'Productivité',
    'Développement personnel',
    'Décoration d\'intérieur'
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
  
  const handleCategoryToggle = (category: ContentCategory) => {
    let updatedCategories = [...selectedCategories];
    
    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter(c => c !== category);
    } else {
      updatedCategories.push(category);
    }
    
    setSelectedCategories(updatedCategories);
    updateOnboardingData({ contentCategories: updatedCategories });
  };
  
  const handleSelectNiche = (selectedNiche: string) => {
    setNiche(selectedNiche);
  };
  
  const handleContinue = () => {
    updateOnboardingData({ niche });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Contenu" 
      subtitle="Définissez le type de contenu que vous souhaitez créer"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Quel type de contenu souhaitez-vous créer ?</h3>
          <div className="grid grid-cols-2 gap-3">
            {contentTypes.map((type) => {
              const isSelected = onboardingData.contentTypes?.includes(type);
              
              return (
                <Card 
                  key={type}
                  className={`p-3 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handleContentTypeToggle(type)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{type}</div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Sur quelles plateformes êtes-vous intéressé(e) ?</h3>
          <div className="grid grid-cols-3 gap-3">
            {platforms.map((platform) => {
              const isSelected = onboardingData.platforms?.includes(platform);
              
              return (
                <Card 
                  key={platform}
                  className={`p-3 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => handlePlatformToggle(platform)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{platform}</div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Dans quelle(s) catégorie(s) se situe votre contenu ?</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {contentCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              
              return (
                <Badge
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-1 px-3 ${
                    isSelected ? 'bg-primary' : 'bg-background hover:bg-secondary'
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                  {isSelected && <Check className="h-3 w-3 ml-1" />}
                </Badge>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Sur quelle niche ou sujet vous concentrez-vous ?</h3>
          <Input
            placeholder="Ex: Fitness, Technologie, Cuisine, Mode..."
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
          
          <div className="mt-3">
            <p className="text-sm text-muted-foreground mb-2">Suggestions populaires :</p>
            <div className="flex flex-wrap gap-2">
              {popularNiches.map((popularNiche) => (
                <Badge
                  key={popularNiche}
                  variant="outline"
                  className="cursor-pointer bg-background hover:bg-secondary"
                  onClick={() => handleSelectNiche(popularNiche)}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {popularNiche}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={
              !onboardingData.contentTypes?.length || 
              !onboardingData.platforms?.length || 
              !selectedCategories.length ||
              !niche
            }
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ContentTypeStep;
