import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { huggingfaceService } from '@/services/huggingfaceService';
import { obsidianStructureService } from '@/services/obsidianStructureService';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingComplete = () => {
  const { user } = useAuth();
  const { onboardingData, setIsOnboardingComplete } = useOnboarding();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const completeOnboarding = async () => {
    if (!user) {
      console.error('❌ No user found');
      return;
    }

    setIsProcessing(true);
    console.log('🚀 Starting onboarding completion for user:', user.email);
    console.log('📋 Onboarding data:', onboardingData);

    try {
      // 1. Save to Supabase first
      console.log('💾 Saving to Supabase...');
      const { error: supabaseError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          profile_data: onboardingData,  // ✅ Changé de onboarding_data à profile_data
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        });

      if (supabaseError) {
        console.error('❌ Supabase error:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ Successfully saved to Supabase');

      // 2. Save to Hugging Face service for Obsidian structure
      try {
        console.log('🤗 Saving to Hugging Face service...');
        await huggingfaceService.saveOnboardingData(onboardingData);
        console.log('✅ Successfully saved to Hugging Face');
      } catch (hfError) {
        console.warn('⚠️ Hugging Face save failed (non-critical):', hfError);
        // Don't throw - this is optional
      }

      // 3. Create Obsidian vault structure
      try {
        console.log('📁 Creating Obsidian vault structure...');
        await obsidianStructureService.createUserVault(user.id, onboardingData);
        console.log('✅ Successfully created Obsidian vault');
      } catch (obsidianError) {
        console.warn('⚠️ Obsidian vault creation failed (non-critical):', obsidianError);
        // Don't throw - this is optional
      }

      // 4. Mark as complete in context
      setIsOnboardingComplete(true);
      setIsCompleted(true);

      console.log('🎉 Onboarding completed successfully!');

      // 5. Redirect to dashboard after a short delay
      setTimeout(() => {
        console.log('🔄 Redirecting to dashboard...');
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('❌ Critical error completing onboarding:', error);
      throw error;
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