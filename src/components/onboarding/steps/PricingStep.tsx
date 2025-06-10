
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PricingStep = () => {
  const { updateOnboardingData } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const navigate = useNavigate();
  
  const plans = [
    {
      id: "free",
      name: "Free",
      stars: 50,
      description: "Perfect for getting started",
      features: [
        "2 AI scripts per month",
        "Basic content strategy",
        "Limited resources access",
        "Email support"
      ],
      buttonText: "Start Free",
      popular: false
    },
    {
      id: "creator",
      name: "Creator",
      stars: 500,
      price: "$12/month",
      description: "Best for serious creators",
      features: [
        "Unlimited AI scripts",
        "Advanced strategy tools",
        "Full resources library",
        "Priority support",
        "Analytics dashboard"
      ],
      buttonText: "Start 7-Day Trial",
      popular: true
    },
    {
      id: "pro",
      name: "Professional", 
      stars: 1500,
      price: "$29/month",
      description: "For teams and agencies",
      features: [
        "Everything in Creator",
        "Team collaboration",
        "White-label options",
        "Advanced analytics",
        "Dedicated support"
      ],
      buttonText: "Start 7-Day Trial",
      popular: false
    }
  ];
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    updateOnboardingData({ selectedPlan: planId });
  };
  
  const handleContinue = () => {
    // Redirect to dashboard after plan selection
    navigate('/mobile');
  };
  
  return (
    <OnboardingLayout 
      title="Choose Your Plan" 
      subtitle="Select the plan that fits your content creation goals"
      fullWidth={true}
      contentClassName="max-w-4xl"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm text-muted-foreground">
              Earn stars by creating content • Use stars for AI features
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`p-6 cursor-pointer border-2 relative ${
                selectedPlan === plan.id 
                  ? 'border-primary shadow-lg' 
                  : 'border-border hover:border-muted-foreground'
              } ${plan.popular ? 'ring-2 ring-primary/20' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-bold">{plan.stars}</span>
                    <span className="text-sm text-muted-foreground">stars/month</span>
                  </div>
                  {plan.price && (
                    <div className="text-sm text-muted-foreground">{plan.price}</div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={!selectedPlan}
          >
            Continue to Dashboard
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3">
            You can change your plan anytime • Cancel within 7 days for full refund
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PricingStep;
