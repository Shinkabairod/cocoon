// src/components/onboarding/SummaryStep.tsx
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Users, Target, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { apiService } from '@/lib/api'; // À AJOUTER
import { supabase } from '@/integrations/supabase/client'; // EXISTANT

const loadingMessages = [
  "🧠 Analysing your profile and preferences...",
  "🎯 Creating your personalized AI coaching strategy...",
  "📊 Setting up your content optimization system...",
  "🔥 Configuring your growth accelerator tools...",
  "✨ Finalizing your personalized workspace...",
  "🚀 Almost ready to launch your creator journey!"
];

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);
  
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentLoadingMessage(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  // VOTRE CODE ICI ⬇️
  const finishOnboarding = async () => {
    if (!user) return;
    
    try {
      setIsProcessing(true);
      
      // Sauvegarder dans votre backend (Obsidian)
      await apiService.saveProfile(user.id, onboardingData);
      
      // Sauvegarder aussi dans Supabase pour accès rapide
      await supabase.from('user_profiles').upsert({
        user_id: user.id,
        onboarding_completed: true,
        profile_data: onboardingData,
        updated_at: new Date().toISOString()
      });

      toast({ 
        title: "✅ Profil créé !", 
        description: "Votre vault Obsidian est prêt !" 
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur onboarding:', error);
      toast({ 
        title: "❌ Erreur", 
        description: "Impossible de créer votre profil" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <OnboardingLayout 
      title="🎉 Votre profil est prêt !"
      subtitle="Finalisez votre configuration"
    >
      <div className="space-y-6">
        {/* Résumé existant */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Expérience: {onboardingData.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Objectif: {onboardingData.contentGoal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Plateformes: {onboardingData.platforms?.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message de loading */}
        {isProcessing && (
          <Card>
            <CardContent className="p-6 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>{loadingMessages[currentLoadingMessage]}</p>
            </CardContent>
          </Card>
        )}

        {/* Bouton final */}
        <Button 
          className="w-full gradient-bg"
          onClick={finishOnboarding}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Configuration en cours...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              🚀 Créer mon espace IA
            </>
          )}
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;