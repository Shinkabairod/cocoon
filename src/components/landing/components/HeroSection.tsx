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
  return <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* NOUVEAU: Fond géométrique plus actif */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Dégradés subtils en gris */}
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{
              stopColor: '#f3f4f6',
              stopOpacity: 0.6
            }} />
              <stop offset="100%" style={{
              stopColor: '#e5e7eb',
              stopOpacity: 0.3
            }} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{
              stopColor: '#d1d5db',
              stopOpacity: 0.5
            }} />
              <stop offset="100%" style={{
              stopColor: '#f9fafb',
              stopOpacity: 0.2
            }} />
            </linearGradient>
          </defs>
          
          {/* Nombreux petits cercles flottants */}
          <circle cx="120" cy="80" r="15" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 25,35; 0,0" dur="4s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="300" cy="150" r="12" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -30,20; 0,0" dur="5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="500" cy="100" r="18" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 20,-25; 0,0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="750" cy="180" r="10" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -15,30; 0,0" dur="6s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="950" cy="120" r="20" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 35,-20; 0,0" dur="4.5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="1100" cy="200" r="14" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -25,25; 0,0" dur="5.5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="200" cy="400" r="16" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 30,15; 0,0" dur="3s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="400" cy="350" r="11" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -20,-30; 0,0" dur="4.2s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="650" cy="450" r="17" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 25,20; 0,0" dur="3.8s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="850" cy="380" r="13" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -35,25; 0,0" dur="5.2s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="100" cy="600" r="19" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 40,-15; 0,0" dur="4.8s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="350" cy="650" r="15" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -25,30; 0,0" dur="3.3s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="600" cy="680" r="12" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 20,-35; 0,0" dur="5.8s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="900" cy="620" r="16" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -30,20; 0,0" dur="4.3s" repeatCount="indefinite" />
          </circle>
          
          {/* Petits rectangles nombreux */}
          <rect x="80" y="250" width="25" height="25" fill="url(#grad2)" rx="3">
            <animateTransform attributeName="transform" type="rotate" values="0 92 262; 25 92 262; 0 92 262" dur="6s" repeatCount="indefinite" />
          </rect>
          
          <rect x="250" y="280" width="20" height="20" fill="url(#grad1)" rx="2">
            <animateTransform attributeName="transform" type="rotate" values="0 260 290; -20 260 290; 0 260 290" dur="4.5s" repeatCount="indefinite" />
          </rect>
          
          <rect x="550" y="300" width="30" height="30" fill="url(#grad2)" rx="4">
            <animateTransform attributeName="transform" type="rotate" values="0 565 315; 30 565 315; 0 565 315" dur="5.5s" repeatCount="indefinite" />
          </rect>
          
          <rect x="800" y="250" width="22" height="22" fill="url(#grad1)" rx="3">
            <animateTransform attributeName="transform" type="rotate" values="0 811 261; -25 811 261; 0 811 261" dur="3.8s" repeatCount="indefinite" />
          </rect>
          
          <rect x="1000" y="300" width="28" height="28" fill="url(#grad2)" rx="4">
            <animateTransform attributeName="transform" type="rotate" values="0 1014 314; 20 1014 314; 0 1014 314" dur="6.2s" repeatCount="indefinite" />
          </rect>
          
          <rect x="150" y="500" width="24" height="24" fill="url(#grad1)" rx="3">
            <animateTransform attributeName="transform" type="rotate" values="0 162 512; -30 162 512; 0 162 512" dur="4.8s" repeatCount="indefinite" />
          </rect>
          
          <rect x="450" y="550" width="26" height="26" fill="url(#grad2)" rx="3">
            <animateTransform attributeName="transform" type="rotate" values="0 463 563; 35 463 563; 0 463 563" dur="5.3s" repeatCount="indefinite" />
          </rect>
          
          <rect x="750" y="520" width="21" height="21" fill="url(#grad1)" rx="2">
            <animateTransform attributeName="transform" type="rotate" values="0 760 530; -15 760 530; 0 760 530" dur="3.5s" repeatCount="indefinite" />
          </rect>
          
          {/* Petits triangles */}
          <polygon points="180,180 200,210 160,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 180 200; 40 180 200; 0 180 200" dur="4s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="380,200 395,225 365,225" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 380 217; -35 380 217; 0 380 217" dur="5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="680,200 700,230 660,230" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 680 220; 25 680 220; 0 680 220" dur="3.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="980,180 1000,210 960,210" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 980 200; -20 980 200; 0 980 200" dur="6s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="280,480 300,510 260,510" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 280 500; 30 280 500; 0 280 500" dur="4.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="580,480 600,510 560,510" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 580 500; -40 580 500; 0 580 500" dur="3.8s" repeatCount="indefinite" />
          </polygon>
          
          {/* Losanges nombreux */}
          <polygon points="220,320 235,305 250,320 235,335" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 235 320; 45 235 320; 0 235 320" dur="5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="520,320 535,305 550,320 535,335" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 535 320; -45 535 320; 0 535 320" dur="4.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="820,320 835,305 850,320 835,335" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 835 320; 30 835 320; 0 835 320" dur="3.3s" repeatCount="indefinite" />
          </polygon>
        </svg>
      </div>

      {/* NOUVEAU: Plus de particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/5 left-1/6 w-2 h-2 bg-gray-300 rounded-full animate-bounce opacity-30" style={{
        animationDelay: '0s',
        animationDuration: '3s'
      }} />
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce opacity-25" style={{
        animationDelay: '0.5s',
        animationDuration: '4s'
      }} />
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-gray-350 rounded-full animate-bounce opacity-35" style={{
        animationDelay: '1s',
        animationDuration: '2.5s'
      }} />
        <div className="absolute top-1/4 right-1/3 w-2.5 h-2.5 bg-gray-200 rounded-full animate-bounce opacity-40" style={{
        animationDelay: '1.5s',
        animationDuration: '3.5s'
      }} />
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce opacity-25" style={{
        animationDelay: '2s',
        animationDuration: '4s'
      }} />
        <div className="absolute top-3/4 right-1/6 w-1 h-1 bg-gray-250 rounded-full animate-bounce opacity-30" style={{
        animationDelay: '0.8s',
        animationDuration: '3.2s'
      }} />
        <div className="absolute top-1/2 left-1/8 w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-20" style={{
        animationDelay: '1.2s',
        animationDuration: '2.8s'
      }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce opacity-35" style={{
        animationDelay: '2.5s',
        animationDuration: '3.8s'
      }} />
        <div className="absolute top-1/6 left-3/4 w-1 h-1 bg-gray-200 rounded-full animate-bounce opacity-25" style={{
        animationDelay: '1.8s',
        animationDuration: '4.2s'
      }} />
        <div className="absolute bottom-1/5 left-1/3 w-2.5 h-2.5 bg-gray-350 rounded-full animate-bounce opacity-30" style={{
        animationDelay: '0.3s',
        animationDuration: '3.5s'
      }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Badge avec animation */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-violet-600 animate-spin" style={{
            animationDuration: '3s'
          }} />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Automatise ton activité
            </span>
            <Crown className="h-5 w-5 text-blue-500 animate-bounce" />
          </div>

          {/* Titre principal avec logo animé centré */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-900 bg-clip-text">
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
            <p className="text-xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent font-semibold mt-2">
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
          }].map((stat, index) => <div key={index} className="text-center transform hover:scale-110 transition-all duration-300 group cursor-pointer">
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
            </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;