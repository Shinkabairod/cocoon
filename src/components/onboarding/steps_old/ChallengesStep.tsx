// src/components/onboarding/steps/ChallengesStep.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ChallengesStep: React.FC = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();

  const challenges = [
    { id: 'ideas', title: 'Finding ideas', description: 'Coming up with fresh content concepts', icon: '💡' },
    { id: 'writing', title: 'Writing scripts', description: 'Creating engaging scripts and captions', icon: '✍️' },
    { id: 'editing', title: 'Video editing', description: 'Post-production and visual effects', icon: '🎬' },
    { id: 'consistency', title: 'Staying consistent', description: 'Publishing content regularly', icon: '📅' },
    { id: 'engagement', title: 'Growing engagement', description: 'Getting likes, comments, shares', icon: '❤️' },
    { id: 'analytics', title: 'Understanding analytics', description: 'Analyzing performance data', icon: '📊' }
  ];

  const selectedChallenges = onboardingData.challenges || [];

  const handleToggleChallenge = (challengeId: string) => {
    const current = selectedChallenges;
    const updated = current.includes(challengeId)
      ? current.filter(c => c !== challengeId)
      : [...current, challengeId];
    
    updateOnboardingData({ challenges: updated });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
            <span>Step 6 of 7</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What are your biggest <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">challenges</span>?
          </h1>
          <p className="text-xl text-gray-600">Your AI will focus on helping you with these areas</p>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => handleToggleChallenge(challenge.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedChallenges.includes(challenge.id)
                  ? 'border-violet-500 bg-violet-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-3">{challenge.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
              <p className="text-gray-600 text-sm">{challenge.description}</p>
              
              {selectedChallenges.includes(challenge.id) && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={prevStep} className="text-gray-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={selectedChallenges.length === 0}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengesStep;