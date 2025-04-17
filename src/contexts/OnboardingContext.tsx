
import { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData } from '@/types/onboarding';

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
  totalSteps: number;
}

const initialData: OnboardingData = {
  step: 1,
  onboardingStage: 'Initial Guidance'
};

// Total number of steps in the onboarding process
const TOTAL_STEPS = 25;

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialData);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setOnboardingData(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setOnboardingData(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const resetOnboarding = () => {
    setOnboardingData(initialData);
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      updateOnboardingData, 
      nextStep, 
      prevStep, 
      resetOnboarding,
      totalSteps: TOTAL_STEPS
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
