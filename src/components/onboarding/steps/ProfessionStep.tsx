
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, Building, Heart, Users, Lightbulb } from "lucide-react";

const ProfessionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep, prevStep } = useOnboarding();
  const [profession, setProfession] = useState(onboardingData.profession || '');
  const [customProfession, setCustomProfession] = useState('');
  
  const professionSuggestions = [
    { label: "Entrepreneur", icon: <Lightbulb className="h-5 w-5" /> },
    { label: "Étudiant", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Employé", icon: <Building className="h-5 w-5" /> },
    { label: "Freelance", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Coach/Consultant", icon: <Users className="h-5 w-5" /> },
    { label: "Créatif/Artiste", icon: <Heart className="h-5 w-5" /> }
  ];
  
  const handleProfessionSelect = (selectedProfession: string) => {
    setProfession(selectedProfession);
    setCustomProfession('');
  };
  
  const handleContinue = () => {
    const finalProfession = profession === 'Autre' ? customProfession : profession;
    updateOnboardingData({ profession: finalProfession });
    nextStep();
  };
  
  const currentProfession = profession === 'Autre' ? customProfession : profession;
  
  return (
    <OnboardingLayout 
      title="Votre activité principale"
      subtitle="Cela nous aide à adapter nos conseils à votre contexte"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {professionSuggestions.map(({ label, icon }) => (
            <Card 
              key={label}
              className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                profession === label 
                  ? 'border-violet-500 bg-violet-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleProfessionSelect(label)}
            >
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className={`${profession === label ? 'text-violet-600' : 'text-gray-600'}`}>
                  {icon}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            </Card>
          ))}
        </div>
        
        <Card 
          className={`p-4 cursor-pointer border-2 transition-all ${
            profession === 'Autre' 
              ? 'border-violet-500 bg-violet-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleProfessionSelect('Autre')}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <span className="text-sm font-medium">Autre profession</span>
            </div>
            {profession === 'Autre' && (
              <Input
                placeholder="Précisez votre profession..."
                value={customProfession}
                onChange={(e) => setCustomProfession(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </Card>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Retour
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-6"
            onClick={handleContinue}
            disabled={!currentProfession.trim()}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ProfessionStep;
