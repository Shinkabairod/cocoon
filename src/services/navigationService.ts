
// src/services/navigationService.ts
// Service de navigation centralisé

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
