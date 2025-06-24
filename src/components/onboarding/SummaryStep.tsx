import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useOnboardingComplete } from "@/hooks/useOnboardingComplete";
import OnboardingLayout from "./OnboardingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Users, Target, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { obsidianStructureService } from "@/services/obsidianStructureService";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const HF_SPACE_URL = import.meta.env.VITE_HF_SPACE_URL || "https://cocoonai-cocoon-ai-assistant.hf.space";

const loadingMessages = [
  "🧠 Analyzing your profile and preferences...",
  "🎯 Creating your personalized AI coaching strategy...",
  "📊 Setting up your content optimization system...",
  "🔥 Configuring your growth accelerator tools...",
  "✨ Finalizing your personalized workspace...",
  "🚀 Almost ready to launch your creator journey!"
];

const SummaryStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { completeOnboarding, isProcessing, isCompleted } = useOnboardingComplete();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  
  useEffect(() => {
    if (isCreatingWorkspace) {
      const interval = setInterval(() => {
        setCurrentLoadingMessage(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isCreatingWorkspace]);

  useEffect(() => {
    if (isCompleted && !hasRedirected) {
      console.log('✅ Onboarding completed, preparing redirection...');
      setHasRedirected(true);
      
      // Marquer définitivement l'onboarding comme complété
      const completedData = { 
        ...onboardingData,
        step: 22, 
        onboardingCompleted: true 
      };
      
      updateOnboardingData(completedData);
      console.log('📝 Onboarding data updated with completion flag');
      
      // Sauvegarder également en base de données pour persistance
      if (user) {
        const saveCompletion = async () => {
          try {
            const { error } = await supabase
              .from('user_profiles')
              .upsert({
                user_id: user.id,
                onboarding_completed: true,
                updated_at: new Date().toISOString()
              });
            
            if (error) {
              console.warn('⚠️ Failed to save completion to DB:', error);
            } else {
              console.log('💾 Onboarding completion saved to database');
            }
          } catch (error) {
            console.warn('⚠️ Error saving completion to DB:', error);
          }
        };
        
        saveCompletion();
      }
      
      // Redirection immédiate mais avec un petit délai pour permettre l'affichage
      setTimeout(() => {
        console.log('🚀 Redirecting to dashboard now...');
        navigate('/dashboard', { replace: true });
      }, 2000);
    }
  }, [isCompleted, hasRedirected, navigate, updateOnboardingData, onboardingData, user]);

  const handleComplete = async () => {
    if (!user) {
      toast({
        title: "❌ Erreur d'authentification",
        description: "Vous devez être connecté pour finaliser votre configuration.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingWorkspace(true);

    try {
      console.log('🚀 Starting complete onboarding process for user:', user.id);

      const payload = {
        user_id: user.id,
        profile_data: {
          experienceLevel: onboardingData.experienceLevel,
          contentGoal: onboardingData.contentGoal,
          country: onboardingData.country,
          city: onboardingData.city,
          businessType: onboardingData.businessType,
          businessDescription: onboardingData.businessDescription,
          niche: onboardingData.niche,
          targetGeneration: onboardingData.targetGeneration,
          timeAvailable: onboardingData.timeAvailable,
          monetizationIntent: onboardingData.monetization,
          platforms: onboardingData.platforms,
          contentTypes: onboardingData.contentTypes,
          mainChallenges: Array.isArray(onboardingData.contentChallenges) 
            ? onboardingData.contentChallenges.join(', ') 
            : onboardingData.contentChallenge,
          resources: `Equipment: ${onboardingData.equipmentOwned?.join(', ') || 'Not specified'}, Time: ${onboardingData.timeAvailable || 'Not specified'}`
        }
      };

      const res = await fetch(`${HF_SPACE_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ API Error:", data);
        throw new Error(`API error (${res.status}): ${data?.error || 'Unknown error'}`);
      }

      console.log("✅ Profile saved successfully:", data);

      let fileCount = 0;
      let workspaceSuccess = false;
      
      try {
        await obsidianStructureService.createUserVault(user.id, onboardingData);
        fileCount = obsidianStructureService.getFileCount(onboardingData);
        workspaceSuccess = true;
        console.log(`✅ Workspace structure created: ${fileCount} files`);
      } catch (workspaceError) {
        console.warn('⚠️ Workspace creation partial:', workspaceError);
        fileCount = 0;
        workspaceSuccess = false;
      }

      // Finaliser l'onboarding - cela va déclencher la redirection
      await completeOnboarding();

      if (workspaceSuccess && fileCount > 0) {
        toast({
          title: "🎉 Configuration terminée !",
          description: `Votre espace personnalisé Cocoon AI est prêt avec ${fileCount} éléments configurés.`,
        });
      } else if (data.sync_status === "synced") {
        toast({
          title: "🎉 Configuration terminée !",
          description: "Votre profil est sauvegardé. Redirection vers votre dashboard...",
        });
      } else {
        toast({
          title: "⚠️ Configuration partiellement terminée",
          description: "Votre profil est sauvegardé. Redirection vers votre dashboard...",
        });
      }

    } catch (error) {
      console.error('❌ Complete onboarding error:', error);
      
      try {
        await completeOnboarding();
        toast({
          title: "⚠️ Configuration basique terminée",
          description: "Votre compte est créé. Redirection vers votre dashboard...",
        });
      } catch (finalError) {
        toast({
          title: "❌ Erreur de configuration",
          description: error instanceof Error ? error.message : 'Une erreur est survenue lors de la configuration.',
          variant: "destructive",
        });
      }
    } finally {
      setIsCreatingWorkspace(false);
    }
  };

  const getHighlights = () => {
    const highlights = [];
    
    if (onboardingData.experienceLevel) {
      highlights.push({
        icon: <Users className="h-5 w-5" />,
        label: "Niveau d'expérience",
        value: onboardingData.experienceLevel
      });
    }
    
    if (onboardingData.contentGoal) {
      highlights.push({
        icon: <Target className="h-5 w-5" />,
        label: "Objectif principal",
        value: onboardingData.contentGoal
      });
    }
    
    if (onboardingData.niche) {
      highlights.push({
        icon: <FileText className="h-5 w-5" />,
        label: "Niche",
        value: onboardingData.niche
      });
    }
    
    if (onboardingData.platforms && onboardingData.platforms.length > 0) {
      highlights.push({
        icon: <FileText className="h-5 w-5" />,
        label: "Plateformes",
        value: onboardingData.platforms.join(", ")
      });
    }
    
    return highlights;
  };

  if (isCreatingWorkspace) {
    return (
      <OnboardingLayout 
        title="✨ Configuration de votre espace personnalisé" 
        subtitle="Nous créons votre environnement de travail optimisé..."
      >
        <div className="space-y-8 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-coach-primary to-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="h-10 w-10 text-white animate-spin" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Configuration en cours...</h3>
            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-muted-foreground text-lg animate-fade-in">
                {loadingMessages[currentLoadingMessage]}
              </p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-coach-primary to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Cela ne prendra que quelques instants...
            </p>
          </div>
        </div>
      </OnboardingLayout>
    );
  }

  if (isCompleted) {
    return (
      <OnboardingLayout 
        title="🎉 Bienvenue dans Cocoon AI !" 
        subtitle="Votre espace personnalisé est prêt"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Configuration terminée !</h3>
            <p className="text-muted-foreground">
              Votre espace de travail personnalisé a été créé avec succès.
              Redirection vers votre dashboard...
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      </OnboardingLayout>
    );
  }
  
  return (
    <OnboardingLayout 
      title="Récapitulatif de votre profil" 
      subtitle="Vérifiez vos informations avant de finaliser votre configuration"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getHighlights().map((highlight, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-coach-primary">
                    {highlight.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{highlight.label}</p>
                    <p className="font-medium">{highlight.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-coach-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-coach-primary" />
              Ce qui sera créé pour vous
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Assistant IA personnalisé selon votre profil</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Outils optimisés pour vos plateformes et objectifs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Recommandations personnalisées basées sur vos défis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Dashboard adapté à votre niveau et vos besoins</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {onboardingData.contentChallenges && onboardingData.contentChallenges.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Défis prioritaires à résoudre</h4>
              <div className="space-y-1">
                {onboardingData.contentChallenges.map((challenge, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {index + 1}. {challenge}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="pt-4 space-y-3">
          <div className="flex justify-center">
            <Button 
              className="gradient-bg w-full max-w-sm"
              onClick={handleComplete}
              disabled={isProcessing || isCreatingWorkspace}
            >
              {isProcessing || isCreatingWorkspace ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Configuration en cours...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  🚀 Launch My AI Workspace
                </>
              )}
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Votre espace sera prêt en quelques secondes
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
