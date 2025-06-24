
import { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { obsidianStructureService } from '@/services/obsidianStructureService';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingComplete = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const completeOnboarding = async () => {
    console.log('🔍 Vérification conditions onboarding...');
    console.log('User:', !!user, 'Processing:', isProcessing, 'Completed:', isCompleted);
    
    if (!user) {
      console.log('❌ Pas d\'utilisateur connecté');
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour finaliser l'onboarding.",
        variant: "destructive",
      });
      return;
    }

    if (isProcessing || isCompleted) {
      console.log('❌ Déjà en cours ou terminé');
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('🚀 Début de la finalisation de l\'onboarding pour user:', user.id);
      console.log('📋 Données onboarding à traiter:', onboardingData);
      
      // Étape 1: Marquer l'onboarding comme terminé dans la base de données
      console.log('💾 Sauvegarde du statut d\'onboarding dans la DB...');
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          onboarding_completed: true,
          profile_data: {
            experienceLevel: onboardingData.experienceLevel,
            contentGoal: onboardingData.contentGoal,
            country: onboardingData.country,
            city: onboardingData.city,
            businessType: onboardingData.businessType,
            businessDescription: onboardingData.businessDescription,
            niche: onboardingData.niche,
            targetGeneration: onboardingData.targetGeneration,
            timeAvailable: onboardingData.timeAvailable,
            monetizationIntent: onboardingData.monetization,
            platforms: onboardingData.platforms,
            contentTypes: onboardingData.contentTypes,
            mainChallenges: Array.isArray(onboardingData.contentChallenges) 
              ? onboardingData.contentChallenges.join(', ') 
              : onboardingData.contentChallenge,
            resources: `Equipment: ${onboardingData.equipmentOwned?.join(', ') || 'Not specified'}, Time: ${onboardingData.timeAvailable || 'Not specified'}`,
            completedAt: new Date().toISOString()
          },
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.warn('⚠️ Erreur lors de la sauvegarde du profil:', updateError);
      } else {
        console.log('✅ Profil sauvegardé en base de données');
      }

      // Étape 2: Test de connectivité
      console.log('🔗 Test de connectivité Hugging Face...');
      try {
        await huggingfaceService.testConnection();
        console.log('✅ Connectivité confirmée');
      } catch (hfError) {
        console.warn('⚠️ Test de connectivité échoué (non bloquant):', hfError);
      }

      // Étape 3: Sauvegarder les données d'onboarding standard
      console.log('💾 Sauvegarde des données d\'onboarding...');
      try {
        await huggingfaceService.saveOnboardingData(onboardingData);
        console.log('✅ Données d\'onboarding sauvegardées');
      } catch (saveError) {
        console.warn('⚠️ Sauvegarde échouée (non bloquant):', saveError);
      }

      // Étape 4: Créer la structure Obsidian complète
      console.log('🗂️ Création de la structure Obsidian...');
      try {
        await obsidianStructureService.createUserVault(user.id, onboardingData);
        console.log('✅ Structure Obsidian créée');
      } catch (obsidianError) {
        console.warn('⚠️ Création Obsidian échouée (non bloquant):', obsidianError);
      }

      // Étape 5: Marquer définitivement comme terminé localement
      console.log('🎯 Finalisation - marquage local comme terminé');
      const completedData = { 
        ...onboardingData,
        step: 22, 
        onboardingCompleted: true 
      };
      updateOnboardingData(completedData);

      setIsCompleted(true);

      toast({
        title: "🎉 Onboarding terminé !",
        description: `Votre espace Cocoon AI est prêt. Redirection vers votre dashboard...`,
      });

      console.log('🎯 Onboarding finalisé avec succès pour user:', user.id);

    } catch (error) {
      console.error('❌ Erreur lors de la finalisation de l\'onboarding:', error);
      
      // Même en cas d'erreur, on marque comme terminé pour éviter de bloquer l'utilisateur
      try {
        await supabase
          .from('user_profiles')
          .upsert({
            user_id: user.id,
            onboarding_completed: true,
            updated_at: new Date().toISOString()
          });
      } catch (dbError) {
        console.warn('⚠️ Impossible de marquer comme terminé en DB:', dbError);
      }

      setIsCompleted(true);
      
      toast({
        title: "⚠️ Configuration basique terminée",
        description: "Votre compte est créé. Certaines fonctionnalités seront configurées automatiquement.",
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
