
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
    { label: "Student", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Employee", icon: <Building className="h-5 w-5" /> },
    { label: "Freelancer", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Coach", icon: <Users className="h-5 w-5" /> },
    { label: "Creative", icon: <Heart className="h-5 w-5" /> }
  ];
  
  const handleProfessionSelect = (selectedProfession: string) => {
    setProfession(selectedProfession);
    setCustomProfession('');
  };
  
  const handleContinue = () => {
    const finalProfession = profession === 'Other' ? customProfession : profession;
    updateOnboardingData({ profession: finalProfession });
    nextStep();
  };
  
  const currentProfession = profession === 'Other' ? customProfession : profession;
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span>Step 3 of 11</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Role</span>
          </h1>
        </div>

        <div className="space-y-6 mb-12">
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
              profession === 'Other' 
                ? 'border-violet-500 bg-violet-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleProfessionSelect('Other')}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium">Other</span>
              </div>
              {profession === 'Other' && (
                <Input
                  placeholder="Specify your role..."
                  value={customProfession}
                  onChange={(e) => setCustomProfession(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </Card>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Back
          </Button>
          <Button 
            className="bg-black hover:bg-gray-800 text-white px-8 py-3"
            onClick={handleContinue}
            disabled={!currentProfession.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionStep;
