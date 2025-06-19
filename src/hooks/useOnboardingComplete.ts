
import { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { obsidianStructureService } from '@/services/obsidianStructureService';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useToast } from '@/hooks/use-toast';

export const useOnboardingComplete = () => {
  const { onboardingData } = useOnboarding();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const completeOnboarding = async () => {
    if (!user || isProcessing || isCompleted) return;

    setIsProcessing(true);
    
    try {
      console.log('🚀 Début de la finalisation de l\'onboarding pour user:', user.id);
      
      // 1. Sauvegarder les données d'onboarding standard
      await huggingfaceService.saveOnboardingData(onboardingData);
      console.log('✅ Données d\'onboarding sauvegardées');

      // 2. Créer la structure Obsidian complète
      await obsidianStructureService.createUserVault(user.id, onboardingData);
      console.log('✅ Structure Obsidian créée');

      // 3. Créer un fichier de bienvenue personnalisé
      const welcomeContent = `# Bienvenue ${user.email?.split('@')[0] || 'Créateur'} !

Votre espace personnel Cocoon AI est maintenant configuré. Voici ce qui a été créé pour vous :

## 📁 Structure de votre vault
- **Profile/** : Vos informations personnelles et professionnelles
- **Content_Strategy/** : Votre stratégie de contenu et plateformes
- **Resources_and_Skills/** : Vos ressources et compétences
- **Goals_and_Metrics/** : Vos objectifs et métriques de succès
- **AI_Context/** : Contexte optimisé pour votre coach IA

## 🎯 Prochaines étapes
1. Explorez votre dashboard personnalisé
2. Utilisez les outils IA adaptés à votre profil
3. Commencez à créer du contenu avec l'assistance IA

## 📊 Votre profil en un coup d'œil
- **Niveau** : ${onboardingData.experienceLevel || 'À définir'}
- **Objectif** : ${onboardingData.contentGoal || 'À définir'}
- **Niche** : ${onboardingData.niche || 'Contenu général'}
- **Défi principal** : ${onboardingData.contentChallenges?.[0] || 'À identifier'}

*Créé automatiquement le ${new Date().toLocaleDateString('fr-FR')}*
`;

      await huggingfaceService.saveNote(
        'welcome_guide',
        welcomeContent,
        'welcome'
      );

      // 4. Marquer l'onboarding comme terminé
      setIsCompleted(true);

      toast({
        title: "🎉 Onboarding terminé !",
        description: "Votre espace Cocoon AI est prêt. Votre structure Obsidian a été créée.",
      });

      console.log('🎯 Onboarding finalisé avec succès');

    } catch (error) {
      console.error('❌ Erreur lors de la finalisation de l\'onboarding:', error);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la finalisation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    completeOnboarding,
    isProcessing,
    isCompleted
  };
};
