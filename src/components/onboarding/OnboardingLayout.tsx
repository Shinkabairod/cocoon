
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  fullWidth?: boolean;
  contentClassName?: string;
}

const OnboardingLayout = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  fullWidth = false,
  contentClassName
}: OnboardingLayoutProps) => {
  const { prevStep, onboardingData, totalSteps } = useOnboarding();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b w-full py-3 px-4">
        <div className="container mx-auto flex items-center">
          <h1 className={`font-bold gradient-text ${isMobile ? 'text-xl' : 'text-2xl'}`}>AI Content Coach</h1>
          <div className="ml-auto text-sm text-muted-foreground flex flex-col items-end">
            <div className="flex items-center">
              <span className="font-medium text-primary mr-1">{onboardingData.step}</span>
              <span>of {totalSteps}</span>
            </div>
            <div className="h-1 w-24 bg-muted mt-1 rounded overflow-hidden">
              <div 
                className="h-full bg-primary rounded"
                style={{ width: `${(onboardingData.step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className={cn(
          "w-full",
          fullWidth ? "max-w-4xl" : "max-w-md"
        )}>
          {showBackButton && onboardingData.step > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={prevStep}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          )}
          
          <div className="text-center mb-6">
            <h2 className={`font-bold mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{title}</h2>
            {subtitle && <p className="text-muted-foreground text-sm max-w-md mx-auto">{subtitle}</p>}
          </div>
          
          <div className={cn("max-w-md mx-auto", contentClassName)}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
