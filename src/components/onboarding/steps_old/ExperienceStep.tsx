
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ExperienceLevel } from '@/types/onboarding';
import { ArrowLeft, ArrowRight, Users, Award, Rocket } from 'lucide-react';

const ExperienceStep: React.FC = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();

  const experiences = [
    {
      level: 'Beginner' as ExperienceLevel,
      title: 'Just starting',
      description: 'New to content creation',
      icon: <Rocket className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      level: 'Intermediate' as ExperienceLevel,
      title: 'Growing creator',
      description: 'Some experience, ready to level up',
      icon: <Users className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      level: 'Experienced' as ExperienceLevel,
      title: 'Content pro',
      description: 'Established creator looking to optimize',
      icon: <Award className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleSelect = (level: ExperienceLevel) => {
    updateOnboardingData({ experienceLevel: level });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
            <span>Step 2 of 7</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What's your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">experience</span> level?
          </h1>
          <p className="text-xl text-gray-600">Help us tailor the perfect AI assistant for you</p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp) => (
            <button
              key={exp.level}
              onClick={() => handleSelect(exp.level)}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                onboardingData.experienceLevel === exp.level
                  ? 'border-violet-500 bg-violet-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${exp.color} flex items-center justify-center text-white mx-auto mb-4`}>
                {exp.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
              <p className="text-gray-600">{exp.description}</p>
              
              {onboardingData.experienceLevel === exp.level && (
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
            disabled={!onboardingData.experienceLevel}
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

export default ExperienceStep;
