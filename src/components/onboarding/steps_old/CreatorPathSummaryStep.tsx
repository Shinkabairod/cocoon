
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

const CreatorPathSummaryStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  // Sample recommendations based on user inputs
  const getRecommendedPath = () => {
    const { passions = [], personalityTraits = [], lifeValues = [] } = onboardingData;
    
    // Simplified logic for demo purposes
    // In a real app, this would be more sophisticated
    
    if (passions.includes('Technology') || passions.includes('Education')) {
      if (personalityTraits.includes('Analytical') || personalityTraits.includes('Detail-oriented')) {
        return {
          path: "Tech/Educational Content Creator",
          platforms: "YouTube and Blog",
          format: "Long-form tutorials and guides",
          strengths: "Your analytical nature and passion for technology/education make you perfect for creating detailed, informative content that helps others learn."
        };
      }
    }
    
    if (passions.includes('Food & Cooking') || passions.includes('Health & Wellness')) {
      if (lifeValues.includes('Health & wellbeing') || lifeValues.includes('Creativity')) {
        return {
          path: "Lifestyle Content Creator",
          platforms: "Instagram and TikTok",
          format: "Short video tutorials and beautiful visual content",
          strengths: "Your creative nature and passion for cooking/wellness make you ideal for creating engaging, visually appealing content that inspires others."
        };
      }
    }
    
    if (passions.includes('Travel') || passions.includes('Photography')) {
      if (personalityTraits.includes('Adventurous') || lifeValues.includes('Adventure & travel')) {
        return {
          path: "Travel Content Creator",
          platforms: "Instagram and YouTube",
          format: "Visual storytelling through photos and vlogs",
          strengths: "Your adventurous spirit and eye for beauty make you perfect for creating inspiring travel content that takes viewers on a journey."
        };
      }
    }
    
    if (personalityTraits.includes('Humorous') || personalityTraits.includes('Energetic')) {
      return {
        path: "Entertainment Content Creator",
        platforms: "TikTok and YouTube",
        format: "Short-form comedy and trends",
        strengths: "Your energetic personality and sense of humor make you perfect for creating entertaining content that makes people smile."
      };
    }
    
    // Default recommendation
    return {
      path: "Niche Content Creator",
      platforms: "Instagram and TikTok",
      format: "A mix of educational and entertaining content",
      strengths: "Your unique combination of interests and personality traits make you well-suited to carve out your own specific niche. Focus on combining your top passions with your authentic self."
    };
  };
  
  const recommendation = getRecommendedPath();
  
  const handleContinue = () => {
    // Store the recommendation and continue to main onboarding flow
    updateOnboardingData({
      recommendedPath: recommendation.path,
      step: 2 // Continue to experience level
    });
  };
  
  return (
    <OnboardingLayout 
      title="Your Ideal Creator Path" 
      subtitle="Based on your answers, we think this path would be a great fit for you"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>
        
        <Card className="p-5 border-2 border-primary">
          <h3 className="text-xl font-bold text-center mb-4">{recommendation.path}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-primary">Recommended Platforms</h4>
              <p>{recommendation.platforms}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-primary">Suggested Content Format</h4>
              <p>{recommendation.format}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-primary">Why This Fits You</h4>
              <p className="text-sm">{recommendation.strengths}</p>
            </div>
          </div>
        </Card>
        
        <div className="bg-muted p-4 rounded-md flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            This is just a starting point! We'll continue to refine our recommendations
            as you progress through the onboarding process.
          </p>
        </div>
        
        <div className="pt-2 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CreatorPathSummaryStep;
