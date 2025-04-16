
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  
  return (
    <OnboardingLayout 
      title="All Set! Your AI Coach is Ready" 
      subtitle="Here's a summary of what we've learned about you"
      showBackButton={false}
    >
      <div className="space-y-8">
        <Card className="p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">About You</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Experience:</span> {onboardingData.experienceLevel}</li>
                <li><span className="font-medium text-foreground">Goal:</span> {onboardingData.contentGoal}</li>
                <li><span className="font-medium text-foreground">Available Time:</span> {onboardingData.timeAvailable}</li>
                <li><span className="font-medium text-foreground">Biggest Challenge:</span> {onboardingData.contentChallenge}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Content Preferences</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Content Types:</span> {onboardingData.contentTypes?.join(', ')}</li>
                <li><span className="font-medium text-foreground">Platforms:</span> {onboardingData.platforms?.join(', ')}</li>
                <li><span className="font-medium text-foreground">Niche:</span> {onboardingData.niche}</li>
                <li><span className="font-medium text-foreground">Monetization:</span> {onboardingData.monetization}</li>
              </ul>
            </div>
          </div>
        </Card>
        
        <div className="space-y-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-coach-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Your personal AI coach has been created!</h3>
            <p className="text-muted-foreground mt-2">
              Based on your preferences, we've created a personalized experience for you.
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-2">What's next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Explore your dashboard and get to know your AI coach</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Generate your first personalized content script</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Set up your content calendar and start planning</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-coach-primary mt-0.5 flex-shrink-0" />
                <span>Access learning resources tailored to your needs</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Link to="/dashboard" className="w-full max-w-xs">
            <Button className="gradient-bg w-full">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
