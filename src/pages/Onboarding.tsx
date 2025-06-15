
import { useOnboarding } from "@/contexts/OnboardingContext";
import InitialGuidanceStep from "@/components/onboarding/InitialGuidanceStep";
import SocialAccountsStep from "@/components/onboarding/SocialAccountsStep";
import ChallengesStep from "@/components/onboarding/challenges/ChallengesStep";
import LearningStep from "@/components/onboarding/LearningStep";
import MonetizationStep from "@/components/onboarding/MonetizationStep";
import SummaryStep from "@/components/onboarding/SummaryStep";

// Personal & Profile Steps
import ExperienceLevelStep from "@/components/onboarding/steps/ExperienceLevelStep";
import ContentGoalStep from "@/components/onboarding/steps/ContentGoalStep";
import CountrySelectionStep from "@/components/onboarding/steps/CountrySelectionStep";
import CitySelectionStep from "@/components/onboarding/steps/CitySelectionStep";
import BusinessTypeStep from "@/components/onboarding/steps/BusinessTypeStep";
import BusinessDescriptionStep from "@/components/onboarding/steps/BusinessDescriptionStep";
import AudienceGenerationStep from "@/components/onboarding/steps/AudienceGenerationStep";
import ImpactGoalsStep from "@/components/onboarding/steps/ImpactGoalsStep";

// Creator Discovery Steps (optional path)
import CreatorPassionsStep from "@/components/onboarding/steps/CreatorPassionsStep";
import CreatorPersonalityStep from "@/components/onboarding/steps/CreatorPersonalityStep";
import CreatorValuesStep from "@/components/onboarding/steps/CreatorValuesStep";
import CreatorPathSummaryStep from "@/components/onboarding/steps/CreatorPathSummaryStep";

// Content & Platform Steps
import ContentTypesStep from "@/components/onboarding/steps/ContentTypesStep";
import PlatformsStep from "@/components/onboarding/steps/PlatformsStep";
import ContentCategoriesStep from "@/components/onboarding/steps/ContentCategoriesStep";
import FilmingLocationsStep from "@/components/onboarding/steps/FilmingLocationsStep";

// Learning & Growth Steps
import ResourcesTagsStep from "@/components/onboarding/steps/ResourcesTagsStep";
import LearningStyleStep from "@/components/onboarding/steps/LearningStyleStep";
import SkillsSelectionStep from "@/components/onboarding/steps/SkillsSelectionStep";
import SuccessMetricsStep from "@/components/onboarding/steps/SuccessMetricsStep";
import PricingStep from "@/components/onboarding/steps/PricingStep";

const Onboarding = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    // Creator Path Discovery Flow (steps 2-5 for users without clear direction)
    if (onboardingData.hasContentDirection === false && onboardingData.step >= 2 && onboardingData.step <= 5) {
      switch (onboardingData.step) {
        case 2:
          return <CreatorPassionsStep />;
        case 3:
          return <CreatorPersonalityStep />;
        case 4:
          return <CreatorValuesStep />;
        case 5:
          return <CreatorPathSummaryStep />;
        default:
          return <InitialGuidanceStep />;
      }
    }
    
    // Main Onboarding Flow (reorganized for better coherence)
    switch (onboardingData.step) {
      // 1. Welcome & Direction
      case 1:
        return <InitialGuidanceStep />;
      
      // 2-3. Personal Profile
      case 2:
        return <ExperienceLevelStep />;
      case 3:
        return <ContentGoalStep />;
      
      // 4-5. Location & Business Context
      case 4:
        return <CountrySelectionStep />;
      case 5:
        return <CitySelectionStep />;
      
      // 6-9. Business & Audience Profile
      case 6:
        return <BusinessTypeStep />;
      case 7:
        return <BusinessDescriptionStep />;
      case 8:
        return <AudienceGenerationStep />;
      case 9:
        return <ImpactGoalsStep />;
      
      // 10-14. Content Strategy
      case 10:
        return <ContentTypesStep />;
      case 11:
        return <PlatformsStep />;
      case 12:
        return <ContentCategoriesStep />;
      case 13:
        return <FilmingLocationsStep />;
      case 14:
        return <SocialAccountsStep />;
      
      // 15. Technical Challenges & Resources
      case 15:
        return <ChallengesStep />;
      
      // 16-18. Learning & Development (removed Educational Resources step)
      case 16:
        return <ResourcesTagsStep />;
      case 17:
        return <LearningStyleStep />;
      case 18:
        return <SkillsSelectionStep />;
      
      // 19-21. Goals & Finalization
      case 19:
        return <SuccessMetricsStep />;
      case 20:
        return <MonetizationStep />;
      case 21:
        return <SummaryStep />;
      
      // Fallback
      default:
        return <InitialGuidanceStep />;
    }
  };
  
  return renderStep();
};

export default Onboarding;
