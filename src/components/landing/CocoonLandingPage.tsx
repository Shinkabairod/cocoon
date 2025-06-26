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
  Crown
} from 'lucide-react';

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
      color: "text-green-600",
      example: "Solutions, API, formations"
    },
    { 
      text: "ton coaching sportif", 
      icon: <Dumbbell className="h-10 w-10" />,
      color: "text-red-600",
      example: "Programmes, nutrition, suivi"
    },
    { 
      text: "ton temps d'expert", 
      icon: <Clock className="h-10 w-10" />,
      color: "text-orange-600",
      example: "Consultations, masterclass, audit"
    },
    { 
      text: "tes connaissances", 
      icon: <BookOpen className="h-10 w-10" />,
      color: "text-indigo-600",
      example: "Cours, workshops, certifications"
    }
  ];

  const whyChooseFeatures = [
    {
      title: "Intelligence Artificielle Avancée",
      description: "Notre IA apprend de tes ressources et connaissances pour devenir ton assistant personnel parfait",
      icon: <Brain className="h-8 w-8" />,
      gradient: "from-purple-500 to-purple-700",
      bgGradient: "from-purple-50 to-purple-100",
      stats: "98% de précision"
    },
    {
      title: "Automatisation Complète", 
      description: "Traite tes clients 24/7, génère du contenu et vend tes services sans ton intervention",
      icon: <Zap className="h-8 w-8" />,
      gradient: "from-blue-500 to-blue-700",
      bgGradient: "from-blue-50 to-blue-100",
      stats: "24h/24 disponible"
    },
    {
      title: "Revenus Automatisés",
      description: "Monétise ton expertise pendant que tu dors. Nos utilisateurs génèrent en moyenne 2 847€/mois",
      icon: <TrendingUp className="h-8 w-8" />,
      gradient: "from-emerald-500 to-emerald-700",
      bgGradient: "from-emerald-50 to-emerald-100",
      stats: "+2 847€/mois"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      activity: "Coach Business",
      content: "En 3 mois, mon bot IA a géré 847 consultations automatiquement. Je gagne maintenant 5 200€/mois en travaillant 2 fois moins !",
      avatar: "👩‍💼",
      gradient: "from-purple-100 to-pink-100",
      revenue: "+5 200€/mois"
    },
    {
      name: "Thomas D.", 
      activity: "Développeur Freelance",
      content: "Mon assistant IA répond aux clients, génère les devis et même du code. J'ai multiplié mes revenus par 3 sans augmenter mes heures.",
      avatar: "👨‍💻",
      gradient: "from-blue-100 to-indigo-100",
      revenue: "×3 revenus"
    },
    {
      name: "Sarah K.",
      activity: "Créatrice de contenu", 
      content: "Mon bot génère mes scripts, planifie mes contenus et répond à ma communauté. 15h/semaine économisées, 3 000€ de revenus en plus !",
      avatar: "🎥",
      gradient: "from-pink-100 to-purple-100",
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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
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
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-2xl text-gray-600">Automatise</span>
              <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-xl min-w-[280px] flex items-center justify-center">
                <div className={`${activities[currentActivity].color} transition-all duration-500 flex items-center gap-3`}>
                  <div className="transform transition-transform duration-500 hover:scale-110">
                    {activities[currentActivity].icon}
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    {activities[currentActivity].text}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Ton expertise devient
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                automatique
              </span>
            </h1>

            <div className="max-w-4xl mx-auto mb-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                Crée ton bot IA personnalisé qui connaît toutes tes compétences.
              </p>
              <p className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold mt-2">
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
                { value: animatedStats.bots, suffix: '+', label: 'Bots créés', color: 'text-purple-600', icon: <Bot className="h-6 w-6" /> },
                { value: animatedStats.revenue, suffix: '€', label: 'Revenus générés', color: 'text-green-600', icon: <DollarSign className="h-6 w-6" /> },
                { value: animatedStats.hours, suffix: 'h', label: 'Temps économisé', color: 'text-blue-600', icon: <Clock className="h-6 w-6" /> },
                { value: animatedStats.experts, suffix: '+', label: 'Experts actifs', color: 'text-orange-600', icon: <Users className="h-6 w-6" /> }
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
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Cocoon AI - Section refaite */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/30 relative">
        <div className="absolute inset-0 opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Pourquoi choisir Cocoon AI ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La technologie qui révolutionne la façon dont les experts monétisent leur savoir
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {whyChooseFeatures.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl transform group-hover:scale-105 transition-transform duration-500 opacity-50`} />
                
                <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    {/* Icon avec gradient */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    {/* Stats badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-semibold mb-4">
                      <Sparkles className="h-4 w-4 mr-1" />
                      {feature.stats}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Hover effect */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA intégré */}
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
              onClick={handleAuthRedirect}
            >
              <Crown className="h-6 w-6 mr-3 group-hover:animate-bounce" />
              Découvrir toutes les fonctionnalités
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/30 relative">
        <div className="absolute inset-0 opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              3 étapes simples pour transformer ton expertise en revenus automatisés
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Crée ton profil",
                description: "Renseigne tes compétences, ton domaine d'expertise et ajoute tes ressources (PDF, vidéos, textes)",
                icon: <Settings className="h-8 w-8" />,
                color: "from-purple-500 to-purple-700"
              },
              {
                step: "02", 
                title: "Personnalise ton bot",
                description: "Notre IA analyse tes données et crée un assistant parfaitement adapté à ton expertise",
                icon: <Bot className="h-8 w-8" />,
                color: "from-blue-500 to-blue-700"
              },
              {
                step: "03",
                title: "Génère des revenus", 
                description: "Ton bot gère tes clients, vend tes services et génère du contenu automatiquement",
                icon: <DollarSign className="h-8 w-8" />,
                color: "from-green-500 to-green-700"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Ils ont transformé leur expertise
            </h2>
            <p className="text-xl text-gray-600">
              Découvre comment nos utilisateurs automatisent et monétisent leurs compétences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-pulse`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.activity}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-lg inline-block">
                    <span className="text-green-700 font-bold">{testimonial.revenue}</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-6xl text-gray-100 font-bold">"</div>
                </CardContent>
              </Card>
            ))}
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
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`transition-all duration-500 hover:scale-105 ${plan.popular ? 'border-black shadow-2xl shadow-black/25' : 'border-gray-200 hover:shadow-xl'} relative bg-white/90 backdrop-blur-sm`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      Plus populaire
                    </span>
                  </div>
                )}
                <CardContent className="p-10">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-8">
                      <span className="text-5xl font-bold text-black">{plan.price}</span>
                      <span className="text-gray-600 text-xl">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-10 text-left">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 animate-pulse" />
                          <span className="text-gray-700 text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${plan.popular ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-black/25' : 'border-2 border-gray-300 hover:border-black hover:bg-gray-50'}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={handleAuthRedirect}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
    </div>
  );
};

export default CocoonLandingPage;