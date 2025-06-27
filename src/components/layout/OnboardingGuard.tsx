
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface OnboardingGuardProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ 
  children, 
  requireOnboarding = false 
}) => {
  const { user, loading: authLoading } = useAuth();
  const [onboardingStatus, setOnboardingStatus] = useState<{
    completed: boolean;
    loading: boolean;
  }>({
    completed: false,
    loading: true
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      console.log('🔍 Checking onboarding status for user:', user?.email);
      
      if (!user) {
        console.log('❌ No user found, marking onboarding as incomplete');
        setOnboardingStatus({ completed: false, loading: false });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('❌ Error checking onboarding status:', error);
          setOnboardingStatus({ completed: false, loading: false });
          return;
        }

        const completed = data?.onboarding_completed ?? false;
        console.log('✅ Onboarding status:', completed ? 'completed' : 'incomplete');
        setOnboardingStatus({ completed, loading: false });
      } catch (error) {
        console.error('❌ Error in checkOnboardingStatus:', error);
        setOnboardingStatus({ completed: false, loading: false });
      }
    };

    checkOnboardingStatus();
  }, [user]);

  // Show loading while checking both auth and onboarding status
  if (authLoading || onboardingStatus.loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // User not authenticated - redirect to auth
  if (!user) {
    console.log('🔄 User not authenticated, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // If we're on onboarding pages and onboarding is already completed
  if (requireOnboarding && onboardingStatus.completed) {
    console.log('🔄 Onboarding completed, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // If we're on dashboard pages but onboarding is not completed
  if (!requireOnboarding && !onboardingStatus.completed) {
    console.log('🔄 Onboarding not completed, redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  console.log('✅ Guard passed, rendering children');
  return <>{children}</>;
};

export default OnboardingGuard;
