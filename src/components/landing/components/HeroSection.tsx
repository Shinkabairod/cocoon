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
      {/* Fond géométrique animé */}
      <div className="absolute inset-0 opacity-30">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Dégradés subtils */}
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#f3f4f6', stopOpacity:0.4}} />
              <stop offset="100%" style={{stopColor:'#e5e7eb', stopOpacity:0.2}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#d1d5db', stopOpacity:0.3}} />
              <stop offset="100%" style={{stopColor:'#f9fafb', stopOpacity:0.1}} />
            </linearGradient>
          </defs>
          
          {/* Formes géométriques animées */}
          {/* Cercles flottants */}
          <circle cx="150" cy="100" r="60" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,30; 0,0"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="1000" cy="150" r="80" fill="url(#grad2)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,25; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="800" cy="600" r="45" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 25,-20; 0,0"
              dur="7s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Triangles */}
          <polygon points="300,200 350,300 250,300" fill="#f3f4f6" opacity="0.2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 300 250; 10 300 250; 0 300 250"
              dur="10s"
              repeatCount="indefinite"
            />
          </polygon>
          
          <polygon points="900,400 950,500 850,500" fill="#e5e7eb" opacity="0.3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 900 450; -8 900 450; 0 900 450"
              dur="12s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Rectangles */}
          <rect x="100" y="500" width="80" height="80" fill="url(#grad2)" rx="10">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 30,10; 0,0"
              dur="9s"
              repeatCount="indefinite"
            />
          </rect>
          
          <rect x="1050" y="350" width="60" height="60" fill="#d1d5db" opacity="0.2" rx="8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 1080 380; 15 1080 380; 0 1080 380"
              dur="11s"
              repeatCount="indefinite"
            />
          </rect>
          
          {/* Lignes flottantes */}
          <line x1="50" y1="300" x2="200" y2="320" stroke="#9ca3af" strokeWidth="2" opacity="0.3">
            <animate
              attributeName="opacity"
              values="0.3; 0.6; 0.3"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>
          
          <line x1="950" y1="200" x2="1100" y2="180" stroke="#6b7280" strokeWidth="1.5" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2; 0.5; 0.2"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
          
          {/* Hexagones */}
          <polygon points="400,50 440,70 440,110 400,130 360,110 360,70" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 10,20; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>
          
          <polygon points="750,550 785,570 785,605 750,625 715,605 715,570" fill="#f3f4f6" opacity="0.25">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 750 587; 20 750 587; 0 750 587"
              dur="13s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Badge avec animation */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-teal-50 border border-orange-200/50 rounded-full px-8 py-4 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Crown className="h-5 w-5 text-orange-600 group-hover:animate-bounce" />
            <span className="text-gray-800 font-semibold text-lg">
              {activities[currentActivity]?.text || "Transforme ton expertise en revenus automatisés"}
            </span>
            <Sparkles className="h-5 w-5 text-teal-600 group-hover:animate-spin" />
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
              Ton bot IA
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              qui te ressemble
            </span>
          </h1>

          {/* Texte sur deux lignes */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-600 leading-relaxed">
              Crée ton bot IA personnalisé qui connaît toutes tes compétences.
            </p>
            <p className="text-xl bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent font-semibold mt-2">
              Une nouvelle façon de travailler et de vendre ton expertise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-semibold group shadow-2xl hover:shadow-black/25 transition-all duration-300" onClick={onAuthRedirect}>
              <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
              Créer mon bot gratuitement
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 text-xl border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-300" onClick={onAuthRedirect}>
              <Play className="h-6 w-6 mr-3" />
              Voir la démo
            </Button>
          </div>

          {/* Stats avec animations avancées */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[{
            value: animatedStats.bots,
            suffix: '+',
            label: 'Bots créés',
            color: 'text-orange-600',
            icon: <Bot className="h-6 w-6" />
          }, {
            value: animatedStats.revenue,
            suffix: '€',
            label: 'Revenus générés',
            color: 'text-emerald-600',
            icon: <DollarSign className="h-6 w-6" />
          }, {
            value: animatedStats.hours,
            suffix: 'h',
            label: 'Temps économisé',
            color: 'text-teal-600',
            icon: <Clock className="h-6 w-6" />
          }, {
            value: animatedStats.experts,
            suffix: '+',
            label: 'Experts actifs',
            color: 'text-rose-600',
            icon: <Users className="h-6 w-6" />
          }].map((stat, index) => (
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