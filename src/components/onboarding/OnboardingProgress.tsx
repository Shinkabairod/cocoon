
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle, Circle } from 'lucide-react';

const OnboardingProgress: React.FC = () => {
  const { onboardingData, totalSteps } = useOnboarding();
  const currentStep = onboardingData.step;

  const steps = [
    'Welcome',
    'Experience',
    'Goals', 
    'Platforms',
    'Content',
    'Challenges',
    'Complete'
  ];

  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              isCompleted 
                ? 'bg-violet-600 border-violet-600 text-white' 
                : isCurrent
                  ? 'border-violet-600 text-violet-600 bg-white'
                  : 'border-gray-300 text-gray-400 bg-white'
            }`}>
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{stepNumber}</span>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                isCompleted ? 'bg-violet-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingProgress;
