
import { useOnboarding } from "@/contexts/OnboardingContext";
import InitialGuidanceStep from "@/components/onboarding/InitialGuidanceStep";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
import BusinessProfileStep from "@/components/onboarding/BusinessProfileStep";
import AudienceStep from "@/components/onboarding/AudienceStep";
import SocialAccountsStep from "@/components/onboarding/SocialAccountsStep";
import ContentTypeStep from "@/components/onboarding/ContentTypeStep";
import ChallengesStep from "@/components/onboarding/ChallengesStep";
import LearningStep from "@/components/onboarding/LearningStep";
import MonetizationStep from "@/components/onboarding/MonetizationStep";
import SummaryStep from "@/components/onboarding/SummaryStep";

const Onboarding = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    switch (onboardingData.step) {
      case 1:
        return <InitialGuidanceStep />;
      case 2:
        return <ExperienceStep />;
      case 3:
        return <BusinessProfileStep />;
      case 4:
        return <AudienceStep />;
      case 5:
        return <SocialAccountsStep />;
      case 6:
        return <ContentTypeStep />;
      case 7:
        return <ChallengesStep />;
      case 8:
        return <LearningStep />;
      case 9:
        return <MonetizationStep />;
      case 10:
        return <SummaryStep />;
      default:
        return <InitialGuidanceStep />;
    }
  };
  
  return renderStep();
};

export default Onboarding;
