
import { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData } from '@/types/onboarding';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
  setIsOnboardingComplete: (completed: boolean) => void;
  totalSteps: number;
}

const TOTAL_STEPS = 10;

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  const initialData: OnboardingData = {
    step: 1,
    onboardingCompleted: false,
    fullName: user?.user_metadata?.full_name || ''
  };

  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialData);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    console.log('📝 Updating onboarding data:', data);
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    console.log('➡️ Moving to next step');
    setOnboardingData(prev => ({ ...prev, step: Math.min(prev.step + 1, TOTAL_STEPS) }));
  };

  const prevStep = () => {
    console.log('⬅️ Moving to previous step');
    setOnboardingData(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const resetOnboarding = () => {
    console.log('🔄 Resetting onboarding');
    setOnboardingData(initialData);
  };

  const setIsOnboardingComplete = (completed: boolean) => {
    console.log('✅ Setting onboarding complete:', completed);
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
