
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
import FAQSection from './components/FAQSection';
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

      <TestimonialsSection testimonials={testimonials} />

      <FeaturesSection />

      <HowItWorksSection />

      <PricingSection pricingPlans={pricingPlans} onAuthRedirect={handleAuthRedirect} />

      <FAQSection />

      <CTASection onAuthRedirect={handleAuthRedirect} />

      <Footer />
    </div>
  );
};

export default CocoonLandingPage;
