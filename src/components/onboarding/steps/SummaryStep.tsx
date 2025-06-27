
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useOnboardingComplete } from '@/hooks/useOnboardingComplete';
import { Sparkles, Rocket, CheckCircle, Loader2, User, Target, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SummaryStep: React.FC = () => {
  const { onboardingData, prevStep } = useOnboarding();
  const { completeOnboarding, isProcessing } = useOnboardingComplete();
  const [isCreating, setIsCreating] = useState(false);

  const handleComplete = async () => {
    setIsCreating(true);
    
    try {
      await completeOnboarding();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getSummary = () => {
    return {
      name: onboardingData.fullName || 'User',
      profession: onboardingData.profession || 'Not specified',
      objectivesCount: onboardingData.objectives?.length || 0,
      challengesCount: onboardingData.challenges?.length || 0,
      toolsCount: onboardingData.toolsPreferences?.length || 0,
      aiAreasCount: onboardingData.aiAssistanceAreas?.length || 0
    };
  };

  const summary = getSummary();

  if (isCreating || isProcessing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-12 w-12 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Setting up your <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Workspace</span>...
            </h1>
            <p className="text-xl text-gray-600">Personalizing...</p>
          </div>

          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Analyzing profile</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Setting preferences</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="h-5 w-5 text-violet-600 animate-spin" />
              <span>Creating workspace</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span>Step 11 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Ready</span>
          </h1>
        </div>

        <div className="space-y-8 mb-12">
          {/* Summary cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Profile</p>
                  <p className="font-medium">{summary.name}</p>
                  <p className="text-sm text-gray-500">{summary.profession}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Goals</p>
                  <p className="font-medium">{summary.objectivesCount} defined</p>
                  <p className="text-sm text-gray-500">Targeted help</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="font-medium">{summary.aiAreasCount} areas</p>
                  <p className="text-sm text-gray-500">AI optimized</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Features */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Your workspace will help you with:
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Personalized ideas</h4>
                <p className="text-sm text-gray-600">Adapted to your goals</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Targeted strategies</h4>
                <p className="text-sm text-gray-600">For your challenges</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Guidance</h4>
                <p className="text-sm text-gray-600">At your pace</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Back
          </Button>
          
          <Button
            onClick={handleComplete}
            disabled={isCreating}
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Rocket className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            Enter Workspace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
