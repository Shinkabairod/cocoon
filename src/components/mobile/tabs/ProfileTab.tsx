
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BotSharingSection from '@/components/bot-sharing/BotSharingSection';
import { CharacterData } from '@/types/character';

interface ProfileTabProps {
  character: CharacterData;
}

const ProfileTab = ({ character }: ProfileTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-coach-primary">Paramètres</h2>
        <p className="text-sm text-muted-foreground mt-1">Gérez votre profil et vos préférences</p>
      </div>

      {/* User Profile Card */}
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-coach-primary to-coach-secondary rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
            {character.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p className="text-muted-foreground">{character.type} • Niveau {character.level}</p>
          </div>
        </div>
      </Card>

      {/* Bot Monetization Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Monétisez votre Assistant IA</h3>
        <BotSharingSection />
      </div>

      {/* Social Media Connections */}
      <Card className="p-4">
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

      {/* Stats Overview */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Mes Statistiques</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-soft-purple rounded-lg">
            <div className="text-2xl font-bold text-coach-primary">{character.contentCreated}</div>
            <div className="text-sm text-muted-foreground">Contenus</div>
          </div>
          <div className="text-center p-3 bg-soft-green rounded-lg">
            <div className="text-2xl font-bold text-green-600">{character.level}</div>
            <div className="text-sm text-muted-foreground">Niveau</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileTab;
