// src/components/onboarding/SummaryStep.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useOnboardingComplete } from '@/hooks/useOnboardingComplete';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Rocket, CheckCircle, Loader2 } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';

const SummaryStep: React.FC = () => {
  const { onboardingData } = useOnboarding();
  const { completeOnboarding, isProcessing } = useOnboardingComplete();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleComplete = async () => {
    setIsCreating(true);
    
    try {
      await completeOnboarding();
      // Navigation is handled by useOnboardingComplete
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getSummary = () => {
    const { experienceLevel, contentGoal, platforms, contentTypes, challenges } = onboardingData;
    
    return {
      experience: experienceLevel || 'Not specified',
      goal: contentGoal || 'Not specified',
      platforms: platforms?.slice(0, 3).join(', ') + (platforms?.length > 3 ? '...' : '') || 'None selected',
      content: contentTypes?.slice(0, 2).join(', ') + (contentTypes?.length > 2 ? '...' : '') || 'None selected',
      challengesCount: challenges?.length || 0
    };
  };

  const summary = getSummary();

  if (isCreating || isProcessing) {
    return (
      <OnboardingLayout showProgress={false}>
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-12 w-12 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Creating your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">AI bot</span>...
            </h1>
            <p className="text-xl text-gray-600">This will only take a moment</p>
          </div>

          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Analyzing your preferences</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Setting up AI personality</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="h-5 w-5 text-violet-600 animate-spin" />
              <span>Creating your workspace</span>
            </div>
          </div>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout
      title="Perfect! Your AI bot is ready 🎉"
      subtitle="Here's what we've set up for you"
      showProgress={false}
    >
      <div className="space-y-12">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 p-6 rounded-2xl border border-violet-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Profile</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{summary.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Main goal:</span>
                <span className="font-medium">{summary.goal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platforms:</span>
                <span className="font-medium">{summary.platforms}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI Specialization</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Content types:</span>
                <span className="font-medium">{summary.content}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Focus areas:</span>
                <span className="font-medium">{summary.challengesCount} challenges</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Optimization:</span>
                <span className="font-medium">Personalized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Your AI bot will help you with:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Content Ideas</h4>
              <p className="text-sm text-gray-600">Endless creative concepts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">✍️</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Script Writing</h4>
              <p className="text-sm text-gray-600">Engaging scripts & captions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📊</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Strategy Tips</h4>
              <p className="text-sm text-gray-600">Growth optimization</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={handleComplete}
            disabled={isCreating}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
            Create my AI bot
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;