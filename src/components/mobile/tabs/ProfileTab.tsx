
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BotSharingSection from '@/components/bot-sharing/BotSharingSection';
import { CharacterData } from '@/types/character';
import { UserStats } from '@/hooks/useUserStats';
import { Lightbulb, TrendingUp, Award, Star } from 'lucide-react';

interface ProfileTabProps {
  character: CharacterData;
  userStats?: UserStats;
}

const ProfileTab = ({ character, userStats }: ProfileTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-coach-primary">Mon Profil</h2>
        <p className="text-sm text-muted-foreground mt-1">Gérez votre profil et vos préférences</p>
      </div>

      {/* User Profile Card */}
      <Card className="p-6 glass-card">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-coach-primary to-coach-secondary rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
            {character.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p className="text-muted-foreground">{character.type} • Niveau {character.level}</p>
            {userStats && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{userStats.totalScore} points</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      {userStats?.aiInsights && userStats.aiInsights.length > 0 && (
        <Card className="p-6 glass-card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-coach-primary" />
            Conseils Personnalisés
          </h3>
          <div className="space-y-3">
            {userStats.aiInsights.map((insight) => (
              <div key={insight.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-start gap-3">
                  <div className={`p-1 rounded ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-600' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {insight.type === 'achievement' ? <Award className="h-4 w-4" /> :
                     insight.type === 'tip' ? <Lightbulb className="h-4 w-4" /> :
                     <TrendingUp className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{insight.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{insight.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bot Monetization Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Monétisez votre Assistant IA</h3>
        <BotSharingSection />
      </div>

      {/* Social Media Connections */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-3">Comptes Connectés</h3>
        <div className="space-y-2">
          {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(platform => (
            <div key={platform} className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">{platform}</span>
              <Button variant="outline" size="sm">Connecter</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Real Stats Overview */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-4">Mes Statistiques</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-soft-purple rounded-lg">
            <div className="text-2xl font-bold text-coach-primary">
              {userStats?.scriptsGenerated || character.contentCreated}
            </div>
            <div className="text-sm text-muted-foreground">Scripts</div>
          </div>
          <div className="text-center p-3 bg-soft-green rounded-lg">
            <div className="text-2xl font-bold text-green-600">{character.level}</div>
            <div className="text-sm text-muted-foreground">Niveau</div>
          </div>
          <div className="text-center p-3 bg-soft-blue rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {userStats?.chatConversations || 0}
            </div>
            <div className="text-sm text-muted-foreground">Conversations</div>
          </div>
          <div className="text-center p-3 bg-soft-orange rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {userStats?.timeSaved || 0}h
            </div>
            <div className="text-sm text-muted-foreground">Temps économisé</div>
          </div>
        </div>
      </Card>

      {/* Progress Overview */}
      {userStats?.contentProgress && (
        <Card className="p-4 glass-card">
          <h3 className="font-semibold mb-4">Progression du Mois</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-coach-primary">
                {userStats.contentProgress.monthlyStats.scripts}
              </div>
              <div className="text-xs text-muted-foreground">Scripts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {userStats.contentProgress.monthlyStats.chats}
              </div>
              <div className="text-xs text-muted-foreground">Chats</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {userStats.contentProgress.monthlyStats.uploads}
              </div>
              <div className="text-xs text-muted-foreground">Uploads</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProfileTab;
