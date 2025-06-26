
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Clock, Zap, Users, Target } from "lucide-react";
import { TimeAvailable, ExperienceLevel } from "@/types/onboarding";

const TimeOptimizationStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable | ''>(onboardingData.timeAvailable || '');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>(onboardingData.experienceLevel || '');
  
  const timeOptions: { value: TimeAvailable; label: string; description: string }[] = [
    { value: 'Less than 1 hour', label: 'Moins d\'1 heure par jour', description: 'Pour les plus pressés' },
    { value: '1-3 hours', label: '1 à 3 heures par jour', description: 'Rythme modéré' },
    { value: '3-5 hours', label: '3 à 5 heures par jour', description: 'Engagement soutenu' },
    { value: '5+ hours', label: 'Plus de 5 heures par jour', description: 'Activité intensive' }
  ];
  
  const experienceOptions: { value: ExperienceLevel; label: string; description: string; icon: JSX.Element }[] = [
    { value: 'Beginner', label: 'Débutant', description: 'Première fois avec l\'IA', icon: <Target className="h-5 w-5" /> },
    { value: 'Intermediate', label: 'Intermédiaire', description: 'Quelques expériences', icon: <Users className="h-5 w-5" /> },
    { value: 'Experienced', label: 'Expérimenté', description: 'Utilisateur régulier', icon: <Zap className="h-5 w-5" /> }
  ];
  
  const handleContinue = () => {
    updateOnboardingData({ timeAvailable: timeAvailable as TimeAvailable, experienceLevel: experienceLevel as ExperienceLevel });
    nextStep();
  };
  
  const isValid = timeAvailable && experienceLevel;
  
  return (
    <OnboardingLayout 
      title="Optimisons votre temps" 
      subtitle="Aidez-nous à adapter l'IA à votre rythme et niveau"
    >
      <div className="space-y-8">
        {/* Temps disponible */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-medium">Temps disponible par jour</h3>
          </div>
          
          <RadioGroup value={timeAvailable} onValueChange={(value) => setTimeAvailable(value as TimeAvailable)}>
            <div className="grid grid-cols-1 gap-3">
              {timeOptions.map((option) => (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-muted-foreground">{option.description}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        
        {/* Niveau d'expérience */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">Niveau avec l'IA</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {experienceOptions.map((option) => (
              <Card 
                key={option.value}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  experienceLevel === option.value 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setExperienceLevel(option.value)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex p-3 rounded-full mb-3 ${
                    experienceLevel === option.value ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}>
                    {option.icon}
                  </div>
                  <h4 className="font-medium mb-1">{option.label}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleContinue}
            disabled={!isValid}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default TimeOptimizationStep;
