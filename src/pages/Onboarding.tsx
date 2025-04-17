
import { useOnboarding } from "@/contexts/OnboardingContext";
import InitialGuidanceStep from "@/components/onboarding/InitialGuidanceStep";
import SocialAccountsStep from "@/components/onboarding/SocialAccountsStep";
import ChallengesStep from "@/components/onboarding/ChallengesStep";
import ResourcesStep from "@/components/onboarding/ResourcesStep";
import LearningStep from "@/components/onboarding/LearningStep";
import MonetizationStep from "@/components/onboarding/MonetizationStep";
import SummaryStep from "@/components/onboarding/SummaryStep";

// New decomposed steps
import ExperienceLevelStep from "@/components/onboarding/steps/ExperienceLevelStep";
import ContentGoalStep from "@/components/onboarding/steps/ContentGoalStep";
import CountrySelectionStep from "@/components/onboarding/steps/CountrySelectionStep";
import CitySelectionStep from "@/components/onboarding/steps/CitySelectionStep";
import BusinessTypeStep from "@/components/onboarding/steps/BusinessTypeStep";
import BusinessDescriptionStep from "@/components/onboarding/steps/BusinessDescriptionStep";
import AudienceGenerationStep from "@/components/onboarding/steps/AudienceGenerationStep";
import ImpactGoalsStep from "@/components/onboarding/steps/ImpactGoalsStep";
import CreatorPassionsStep from "@/components/onboarding/steps/CreatorPassionsStep";
import CreatorPersonalityStep from "@/components/onboarding/steps/CreatorPersonalityStep";
import CreatorValuesStep from "@/components/onboarding/steps/CreatorValuesStep";
import CreatorPathSummaryStep from "@/components/onboarding/steps/CreatorPathSummaryStep";
import ContentTypesStep from "@/components/onboarding/steps/ContentTypesStep";
import PlatformsStep from "@/components/onboarding/steps/PlatformsStep";
import ContentCategoriesStep from "@/components/onboarding/steps/ContentCategoriesStep";
import FilmingLocationsStep from "@/components/onboarding/steps/FilmingLocationsStep";
import ResourcesTagsStep from "@/components/onboarding/steps/ResourcesTagsStep";
import LearningStyleStep from "@/components/onboarding/steps/LearningStyleStep";
import SkillsSelectionStep from "@/components/onboarding/steps/SkillsSelectionStep";
import SuccessMetricsStep from "@/components/onboarding/steps/SuccessMetricsStep";

const Onboarding = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    // Check if user is taking the creator path discovery flow
    if (onboardingData.hasContentDirection === false && onboardingData.step > 1 && onboardingData.step < 6) {
      switch (onboardingData.step) {
        case 2:
          return <CreatorPassionsStep />;
        case 3:
          return <CreatorPersonalityStep />;
        case 4:
          return <CreatorValuesStep />;
        case 5:
          return <CreatorPathSummaryStep />;
      }
    }
    
    // Main onboarding flow
    switch (onboardingData.step) {
      case 1:
        return <InitialGuidanceStep />;
      case 2:
        return <ExperienceLevelStep />;
      case 3:
        return <ContentGoalStep />;
      case 4:
        return <CountrySelectionStep />;
      case 5:
        return <CitySelectionStep />;
      case 6:
        return <BusinessTypeStep />;
      case 7:
        return <BusinessDescriptionStep />;
      case 8:
        return <AudienceGenerationStep />;
      case 9:
        return <ImpactGoalsStep />;
      case 10:
        return <SocialAccountsStep />;
      case 11:
        return <ContentTypesStep />;
      case 12:
        return <PlatformsStep />;
      case 13:
        return <ContentCategoriesStep />;
      case 14:
        return <FilmingLocationsStep />;
      case 15:
        return <ChallengesStep />;
      case 16:
        return <ResourcesStep />;
      case 17:
        return <ResourcesTagsStep />;
      case 18:
        return <LearningStyleStep />;
      case 19:
        return <SkillsSelectionStep />;
      case 20:
        return <SuccessMetricsStep />;
      case 21:
        return <MonetizationStep />;
      case 22:
        return <SummaryStep />;
      default:
        return <InitialGuidanceStep />;
    }
  };
  
  return renderStep();
};

export default Onboarding;
