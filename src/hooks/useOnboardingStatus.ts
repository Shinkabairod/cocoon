// 1. CORRIGER le hook useOnboardingStatus (créer ce fichier)
// src/hooks/useOnboardingStatus.ts

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

// 2. CORRIGER SummaryStep.tsx pour marquer l'onboarding comme terminé
// Remplacer la fonction handleComplete dans SummaryStep.tsx

const handleComplete = async () => {
  if (!user) {
    toast({
      title: "❌ Erreur d'authentification",
      description: "Vous devez être connecté pour finaliser votre configuration.",
      variant: "destructive",
    });
    return;
  }

  setIsCreatingWorkspace(true);

  try {
    console.log('🚀 Starting complete onboarding process for user:', user.id);

    // Step 1: Save profile data to /profile API
    console.log('📤 Saving your personalized profile...');
    const payload = {
      user_id: user.id,
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
        resources: `Equipment: ${onboardingData.equipmentOwned?.join(', ') || 'Not specified'}, Time: ${onboardingData.timeAvailable || 'Not specified'}`
      }
    };

    const res = await fetch(`${HF_SPACE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ API Error:", data);
      throw new Error(`API error (${res.status}): ${data?.error || 'Unknown error'}`);
    }

    console.log("✅ Profile saved successfully:", data);

    // Step 2: Create personalized workspace structure (avec gestion d'erreur)
    console.log('🗂️ Creating your personalized workspace...');
    
    let fileCount = 0;
    let workspaceSuccess = false;
    
    try {
      await obsidianStructureService.createUserVault(user.id, onboardingData);
      fileCount = obsidianStructureService.getFileCount(onboardingData);
      workspaceSuccess = true;
      console.log(`✅ Workspace structure created: ${fileCount} files`);
    } catch (workspaceError) {
      console.warn('⚠️ Workspace creation partial:', workspaceError);
      fileCount = 0;
      workspaceSuccess = false;
    }

    // Step 3: Marquer l'onboarding comme terminé dans Supabase
    console.log('✅ Marking onboarding as completed...');
    const { error: updateError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        onboarding_completed: true,
        profile_data: payload.profile_data,
        updated_at: new Date().toISOString()
      });

    if (updateError) {
      console.warn('⚠️ Erreur mise à jour profil:', updateError);
    } else {
      console.log('✅ Onboarding marked as completed in database');
    }

    // Step 4: Complete onboarding process
    await completeOnboarding();

    // Messages différents selon le succès
    if (workspaceSuccess && fileCount > 0) {
      toast({
        title: "🎉 Configuration terminée !",
        description: `Votre espace personnalisé Cocoon AI est prêt avec ${fileCount} éléments configurés.`,
      });
    } else if (data.sync_status === "synced") {
      toast({
        title: "🎉 Configuration terminée !",
        description: "Votre profil est sauvegardé. L'espace de travail sera créé progressivement.",
      });
    } else {
      toast({
        title: "⚠️ Configuration partiellement terminée",
        description: "Votre profil est sauvegardé, mais certains éléments seront créés au fur et à mesure.",
      });
    }

    // Redirection immédiate vers le dashboard
    console.log('🎯 Redirecting to dashboard...');
    navigate('/dashboard', { replace: true });

  } catch (error) {
    console.error('❌ Complete onboarding error:', error);
    
    // Essayer quand même de terminer l'onboarding basique
    try {
      await completeOnboarding();
      
      // Marquer comme terminé même en cas d'erreur partielle
      await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          onboarding_completed: true,
          profile_data: payload.profile_data,
          updated_at: new Date().toISOString()
        });
      
      toast({
        title: "⚠️ Configuration basique terminée",
        description: "Votre compte est créé. Certaines fonctionnalités seront configurées automatiquement.",
      });
      
      navigate('/dashboard', { replace: true });
    } catch (finalError) {
      toast({
        title: "❌ Erreur de configuration",
        description: error instanceof Error ? error.message : 'Une erreur est survenue lors de la configuration.',
        variant: "destructive",
      });
    }
  } finally {
    setIsCreatingWorkspace(false);
  }
};

// 3. CORRIGER Auth.tsx pour rediriger vers dashboard si onboarding déjà fait
// Remplacer l'useEffect dans Auth.tsx

useEffect(() => {
  if (user) {
    // Vérifier le statut d'onboarding avant de rediriger
    const checkAndRedirect = async () => {
      try {
        const { data } = await supabase
          .from('user_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .single();

        if (data?.onboarding_completed) {
          console.log('✅ Onboarding déjà terminé, redirection vers dashboard');
          navigate('/dashboard');
        } else {
          console.log('⚠️ Onboarding non terminé, redirection vers onboarding');
          navigate('/onboarding');
        }
      } catch (error) {
        console.log('⚠️ Erreur vérification onboarding, redirection vers onboarding');
        navigate('/onboarding');
      }
    };

    checkAndRedirect();
  }
}, [user, navigate]);

// 4. AJOUTER un service de navigation centralisé
// src/services/navigationService.ts

import { supabase } from '@/integrations/supabase/client';

export const navigationService = {
  async getRedirectPath(user: any) {
    if (!user) return '/auth';

    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .single();

      return data?.onboarding_completed ? '/dashboard' : '/onboarding';
    } catch (error) {
      console.warn('Error checking onboarding status:', error);
      return '/onboarding';
    }
  },

  async markOnboardingComplete(userId: string, profileData: any) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          onboarding_completed: true,
          profile_data: profileData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      console.log('✅ Onboarding marked as completed');
      return true;
    } catch (error) {
      console.error('❌ Error marking onboarding complete:', error);
      return false;
    }
  }
};