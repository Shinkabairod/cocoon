
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScrollingButtonsSection from './components/ScrollingButtonsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Data
import { activities } from './data/activitiesData';
import { testimonials } from './data/testimonialsData';
import { pricingPlans } from './data/pricingData';
import { scrollingButtons } from './data/scrollingButtonsData';

// Hooks and styles
import { useAnimations } from './hooks/useAnimations';
import './styles/scrollAnimations';

const CocoonLandingPage = () => {
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState(0);
  const { isVisible, mousePosition, animatedStats } = useAnimations();

  const handleAuthRedirect = () => {
    navigate('/auth');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % activities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
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

      <Header onAuthRedirect={handleAuthRedirect} />

      <HeroSection
        currentActivity={currentActivity}
        activities={activities}
        animatedStats={animatedStats}
        isVisible={isVisible}
        onAuthRedirect={handleAuthRedirect}
      />

      <ScrollingButtonsSection
        scrollingButtons={scrollingButtons}
        onAuthRedirect={handleAuthRedirect}
      />

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
              description: "Ton bot s'appuie sur tes vraies méthodes, ton contenu, ton savoir-faire. Pas d'IA générique : chaque réponse reflète ta voix, ton expérience, ta valeur.",
              icon: "🗃️"
            }, {
              title: "Réponses sur-mesure",
              description: "Nos algorithmes adaptent ton ton, ton style, tes mots. Chaque échange est optimisé pour reproduire ta façon unique de transmettre.",
              icon: "⚙️"
            }, {
              title: "Fiabilité garantie",
              description: "Aucune info inventée. Tout est analysé, structuré et vérifié avant d'être utilisé. Tu gardes le contrôle total sur ce que ton bot délivre.",
              icon: "🏆"
            }].map((feature, index) => (
              <div key={index} className="relative bg-white border-2 border-gray-300 rounded-3xl p-8 hover:border-red-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-red-700 text-sm font-semibold">
                  ✨ Qualité Premium
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <FeaturesSection />

      <HowItWorksSection />

      <PricingSection pricingPlans={pricingPlans} onAuthRedirect={handleAuthRedirect} />

      <CTASection onAuthRedirect={handleAuthRedirect} />

      <Footer />
    </div>
  );
};

export default CocoonLandingPage;
