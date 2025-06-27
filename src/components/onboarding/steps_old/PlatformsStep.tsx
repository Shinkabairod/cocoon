// src/components/onboarding/steps/PlatformsStep.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Platform } from '@/types/onboarding';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PlatformsStep: React.FC = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();

  const platforms = [
    { name: 'YouTube' as Platform, icon: '🎥', color: 'from-red-500 to-red-600' },
    { name: 'Instagram' as Platform, icon: '📸', color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok' as Platform, icon: '🎵', color: 'from-black to-gray-800' },
    { name: 'Twitter' as Platform, icon: '🐦', color: 'from-blue-400 to-blue-600' },
    { name: 'LinkedIn' as Platform, icon: '💼', color: 'from-blue-700 to-blue-800' },
    { name: 'Blog' as Platform, icon: '✍️', color: 'from-green-500 to-green-600' },
    { name: 'Podcast' as Platform, icon: '🎙️', color: 'from-orange-500 to-orange-600' }
  ];

  const selectedPlatforms = onboardingData.platforms || [];

  const handleTogglePlatform = (platform: Platform) => {
    const current = selectedPlatforms;
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    
    updateOnboardingData({ platforms: updated });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
            <span>Step 4 of 7</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Which <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">platforms</span> interest you?
          </h1>
          <p className="text-xl text-gray-600">Select all that apply - your AI will understand each platform's style</p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleTogglePlatform(platform.name)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedPlatforms.includes(platform.name)
                  ? 'border-violet-500 bg-violet-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center text-white mx-auto mb-3`}>
                <span className="text-2xl">{platform.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
              
              {selectedPlatforms.includes(platform.name) && (
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
            disabled={selectedPlatforms.length === 0}
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

export default PlatformsStep;
