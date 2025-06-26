import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Crown, Rocket, Bot, DollarSign, Clock, Users } from 'lucide-react';
import { Activity, AnimatedStats } from '../types';

interface HeroSectionProps {
  currentActivity: number;
  activities: Activity[];
  animatedStats: AnimatedStats;
  isVisible: boolean;
  onAuthRedirect: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  currentActivity,
  activities,
  animatedStats,
  isVisible,
  onAuthRedirect
}) => {
  return (
    <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background and animated elements stay unchanged */}
      
      {/* ... (SVG + particles stay as-is) */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-violet-600 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Automate your business
            </span>
            <Crown className="h-5 w-5 text-blue-500 animate-bounce" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-900 bg-clip-text">
              Boost and monetize
            </span>
            <span className="block mt-4">
              <span className={`inline-flex items-center justify-center gap-4 transition-all duration-700 transform ${activities[currentActivity].color}`}>
                <span className="relative flex items-center justify-center">
                  <span className="animate-bounce">
                    {activities[currentActivity].icon}
                  </span>
                  <div className="absolute inset-0 animate-ping opacity-30">
                    {activities[currentActivity].icon}
                  </div>
                </span>
                <span className="animate-pulse">
                  {activities[currentActivity].text}
                </span>
              </span>
            </span>
            <span className="block mt-4 bg-gradient-to-r from-gray-900 to-grey-900 bg-clip-text">
              in just a few clicks.
            </span>
          </h1>

          {/* Subtext */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-600 leading-relaxed">
              Create your custom AI bot that knows your full expertise.
            </p>
            <p className="text-xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent font-semibold mt-2">
              A new way to work and sell your knowledge.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-semibold group shadow-2xl hover:shadow-black/25 transition-all duration-300"
              onClick={onAuthRedirect}
            >
              <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
              Create my bot for free
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-6 text-xl border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-300"
              onClick={onAuthRedirect}
            >
              <Play className="h-6 w-6 mr-3" />
              Watch demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                value: animatedStats.bots,
                suffix: '+',
                label: 'Bots created',
                color: 'text-orange-600',
                icon: <Bot className="h-6 w-6" />
              },
              {
                value: animatedStats.revenue,
                suffix: '€',
                label: 'Revenue generated',
                color: 'text-emerald-600',
                icon: <DollarSign className="h-6 w-6" />
              },
              {
                value: animatedStats.hours,
                suffix: 'h',
                label: 'Hours saved',
                color: 'text-teal-600',
                icon: <Clock className="h-6 w-6" />
              },
              {
                value: animatedStats.experts,
                suffix: '+',
                label: 'Active experts',
                color: 'text-rose-600',
                icon: <Users className="h-6 w-6" />
              }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300 group cursor-pointer">
                <div className="relative p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl">
                  <div className={`${stat.color} mb-2 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;