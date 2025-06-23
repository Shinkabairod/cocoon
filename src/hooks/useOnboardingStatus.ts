
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { huggingfaceService } from '@/services/huggingfaceService';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
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
        // Vérifier si l'utilisateur a un dossier Obsidian créé
        // En tentant de récupérer le fichier de bienvenue
        await huggingfaceService.getNote('welcome_guide');
        setIsOnboardingComplete(true);
      } catch (error) {
        // Si le fichier de bienvenue n'existe pas, l'onboarding n'est pas terminé
        console.log('Onboarding pas encore terminé pour cet utilisateur');
        setIsOnboardingComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  return { isOnboardingComplete, isLoading };
};
