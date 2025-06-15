
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Target, Users, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Organized success metrics by categories
const successMetricsCategories = {
  audience: {
    title: "Audience Growth",
    icon: Users,
    metrics: [
      "Reach 1K followers",
      "Reach 10K followers", 
      "Reach 100K followers",
      "Reach 1M followers",
      "Get 100K views per month",
      "Build an engaged community"
    ]
  },
  revenue: {
    title: "Revenue Goals",
    icon: DollarSign,
    metrics: [
      "Generate $1K monthly revenue",
      "Generate $5K monthly revenue",
      "Get brand partnerships",
      "Launch my own product/service",
      "Quit my day job"
    ]
  },
  impact: {
    title: "Impact & Recognition",
    icon: TrendingUp,
    metrics: [
      "Become a recognized expert",
      "Create viral content",
      "Help 1000+ people",
      "Inspire others in my field"
    ]
  }
};

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
      fullWidth
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <Target className="h-12 w-12 text-primary" />
        </div>
        
        <p className="text-sm mb-6 text-center text-muted-foreground">
          Select your main goals (choose 1-3 that resonate most with you)
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {Object.entries(successMetricsCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <Card key={key} className="p-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.metrics.map((metric) => {
                    const isSelected = selectedMetrics.includes(metric);
                    return (
                      <Badge
                        key={metric}
                        variant={isSelected ? "default" : "outline"}
                        className={`
                          w-full px-3 py-2 text-xs cursor-pointer transition-all duration-200 justify-center
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
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <Card className="p-4">
          <div>
            <p className="text-sm mb-2 font-medium">Or describe your own success goal:</p>
            <Textarea
              placeholder="E.g., Create educational content that helps students learn faster, Build a personal brand around sustainable living..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="h-20"
            />
          </div>
        </Card>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
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
