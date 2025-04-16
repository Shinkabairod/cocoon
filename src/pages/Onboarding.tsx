
import { useOnboarding } from "@/contexts/OnboardingContext";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
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
        return <ExperienceStep />;
      case 2:
        return <ContentTypeStep />;
      case 3:
        return <ChallengesStep />;
      case 4:
        return <LearningStep />;
      case 5:
        return <MonetizationStep />;
      case 6:
        return <SummaryStep />;
      default:
        return <ExperienceStep />;
    }
  };
  
  return renderStep();
};

export default Onboarding;
