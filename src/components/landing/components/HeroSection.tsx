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
      {/* NOUVEAU: Fond géométrique subtil */}
      <div className="absolute inset-0 opacity-20">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 800" 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Dégradés subtils en gris */}
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#f3f4f6', stopOpacity:0.4}} />
              <stop offset="100%" style={{stopColor:'#e5e7eb', stopOpacity:0.2}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#d1d5db', stopOpacity:0.3}} />
              <stop offset="100%" style={{stopColor:'#f9fafb', stopOpacity:0.1}} />
            </linearGradient>
          </defs>
          
          {/* Cercles flottants avec animation */}
          <circle cx="150" cy="120" r="60" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 15,25; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="1000" cy="180" r="80" fill="url(#grad2)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -20,15; 0,0"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="800" cy="580" r="45" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 25,-10; 0,0"
              dur="7s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Rectangles avec rotation */}
          <rect x="100" y="480" width="70" height="70" fill="url(#grad2)" rx="8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 135 515; 10 135 515; 0 135 515"
              dur="12s"
              repeatCount="indefinite"
            />
          </rect>
          
          <rect x="1050" y="320" width="50" height="50" fill="#d1d5db" opacity="0.25" rx="6">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 15,20; 0,0"
              dur="9s"
              repeatCount="indefinite"
            />
          </rect>
          
          {/* Triangles */}
          <polygon points="320,180 360,250 280,250" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 320 215; 8 320 215; 0 320 215"
              dur="11s"
              repeatCount="indefinite"
            />
          </polygon>
          
          <polygon points="920,420 960,490 880,490" fill="#e5e7eb" opacity="0.3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 920 455; -6 920 455; 0 920 455"
              dur="13s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Hexagones */}
          <polygon points="450,80 480,95 480,125 450,140 420,125 420,95" fill="url(#grad2)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 12,18; 0,0"
              dur="6s"
              repeatCount="indefinite"
            />
          </polygon>
          
          <polygon points="750,520 780,535 780,565 750,580 720,565 720,535" fill="#f3f4f6" opacity="0.3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 750 552; 15 750 552; 0 750 552"
              dur="14s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Lignes connectrices animées */}
          <line x1="80" y1="280" x2="180" y2="300" stroke="#9ca3af" strokeWidth="1.5" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2; 0.5; 0.2"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
          
          <line x1="980" y1="200" x2="1080" y2="180" stroke="#6b7280" strokeWidth="1" opacity="0.25">
            <animate
              attributeName="opacity"
              values="0.25; 0.6; 0.25"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>
          
          {/* Grille de points subtile */}
          {Array.from({length: 8}, (_, i) => 
            Array.from({length: 5}, (_, j) => (
              <circle 
                key={`dot-${i}-${j}`}
                cx={150 * i + 100} 
                cy={160 * j + 100} 
                r="1" 
                fill="#d1d5db" 
                opacity="0.15"
              />
            ))
          )}
          
          {/* Losanges */}
          <polygon points="600,350 620,330 640,350 620,370" fill="url(#grad1)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 620 350; 20 620 350; 0 620 350"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>

      {/* NOUVEAU: Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce opacity-20" style={{animationDelay: '0s', animationDuration: '4s'}} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-gray-400 rounded-full animate-bounce opacity-15" style={{animationDelay: '1s', animationDuration: '5s'}} />
        <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-gray-350 rounded-full animate-bounce opacity-25" style={{animationDelay: '2s', animationDuration: '3s'}} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-200 rounded-full animate-bounce opacity-30" style={{animationDelay: '0.5s', animationDuration: '6s'}} />
        <div className="absolute bottom-1/3 left-3/4 w-1 h-1 bg-gray-300 rounded-full animate-bounce opacity-20" style={{animationDelay: '1.5s', animationDuration: '4.5s'}} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Badge avec animation */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-teal-100 border border-orange-200/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-orange-600 animate-spin" style={{
            animationDuration: '3s'
          }} />
            <span className="text-sm font-medium bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              Automatise ton activité
            </span>
            <Crown className="h-5 w-5 text-amber-500 animate-bounce" />
          </div>

          {/* Titre principal avec logo animé centré */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-orange-800 to-teal-800 bg-clip-text text-transparent">
              Boost et monétise
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
            <span className="block mt-4 bg-gradient-to-r from-gray-900 to-orange-800 bg-clip-text text-transparent">
              en quelques clics.
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