
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for beginners looking to explore content creation",
      features: [
        "2 personalized scripts per month",
        "Basic content strategy",
        "Limited access to resources",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Creator",
      price: "$12",
      period: "per month",
      popular: true,
      description: "Ideal for serious content creators who want to grow",
      features: [
        "Unlimited personalized scripts",
        "Advanced content strategy",
        "Full access to resources",
        "Custom AI coach personality",
        "Content performance analytics",
        "Priority email support"
      ],
      buttonText: "Start 7-Day Free Trial",
      buttonVariant: "default" as const
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "For professionals and teams managing multiple content channels",
      features: [
        "Everything in Creator plan",
        "Multi-platform content strategy",
        "Team collaboration features",
        "Advanced analytics and reporting",
        "Custom templates and workflows",
        "Dedicated support"
      ],
      buttonText: "Start 7-Day Free Trial",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your content creation needs. All plans include our core AI coaching features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl border p-8 ${plan.popular ? 'shadow-xl border-primary' : 'shadow-sm'}`}
            >
              {plan.popular && (
                <div className="rounded-full text-xs font-semibold bg-primary text-primary-foreground py-1 px-3 w-fit mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-coach-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/onboarding">
                <Button 
                  className={`w-full ${plan.popular ? 'gradient-bg text-white' : ''}`} 
                  variant={plan.popular ? "default" : plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will remain until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How does the 7-day free trial work?</h3>
              <p className="text-muted-foreground">You'll get full access to all features for 7 days. No charge will be made until the trial period ends, and you can cancel anytime.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">We offer a 14-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
