
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingNavigationProps {
  onNext?: () => void;
  onPrev?: () => void;
  nextDisabled?: boolean;
  nextText?: string;
  showPrev?: boolean;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  onNext,
  onPrev,
  nextDisabled = false,
  nextText = 'Continue',
  showPrev = true
}) => {
  const { nextStep, prevStep, onboardingData } = useOnboarding();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      prevStep();
    }
  };

  return (
    <div className="flex justify-between items-center pt-8">
      {showPrev && onboardingData.step > 1 ? (
        <Button variant="ghost" onClick={handlePrev} className="text-gray-500">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button
        onClick={handleNext}
        disabled={nextDisabled}
        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
      >
        {nextText}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default OnboardingNavigation;
