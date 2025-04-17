
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Compass, HelpCircle, Lightbulb, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const InitialGuidanceStep = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const isMobile = useIsMobile();
  
  const handleDirectionChoice = (hasDirection: boolean) => {
    updateOnboardingData({ 
      hasContentDirection: hasDirection,
      step: 2 // Move to the next step - either experience or creator discovery
    });
  };
  
  return (
    <OnboardingLayout 
      title="Welcome to AI Content Coach" 
      subtitle="Let's see how we can help you on your content creation journey"
      showBackButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-2">
          <Smartphone className="h-6 w-6 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">Mobile Optimized Experience</span>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">To start, tell us where you are in your creative journey</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <Card 
              className="p-5 cursor-pointer border-2 hover:border-primary transition-all"
              onClick={() => handleDirectionChoice(true)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <Compass className="h-10 w-10 text-primary" />
                <div>
                  <h4 className="font-medium text-lg mb-2">I have a clear idea already</h4>
                  <p className="text-muted-foreground text-sm">
                    I know what type of content I want to create and on which platforms,
                    but I need help structuring and optimizing my approach.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card 
              className="p-5 cursor-pointer border-2 hover:border-primary transition-all"
              onClick={() => handleDirectionChoice(false)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <HelpCircle className="h-10 w-10 text-primary" />
                <div>
                  <h4 className="font-medium text-lg mb-2">I'm still finding my way</h4>
                  <p className="text-muted-foreground text-sm">
                    I want to create content but I'm not sure where to start
                    or what type of content would suit me best.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            We'll tailor our onboarding process based on your current situation,
            guiding you through each step of the content creation process.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default InitialGuidanceStep;
