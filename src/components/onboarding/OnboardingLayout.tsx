
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { prevStep, onboardingData, totalSteps } = useOnboarding();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b w-full py-3 px-4">
        <div className="container mx-auto flex items-center">
          <h1 className={`font-bold gradient-text ${isMobile ? 'text-xl' : 'text-2xl'}`}>AI Content Coach</h1>
          <div className="ml-auto text-sm text-muted-foreground">
            Étape {onboardingData.step} de {totalSteps}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {showBackButton && onboardingData.step > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={prevStep}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour
            </Button>
          )}
          
          <div className="text-center mb-6">
            <h2 className={`font-bold mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{title}</h2>
            {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
          </div>
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
