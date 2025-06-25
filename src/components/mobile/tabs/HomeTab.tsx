
// src/components/mobile/tabs/HomeTab.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import CharacterEvolution from '@/components/character/CharacterEvolution';
import { Target, Sparkles, Video, MessageCircle, Upload, BarChart, FileText, Clock, TrendingUp } from 'lucide-react';
import { CharacterData } from '@/types/character';
import { UserStats } from '@/hooks/useUserStats';

interface HomeTabProps {
  character: CharacterData;
  onAddXP: (xp: number, type: string) => void;
  setActiveTab?: (tab: string) => void;
  setAICoachOpen?: (open: boolean) => void;
  setInitialPrompt?: (prompt: string) => void;
  userStats?: UserStats;
  statsLoading?: boolean;
}

const HomeTab = ({ 
  character, 
  onAddXP, 
  setActiveTab, 
  setAICoachOpen, 
  setInitialPrompt,
  userStats,
  statsLoading
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

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-coach-primary">Tableau de Bord</h2>
        <p className="text-sm text-muted-foreground mt-1">Vue d'ensemble de votre activité créative</p>
      </div>

      {/* Real User Stats */}
      {userStats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{userStats.scriptsGenerated}</div>
                <div className="text-xs text-muted-foreground">Scripts générés</div>
                <div className="text-xs text-green-600">{userStats.scriptsChange}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{userStats.chatConversations}</div>
                <div className="text-xs text-muted-foreground">Conversations IA</div>
                <div className="text-xs text-green-600">{userStats.chatChange}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{userStats.resourcesUploaded}</div>
                <div className="text-xs text-muted-foreground">Ressources</div>
                <div className="text-xs text-green-600">{userStats.resourcesChange}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{userStats.timeSaved}h</div>
                <div className="text-xs text-muted-foreground">Temps économisé</div>
                <div className="text-xs text-green-600">{userStats.timeChange}</div>
              </div>
            </div>
          </Card>
        </div>
      )}

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

      {/* Recent Activity */}
      {userStats?.recentActivities && userStats.recentActivities.length > 0 && (
        <Card className="p-6 glass-card">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-coach-primary" />
            Activité Récente
          </h3>
          <div className="space-y-3">
            {userStats.recentActivities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <div className="p-1 bg-coach-primary/20 rounded">
                  <activity.icon className="h-4 w-4 text-coach-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{activity.title}</div>
                  <div className="text-xs text-muted-foreground">{activity.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
      
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
