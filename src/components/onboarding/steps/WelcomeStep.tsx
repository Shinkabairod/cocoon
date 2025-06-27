
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

const WelcomeStep = () => {
  const { nextStep } = useOnboarding();
  
  const handleStart = () => {
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Bienvenue dans votre Assistant IA Personnel"
      subtitle="Quelques questions pour personnaliser votre expérience"
      showProgress={false}
      showBackButton={false}
    >
      <div className="space-y-8 text-center">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur opacity-20 animate-pulse"></div>
        </div>
        
        <Card className="p-8 bg-gradient-to-br from-violet-50 to-blue-50 border-violet-200">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Votre assistant IA va s'adapter à vos besoins
            </h3>
            <p className="text-gray-600">
              En quelques minutes, nous allons configurer votre assistant personnel 
              pour qu'il comprenne parfaitement vos objectifs et puisse vous accompagner efficacement.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-sm text-gray-600">Définir vos objectifs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="text-sm text-gray-600">Optimiser l'assistance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🚀</span>
                </div>
                <p className="text-sm text-gray-600">Commencer à créer</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Button 
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={handleStart}
        >
          Commencer la configuration
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="text-sm text-gray-500">
          Seulement 10 étapes • 3-5 minutes
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default WelcomeStep;
