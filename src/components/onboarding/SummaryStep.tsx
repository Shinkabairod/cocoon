
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SummaryStep = () => {
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();
  
  const handleFinish = () => {
    // In a real app, you would save the onboarding data to a backend
    console.log('Onboarding completed:', onboardingData);
    navigate('/dashboard');
  };
  
  const summaryItems = [
    {
      title: "Experience Level",
      value: onboardingData.experienceLevel || "Not specified"
    },
    {
      title: "Primary Goal",
      value: onboardingData.contentGoal || "Not specified"
    },
    {
      title: "Content Types",
      value: onboardingData.contentTypes?.join(', ') || "Not specified"
    },
    {
      title: "Platforms",
      value: onboardingData.platforms?.join(', ') || "Not specified"
    },
    {
      title: "Main Challenges",
      value: onboardingData.contentChallenges?.join(', ') || "Not specified"
    },
    {
      title: "Time Available",
      value: onboardingData.timeAvailable || "Not specified"
    },
    {
      title: "Selected Resources",
      value: onboardingData.selectedResources?.filter(r => r.selected).length.toString() + " resources" || "0 resources"
    }
  ];
  
  return (
    <OnboardingLayout 
      title="Your Profile Summary" 
      subtitle="Review your preferences before we start your coaching journey"
      showBackButton={false}
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
          <p className="text-muted-foreground">
            Your AI Content Coach is now personalized and ready to help you achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {summaryItems.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{item.title}</span>
                <span className="text-muted-foreground text-sm">{item.value}</span>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border">
          <h4 className="font-semibold mb-2">What's next?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Access your personalized dashboard</li>
            <li>• Get content suggestions based on your profile</li>
            <li>• Start receiving coaching tailored to your goals</li>
            <li>• Track your progress and achievements</li>
          </ul>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-md flex items-center justify-center"
            onClick={handleFinish}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
