
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { BusinessType } from "@/types/onboarding";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Building, Globe, Store, Briefcase, School, Heart, Users } from "lucide-react";

const BusinessTypeStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  
  const businessTypes: { type: BusinessType; icon: JSX.Element }[] = [
    { type: 'Personal Brand', icon: <Briefcase className="h-5 w-5" /> },
    { type: 'Small Business', icon: <Store className="h-5 w-5" /> },
    { type: 'Startup', icon: <Building className="h-5 w-5" /> },
    { type: 'Established Company', icon: <Building className="h-5 w-5" /> },
    { type: 'Agency', icon: <Users className="h-5 w-5" /> },
    { type: 'Educational Institution', icon: <School className="h-5 w-5" /> },
    { type: 'Non-Profit', icon: <Heart className="h-5 w-5" /> },
    { type: 'Other', icon: <Globe className="h-5 w-5" /> }
  ];
  
  const handleBusinessTypeSelect = (type: BusinessType) => {
    updateOnboardingData({ businessType: type });
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Business Type" 
      subtitle="How would you define your business or activity?"
    >
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 gap-3">
            {businessTypes.map(({ type, icon }) => (
              <Card 
                key={type}
                className={`p-4 cursor-pointer border-2 ${
                  onboardingData.businessType === type 
                    ? 'border-primary' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleBusinessTypeSelect(type)}
              >
                <div className="flex items-center space-x-2">
                  {icon}
                  <div className="font-medium">{type}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!onboardingData.businessType}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BusinessTypeStep;
