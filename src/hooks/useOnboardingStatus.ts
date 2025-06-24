
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { supabase } from '@/integrations/supabase/client';

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

        // D'abord, vérifier dans la base de données si l'utilisateur a un profil complet
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('onboarding_completed, profile_data')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.warn('⚠️ Erreur lors de la récupération du profil:', profileError);
        }

        // Si l'onboarding est marqué comme terminé dans la DB
        if (profile?.onboarding_completed === true) {
          console.log('✅ Onboarding completed in database');
          setIsOnboardingComplete(true);
          setIsLoading(false);
          return;
        }

        // Vérifier si l'utilisateur a des données substantielles dans la DB
        if (profile?.profile_data && Object.keys(profile.profile_data).length > 3) {
          console.log('✅ User has substantial profile data in database');
          setIsOnboardingComplete(true);
          setIsLoading(false);
          return;
        }

        // Fallback: vérifier les données locales d'onboarding
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
          console.log('✅ User has substantial onboarding data locally');
          setIsOnboardingComplete(true);
        } else {
          console.log('❌ Onboarding not complete - missing data');
          setIsOnboardingComplete(false);
        }

      } catch (error) {
        console.error('❌ Error checking onboarding status:', error);
        // En cas d'erreur, vérifier les données locales comme fallback
        const hasLocalData = onboardingData.onboardingCompleted === true || 
                             (onboardingData.step && onboardingData.step >= 21);
        setIsOnboardingComplete(hasLocalData);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user, onboardingData]);

  return { isOnboardingComplete, isLoading };
};
