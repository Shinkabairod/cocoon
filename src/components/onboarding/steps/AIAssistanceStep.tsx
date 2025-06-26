
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { 
  Brain, 
  BookOpen, 
  Users, 
  Zap,
  Target,
  MessageSquare,
  FileText,
  Lightbulb
} from "lucide-react";

const AIAssistanceStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [aiAssistanceAreas, setAiAssistanceAreas] = useState<string[]>(onboardingData.aiAssistanceAreas || []);
  const [learningStyle, setLearningStyle] = useState(onboardingData.learningStyle || '');
  
  const assistanceAreas = [
    {
      id: 'content_creation',
      name: 'Création de contenu',
      icon: <FileText className="h-6 w-6" />,
      description: 'Articles, posts, scripts, newsletters'
    },
    {
      id: 'brainstorming',
      name: 'Brainstorming',
      icon: <Lightbulb className="h-6 w-6" />,
      description: 'Génération d\'idées créatives'
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Emails, messages, présentations'
    },
    {
      id: 'learning',
      name: 'Apprentissage',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Recherche, formation, veille'
    },
    {
      id: 'strategy',
      name: 'Stratégie',
      icon: <Target className="h-6 w-6" />,
      description: 'Planification, objectifs, décisions'
    },
    {
      id: 'automation',
      name: 'Automatisation',
      icon: <Zap className="h-6 w-6" />,
      description: 'Workflows, tâches répétitives'
    },
    {
      id: 'analysis',
      name: 'Analyse',
      icon: <Brain className="h-6 w-6" />,
      description: 'Données, performances, insights'
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      icon: <Users className="h-6 w-6" />,
      description: 'Travail d\'équipe, gestion de projet'
    }
  ];
  
  const learningStyles = [
    { value: 'Step-by-step guides', label: 'Guides étape par étape', description: 'Instructions détaillées et structurées' },
    { value: 'Video tutorials', label: 'Tutoriels vidéo', description: 'Apprentissage visuel et pratique' },
    { value: 'Articles', label: 'Articles et documentation', description: 'Lecture approfondie' },
    { value: 'Interactive exercises', label: 'Exercices interactifs', description: 'Apprentissage par la pratique' },
    { value: 'AI suggestions', label: 'Suggestions IA', description: 'Conseils personnalisés en temps réel' }
  ];
  
  const toggleArea = (areaId: string) => {
    setAiAssistanceAreas(prev => 
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      aiAssistanceAreas,
      learningStyle
    });
    nextStep();
  };
  
  const isValid = aiAssistanceAreas.length > 0 && learningStyle;
  
  return (
    <OnboardingLayout 
      title="Comment souhaitez-vous être assisté ?" 
      subtitle="Personnalisez votre assistance IA selon vos préférences"
      fullWidth={true}
    >
      <div className="space-y-8">
        {/* Domaines d'assistance */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Domaines où l'IA peut vous aider</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {assistanceAreas.map((area) => {
              const isSelected = aiAssistanceAreas.includes(area.id);
              
              return (
                <Card 
                  key={area.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? 'ring-2 ring-purple-500 bg-purple-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleArea(area.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`inline-flex p-3 rounded-full mb-3 ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                    }`}>
                      {area.icon}
                    </div>
                    <h4 className="font-medium mb-1">{area.name}</h4>
                    <p className="text-xs text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Style d'apprentissage */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Comment préférez-vous apprendre ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {learningStyles.map((style) => (
              <Card 
                key={style.value}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  learningStyle === style.value 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setLearningStyle(style.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                      learningStyle === style.value 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {learningStyle === style.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{style.label}</h4>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="w-full max-w-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleContinue}
            disabled={!isValid}
          >
            Finaliser
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default AIAssistanceStep;
