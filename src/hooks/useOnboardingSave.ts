
import { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useAuth } from '@/contexts/AuthContext';

export const useOnboardingSave = () => {
  const { onboardingData } = useOnboarding();
  const { user } = useAuth();

  useEffect(() => {
    const saveOnboardingData = async () => {
      if (user && Object.keys(onboardingData).length > 1) {
        try {
          await huggingfaceService.saveOnboardingData(onboardingData);
          console.log('Onboarding data saved to Hugging Face');
        } catch (error) {
          console.error('Failed to save onboarding data:', error);
        }
      }
    };

    // Sauvegarder les données avec un délai pour éviter trop d'appels
    const timeoutId = setTimeout(saveOnboardingData, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [onboardingData, user]);
};
