
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { 
  Briefcase, 
  Palette, 
  Code, 
  Users, 
  TrendingUp,
  Heart,
  Lightbulb,
  Building
} from "lucide-react";

const ProfessionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedProfession, setSelectedProfession] = useState(onboardingData.profession || '');
  const [customProfession, setCustomProfession] = useState('');
  
  const professions = [
    {
      id: 'entrepreneur',
      name: 'Entrepreneur',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Créateur d\'entreprise, startup'
    },
    {
      id: 'content_creator',
      name: 'Créateur de contenu',
      icon: <Palette className="h-6 w-6" />,
      description: 'Vidéos, articles, médias sociaux'
    },
    {
      id: 'consultant',
      name: 'Consultant',
      icon: <Lightbulb className="h-6 w-6" />,
      description: 'Conseil, expertise, formation'
    },
    {
      id: 'freelance',
      name: 'Freelance',
      icon: <Code className="h-6 w-6" />,
      description: 'Développeur, designer, rédacteur'
    },
    {
      id: 'manager',
      name: 'Manager/Cadre',
      icon: <Users className="h-6 w-6" />,
      description: 'Direction, gestion d\'équipe'
    },
    {
      id: 'business_owner',
      name: 'Dirigeant PME',
      icon: <Building className="h-6 w-6" />,
      description: 'Propriétaire d\'entreprise établie'
    },
    {
      id: 'professional',
      name: 'Professionnel libéral',
      icon: <Heart className="h-6 w-6" />,
      description: 'Médecin, avocat, architecte...'
    },
    {
      id: 'other',
      name: 'Autre',
      icon: <Briefcase className="h-6 w-6" />,
      description: 'Préciser ci-dessous'
    }
  ];
  
  const handleContinue = () => {
    const profession = selectedProfession === 'other' ? customProfession : selectedProfession;
    updateOnboardingData({ profession });
    nextStep();
  };
  
  const isValid = selectedProfession && (selectedProfession !== 'other' || customProfession.trim());
  
  return (
    <OnboardingLayout 
      title="Quel est votre domaine d'activité ?" 
      subtitle="Aidez-nous à personnaliser votre expérience"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {professions.map((profession) => (
            <Card 
              key={profession.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedProfession === profession.id 
                  ? 'ring-2 ring-purple-500 bg-purple-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedProfession(profession.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedProfession === profession.id ? 'bg-purple-500 text-white' : 'bg-gray-100'
                  }`}>
                    {profession.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{profession.name}</h3>
                    <p className="text-sm text-muted-foreground">{profession.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedProfession === profession.id 
                      ? 'bg-purple-500 border-purple-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedProfession === profession.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedProfession === 'other' && (
          <div className="space-y-2">
            <Label htmlFor="custom-profession">Précisez votre domaine d'activité</Label>
            <Input
              id="custom-profession"
              placeholder="Ex: Coach sportif, Photographe, Formateur..."
              value={customProfession}
              onChange={(e) => setCustomProfession(e.target.value)}
            />
          </div>
        )}
        
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

export default ProfessionStep;
