// src/pages/Onboarding.tsx - Version simplifiée et généraliste
import { useOnboarding } from "@/contexts/OnboardingContext";
import InitialGuidanceStep from "@/components/onboarding/InitialGuidanceStep";
import SummaryStep from "@/components/onboarding/SummaryStep";

// Steps simplifiés et généralistes
import WelcomeStep from "@/components/onboarding/steps/WelcomeStep";
import ProfessionStep from "@/components/onboarding/steps/ProfessionStep";
import ObjectivesStep from "@/components/onboarding/steps/ObjectivesStep";
import TimeOptimizationStep from "@/components/onboarding/steps/TimeOptimizationStep";
import ChallengesStep from "@/components/onboarding/steps/ChallengesStep";
import ToolsPreferencesStep from "@/components/onboarding/steps/ToolsPreferencesStep";
import AIAssistanceStep from "@/components/onboarding/steps/AIAssistanceStep";

const Onboarding = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    switch (onboardingData.step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <ProfessionStep />;
      case 3:
        return <ObjectivesStep />;
      case 4:
        return <TimeOptimizationStep />;
      case 5:
        return <ChallengesStep />;
      case 6:
        return <ToolsPreferencesStep />;
      case 7:
        return <AIAssistanceStep />;
      case 8:
        return <SummaryStep />;
      default:
        return <WelcomeStep />;
    }
  };
  
  return renderStep();
};

export default Onboarding;