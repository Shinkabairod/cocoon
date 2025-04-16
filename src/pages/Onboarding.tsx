
import { useOnboarding } from "@/contexts/OnboardingContext";
import InitialGuidanceStep from "@/components/onboarding/InitialGuidanceStep";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
import BusinessProfileStep from "@/components/onboarding/BusinessProfileStep";
import AudienceStep from "@/components/onboarding/AudienceStep";
import SocialAccountsStep from "@/components/onboarding/SocialAccountsStep";
import ContentTypeStep from "@/components/onboarding/ContentTypeStep";
import ChallengesStep from "@/components/onboarding/ChallengesStep";
import ResourcesStep from "@/components/onboarding/ResourcesStep";
import LearningStep from "@/components/onboarding/LearningStep";
import MonetizationStep from "@/components/onboarding/MonetizationStep";
import SummaryStep from "@/components/onboarding/SummaryStep";

// Nouvelles étapes décomposées
import ExperienceLevelStep from "@/components/onboarding/steps/ExperienceLevelStep";
import ContentGoalStep from "@/components/onboarding/steps/ContentGoalStep";
import CountrySelectionStep from "@/components/onboarding/steps/CountrySelectionStep";
import BusinessTypeStep from "@/components/onboarding/steps/BusinessTypeStep";
import BusinessDescriptionStep from "@/components/onboarding/steps/BusinessDescriptionStep";
import AudienceGenerationStep from "@/components/onboarding/steps/AudienceGenerationStep";
import ImpactGoalsStep from "@/components/onboarding/steps/ImpactGoalsStep";

const Onboarding = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    switch (onboardingData.step) {
      case 1:
        return <InitialGuidanceStep />;
      // Étapes décomposées d'expérience
      case 2:
        return <ExperienceLevelStep />;
      case 3:
        return <ContentGoalStep />;
      // Étapes décomposées de profil professionnel
      case 4:
        return <CountrySelectionStep />;
      case 5:
        return <BusinessTypeStep />;
      case 6:
        return <BusinessDescriptionStep />;
      // Étapes décomposées d'audience
      case 7:
        return <AudienceGenerationStep />;
      case 8:
        return <ImpactGoalsStep />;
      // Étapes restantes
      case 9:
        return <SocialAccountsStep />;
      case 10:
        return <ContentTypeStep />;
      case 11:
        return <ChallengesStep />;
      case 12:
        return <ResourcesStep />;
      case 13:
        return <LearningStep />;
      case 14:
        return <MonetizationStep />;
      case 15:
        return <SummaryStep />;
      default:
        return <InitialGuidanceStep />;
    }
  };
  
  return renderStep();
};

export default Onboarding;
