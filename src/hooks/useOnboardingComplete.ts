
// src/hooks/useOnboardingComplete.ts
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { huggingfaceService } from '@/services/huggingfaceService';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingComplete = () => {
  const { user } = useAuth();
  const { onboardingData, setIsOnboardingComplete } = useOnboarding();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const completeOnboarding = async () => {
    if (!user) {
      console.error('No user found');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('🚀 Starting onboarding completion...');

      // 1. Save to Supabase
      const { error: supabaseError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          onboarding_data: onboardingData,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ Saved to Supabase');

      // 2. Save to Hugging Face service (for Obsidian structure)
      try {
        await huggingfaceService.saveOnboardingData(onboardingData);
        console.log('✅ Saved to Hugging Face');
      } catch (hfError) {
        console.warn('⚠️ Hugging Face save failed:', hfError);
        // Don't throw - this is optional
      }

      // 3. Mark as complete in context
      setIsOnboardingComplete(true);
      setIsCompleted(true);

      console.log('✅ Onboarding completed successfully');

      // 4. Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('❌ Error completing onboarding:', error);
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
