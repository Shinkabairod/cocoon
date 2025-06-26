import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  CheckCircle,
  Users,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  Clock,
  Star,
  MessageSquare,
  FileText,
  Video,
  Code,
  Dumbbell,
  Briefcase,
  Camera,
  PenTool,
  Gem,
  BarChart3,
  Timer,
  Globe,
  BookOpen,
  Settings,
  DollarSign,
  Bot,
  Brain,
  Rocket,
  Shield,
  Crown,
  Database,
  Lightbulb,
  Award
} from 'lucide-react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const activities = [
    { 
      text: "ta création de contenu", 
      icon: <Camera className="h-10 w-10" />,
      color: "text-orange-600",
      example: "Scripts, thumbnails, planning"
    },
    { 
      text: "ton agence digitale", 
      icon: <Briefcase className="h-10 w-10" />,
      color: "text-teal-600",
      example: "Stratégies, audits, consulting"
    },
    { 
      text: "ton activité de dev", 
      icon: <Code className="h-10 w-10" />,
      color: "text-emerald-600",
      example: "Solutions, API, formations"
    },
    { 
      text: "ton coaching sportif", 
      icon: <Dumbbell className="h-10 w-10" />,
      color: "text-rose-600",
      example: "Programmes, nutrition, suivi"
    },
    { 
      text: "ton temps d'expert", 
      icon: <Clock className="h-10 w-10" />,
      color: "text-amber-600",
      example: "Consultations, masterclass, audit"
    },
    { 
      text: "tes connaissances", 
      icon: <BookOpen className="h-10 w-10" />,
      color: "text-cyan-600",
      example: "Cours, workshops, certifications"
    }
  ];

  const features = [
    {
      title: "Bot IA Personnalisé",
      description: "Un assistant qui connaît toutes tes compétences et peut répondre à tes clients 24/7",
      icon: <Bot className="h-7 w-7" />,
      gradient: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Interface Sur Mesure", 
      description: "Une plateforme selon tes besoins et ceux de tes clients",
      icon: <Target className="h-7 w-7" />,
      gradient: "from-teal-50 to-teal-100",
      iconColor: "text-teal-600"
    },
    {
      title: "Monétisation Directe",
      description: "Vends tes services, assistants et automatisations sans rien faire",
      icon: <TrendingUp className="h-7 w-7" />,
      gradient: "from-rose-50 to-rose-100",
      iconColor: "text-rose-600"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      activity: "Coach Business",
      content: "En 3 mois, mon bot IA a géré 847 consultations automatiquement. Je gagne maintenant 5 200€/mois en travaillant 2 fois moins !",
      avatar: "👩‍💼",
      gradient: "from-orange-100 to-rose-100",
      revenue: "+5 200€/mois"
    },
    {
      name: "Thomas D.", 
      activity: "Développeur Freelance",
      content: "Mon assistant IA répond aux clients, génère les devis et conseille sur les technologies. J'ai multiplié mes revenus par 3 sans augmenter mes heures.",
      avatar: "👨‍💻",
      gradient: "from-teal-100 to-cyan-100",
      revenue: "×3 revenus"
    },
    {
      name: "Sarah K.",
      activity: "Créatrice de contenu", 
      content: "Mon bot génère mes idées de contenu, planifie ma stratégie et répond à ma communauté. 15h/semaine économisées, 3 000€ de revenus en plus !",
      avatar: "🎥",
      gradient: "from-rose-100 to-orange-100",
      revenue: "+3 000€/mois"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Gratuit",
      period: "",
      features: [
        "1 bot IA personnalisé",
        "100 interactions/mois",
        "Interface de base",
        "Support communautaire"
      ],
      cta: "Commencer gratuitement",
      popular: false
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mois",
      features: [
        "3 bots IA personnalisés",
        "1000 interactions/mois",
        "Interface personnalisée",
        "Analytics avancées",
        "Support prioritaire"
      ],
      cta: "Démarrer l'essai gratuit",
      popular: true
    },
    {
      name: "Expert",
      price: "99€",
      period: "/mois",
      features: [
        "Bots illimités",
        "Interactions illimitées",
        "White-label complet",
        "API accès",
        "Support dédié"
      ],
      cta: "Contacter l'équipe",
      popular: false
    }
  ];

  // Nouvelles idées plus réalistes pour les boutons défilants
  const scrollingButtons = {
    row1: [
      { text: "🎥 Génère-moi un script viral TikTok", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300 hover:border-orange-400" },
      { text: "📧 Réponds à mes emails clients", color: "from-teal-100 to-teal-200 border-teal-300 text-teal-800 hover:from-teal-200 hover:to-teal-300 hover:border-teal-400" },
      { text: "💡 Crée-moi 20 idées de contenu", color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800 hover:from-rose-200 hover:to-rose-300 hover:border-rose-400" },
      { text: "🏋️ Développe mon programme sportif", color: "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300 hover:border-cyan-400" },
      { text: "💰 Écris ma page de vente qui convertit", color: "from-amber-100 to-amber-200 border-amber-300 text-amber-800 hover:from-amber-200 hover:to-amber-300 hover:border-amber-400" },
      { text: "📱 Automatise mes réseaux sociaux", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400" },
      { text: "🎯 Trouve-moi mes clients idéaux", color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800 hover:from-pink-200 hover:to-pink-300 hover:border-pink-400" },
      { text: "📝 Rédige mes posts LinkedIn", color: "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-400" },
      { text: "🚀 Lance ma stratégie marketing", color: "from-lime-100 to-lime-200 border-lime-300 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:border-lime-400" },
      { text: "💻 Code-moi une landing page", color: "from-violet-100 to-violet-200 border-violet-300 text-violet-800 hover:from-violet-200 hover:to-violet-300 hover:border-violet-400" },
      { text: "📊 Analyse mes performances", color: "from-sky-100 to-sky-200 border-sky-300 text-sky-800 hover:from-sky-200 hover:to-sky-300 hover:border-sky-400" },
      { text: "🎨 Crée mes visuels de marque", color: "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-800 hover:from-fuchsia-200 hover:to-fuchsia-300 hover:border-fuchsia-400" }
    ],
    row2: [
      { text: "🍎 Crée mon plan nutrition personnalisé", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400" },
      { text: "📚 Transforme mes idées en formation", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300 hover:border-orange-400" },
      { text: "💬 Gère ma communauté en ligne", color: "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300 hover:border-cyan-400" },
      { text: "🎤 Écris mes scripts de podcast", color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800 hover:from-rose-200 hover:to-rose-300 hover:border-rose-400" },
      { text: "💳 Optimise mes revenus passifs", color: "from-teal-100 to-teal-200 border-teal-300 text-teal-800 hover:from-teal-200 hover:to-teal-300 hover:border-teal-400" },
      { text: "🔥 Boost mon taux d'engagement", color: "from-amber-100 to-amber-200 border-amber-300 text-amber-800 hover:from-amber-200 hover:to-amber-300 hover:border-amber-400" },
      { text: "📈 Développe ma stratégie commerciale", color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800 hover:from-pink-200 hover:to-pink-300 hover:border-pink-400" },
      { text: "✨ Personnalise mes workflows", color: "from-lime-100 to-lime-200 border-lime-300 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:border-lime-400" },
      { text: "🎯 Segmente ma base clients", color: "from-violet-100 to-violet-200 border-violet-300 text-violet-800 hover:from-violet-200 hover:to-violet-300 hover:border-violet-400" },
      { text: "💎 Crée mes funnels de vente", color: "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-400" },
      { text: "🌟 Booste ma présence en ligne", color: "from-sky-100 to-sky-200 border-sky-300 text-sky-800 hover:from-sky-200 hover:to-sky-300 hover:border-sky-400" },
      { text: "📞 Gère mes rendez-vous clients", color: "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-800 hover:from-fuchsia-200 hover:to-fuchsia-300 hover:border-fuchsia-400" }
    ],
    row3: [
      { text: "⚡ Automatise mes processus business", color: "from-violet-100 to-violet-200 border-violet-300 text-violet-800 hover:from-violet-200 hover:to-violet-300 hover:border-violet-400" },
      { text: "🎨 Design mes templates marketing", color: "from-teal-100 to-teal-200 border-teal-300 text-teal-800 hover:from-teal-200 hover:to-teal-300 hover:border-teal-400" },
      { text: "📊 Génère mes rapports mensuels", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300 hover:border-orange-400" },
      { text: "🔍 Trouve mes mots-clés SEO", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400" },
      { text: "💌 Écris mes newsletters engageantes", color: "from-rose-100 to-rose-200 border-rose-300 text-rose-800 hover:from-rose-200 hover:to-rose-300 hover:border-rose-400" },
      { text: "🎬 Crée mes storyboards de contenu", color: "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300 hover:border-cyan-400" },
      { text: "📋 Planifie mon calendrier éditorial", color: "from-amber-100 to-amber-200 border-amber-300 text-amber-800 hover:from-amber-200 hover:to-amber-300 hover:border-amber-400" },
      { text: "🏆 Développe ma stratégie de contenu", color: "from-pink-100 to-pink-200 border-pink-300 text-pink-800 hover:from-pink-200 hover:to-pink-300 hover:border-pink-400" },
      { text: "💡 Innove mes produits digitaux", color: "from-lime-100 to-lime-200 border-lime-300 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:border-lime-400" },
      { text: "🎯 Cible mes publicités Facebook", color: "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-400" },
      { text: "📱 Optimise mon personal branding", color: "from-sky-100 to-sky-200 border-sky-300 text-sky-800 hover:from-sky-200 hover:to-sky-300 hover:border-sky-400" },
      { text: "💻 Crée mes outils personnalisés", color: "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-800 hover:from-fuchsia-200 hover:to-fuchsia-300 hover:border-fuchsia-400" }
    ]
  };

  const handleAuthRedirect = () => {
    navigate('/auth');
  };

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
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

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Background pattern subtil */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-teal-50/10 to-rose-50/20 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-200/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-rose-200/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header sticky avec effet glass */}
      <header className="border-b border-gray-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50">
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
              <Sparkles className="h-6 w-6 text-orange-600 animate-spin" style={{ animationDuration: '3s' }} />
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
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-semibold group shadow-2xl hover:shadow-black/25 transition-all duration-300"
                onClick={handleAuthRedirect}
              >
                <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                Créer mon bot gratuitement
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-6 text-xl border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-300"
                onClick={handleAuthRedirect}
              >
                <Play className="h-6 w-6 mr-3" />
                Voir la démo
              </Button>
            </div>

            {/* Stats avec animations avancées */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { value: animatedStats.bots, suffix: '+', label: 'Bots créés', color: 'text-orange-600', icon: <Bot className="h-6 w-6" /> },
                { value: animatedStats.revenue, suffix: '€', label: 'Revenus générés', color: 'text-emerald-600', icon: <DollarSign className="h-6 w-6" /> },
                { value: animatedStats.hours, suffix: 'h', label: 'Temps économisé', color: 'text-teal-600', icon: <Clock className="h-6 w-6" /> },
                { value: animatedStats.experts, suffix: '+', label: 'Experts actifs', color: 'text-rose-600', icon: <Users className="h-6 w-6" /> }
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
              {scrollingButtons.row1.map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}
                >
                  {item.text