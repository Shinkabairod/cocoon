
// src/components/onboarding/OnboardingFlow.tsx
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

// Import des étapes simplifiées
import WelcomeStep from './steps/WelcomeStep';
import ExperienceStep from './steps/ExperienceStep';
import GoalsStep from './steps/GoalsStep';
import PlatformsStep from './steps/PlatformsStep';
import ContentStep from './steps/ContentStep';
import ChallengesStep from './steps/ChallengesStep';
import FinalStep from './steps/FinalStep';

const OnboardingFlow: React.FC = () => {
  const { onboardingData } = useOnboarding();
  
  const renderStep = () => {
    switch (onboardingData.step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <ExperienceStep />;
      case 3:
        return <GoalsStep />;
      case 4:
        return <PlatformsStep />;
      case 5:
        return <ContentStep />;
      case 6:
        return <ChallengesStep />;
      case 7:
        return <FinalStep />;
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
