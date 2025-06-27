// src/components/onboarding/steps/WelcomeStep.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Rocket, ArrowRight } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const { nextStep } = useOnboarding();
  const { user } = useAuth();

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative max-w-2xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white transform rotate-45 rounded-sm"></div>
            </div>
            <div className="absolute inset-0 bg-black rounded-lg blur opacity-30 animate-pulse" />
          </div>
          <span className="text-3xl font-bold text-black">Cocoon AI</span>
        </div>

        {/* Titre principal */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Hey {firstName}! 👋
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Let's create your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">AI bot</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            We need to know a bit about you to create the perfect AI assistant for your content creation journey
          </p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">2 min</div>
            <div className="text-sm text-gray-500">Setup time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">7 steps</div>
            <div className="text-sm text-gray-500">Quick questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">∞</div>
            <div className="text-sm text-gray-500">Possibilities</div>
          </div>
        </div>

        {/* Bouton d'action */}
        <Button 
          onClick={nextStep}
          size="lg" 
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
          Let's start building
          <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;