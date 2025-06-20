
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useOnboardingComplete } from "@/hooks/useOnboardingComplete";
import OnboardingLayout from "./OnboardingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Users, Target, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { obsidianStructureService } from "@/services/obsidianStructureService";
import { useState } from "react";

const HF_SPACE_URL = "https://Cocoonai-cocoon-ai-assistant.hf.space";

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  const { completeOnboarding, isProcessing, isCompleted } = useOnboardingComplete();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreatingObsidian, setIsCreatingObsidian] = useState(false);
  
  const handleComplete = async () => {
    if (!user) {
      toast({
        title: "❌ Authentication Error",
        description: "You must be logged in to complete onboarding.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingObsidian(true);

    try {
      console.log('🚀 Starting complete onboarding process for user:', user.id);

      // Step 1: Save profile data to /profile API
      console.log('📤 Saving profile data...');
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

      // Step 2: Create complete Obsidian structure
      console.log('🗂️ Creating complete Obsidian structure...');
      await obsidianStructureService.createUserVault(user.id, onboardingData);
      const fileCount = obsidianStructureService.getFileCount(onboardingData);
      console.log(`✅ Obsidian structure created: ${fileCount} files`);

      // Step 3: Complete onboarding process
      await completeOnboarding();

      toast({
        title: "🎉 Onboarding Complete!",
        description: `Profile saved and ${fileCount} files created in your Obsidian space.`,
      });

      // Redirect to dashboard after completion
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('❌ Complete onboarding error:', error);
      
      toast({
        title: "❌ Setup failed",
        description: error instanceof Error ? error.message : 'An error occurred during setup.',
        variant: "destructive",
      });
    } finally {
      setIsCreatingObsidian(false);
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

  if (isCompleted) {
    return (
      <OnboardingLayout 
        title="🎉 Welcome to Cocoon AI!" 
        subtitle="Your personalized space has been created successfully"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
            <p className="text-muted-foreground">
              Your personalized Obsidian structure has been created and your data is saved.
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      </OnboardingLayout>
    );
  }
  
  return (
    <OnboardingLayout 
      title="Your Profile Summary" 
      subtitle="Review your information before finalizing your setup"
    >
      <div className="space-y-6">
        {/* Profile highlights */}
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

        {/* Information about what will be created */}
        <Card className="border-coach-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-coach-primary" />
              What will be created for you
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Personalized Obsidian structure (15+ organized files)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Secure backup on Hugging Face (vaults/user_{'{user_id}'})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">AI configuration optimized for your needs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Personalized dashboard with recommendations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identified challenges */}
        {onboardingData.contentChallenges && onboardingData.contentChallenges.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Priority challenges to solve</h4>
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
        
        {/* Complete Onboarding Button */}
        <div className="pt-4 space-y-3">
          <div className="flex justify-center">
            <Button 
              className="gradient-bg w-full max-w-sm"
              onClick={handleComplete}
              disabled={isProcessing || isCreatingObsidian}
            >
              {isProcessing || isCreatingObsidian ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating your complete space...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  🚀 Create My Complete Obsidian Space
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
