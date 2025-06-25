// src/components/mobile/tabs/HomeTab.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CharacterEvolution from '@/components/character/CharacterEvolution';
import { Target, Sparkles, Video, MessageCircle, Upload, BarChart } from 'lucide-react';
import { CharacterData } from '@/types/character';

interface HomeTabProps {
  character: CharacterData;
  onAddXP: (xp: number, type: string) => void;
  // AJOUTEZ CES PROPS
  setActiveTab?: (tab: string) => void;
  setAICoachOpen?: (open: boolean) => void;
  setInitialPrompt?: (prompt: string) => void;
}

const HomeTab = ({ 
  character, 
  onAddXP, 
  setActiveTab, 
  setAICoachOpen, 
  setInitialPrompt 
}: HomeTabProps) => {

  // VOTRE CODE quickActions ICI ⬇️
  const quickActions = [
    { 
      icon: <Video className="h-5 w-5" />,
      label: "Script Vidéo",
      color: "bg-red-500",
      action: () => {
        if (setAICoachOpen && setInitialPrompt) {
          setInitialPrompt("Aide-moi à créer un script de vidéo pour ma prochaine publication");
          setAICoachOpen(true);
        }
      }
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Coach IA", 
      color: "bg-purple-500",
      action: () => {
        if (setAICoachOpen) {
          setAICoachOpen(true);
        }
      }
    },
    {
      icon: <Upload className="h-5 w-5" />,
      label: "Mes Ressources",
      color: "bg-blue-500", 
      action: () => {
        if (setActiveTab) {
          setActiveTab('tools'); // Ou créer un onglet ressources
        }
      }
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Analyser",
      color: "bg-green-500",
      action: () => {
        if (setAICoachOpen && setInitialPrompt) {
          setInitialPrompt("Analyse mes dernières performances et donne-moi des conseils d'amélioration");
          setAICoachOpen(true);
        }
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Character Evolution - Existant */}
      <CharacterEvolution character={character} />
      
      {/* Actions rapides - NOUVELLE SECTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.action}
              className="h-20 flex flex-col items-center gap-2 border-2 hover:shadow-md transition-all"
            >
              <div className={`${action.color} p-2 rounded-lg text-white`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Daily Challenge - Existant */}
      <Card className="p-6 bg-gradient-to-r from-coach-primary/10 to-coach-secondary/10 border-coach-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-coach-primary/20 rounded-full">
              <Target className="h-6 w-6 text-coach-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Today's Challenge</h3>
              <p className="text-sm text-muted-foreground">Complete to earn XP</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
            +100 XP
          </Badge>
        </div>
        <p className="text-sm mb-4 leading-relaxed">
          Create a 30-second script about your main passion and practice your storytelling skills
        </p>
        <Button 
          className="w-full gradient-bg shadow-lg"
          onClick={() => onAddXP(100, 'content')}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Start Challenge
        </Button>
      </Card>
    </div>
  );
};

export default HomeTab;