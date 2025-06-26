import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Sparkles, Target, Zap, Clock, Star, MessageSquare, FileText, Video, Code, Dumbbell, Briefcase, Camera, PenTool, Gem, BarChart3, Timer, Globe, BookOpen, Settings, DollarSign, Bot, Brain, Rocket, Shield, Crown, Database, Lightbulb, Award } from 'lucide-react';

// Styles CSS pour les animations de défilement
const scrollAnimationStyles = `
  @keyframes scroll-right {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  
  @keyframes scroll-left {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  
  .animate-scroll-right {
    animation: scroll-right 30s linear infinite;
  }
  
  .animate-scroll-left {
    animation: scroll-left 25s linear infinite;
  }
  
  .animate-scroll-right-slow {
    animation: scroll-right 35s linear infinite;
  }
`;

// Injection des styles dans le document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = scrollAnimationStyles;
  document.head.appendChild(styleSheet);
}
const CocoonLandingPage = () => {
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [animatedStats, setAnimatedStats] = useState({
    bots: 0,
    revenue: 0,
    hours: 0,
    experts: 0
  });
  const targetStats = {
    bots: 1847,
    revenue: 127000,
    hours: 15600,
    experts: 892
  };
  const activities = [{
    text: "ta création de contenu",
    icon: <Camera className="h-10 w-10" />,
    color: "text-fuchsia-600",
    // vibrant & créatif
    example: "Scripts, thumbnails, planning"
  }, {
    text: "ton agence digitale",
    icon: <Briefcase className="h-10 w-10" />,
    color: "text-indigo-600",
    // sérieux & stratégique
    example: "Stratégies, audits, consulting"
  }, {
    text: "ton activité de dev",
    icon: <Code className="h-10 w-10" />,
    color: "text-blue-600",
    // tech & stabilité
    example: "Solutions, API, formations"
  }, {
    text: "ton coaching sportif",
    icon: <Dumbbell className="h-10 w-10" />,
    color: "text-red-500",
    // énergie & dynamisme
    example: "Programmes, nutrition, suivi"
  }, {
    text: "ton temps d'expert",
    icon: <Clock className="h-10 w-10" />,
    color: "text-yellow-500",
    // précieux & visible
    example: "Consultations, masterclass, audit"
  }, {
    text: "tes connaissances",
    icon: <BookOpen className="h-10 w-10" />,
    color: "text-emerald-600",
    // sagesse & transmission
    example: "Cours, workshops, certifications"
  }];
  const features = [{
    title: "Bot IA Personnalisé",
    description: "Un assistant qui connaît toutes tes compétences et peut répondre à tes clients 24/7",
    icon: <Bot className="h-7 w-7" />,
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600"
  }, {
    title: "Interface Sur Mesure",
    description: "Une plateforme selon tes besoins et ceux de tes clients",
    icon: <Target className="h-7 w-7" />,
    gradient: "from-teal-50 to-teal-100",
    iconColor: "text-teal-600"
  }, {
    title: "Monétisation Directe",
    description: "Vends tes services, assistants et automatisations sans rien faire",
    icon: <TrendingUp className="h-7 w-7" />,
    gradient: "from-rose-50 to-rose-100",
    iconColor: "text-rose-600"
  }];
  const testimonials = [{
    name: "Marie L.",
    activity: "Coach Business",
    content: "En 3 mois, mon bot IA a géré 847 consultations automatiquement. Je gagne maintenant 5 200€/mois en travaillant 2 fois moins !",
    avatar: "👩‍💼",
    gradient: "from-orange-100 to-rose-100",
    revenue: "+5 200€/mois"
  }, {
    name: "Thomas D.",
    activity: "Développeur Freelance",
    content: "Mon assistant IA répond aux clients, génère les devis et conseille sur les technologies. J'ai multiplié mes revenus par 3 sans augmenter mes heures.",
    avatar: "👨‍💻",
    gradient: "from-teal-100 to-cyan-100",
    revenue: "×3 revenus"
  }, {
    name: "Sarah K.",
    activity: "Créatrice de contenu",
    content: "Mon bot génère mes idées de contenu, planifie ma stratégie et répond à ma communauté. 15h/semaine économisées, 3 000€ de revenus en plus !",
    avatar: "🎥",
    gradient: "from-rose-100 to-orange-100",
    revenue: "+3 000€/mois"
  }];
  const pricingPlans = [{
    name: "Starter",
    price: "Gratuit",
    period: "",
    features: ["1 bot IA personnalisé", "100 interactions/mois", "Interface de base", "Support communautaire"],
    cta: "Commencer gratuitement",
    popular: false
  }, {
    name: "Pro",
    price: "29€",
    period: "/mois",
    features: ["3 bots IA personnalisés", "1000 interactions/mois", "Interface personnalisée", "Analytics avancées", "Support prioritaire"],
    cta: "Démarrer l'essai gratuit",
    popular: true
  }, {
    name: "Expert",
    price: "99€",
    period: "/mois",
    features: ["Bots illimités", "Interactions illimitées", "White-label complet", "API accès", "Support dédié"],
    cta: "Contacter l'équipe",
    popular: false
  }];

  // Nouvelles idées plus réalistes pour les boutons défilants
  const scrollingButtons = {
    row1: [{
      text: "🎥 Génère-moi un script viral TikTok",
      color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300 hover:border-orange-400"
    }, {
      text: "📧 Réponds à mes emails clients",
      color: "from-teal-100 to-teal-200 border-teal-300 text-teal-800 hover:from-teal-200 hover:to-teal-300 hover:border-teal-400"
    }, {
      text: "💡 Crée-moi 20 idées de contenu",
      color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800 hover:from-rose-200 hover:to-rose-300 hover:border-rose-400"
    }, {
      text: "🏋️ Développe mon programme sportif",
      color: "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300 hover:border-cyan-400"
    }, {
      text: "💰 Écris ma page de vente qui convertit",
      color: "from-amber-100 to-amber-200 border-amber-300 text-amber-800 hover:from-amber-200 hover:to-amber-300 hover:border-amber-400"
    }, {
      text: "📱 Automatise mes réseaux sociaux",
      color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400"
    }, {
      text: "🎯 Trouve-moi mes clients idéaux",
      color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800 hover:from-pink-200 hover:to-pink-300 hover:border-pink-400"
    }, {
      text: "📝 Rédige mes posts LinkedIn",
      color: "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-400"
    }, {
      text: "🚀 Lance ma stratégie marketing",
      color: "from-lime-100 to-lime-200 border-lime-300 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:border-lime-400"
    }, {
      text: "💻 Code-moi une landing page",
      color: "from-violet-100 to-violet-200 border-violet-300 text-violet-800 hover:from-violet-200 hover:to-violet-300 hover:border-violet-400"
    }, {
      text: "📊 Analyse mes performances",
      color: "from-sky-100 to-sky-200 border-sky-300 text-sky-800 hover:from-sky-200 hover:to-sky-300 hover:border-sky-400"
    }, {
      text: "🎨 Crée mes visuels de marque",
      color: "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-800 hover:from-fuchsia-200 hover:to-fuchsia-300 hover:border-fuchsia-400"
    }],
    row2: [{
      text: "🍎 Crée mon plan nutrition personnalisé",
      color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400"
    }, {
      text: "📚 Transforme mes idées en formation",
      color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300 hover:border-orange-400"
    }, {
      text: "💬 Gère ma communauté en ligne",
      color: "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300 hover:border-cyan-400"
    }, {
      text: "🎤 Écris mes scripts de podcast",
      color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800 hover:from-rose-200 hover:to-rose-300 hover:border-rose-400"
    }, {
      text: "💳 Optimise mes revenus passifs",
      color: "from-teal-100 to-teal-200 border-teal-300 text-teal-800 hover:from-teal-200 hover:to-teal-300 hover:border-teal-400"
    }, {
      text: "🔥 Boost mon taux d'engagement",
      color: "from-amber-100 to-amber-200 border-amber-300 text-amber-800 hover:from-amber-200 hover:to-amber-300 hover:border-amber-400"
    }, {
      text: "📈 Développe ma stratégie commerciale",
      color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800 hover:from-pink-200 hover:to-pink-300 hover:border-pink-400"
    }, {
      text: "✨ Personnalise mes workflows",
      color: "from-lime-100 to-lime-200 border-lime-300 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:border-lime-400"
    }, {
      text: "🎯 Segmente ma base clients",
      color: "from-violet-100 to-violet-200 border-violet-300 text-violet-800 hover:from-violet-200 hover:to-violet-300 hover:border-violet-400"
    }, {
      text: "💎 Crée mes funnels de vente",
      color: "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-400"
    }, {
      text: "🌟 Booste ma présence en ligne",
      color: "from-sky-100 to-sky-200 border-sky-300 text-sky-800 hover:from-sky-200 hover:to-sky-300 hover:border-sky-400"
    }, {
      text: "📞 Gère mes rendez-vous clients",
      color: "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-800 hover:from-fuchsia-200 hover:to-fuchsia-300 hover:border-fuchsia-400"
    }],
    row3: [{
      text: "⚡ Automatise mes processus business",
      color: "from-violet-100 to-violet-200 border-violet-300 text-violet-800 hover:from-violet-200 hover:to-violet-300 hover:border-violet-400"
    }, {
      text: "🎨 Design mes templates marketing",
      color: "from-teal-100 to-teal-200 border-teal-300 text-teal-800 hover:from-teal-200 hover:to-teal-300 hover:border-teal-400"
    }, {
      text: "📊 Génère mes rapports mensuels",
      color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300 hover:border-orange-400"
    }, {
      text: "🔍 Trouve mes mots-clés SEO",
      color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400"
    }, {
      text: "💌 Écris mes newsletters engageantes",
      color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800 hover:from-rose-200 hover:to-rose-300 hover:border-rose-400"
    }, {
      text: "🎬 Crée mes storyboards de contenu",
      color: "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300 hover:border-cyan-400"
    }, {
      text: "📋 Planifie mon calendrier éditorial",
      color: "from-amber-100 to-amber-200 border-amber-300 text-amber-800 hover:from-amber-200 hover:to-amber-300 hover:border-amber-400"
    }, {
      text: "🏆 Développe ma stratégie de contenu",
      color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800 hover:from-pink-200 hover:to-pink-300 hover:border-pink-400"
    }, {
      text: "💡 Innove mes produits digitaux",
      color: "from-lime-100 to-lime-200 border-lime-300 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:border-lime-400"
    }, {
      text: "🎯 Cible mes publicités Facebook",
      color: "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-400"
    }, {
      text: "📱 Optimise mon personal branding",
      color: "from-sky-100 to-sky-200 border-sky-300 text-sky-800 hover:from-sky-200 hover:to-sky-300 hover:border-sky-400"
    }, {
      text: "💻 Crée mes outils personnalisés",
      color: "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-800 hover:from-fuchsia-200 hover:to-fuchsia-300 hover:border-fuchsia-400"
    }]
  };
  const handleAuthRedirect = () => {
    navigate('/auth');
  };
  const handleMouseMove = e => {
    setMousePosition({
      x: e.clientX / window.innerWidth * 100,
      y: e.clientY / window.innerHeight * 100
    });
  };
  useEffect(() => {
    setIsVisible(true);
    window.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % activities.length);
    }, 3000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const animateStats = () => {
          Object.keys(targetStats).forEach(key => {
            const target = targetStats[key];
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const statTimer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(statTimer);
              }
              setAnimatedStats(prev => ({
                ...prev,
                [key]: Math.floor(current)
              }));
            }, duration / steps);
          });
        };
        animateStats();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  return <div className="min-h-screen bg-white relative">
      {/* Background pattern subtil */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-teal-50/10 to-rose-50/20 transition-all duration-1000" style={{
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
      }} />
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-200/10 rounded-full blur-xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-rose-200/10 rounded-full blur-xl animate-pulse" style={{
        animationDelay: '2s'
      }} />
      </div>

      {/* Header sticky avec effet glass */}
      <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 bg-white transform rotate-45 rounded-sm"></div>
                </div>
                <div className="absolute inset-0 bg-black rounded-lg blur opacity-30 animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-black">
                Cocoon AI
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">Tarifs</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">Témoignages</a>
              <Button variant="outline" size="sm" onClick={handleAuthRedirect} className="hover:scale-105 transition-transform">
                Connexion
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative">
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
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-semibold group shadow-2xl hover:shadow-black/25 transition-all duration-300" onClick={handleAuthRedirect}>
                <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                Créer mon bot gratuitement
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-10 py-6 text-xl border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-300" onClick={handleAuthRedirect}>
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
      </section>

      {/* Section de boutons défilants avec nouvelles idées réalistes */}
      <section className="py-16 bg-white overflow-hidden relative">        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Que veux-tu automatiser aujourd'hui ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dis-le à ton IA et regarde la magie opérer
            </p>
          </div>

          {/* Premier défilement - gauche vers droite */}
          <div className="relative overflow-hidden mb-3">
            <div className="flex animate-scroll-right space-x-4">
              {scrollingButtons.row1.map((item, index) => <div key={index} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                  {item.text}
                </div>)}
              {/* Duplication pour effet continu */}
              {scrollingButtons.row1.slice(0, 6).map((item, index) => <div key={`dup-${index}`} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                  {item.text}
                </div>)}
            </div>
          </div>

          {/* Deuxième défilement - droite vers gauche */}
          <div className="relative overflow-hidden mb-3">
            <div className="flex animate-scroll-left space-x-4">
              {scrollingButtons.row2.map((item, index) => <div key={index} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                  {item.text}
                </div>)}
              {/* Duplication pour effet continu */}
              {scrollingButtons.row2.slice(0, 6).map((item, index) => <div key={`dup2-${index}`} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                  {item.text}
                </div>)}
            </div>
          </div>

          {/* Troisième défilement - gauche vers droite (plus lent) */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right-slow space-x-4">
              {scrollingButtons.row3.map((item, index) => <div key={index} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                  {item.text}
                </div>)}
              {/* Duplication pour effet continu */}
              {scrollingButtons.row3.slice(0, 6).map((item, index) => <div key={`dup3-${index}`} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                  {item.text}
                </div>)}
            </div>
          </div>

          {/* CTA au centre */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-2xl transition-all group" onClick={handleAuthRedirect}>
              <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
              Commencer maintenant
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-gray-600 text-sm mt-3">
              Gratuit • Configuration en 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Nouvelle section : Pourquoi nous sommes différents */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-orange-700 bg-clip-text text-transparent mb-6">
              Pourquoi nos bots surpassent tous les autres ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La différence entre un chatbot générique et un expert digital personnalisé
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[{
            title: "Expertise 100% authentique",
            description: "Ton bot s’appuie sur tes vraies méthodes, ton contenu, ton savoir-faire. Pas d’IA générique : chaque réponse reflète ta voix, ton expérience, ta valeur.",
            icon: <Database className="w-8 h-8 text-red-600" />,
            bgColor: "bg-orange-50/50",
            borderColor: "border-orange-200",
            textColor: "text-orange-700",
            iconBg: "bg-orange-100/70"
          }, {
            title: "Réponses sur-mesure",
            description: "Nos algorithmes adaptent ton ton, ton style, tes mots. Chaque échange est optimisé pour reproduire ta façon unique de transmettre.",
            icon: <Code className="w-8 h-8 text-red-600" />,
            bgColor: "bg-teal-50/50",
            borderColor: "border-teal-200",
            textColor: "text-teal-700",
            iconBg: "bg-teal-100/70"
          }, {
            title: "Fiabilité garantie",
            description: "Aucune info inventée. Tout est analysé, structuré et vérifié avant d’être utilisé. Tu gardes le contrôle total sur ce que ton bot délivre.",
            icon: <Award className="w-8 h-8 text-red-600" />,
            bgColor: "bg-rose-50/50",
            borderColor: "border-rose-200",
            textColor: "text-rose-700",
            iconBg: "bg-rose-100/70"
          }].map((feature, index) => <div key={index} className="relative bg-white border-2 border-red-300 rounded-3xl p-8 hover:border-red-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Icône principale */}
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Badge de qualité */}
                <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-red-100 text-red-700 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Qualité Premium
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Section d'avis - Style photo */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Ils ont transformé leur expertise
            </h2>
            <p className="text-xl text-gray-600">
              Découvre comment nos utilisateurs automatisent et monétisent leurs compétences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Header avec avatar et info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.activity}</div>
                  </div>
                </div>
                
                {/* Étoiles */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                </div>
                
                {/* Citation */}
                <p className="text-gray-700 text-base leading-relaxed mb-4 italic">
                  "{testimonial.content}"
                </p>
                
                {/* Badge revenus */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  {testimonial.revenue}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      // Section "Pourquoi choisir Cocoon AI" améliorée
    <section id="features" className="py-24 bg-white relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        Pourquoi choisir Cocoon AI ?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Une technologie de pointe pour des résultats exceptionnels
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12">
      {/* Carte 1 - Expertise authentique */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
        <div className="relative bg-white border-2 border-gray-300 rounded-3xl p-8 hover:border-gray-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          {/* Emoji animé */}
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-all duration-300 group-hover:scale-110 group-hover:">
            <span className="text-2xl animate-pulse">🗃️</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Expertise 100% authentique
          </h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Ton bot s'appuie sur tes vraies méthodes, ton contenu, ton savoir-faire. 
            Pas d'IA générique : chaque réponse reflète ta voix, ton expérience, ta valeur.
          </p>
          
          {/* Badge noir */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-semibold">
            ✨ Qualité Premium
          </div>
        </div>
      </div>

      {/* Carte 2 - Réponses sur-mesure */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
        <div className="relative bg-white border-2 border-gray-400 rounded-3xl p-8 hover:border-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          {/* Emoji animé */}
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
            <span className="text-2xl animate-bounce">⚙️</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Réponses sur-mesure
          </h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Nos algorithmes adaptent ton ton, ton style, tes mots. Chaque échange est optimisé pour 
            reproduire ta façon unique de transmettre.
          </p>
          
          {/* Badge noir */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-semibold">
            ✨ Qualité Premium
          </div>
        </div>
      </div>

      {/* Carte 3 - Fiabilité garantie */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
        <div className="relative bg-white border-2 border-gray-500 rounded-3xl p-8 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          {/* Emoji animé */}
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <span className="text-2xl animate-pulse">🏆</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Fiabilité garantie
          </h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Aucune info inventée. Tout est analysé, structuré et vérifié avant d'être utilisé. 
            Tu gardes le contrôle total sur ce que ton bot délivre.
          </p>
          
          {/* Badge noir */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-semibold">
            ✨ Qualité Premium
          </div>
        </div>
      </div>
    </div>
  </div>
    </section>

    {/* Section "Comment ça marche" améliorée */}
    <section className="py-24 bg-gradient-to-br from-gray-50 to-neutral-50 relative">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        Comment ça marche ?
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Trois étapes simples pour transformer votre expertise en revenus automatiques
      </p>
    </div>

    <div className="space-y-8">
      {/* Étape 1 */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
        <div className="relative bg-white border-2 border-blue-300 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-6">
            {/* Numéro plus gros */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">1.</span>
              </div>
            </div>
            
            <div className="flex-1">
              {/* Icon 2D simple */}
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Crée ton profil
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Renseigne tes compétences, ton domaine d'expertise et ajoute tes ressources (PDF, vidéos, textes). 
                Notre IA analyse tout pour comprendre parfaitement ton univers et tes méthodes de travail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Étape 2 */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
        <div className="relative bg-white border-2 border-purple-300 rounded-3xl p-8 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-6">
            {/* Numéro plus gros */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">2.</span>
              </div>
            </div>
            
            <div className="flex-1">
              {/* Icon 2D simple */}
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Personnalise ton bot
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Notre IA analyse tes données et crée un assistant parfaitement adapté à ton expertise. 
                Configure ses réponses, son style de communication et ses domaines d'intervention selon tes préférences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Étape 3 */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
        <div className="relative bg-white border-2 border-orange-300 rounded-3xl p-8 hover:border-orange-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-6">
            {/* Numéro plus gros */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">3.</span>
              </div>
            </div>
            
            <div className="flex-1">
              {/* Icon 2D simple */}
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Génère des revenus
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Ton bot gère tes clients 24/7, vend tes services et génère du contenu automatiquement. 
                Il répond aux questions, propose tes solutions et convertit les visiteurs en clients payants sans que tu aies à intervenir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-6">
              Choisis ton plan
            </h2>
            <p className="text-xl text-gray-600">
              Commencer gratuitement, évoluer selon tes besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {pricingPlans.map((plan, index) => <Card key={index} className={`transition-all duration-500 hover:scale-105 ${plan.popular ? 'border-black shadow-2xl shadow-black/25' : 'border-gray-200 hover:shadow-xl'} relative bg-white/90 backdrop-blur-sm`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      Plus populaire
                    </span>
                  </div>}
                <CardContent className="p-10">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-8">
                      <span className="text-5xl font-bold text-black">{plan.price}</span>
                      <span className="text-gray-600 text-xl">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-10 text-left">
                      {plan.features.map((feature, j) => <li key={j} className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-lg">{feature}</span>
                        </li>)}
                    </ul>
                    
                    <Button className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${plan.popular ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-black/25' : 'border-2 border-gray-300 hover:border-black hover:bg-gray-50'}`} variant={plan.popular ? "default" : "outline"} onClick={handleAuthRedirect}>
                      {plan.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer ton expertise en revenus automatisés ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Rejoins des milliers d'experts qui ont déjà créé leur bot IA. 
            Configuration en 2 minutes, résultats dès le premier jour.
          </p>
          
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold group" onClick={handleAuthRedirect}>
            <Rocket className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            Créer mon bot maintenant
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="mt-6 text-gray-400 text-sm">
            Garantie satisfait ou remboursé 30 jours
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white transform rotate-45 rounded-sm"></div>
                  </div>
                </div>
                <span className="text-xl font-bold text-black">
                  Cocoon AI
                </span>
              </div>
              <p className="text-gray-600">
                La plateforme qui transforme ton expertise en revenus automatisés.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Exemples</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Cocoon AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default CocoonLandingPage;