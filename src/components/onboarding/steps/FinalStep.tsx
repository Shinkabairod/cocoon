
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle } from 'lucide-react';

const FinalStep: React.FC = () => {
  const { onboardingData, setIsOnboardingComplete } = useOnboarding();
  const navigate = useNavigate();

  const handleComplete = () => {
    setIsOnboardingComplete(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your AI bot is <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">ready</span>!
          </h1>
          <p className="text-xl text-gray-600">
            We've created your personalized AI assistant based on your preferences
          </p>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Profile Summary:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {onboardingData.experienceLevel && (
              <div>
                <span className="text-gray-500 text-sm">Experience:</span>
                <p className="font-medium">{onboardingData.experienceLevel}</p>
              </div>
            )}
            {onboardingData.contentGoal && (
              <div>
                <span className="text-gray-500 text-sm">Goal:</span>
                <p className="font-medium">{onboardingData.contentGoal}</p>
              </div>
            )}
            {onboardingData.platforms && onboardingData.platforms.length > 0 && (
              <div>
                <span className="text-gray-500 text-sm">Platforms:</span>
                <p className="font-medium">{onboardingData.platforms.join(', ')}</p>
              </div>
            )}
            {onboardingData.contentTypes && onboardingData.contentTypes.length > 0 && (
              <div>
                <span className="text-gray-500 text-sm">Content Types:</span>
                <p className="font-medium">{onboardingData.contentTypes.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleComplete}
          size="lg" 
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Sparkles className="h-6 w-6 mr-3 group-hover:animate-bounce" />
          Enter Dashboard
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;
