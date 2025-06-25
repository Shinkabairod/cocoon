
// src/components/mobile/tabs/HomeTab.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CharacterEvolution from '@/components/character/CharacterEvolution';
import { Target, Sparkles, Video, MessageCircle, Upload, BarChart } from 'lucide-react';
import { CharacterData } from '@/types/character';

interface HomeTabProps {
  character: CharacterData;
  onAddXP: (xp: number, type: string) => void;
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
          setActiveTab('library');
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
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-coach-primary">Accueil</h2>
        <p className="text-sm text-muted-foreground mt-1">Bienvenue dans votre espace créateur</p>
      </div>

      {/* Character Evolution */}
      <CharacterEvolution character={character} />
      
      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.action}
              className="h-20 flex flex-col items-center gap-2 glass-button border-0 hover:shadow-md transition-all"
            >
              <div className={`${action.color} p-2 rounded-lg text-white`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Daily Challenge */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-coach-primary/20 rounded-full">
              <Target className="h-6 w-6 text-coach-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Défi du Jour</h3>
              <p className="text-sm text-muted-foreground">Complétez pour gagner de l'XP</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
            +100 XP
          </Badge>
        </div>
        <p className="text-sm mb-4 leading-relaxed">
          Créez un script de 30 secondes sur votre passion principale et entraînez-vous à raconter des histoires
        </p>
        <Button 
          className="w-full gradient-bg shadow-lg"
          onClick={() => onAddXP(100, 'content')}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Commencer le Défi
        </Button>
      </div>
    </div>
  );
};

export default HomeTab;
