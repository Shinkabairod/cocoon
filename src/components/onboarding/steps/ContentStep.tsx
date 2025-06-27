// src/components/onboarding/steps/ContentStep.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ContentType } from '@/types/onboarding';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ContentStep: React.FC = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();

  const contentTypes = [
    { 
      type: 'Videos' as ContentType, 
      title: 'Videos', 
      description: 'YouTube, TikTok, Instagram Reels',
      icon: '🎬',
      color: 'from-red-500 to-pink-600'
    },
    { 
      type: 'Social Media Posts' as ContentType, 
      title: 'Social Posts', 
      description: 'Instagram, Twitter, LinkedIn posts',
      icon: '📱',
      color: 'from-blue-500 to-purple-600'
    },
    { 
      type: 'Blogs' as ContentType, 
      title: 'Blog Articles', 
      description: 'Long-form written content',
      icon: '📝',
      color: 'from-green-500 to-teal-600'
    },
    { 
      type: 'Podcasts' as ContentType, 
      title: 'Podcasts', 
      description: 'Audio content and shows',
      icon: '🎙️',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const selectedTypes = onboardingData.contentTypes || [];

  const handleToggleType = (type: ContentType) => {
    const current = selectedTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    
    updateOnboardingData({ contentTypes: updated });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
            <span>Step 5 of 7</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What type of <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">content</span> do you want to create?
          </h1>
          <p className="text-xl text-gray-600">Your AI will specialize in your chosen content formats</p>
        </div>

        {/* Content Types Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contentTypes.map((content) => (
            <button
              key={content.type}
              onClick={() => handleToggleType(content.type)}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedTypes.includes(content.type)
                  ? 'border-violet-500 bg-violet-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${content.color} flex items-center justify-center text-white mx-auto mb-4`}>
                <span className="text-3xl">{content.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
              <p className="text-gray-600">{content.description}</p>
              
              {selectedTypes.includes(content.type) && (
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
            disabled={selectedTypes.length === 0}
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

export default ContentStep;