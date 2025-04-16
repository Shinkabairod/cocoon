
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

interface OnboardingLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

const OnboardingLayout = ({ 
  children, 
  title, 
  subtitle,
  showBackButton = true
}: OnboardingLayoutProps) => {
  const { prevStep, onboardingData } = useOnboarding();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b w-full py-4 px-6">
        <div className="container mx-auto flex items-center">
          <h1 className="text-2xl font-bold gradient-text">AI Content Coach</h1>
          <div className="ml-auto text-sm text-muted-foreground">
            Step {onboardingData.step} of 11
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {showBackButton && onboardingData.step > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              onClick={prevStep}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          )}
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
