
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Card } from "@/components/ui/card";
import { ArrowRight, Rocket } from "lucide-react";

const WelcomeStep = () => {
  const { nextStep } = useOnboarding();
  
  const handleStart = () => {
    nextStep();
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Background pattern - same as landing */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative max-w-2xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white transform rotate-45 rounded-sm"></div>
            </div>
            <div className="absolute inset-0 bg-black rounded-lg blur opacity-30 animate-pulse" />
          </div>
          <span className="text-3xl font-bold text-black">Cocoon AI</span>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to your <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Workspace</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Quick setup to personalize your experience
          </p>
        </div>

        {/* Features cards */}
        <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-gray-200">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Your workspace will adapt to your needs
            </h3>
            <p className="text-gray-600">
              Configure your personal workspace in minutes
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-sm text-gray-600">Define goals</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="text-sm text-gray-600">Optimize experience</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🚀</span>
                </div>
                <p className="text-sm text-gray-600">Start creating</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Action button */}
        <Button 
          className="bg-black hover:bg-gray-800 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={handleStart}
        >
          <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
          Start Setup
          <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="text-sm text-gray-500">
          11 steps • 3-5 minutes
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
