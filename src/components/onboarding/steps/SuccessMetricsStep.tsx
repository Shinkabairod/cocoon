import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Target, Users, DollarSign, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Organized success metrics by categories
const successMetricsCategories = {
  audience: {
    title: "Audience Growth",
    icon: Users,
    metrics: [
      "0 to 10K followers",
      "10K to 100K followers", 
      "100K to 1M followers",
      "Reach 1M+ followers",
      "Faire du viral content",
      "Build an engaged community"
    ]
  },
  revenue: {
    title: "Revenue Goals",
    icon: DollarSign,
    metrics: [
      "Generate $1K-5K monthly revenue",
      "Generate $5K-20K monthly revenue",
      "Generate $20K+ monthly revenue",
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
      "Help 1000+ people",
      "Inspire others in my field",
      "Create educational content"
    ]
  }
};

const SuccessMetricsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
    onboardingData.successMetrics || []
  );
  const [customGoal, setCustomGoal] = useState(onboardingData.personalGoal || '');
  const [openCategories, setOpenCategories] = useState<string[]>(['audience']);
  
  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
    updateOnboardingData({ successMetrics: selectedMetrics });
  };

  const toggleCategory = (categoryKey: string) => {
    if (openCategories.includes(categoryKey)) {
      setOpenCategories(openCategories.filter(k => k !== categoryKey));
    } else {
      setOpenCategories([...openCategories, categoryKey]);
    }
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
        
        <div className="space-y-4 mb-6">
          {Object.entries(successMetricsCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            const isOpen = openCategories.includes(key);
            
            return (
              <Collapsible key={key} open={isOpen} onOpenChange={() => toggleCategory(key)}>
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                          {category.title}
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-3 pt-0">
                      {category.metrics.map((metric) => {
                        const isSelected = selectedMetrics.includes(metric);
                        return (
                          <Badge
                            key={metric}
                            variant={isSelected ? "default" : "outline"}
                            className={`
                              w-full px-4 py-3 text-sm cursor-pointer transition-all duration-200 justify-center
                              ${isSelected 
                                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md border-primary' 
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
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
        
        <Card className="p-4">
          <div>
            <p className="text-sm mb-3 font-medium">Or describe your own success goal:</p>
            <Textarea
              placeholder="E.g., Create educational content that helps students learn faster, Build a personal brand around sustainable living..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="h-24 text-sm"
            />
          </div>
        </Card>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-sm h-12 text-base font-medium"
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
