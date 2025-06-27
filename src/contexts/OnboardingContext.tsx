
import { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData } from '@/types/onboarding';

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
  setIsOnboardingComplete: (completed: boolean) => void;
  totalSteps: number;
}

const initialData: OnboardingData = {
  step: 1,
  onboardingCompleted: false
};

// Total steps: 11 (ajout de l'étape monétisation)
const TOTAL_STEPS = 11;

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialData);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setOnboardingData(prev => ({ ...prev, step: Math.min(prev.step + 1, TOTAL_STEPS) }));
  };

  const prevStep = () => {
    setOnboardingData(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const resetOnboarding = () => {
    setOnboardingData(initialData);
  };

  const setIsOnboardingComplete = (completed: boolean) => {
    setOnboardingData(prev => ({ ...prev, onboardingCompleted: completed }));
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      updateOnboardingData, 
      nextStep, 
      prevStep, 
      resetOnboarding,
      setIsOnboardingComplete,
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
