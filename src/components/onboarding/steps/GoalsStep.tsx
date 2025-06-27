
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ContentGoal } from '@/types/onboarding';
import { ArrowLeft, ArrowRight, Target, Users, DollarSign, Star, Heart } from 'lucide-react';

const GoalsStep: React.FC = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();

  const goals = [
    {
      goal: 'Grow an audience' as ContentGoal,
      title: 'Grow an audience',
      description: 'Build a loyal following',
      icon: <Users className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      goal: 'Share knowledge' as ContentGoal,
      title: 'Share knowledge',
      description: 'Educate and inspire others',
      icon: <Target className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      goal: 'Make money' as ContentGoal,
      title: 'Make money',
      description: 'Monetize your content',
      icon: <DollarSign className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      goal: 'Build a brand' as ContentGoal,
      title: 'Build a brand',
      description: 'Establish your presence',
      icon: <Star className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      goal: 'Have fun' as ContentGoal,
      title: 'Have fun',
      description: 'Enjoy the creative process',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-pink-500 to-red-500'
    }
  ];

  const handleSelect = (goal: ContentGoal) => {
    updateOnboardingData({ contentGoal: goal });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
            <span>Step 3 of 7</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What's your main <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">goal</span>?
          </h1>
          <p className="text-xl text-gray-600">Choose your primary objective with content creation</p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {goals.map((goalItem) => (
            <button
              key={goalItem.goal}
              onClick={() => handleSelect(goalItem.goal)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                onboardingData.contentGoal === goalItem.goal
                  ? 'border-violet-500 bg-violet-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${goalItem.color} flex items-center justify-center text-white mx-auto mb-4`}>
                {goalItem.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{goalItem.title}</h3>
              <p className="text-gray-600 text-sm">{goalItem.description}</p>
              
              {onboardingData.contentGoal === goalItem.goal && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
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
            disabled={!onboardingData.contentGoal}
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

export default GoalsStep;
