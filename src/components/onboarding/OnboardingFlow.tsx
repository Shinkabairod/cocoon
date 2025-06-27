
// src/components/onboarding/OnboardingFlow.tsx
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

// Import des étapes depuis steps_old temporairement
import WelcomeStep from './steps_old/WelcomeStep';
import ExperienceStep from './steps_old/ExperienceStep';
import GoalsStep from './steps_old/GoalsStep';
import PlatformsStep from './steps_old/PlatformsStep';
import ContentStep from './steps_old/ContentStep';
import ChallengesStep from './steps_old/ChallengesStep';
import FinalStep from './steps_old/FinalStep';

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
