import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom'; // Removed - not supported in artifacts
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
  Award,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';

// Styles CSS pour les animations
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
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
    }
  }
  
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
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
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }
  
  .glass-effect {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

// Injection des styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = scrollAnimationStyles;
  document.head.appendChild(styleSheet);
}

const CocoonLandingPage = () => {
  // const navigate = useNavigate(); // Removed - not supported in artifacts
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
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
      color: "text-purple-600",
      example: "Scripts, thumbnails, planning"
    },
    { 
      text: "ton agence digitale", 
      icon: <Briefcase className="h-10 w-10" />,
      color: "text-blue-600",
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
      color: "text-orange-600",
      example: "Programmes, suivi, nutrition"
    }
  ];

  // Nouvelle palette de couleurs cohérente
  const scrollingButtons = {
    row1: [
      { text: "📱 Automatise mes réseaux sociaux", color: "from-purple-100 to-purple-200 border-purple-300 text-purple-800 hover:from-purple-200 hover:to-purple-300" },
      { text: "🎯 Trouve-moi mes clients idéaux", color: "from-blue-100 to-blue-200 border-blue-300 text-blue-800 hover:from-blue-200 hover:to-blue-300" },
      { text: "📝 Rédige mes posts LinkedIn", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300" },
      { text: "🚀 Lance ma stratégie marketing", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300" },
      { text: "💻 Code-moi une landing page", color: "from-purple-100 to-purple-200 border-purple-300 text-purple-800 hover:from-purple-200 hover:to-purple-300" },
      { text: "📊 Analyse mes performances", color: "from-blue-100 to-blue-200 border-blue-300 text-blue-800 hover:from-blue-200 hover:to-blue-300" },
      { text: "🎨 Crée mes visuels de marque", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300" }
    ],
    row2: [
      { text: "🍎 Crée mon plan nutrition personnalisé", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300" },
      { text: "📚 Transforme mes idées en formation", color: "from-purple-100 to-purple-200 border-purple-300 text-purple-800 hover:from-purple-200 hover:to-purple-300" },
      { text: "💬 Gère ma communauté en ligne", color: "from-blue-100 to-blue-200 border-blue-300 text-blue-800 hover:from-blue-200 hover:to-blue-300" },
      { text: "🎤 Écris mes scripts de podcast", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300" },
      { text: "💳 Optimise mes revenus passifs", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300" },
      { text: "🔥 Boost mon taux d'engagement", color: "from-purple-100 to-purple-200 border-purple-300 text-purple-800 hover:from-purple-200 hover:to-purple-300" },
      { text: "📈 Développe ma stratégie commerciale", color: "from-blue-100 to-blue-200 border-blue-300 text-blue-800 hover:from-blue-200 hover:to-blue-300" }
    ],
    row3: [
      { text: "⚡ Automatise mes processus business", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300" },
      { text: "🎨 Design mes templates marketing", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300" },
      { text: "📊 Génère mes rapports mensuels", color: "from-purple-100 to-purple-200 border-purple-300 text-purple-800 hover:from-purple-200 hover:to-purple-300" },
      { text: "🔍 Trouve mes mots-clés SEO", color: "from-blue-100 to-blue-200 border-blue-300 text-blue-800 hover:from-blue-200 hover:to-blue-300" },
      { text: "💌 Écris mes newsletters engageantes", color: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300" },
      { text: "🎬 Crée mes storyboards de contenu", color: "from-orange-100 to-orange-200 border-orange-300 text-orange-800 hover:from-orange-200 hover:to-orange-300" }
    ]
  };

  // FAQ Data
  const faqData = [
    {
      question: "Comment l'IA peut-elle vraiment comprendre mon activité spécifique ?",
      answer: "Notre IA analyse vos documents, votre style de communication et vos méthodes de travail stockés dans votre espace Obsidian personnel. Plus vous ajoutez de contenu (PDFs, vidéos, notes), plus elle devient précise et adaptée à votre expertise unique."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Absolument. Vos données sont chiffrées et stockées dans votre propre espace Obsidian et Supabase. Nous n'accédons jamais à vos informations personnelles, et vous gardez le contrôle total sur ce que vous partagez avec l'IA."
    },
    {
      question: "Puis-je personnaliser les réponses de mon bot ?",
      answer: "Oui, entièrement ! Vous configurez le ton, le style de communication, les domaines d'intervention et les types de réponses. Votre bot reflète parfaitement votre personnalité et votre expertise professionnelle."
    },
    {
      question: "Combien de temps faut-il pour configurer mon assistant ?",
      answer: "L'onboarding prend environ 15-20 minutes. Ensuite, votre assistant s'améliore en continu au fur et à mesure que vous ajoutez des ressources et interagissez avec lui."
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait ?",
      answer: "Nous offrons une garantie de satisfaction. Si votre assistant ne répond pas à vos attentes dans les 30 premiers jours, nous travaillons avec vous pour l'améliorer ou vous remboursons intégralement."
    },
    {
      question: "Puis-je utiliser mon bot sur plusieurs plateformes ?",
      answer: "Oui ! Une fois configuré, votre assistant peut être déployé sur votre site web, vos réseaux sociaux, et intégré à vos outils existants via notre API."
    },
    {
      question: "L'assistant peut-il gérer plusieurs langues ?",
      answer: "Oui, notre IA supporte plus de 20 langues et peut s'adapter au contexte linguistique de vos clients automatiquement."
    }
  ];

  const handleAuthRedirect = () => {
    // navigate('/auth'); // Removed - not supported in artifacts
    // For demonstration purposes, we'll just show an alert
    alert('Redirection vers la page d\'authentification');
  };

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % activities.length);
    }, 3000);

    // Animation des statistiques
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedStats({
          bots: Math.floor(targetStats.bots * easeOut),
          revenue: Math.floor(targetStats.revenue * easeOut),
          hours: Math.floor(targetStats.hours * easeOut),
          experts: Math.floor(targetStats.experts * easeOut)
        });
        
        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    const timeout = setTimeout(animateStats, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Motif de fond en relief */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="geometric-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="2" fill="url(#gradient1)" opacity="0.4"/>
              <circle cx="20" cy="20" r="1.5" fill="url(#gradient2)" opacity="0.3"/>
              <circle cx="100" cy="100" r="1.5" fill="url(#gradient3)" opacity="0.3"/>
              <path d="M20,60 Q60,20 100,60 Q60,100 20,60" stroke="url(#gradient1)" strokeWidth="0.5" fill="none" opacity="0.2"/>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="#3B82F6"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981"/>
                <stop offset="100%" stopColor="#F59E0B"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B"/>
                <stop offset="100%" stopColor="#8B5CF6"/>
              </linearGradient>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern)"/>
        </svg>
      </div>

      {/* Effets de lumière animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/5 w-28 h-28 bg-emerald-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header sticky avec effet glass */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-glow">
                  <div className="w-4 h-4 bg-white transform rotate-45 rounded-sm"></div>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Cocoon AI
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105 font-medium">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105 font-medium">Tarifs</a>
              <a href="#faq" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105 font-medium">FAQ</a>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAuthRedirect} 
                className="hover:scale-105 transition-all duration-300 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              >
                Connexion
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full text-purple-700 font-medium animate-gradient">
                <Sparkles className="h-4 w-4" />
                Votre assistant IA personnalisé
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transforme{' '}
              <div className="relative inline-block">
                <span className={`transition-all duration-500 ${activities[currentActivity].color} animate-pulse`}>
                  {activities[currentActivity].text}
                </span>
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500">
                  <div className={`${activities[currentActivity].color} animate-float`}>
                    {activities[currentActivity].icon}
                  </div>
                </div>
              </div>
              <br />
              en revenus automatiques
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Créez un assistant IA qui connaît <span className="font-semibold text-purple-600">votre expertise</span>, 
              répond à vos clients 24/7 et génère des revenus pendant que vous dormez.
              <br />
              <span className="text-lg text-gray-500 mt-2 block">
                {activities[currentActivity].example}
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                onClick={handleAuthRedirect}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                Créer mon assistant IA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-4 rounded-xl font-semibold text-lg border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                <Play className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </div>

            {/* Statistiques animées */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {animatedStats.bots.toLocaleString()}+
                </div>
                <div className="text-gray-600 font-medium">Assistants créés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {animatedStats.revenue.toLocaleString()}€
                </div>
                <div className="text-gray-600 font-medium">Revenus générés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {animatedStats.hours.toLocaleString()}h
                </div>
                <div className="text-gray-600 font-medium">Temps économisé</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {animatedStats.experts.toLocaleString()}+
                </div>
                <div className="text-gray-600 font-medium">Experts satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des boutons défilants */}
      <section className="py-20 relative overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ton assistant peut tout faire
          </h2>
          <p className="text-xl text-gray-600">
            Dis-lui ce dont tu as besoin, il s'occupe du reste
          </p>
        </div>

        <div className="space-y-6">
          {/* Premier défilement */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right space-x-4">
              {[...scrollingButtons.row1, ...scrollingButtons.row1].map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Deuxième défilement */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left space-x-4">
              {[...scrollingButtons.row2, ...scrollingButtons.row2].map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Troisième défilement */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right-slow space-x-4">
              {[...scrollingButtons.row3, ...scrollingButtons.row3].map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Features avec nouvelles couleurs */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trois étapes simples pour transformer votre expertise en revenus automatiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Étape 1 - Violet/Purple */}
            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-float">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  01
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-4">Crée ton profil</h3>
                <p className="text-purple-700 leading-relaxed">
                  Renseigne tes compétences, ton domaine d'expertise et ajoute tes ressources (PDF, vidéos, textes). 
                  Notre IA analyse tout pour comprendre parfaitement ton univers et tes méthodes de travail.
                </p>
                <div className="mt-4 text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full inline-block">
                  ✨ Qualité Premium
                </div>
              </CardContent>
            </Card>

            {/* Étape 2 - Bleu */}
            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  02
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Personnalise ton bot</h3>
                <p className="text-blue-700 leading-relaxed">
                  Notre IA analyse tes données et crée un assistant parfaitement adapté à ton expertise. 
                  Configure ses réponses, son style de communication et ses domaines d'intervention selon tes préférences.
                </p>
                <div className="mt-4 text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block">
                  ✨ Qualité Premium
                </div>
              </CardContent>
            </Card>

            {/* Étape 3 - Émeraude */}
            <Card className="border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  03
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Génère des revenus</h3>
                <p className="text-emerald-700 leading-relaxed">
                  Ton bot gère tes clients 24/7, vend tes services et génère du contenu automatiquement. 
                  Il répond aux questions, propose tes solutions et convertit les visiteurs en clients payants sans que tu aies à intervenir.
                </p>
                <div className="mt-4 text-xs text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                  ✨ Qualité Premium
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section avantages avec nouvelles couleurs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Cocoon AI ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une technologie de pointe pour des résultats exceptionnels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Expertise 100% authentique - Orange */}
            <Card className="border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-float">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-4">Expertise 100% authentique</h3>
                <p className="text-orange-700 leading-relaxed mb-4">
                  Ton bot s'appuie sur tes vraies méthodes, ton contenu, ton savoir-faire. 
                  Pas d'IA générique : chaque réponse reflète ta voix, ton expérience, ta valeur.
                </p>
                <div className="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-block">
                  ✨ Qualité Premium
                </div>
              </CardContent>
            </Card>

            {/* Réponses sur-mesure - Teal */}
            <Card className="border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-teal-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-4">Réponses sur-mesure</h3>
                <p className="text-teal-700 leading-relaxed mb-4">
                  Nos algorithmes adaptent ton ton, ton style, tes mots. Chaque échange est optimisé pour 
                  reproduire ta façon unique de transmettre.
                </p>
                <div className="text-xs text-teal-600 bg-teal-100 px-3 py-1 rounded-full inline-block">
                  ✨ Qualité Premium
                </div>
              </CardContent>
            </Card>

            {/* Fiabilité garantie - Rose */}
            <Card className="border-rose-200 hover:border-rose-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-rose-50 to-rose-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-rose-800 mb-4">Fiabilité garantie</h3>
                <p className="text-rose-700 leading-relaxed mb-4">
                  Aucune info inventée. Tout est analysé, structuré et vérifié avant d'être utilisé. 
                  Tu gardes le contrôle total sur ce que ton bot délivre.
                </p>
                <div className="text-xs text-rose-600 bg-rose-100 px-3 py-1 rounded-full inline-block">
                  ✨ Qualité Premium
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section des fonctionnalités détaillées */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont tu as besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour automatiser et monétiser ton expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bot IA Personnalisé - Violet */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-4">Bot IA Personnalisé</h3>
              <p className="text-purple-700 leading-relaxed">
                Un assistant qui connaît toutes tes compétences et peut répondre à tes clients 24/7
              </p>
            </div>

            {/* Interface Sur Mesure - Bleu */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Interface Sur Mesure</h3>
              <p className="text-blue-700 leading-relaxed">
                Une plateforme selon tes besoins et ceux de tes clients
              </p>
            </div>

            {/* Monétisation Directe - Émeraude */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Monétisation Directe</h3>
              <p className="text-emerald-700 leading-relaxed">
                Vends tes services, assistants et automatisations sans rien faire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquemment posées
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur Cocoon AI
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
            <Button variant="outline" className="hover:scale-105 transition-transform">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contactez notre support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre expertise en revenus ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez les experts qui automatisent déjà leur business avec Cocoon AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleAuthRedirect}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Voir la démo
            </Button>
          </div>

          <div className="mt-8 text-white/80 text-sm">
            ✨ Essai gratuit • ⚡ Configuration en 15min • 🔒 Données sécurisées
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white transform rotate-45 rounded-sm"></div>
                </div>
                <span className="text-xl font-bold">Cocoon AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transformez votre expertise en assistant IA personnalisé qui génère des revenus 24/7.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Exemples</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cocoon AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CocoonLandingPage;