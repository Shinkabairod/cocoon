// src/contexts/OnboardingContext.tsx - Version simplifiée
import { createContext, useContext, useState, ReactNode } from 'react';

// Interface simplifiée pour l'onboarding général
interface OnboardingData {
  step: number;
  onboardingCompleted?: boolean;
  
  // Étape 2: Profession
  profession?: string;
  
  // Étape 3: Objectifs
  objectives?: string[];
  
  // Étape 4: Optimisation du temps
  timeAvailable?: string;
  experienceLevel?: string;
  
  // Étape 5: Défis
  challenges?: string[];
  
  // Étape 6: Outils et préférences
  toolsPreferences?: string[];
  contentTypes?: string[];
  platforms?: string[];
  
  // Étape 7: Assistance IA
  aiAssistanceAreas?: string[];
  learningStyle?: string;
  
  // Données héritées pour compatibilité
  contentGoal?: string;
  businessType?: string;
  businessDescription?: string;
  targetGeneration?: string;
  monetization?: string;
}

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

// Total simplifié : 8 étapes seulement
const TOTAL_STEPS = 8;

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