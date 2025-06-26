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
      {/* Fond géométrique subtil */}
      <div className="absolute inset-0 opacity-20">
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
              <stop offset="0%" style={{stopColor:'#f3f4f6', stopOpacity:0.3}} />
              <stop offset="100%" style={{stopColor:'#e5e7eb', stopOpacity:0.1}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#d1d5db', stopOpacity:0.2}} />
              <stop offset="100%" style={{stopColor:'#f9fafb', stopOpacity:0.1}} />
            </linearGradient>
          </defs>
          
          {/* Formes géométriques */}
          {/* Cercles en arrière-plan */}
          <circle cx="150" cy="100" r="80" fill="url(#grad1)" />
          <circle cx="1000" cy="150" r="120" fill="url(#grad2)" />
          <circle cx="800" cy="600" r="90" fill="url(#grad1)" />
          <circle cx="300" cy="650" r="60" fill="url(#grad2)" />
          
          {/* Rectangles arrondis */}
          <rect x="900" y="400" width="200" height="100" rx="20" fill="url(#grad1)" />
          <rect x="50" y="350" width="150" height="80" rx="15" fill="url(#grad2)" />
          <rect x="700" y="50" width="100" height="120" rx="10" fill="url(#grad1)" />
          
          {/* Triangles */}
          <polygon points="500,200 600,350 400,350" fill="url(#grad2)" />
          <polygon points="1100,500 1150,600 1050,600" fill="url(#grad1)" />
          
          {/* Lignes connectant les éléments */}
          <path d="M150,100 Q400,200 500,200" stroke="#e5e7eb" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M800,600 Q600,400 500,200" stroke="#d1d5db" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M1000,150 Q800,300 700,170" stroke="#f3f4f6" strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* Grille de points subtile */}
          {Array.from({length: 15}, (_, i) => 
            Array.from({length: 10}, (_, j) => (
              <circle 
                key={`${i}-${j}`}
                cx={80 * i + 40} 
                cy={80 * j + 40} 
                r="1.5" 
                fill="#d1d5db" 
                opacity="0.15"
              />
            ))
          )}
          
          {/* Formes hexagonales */}
          <polygon points="200,450 230,430 260,450 260,490 230,510 200,490" fill="url(#grad1)" />
          <polygon points="950,250 980,230 1010,250 1010,290 980,310 950,290" fill="url(#grad2)" />
          
          {/* Éléments flottants animés */}
          <g className="animate-pulse" style={{animationDuration: '4s'}}>
            <rect x="600" y="500" width="40" height="40" rx="8" fill="url(#grad1)" />
          </g>
          <g className="animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}>
            <circle cx="400" cy="100" r="25" fill="url(#grad2)" />
          </g>
          <g className="animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}>
            <polygon points="850,350 870,330 890,350 870,370" fill="url(#grad1)" />
          </g>
        </svg>
      </div>

      {/* Effet de particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gray-300 rounded-full animate-bounce opacity-30" style={{animationDelay: '0s', animationDuration: '3s'}} />
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce opacity-25" style={{animationDelay: '1s', animationDuration: '4s'}} />
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-gray-300 rounded-full animate-bounce opacity-20" style={{animationDelay: '2s', animationDuration: '5s'}} />
        <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-gray-200 rounded-full animate-bounce opacity-35" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-gray-350 rounded-full animate-bounce opacity-30" style={{animationDelay: '1.5s', animationDuration: '4.5s'}} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Bandeau modifié */}
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