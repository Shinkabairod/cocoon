
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PenTool, HelpCircle } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BusinessDescriptionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [businessDescription, setBusinessDescription] = useState(onboardingData.businessDescription || '');
  
  const handleContinue = () => {
    updateOnboardingData({ businessDescription });
    nextStep();
  };
  
  const examplesByType: Record<string, string> = {
    'Personal Brand': "I'm a fitness coach specializing in home workouts and nutrition for busy professionals. I want to create content that motivates people to stay fit despite their busy schedules.",
    'Small Business': "We run a local bakery that specializes in gluten-free and vegan treats. We want to showcase our process, share recipes, and connect with health-conscious customers.",
    'Startup': "Our tech startup has developed an app that helps people track their carbon footprint. We want to create educational content around sustainability and promote our solution.",
    'Established Company': "We're a furniture retailer with 5 locations across the country. We want to showcase our designs, share interior design tips, and connect with customers online.",
    'Agency': "We're a digital marketing agency that helps small businesses grow their online presence. We want to create content that educates entrepreneurs about marketing strategies.",
    'Educational Institution': "We're a language school that offers online courses. We want to create engaging content that helps people learn languages and showcases our teaching methods.",
    'Non-Profit': "We're a non-profit focused on ocean conservation. We want to create awareness about marine pollution and inspire people to take action.",
    'Other': "I create content about sustainable living and zero-waste lifestyle tips to help people reduce their environmental impact."
  };
  
  return (
    <OnboardingLayout 
      title="Describe Your Business" 
      subtitle="Tell us about your business or project to help us personalize your experience"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <PenTool className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <Textarea
            placeholder="Describe your business, project, or what you want to create content about..."
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="h-32"
          />
          <p className="text-xs text-muted-foreground mt-2">
            This helps us understand your goals and suggest relevant content strategies.
          </p>
        </div>
        
        {onboardingData.businessType && examplesByType[onboardingData.businessType] && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="example">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need inspiration? See an example for {onboardingData.businessType}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-3 rounded-md text-sm">
                  {examplesByType[onboardingData.businessType]}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!businessDescription.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BusinessDescriptionStep;
