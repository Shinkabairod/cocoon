
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Globe
} from 'lucide-react';

const CocoonLandingPage = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
      icon: <Camera className="h-5 w-5" />,
      color: "text-purple-600",
      example: "Scripts, thumbnails, planning"
    },
    { 
      text: "ton agence digitale", 
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-blue-600",
      example: "Stratégies, audits, consulting"
    },
    { 
      text: "ton activité de dev", 
      icon: <Code className="h-5 w-5" />,
      color: "text-green-600",
      example: "Solutions, API, formations"
    },
    { 
      text: "ton coaching sportif", 
      icon: <Dumbbell className="h-5 w-5" />,
      color: "text-red-600",
      example: "Programmes, nutrition, suivi"
    },
    { 
      text: "ton temps d'expert", 
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-600",
      example: "Consultations, masterclass, audit"
    },
    { 
      text: "tes formations", 
      icon: <PenTool className="h-5 w-5" />,
      color: "text-indigo-600",
      example: "Cours, workshops, certifications"
    }
  ];

  const features = [
    {
      title: "Bot IA Personnalisé",
      description: "Un assistant qui connaît toutes tes compétences et peut répondre à tes clients 24/7",
      icon: <Gem className="h-6 w-6" />,
      gradient: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Interface Sur Mesure", 
      description: "Une plateforme adaptée à ton activité avec tes couleurs, ton style, tes services",
      icon: <Target className="h-6 w-6" />,
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Monétisation Directe",
      description: "Vends tes services, formations et consultations directement via ton bot",
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "from-green-50 to-green-100",
      iconColor: "text-green-600"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      activity: "Créatrice de contenu",
      revenue: "3 200€/mois",
      quote: "Mon bot répond à mes clients même quand je dors",
      avatar: "🎨",
      gradient: "from-pink-50 to-pink-100"
    },
    {
      name: "Thomas R.", 
      activity: "Développeur freelance",
      revenue: "8 500€/mois",
      quote: "Je vends mes formations automatiquement",
      avatar: "💻",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      name: "Sophie M.",
      activity: "Coach fitness",
      revenue: "4 800€/mois", 
      quote: "Mes clients ont leurs programmes personnalisés instantly",
      avatar: "💪",
      gradient: "from-green-50 to-green-100"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animation des stats
    const animateStats = () => {
      const duration = 2000;
      const steps = 50;
      let step = 0;
      
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setAnimatedStats({
          bots: Math.floor(targetStats.bots * progress),
          revenue: Math.floor(targetStats.revenue * progress),
          hours: Math.floor(targetStats.hours * progress),
          experts: Math.floor(targetStats.experts * progress)
        });
        
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
    };
    
    setTimeout(animateStats, 1000);
    
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Gem className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Cocoon</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Comment ça marche</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
              <a href="#examples" className="text-gray-600 hover:text-gray-900 transition-colors">Exemples</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost">Se connecter</Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Commencer gratuitement
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Nouveau : IA personnalisée</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Boost et monétise
              <span className="block mt-2">
                <span className={`inline-flex items-center gap-3 transition-all duration-500 ${activities[currentActivity].color}`}>
                  {activities[currentActivity].icon}
                  {activities[currentActivity].text}
                </span>
              </span>
              <span className="block mt-2 text-gray-900">
                en quelques clics.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Crée ton bot IA personnalisé qui connaît toutes tes compétences. 
              Une nouvelle façon de travailler et de vendre ton expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
                <Play className="h-5 w-5 mr-2" />
                Créer mon bot gratuitement
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Video className="h-5 w-5 mr-2" />
                Voir la démo
              </Button>
            </div>

            <div className="text-sm text-gray-500 mb-8">
              ✓ Gratuit pendant 14 jours • ✓ Aucune carte requise • ✓ Configuration en 2 minutes
            </div>

            {/* Current Activity Example */}
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-600">Exemple :</span>
              <span className="text-sm font-medium text-gray-900">
                {activities[currentActivity].example}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ils optimisent et automatisent déjà leur activité
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-900 mb-1">
                {animatedStats.bots.toLocaleString()}
              </div>
              <div className="text-sm text-purple-700 font-medium">Bots créés</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-900 mb-1">
                €{Math.floor(animatedStats.revenue / 1000)}k
              </div>
              <div className="text-sm text-green-700 font-medium">CA généré</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <Timer className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-900 mb-1">
                {Math.floor(animatedStats.hours / 1000)}k
              </div>
              <div className="text-sm text-blue-700 font-medium">Heures économisées</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <Globe className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-900 mb-1">
                {animatedStats.experts}
              </div>
              <div className="text-sm text-orange-700 font-medium">Experts actifs</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Optimise et automatise ton activité en trois étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Configure",
                description: "Ajoute tes connaissances, services et tarifs à ton bot personnalisé en quelques clics",
                color: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 border-purple-300"
              },
              {
                step: "2", 
                title: "Automatise",
                description: "Ton bot prend en charge tes interactions clients, qualifie les prospects et vend tes services",
                color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 border-blue-300"
              },
              {
                step: "3",
                title: "Optimise",
                description: "Analyse les performances, ajuste ta stratégie et développe ton activité automatiquement",
                color: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 border-green-300"
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-2`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont tu as besoin pour <span className="text-purple-600">réussir</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} border-2 border-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-6`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ils génèrent déjà des revenus</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border border-gray-200 bg-white overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${testimonial.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.activity}</div>
                      <div className="text-sm font-semibold text-green-600">{testimonial.revenue}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tarifs transparents</h2>
            <p className="text-xl text-gray-600">Commence gratuitement, évolue selon tes revenus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Gratuit",
                price: "0€",
                period: "pour commencer",
                features: ["1 bot IA", "100 conversations/mois", "Support communauté"],
                cta: "Commencer gratuitement",
                popular: false
              },
              {
                name: "Pro",
                price: "29€",
                period: "/mois",
                features: ["Bots illimités", "Conversations illimitées", "Support prioritaire", "Analytics avancées"],
                cta: "Essayer 14 jours gratuits",
                popular: true
              },
              {
                name: "Business", 
                price: "99€",
                period: "/mois",
                features: ["Tout Pro inclus", "API personnalisée", "White label", "Support dédié"],
                cta: "Contacter l'équipe",
                popular: false
              }
            ].map((plan, i) => (
              <Card key={i} className={`border-2 ${plan.popular ? 'border-black' : 'border-gray-200'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                      Plus populaire
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'border border-gray-300 hover:bg-gray-50'}`}
                      variant={plan.popular ? "default" : "outline"}
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
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer ton expertise en revenus automatisés ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Rejoins des milliers d'experts qui ont déjà créé leur bot IA. 
            Configuration en 2 minutes, résultats dès le premier jour.
          </p>
          
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            <Gem className="h-5 w-5 mr-2" />
            Créer mon bot maintenant
            <ArrowRight className="h-5 w-5 ml-2" />
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
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Gem className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Cocoon</span>
              </div>
              <p className="text-gray-600">
                La plateforme qui transforme ton expertise en revenus automatisés.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-gray-900">Tarifs</a></li>
                <li><a href="#" className="hover:text-gray-900">Exemples</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Confidentialité</a></li>
                <li><a href="#" className="hover:text-gray-900">CGU</a></li>
                <li><a href="#" className="hover:text-gray-900">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Cocoon. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CocoonLandingPage;
