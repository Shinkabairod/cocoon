
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { Loader2 } from 'lucide-react';

interface OnboardingGuardProps {
  children: ReactNode;
}

const OnboardingGuard = ({ children }: OnboardingGuardProps) => {
  const { isOnboardingComplete, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Vérification du profil...</p>
        </div>
      </div>
    );
  }

  if (isOnboardingComplete === false) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default OnboardingGuard;
