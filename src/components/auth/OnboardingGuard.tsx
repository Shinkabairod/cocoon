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
      if (!user) {
        setOnboardingStatus({ completed: false, loading: false });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error checking onboarding status:', error);
          setOnboardingStatus({ completed: false, loading: false });
          return;
        }

        const completed = data?.onboarding_completed ?? false;
        setOnboardingStatus({ completed, loading: false });
      } catch (error) {
        console.error('Error in checkOnboardingStatus:', error);
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
          <p className="text-gray-600">Checking your account status...</p>
        </div>
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If onboarding is required but not completed
  if (requireOnboarding && !onboardingStatus.completed) {
    return <Navigate to="/onboarding" replace />;
  }

  // If onboarding is NOT required but user hasn't completed it
  if (!requireOnboarding && !onboardingStatus.completed) {
    return <Navigate to="/onboarding" replace />;
  }

  // If user is trying to access onboarding but already completed it
  if (requireOnboarding && onboardingStatus.completed) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default OnboardingGuard;