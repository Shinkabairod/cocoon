
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useState } from "react";
import { User, ArrowLeft, ArrowRight } from "lucide-react";

const ProfileStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  const [fullName, setFullName] = useState(onboardingData.fullName || '');
  
  const handleContinue = () => {
    updateOnboardingData({ fullName });
    nextStep();
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background pattern - same as landing */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span>Step 2 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Profile</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <User className="h-8 w-8 text-gray-700" />
          </div>
        </div>
        
        {/* Form */}
        <div className="max-w-md mx-auto space-y-6 mb-12">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              First name or Username
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Ex: Marie, john_dev..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-center text-lg border-gray-300 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            How would you like to be addressed?
          </p>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="text-gray-500 border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
            onClick={handleContinue}
            disabled={!fullName.trim()}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
