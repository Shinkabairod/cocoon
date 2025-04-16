
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ContentType, Platform, ContentCategory } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { useState } from "react";
import ContentTypesSelector from "./content-type/ContentTypesSelector";
import PlatformsSelector from "./content-type/PlatformsSelector";
import CategoriesSelector from "./content-type/CategoriesSelector";
import NicheSelector from "./content-type/NicheSelector";
import { 
  contentTypes, 
  platforms, 
  contentCategories, 
  popularNiches 
} from "./content-type/contentTypeData";

const ContentTypeStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [niche, setNiche] = useState(onboardingData.niche || '');
  const [selectedCategories, setSelectedCategories] = useState<ContentCategory[]>(
    onboardingData.contentCategories || []
  );
  
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
        <ContentTypesSelector 
          contentTypes={contentTypes}
          selectedTypes={onboardingData.contentTypes || []}
          onToggle={handleContentTypeToggle}
        />
        
        <PlatformsSelector 
          platforms={platforms}
          selectedPlatforms={onboardingData.platforms || []}
          onToggle={handlePlatformToggle}
        />
        
        <CategoriesSelector 
          categories={contentCategories}
          selectedCategories={selectedCategories}
          onToggle={handleCategoryToggle}
        />
        
        <NicheSelector 
          niche={niche}
          setNiche={handleSelectNiche}
          popularNiches={popularNiches}
        />
        
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
