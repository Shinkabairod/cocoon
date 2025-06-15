
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

// More focused and diverse success metrics
const successMetrics = [
  "Reach 1K followers",
  "Reach 10K followers", 
  "Get 100K views per month",
  "Generate $1K monthly revenue",
  "Generate $5K monthly revenue",
  "Build an engaged community",
  "Get brand partnerships",
  "Launch my own product/service",
  "Become a recognized expert",
  "Create viral content",
  "Quit my day job",
  "Help 1000+ people"
];

const SuccessMetricsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
    onboardingData.successMetrics || []
  );
  const [customGoal, setCustomGoal] = useState(onboardingData.personalGoal || '');
  
  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
    updateOnboardingData({ successMetrics: selectedMetrics });
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      successMetrics: selectedMetrics,
      personalGoal: customGoal 
    });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Definition of Success" 
      subtitle="What would success look like for you in the next 6-12 months?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Target className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-4 text-center">Select your main goals (choose 1-3)</p>
          
          <div className="grid grid-cols-1 gap-2 mb-6">
            {successMetrics.map((metric) => {
              const isSelected = selectedMetrics.includes(metric);
              return (
                <Badge
                  key={metric}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-4 py-3 text-sm cursor-pointer transition-all duration-200 justify-center
                    ${isSelected 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md' 
                      : 'hover:bg-muted hover:border-primary/50'
                    }
                  `}
                  onClick={() => toggleMetric(metric)}
                >
                  {metric}
                </Badge>
              );
            })}
          </div>
          
          <div>
            <p className="text-sm mb-2 font-medium">Or describe your own success goal:</p>
            <Textarea
              placeholder="E.g., Create educational content that helps students learn faster, Build a personal brand around sustainable living..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="h-20"
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedMetrics.length === 0 && !customGoal}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SuccessMetricsStep;
