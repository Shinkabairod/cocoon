import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useOnboardingComplete } from "@/hooks/useOnboardingComplete";
import OnboardingLayout from "./OnboardingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Users, Target, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenerateObsidianButton from "@/components/shared/GenerateObsidianButton";

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  const { completeOnboarding, isProcessing, isCompleted } = useOnboardingComplete();
  const navigate = useNavigate();
  
  const handleComplete = async () => {
    await completeOnboarding();
    
    // Redirect to dashboard after completion
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleObsidianGenerated = () => {
    // Optional: you can add any additional logic after Obsidian generation
    console.log('✅ Obsidian space generated successfully from onboarding');
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
        
        {/* Buttons section */}
        <div className="pt-4 space-y-3">
          {/* Generate Obsidian Button */}
          <div className="flex justify-center">
            <GenerateObsidianButton
              userProfileData={onboardingData}
              onSuccess={handleObsidianGenerated}
              className="w-full max-w-sm"
            />
          </div>
          
          {/* Complete Onboarding Button */}
          <div className="flex justify-center">
            <Button 
              className="gradient-bg w-full max-w-sm"
              onClick={handleComplete}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating your space...
                </>
              ) : (
                'Finalize my onboarding'
              )}
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
