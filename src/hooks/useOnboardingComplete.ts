
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
    if (!user || isProcessing || isCompleted) {
      console.log('❌ Conditions non réunies:', { user: !!user, isProcessing, isCompleted });
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('🚀 Début de la finalisation de l\'onboarding pour user:', user.id);
      console.log('📋 Données onboarding à traiter:', onboardingData);
      
      // Étape 1: Test de connectivité
      console.log('🔗 Test de connectivité Hugging Face...');
      await huggingfaceService.testConnection();
      console.log('✅ Connectivité confirmée');

      // Étape 2: Sauvegarder les données d'onboarding standard
      console.log('💾 Sauvegarde des données d\'onboarding...');
      await huggingfaceService.saveOnboardingData(onboardingData);
      console.log('✅ Données d\'onboarding sauvegardées');

      // Étape 3: Créer la structure Obsidian complète
      console.log('🗂️ Création de la structure Obsidian...');
      await obsidianStructureService.createUserVault(user.id, onboardingData);
      console.log('✅ Structure Obsidian créée');

      // Étape 4: Créer un fichier de bienvenue personnalisé
      console.log('📝 Création du guide de bienvenue...');
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

## 🔧 Configuration technique
- **Vault ID** : user_${user.id}
- **Fichiers créés** : 15+ fichiers organisés
- **Stockage** : Hugging Face Spaces
- **IA** : Contexte personnalisé configuré

*Créé automatiquement le ${new Date().toLocaleDateString('fr-FR')}*
`;

      await huggingfaceService.saveNote(
        'welcome_guide',
        welcomeContent,
        'welcome'
      );
      console.log('✅ Guide de bienvenue créé');

      // Étape 5: Test final avec l'IA
      console.log('🤖 Test de l\'IA avec le contexte utilisateur...');
      try {
        const aiResponse = await huggingfaceService.askAI(
          "Salut ! Je viens de terminer mon onboarding. Peux-tu me faire un résumé de mon profil ?",
          "L'utilisateur vient de terminer son onboarding et teste la connectivité IA"
        );
        console.log('✅ Test IA réussi:', aiResponse);
      } catch (aiError) {
        console.warn('⚠️ Test IA échoué (non bloquant):', aiError);
      }

      // Étape 6: Marquer comme terminé
      setIsCompleted(true);

      toast({
        title: "🎉 Onboarding terminé !",
        description: `Votre espace Cocoon AI est prêt. ${obsidianStructureService.getFileCount(onboardingData)} fichiers créés dans votre vault.`,
      });

      console.log('🎯 Onboarding finalisé avec succès pour user:', user.id);

    } catch (error) {
      console.error('❌ Erreur lors de la finalisation de l\'onboarding:', error);
      
      let errorMessage = "Une erreur est survenue lors de la finalisation.";
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Problème de connectivité avec Hugging Face. Vérifiez votre connexion.";
        } else if (error.message.includes('User not authenticated')) {
          errorMessage = "Session expirée. Veuillez vous reconnecter.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
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
