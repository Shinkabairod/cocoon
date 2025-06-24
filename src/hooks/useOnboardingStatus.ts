
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsOnboardingComplete(null);
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Checking onboarding status for user:', user.id);
        console.log('📋 Current onboarding data:', onboardingData);

        // Vérifier d'abord si l'onboarding est marqué comme terminé dans les données locales
        if (onboardingData.onboardingCompleted === true) {
          console.log('✅ Onboarding marked as completed in local data');
          setIsOnboardingComplete(true);
          setIsLoading(false);
          return;
        }

        // Vérifier si l'utilisateur a des données d'onboarding substantielles
        const hasBasicData = onboardingData.experienceLevel && 
                            onboardingData.contentGoal && 
                            onboardingData.niche &&
                            onboardingData.step && onboardingData.step >= 21;

        if (hasBasicData) {
          console.log('✅ User has substantial onboarding data, considering as complete');
          setIsOnboardingComplete(true);
        } else {
          console.log('❌ Onboarding not complete - missing basic data');
          setIsOnboardingComplete(false);
        }

      } catch (error) {
        console.error('❌ Error checking onboarding status:', error);
        // En cas d'erreur, considérer comme incomplet pour rediriger vers l'onboarding
        setIsOnboardingComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user, onboardingData]);

  return { isOnboardingComplete, isLoading };
};
