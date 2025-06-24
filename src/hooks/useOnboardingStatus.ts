// src/hooks/useOnboardingStatus.ts
// SEULEMENT le hook, rien d'autre !

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsOnboardingComplete(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Vérification statut onboarding pour:', user.id);

        // Vérifier dans la table user_profiles si l'onboarding est terminé
        const { data, error } = await supabase
          .from('user_profiles')
          .select('onboarding_completed, profile_data')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Erreur vérification onboarding:', error);
          setIsOnboardingComplete(false);
        } else if (data) {
          console.log('✅ Données onboarding trouvées:', data);
          setIsOnboardingComplete(data.onboarding_completed === true);
        } else {
          console.log('⚠️ Aucune donnée onboarding - première connexion');
          setIsOnboardingComplete(false);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'onboarding:', error);
        setIsOnboardingComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  return { isOnboardingComplete, isLoading };
};