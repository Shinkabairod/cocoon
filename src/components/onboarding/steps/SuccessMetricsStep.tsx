
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { useState } from "react";
import { successMetrics } from "@/components/onboarding/content-type/contentTypeData";
import { Textarea } from "@/components/ui/textarea";

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
      subtitle="What would success look like for you in the next 6 months?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Target className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select all that apply to your goals</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {successMetrics.map((metric) => {
              const isSelected = selectedMetrics.includes(metric);
              return (
                <Badge
                  key={metric}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => toggleMetric(metric)}
                >
                  {metric}
                </Badge>
              );
            })}
          </div>
          
          <div>
            <p className="text-sm mb-2">Or describe your own success metric:</p>
            <Textarea
              placeholder="E.g., Creating a content library of 50 videos, Building a community of like-minded creators..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="h-24"
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
