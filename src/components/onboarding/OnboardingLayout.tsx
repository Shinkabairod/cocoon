
// src/components/onboarding/OnboardingLayout.tsx
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  title,
  subtitle,
  showProgress = true
}) => {
  const { onboardingData, totalSteps } = useOnboarding();
  const progress = ((onboardingData.step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      {showProgress && (
        <div className="w-full bg-gray-100 h-2">
          <div 
            className="h-2 bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative max-w-4xl w-full">
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {showProgress && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span>Step {onboardingData.step} of {totalSteps}</span>
                </div>
              )}
              
              {title && (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>
              )}
              
              {subtitle && (
                <p className="text-xl text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;