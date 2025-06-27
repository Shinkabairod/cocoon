
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

// Import des étapes
import WelcomeStep from './steps/WelcomeStep';
import ProfileStep from './steps/ProfileStep';
import ProfessionStep from './steps/ProfessionStep';
import ObjectivesStep from './steps/ObjectivesStep';
import ChallengesStep from './steps/ChallengesStep';
import ToolsStep from './steps/ToolsStep';
import LearningStyleStep from './steps/LearningStyleStep';
import MonetizationStep from './steps/MonetizationStep';
import AIAssistanceStep from './steps/AIAssistanceStep';
import SummaryStep from './steps/SummaryStep';

const OnboardingFlow: React.FC = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    switch (onboardingData.step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <ProfileStep />;
      case 3:
        return <ProfessionStep />;
      case 4:
        return <ObjectivesStep />;
      case 5:
        return <ChallengesStep />;
      case 6:
        return <ToolsStep />;
      case 7:
        return <LearningStyleStep />;
      case 8:
        return <MonetizationStep />;
      case 9:
        return <AIAssistanceStep />;
      case 10:
        return <SummaryStep />;
      default:
        return <WelcomeStep />;
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
