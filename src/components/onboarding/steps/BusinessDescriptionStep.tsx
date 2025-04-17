
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
    'Established Company': "We're a furniture retailer with 5 locations across the country. We want to showcase our designs, share interior design tips, and highlight our sustainable practices.",
    'Agency': "We're a digital marketing agency specializing in social media management for small businesses. We want to showcase our expertise and attract potential clients.",
    'Educational Institution': "We're a coding bootcamp that offers online and in-person courses. We want to share success stories, coding tips, and information about our programs.",
    'Non-Profit': "Our organization focuses on ocean conservation. We want to raise awareness about plastic pollution and promote our cleanup initiatives.",
    'Other': "I'm a travel enthusiast who wants to share my experiences exploring hidden gems around the world, focusing on sustainable and budget-friendly travel options."
  };
  
  const getExampleDescription = () => {
    if (onboardingData.businessType && examplesByType[onboardingData.businessType]) {
      return examplesByType[onboardingData.businessType];
    }
    return "I'm a fitness coach specializing in home workouts and nutrition for busy professionals. I want to create content that motivates people to stay fit despite their busy schedules.";
  };
  
  return (
    <OnboardingLayout 
      title="Description de Votre Activité" 
      subtitle="Briefly describe your business or project"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <PenTool className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <Textarea
            placeholder="For example: I'm a fitness coach who specializes in home workouts and nutrition..."
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="h-32"
          />
          
          <Accordion type="single" collapsible className="mt-3">
            <AccordionItem value="guidelines">
              <AccordionTrigger className="text-sm text-primary flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                Writing guidelines and examples
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>A good description includes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>What you do or offer</li>
                    <li>Who your target audience is</li>
                    <li>What makes you unique</li>
                    <li>What you want to achieve with your content</li>
                  </ul>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="font-medium text-foreground mb-1">Example:</p>
                    <p>{getExampleDescription()}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!businessDescription || businessDescription.length < 20}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BusinessDescriptionStep;
