
import React from 'react';
import { Card } from '@/components/ui/card';
import { CharacterData } from '@/types/character';
import CharacterAvatar from './CharacterAvatar';
import CharacterProgress from './CharacterProgress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap } from 'lucide-react';

interface CharacterEvolutionProps {
  character: CharacterData;
  onLevelUp?: () => void;
}

const CharacterEvolution = ({ character, onLevelUp }: CharacterEvolutionProps) => {
  const getStageDescription = (stage: string) => {
    switch (stage) {
      case 'Beginner': return 'Apprend les bases';
      case 'Creator': return 'Crée du contenu régulièrement';
      case 'Influencer': return 'Influence sa communauté';
      case 'Expert': return 'Maître de son domaine';
      case 'Legend': return 'Légende vivante';
      default: return '';
    }
  };

  const recentAchievements = [
    { id: '1', title: 'Premier Script', icon: <Star className="w-4 h-4" />, unlocked: character.contentCreated >= 1 },
    { id: '2', title: 'Créateur Régulier', icon: <Zap className="w-4 h-4" />, unlocked: character.contentCreated >= 5 },
    { id: '3', title: 'Premiers Revenus', icon: <Trophy className="w-4 h-4" />, unlocked: character.revenue > 0 },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Character Header */}
        <div className="flex items-center gap-4">
          <CharacterAvatar character={character} size="lg" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{character.name}</h3>
            <Badge variant="secondary" className="mb-2">
              {character.stage} - {getStageDescription(character.stage)}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Type: {character.type}
            </p>
          </div>
        </div>

        {/* Progress */}
        <CharacterProgress character={character} />

        {/* Recent Achievements */}
        <div>
          <h4 className="font-semibold mb-3">Achievements Récents</h4>
          <div className="grid grid-cols-1 gap-2">
            {recentAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center gap-3 p-2 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                }`}
              >
                <div className={achievement.unlocked ? 'text-green-600' : 'text-muted-foreground'}>
                  {achievement.icon}
                </div>
                <span className="text-sm font-medium">{achievement.title}</span>
                {achievement.unlocked && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    Débloqué
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Goal */}
        <div className="bg-soft-blue rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Prochain Objectif</h4>
          <p className="text-sm text-blue-700">
            Créez {Math.max(1, 10 - character.contentCreated)} contenus de plus pour débloquer "Créateur Expérimenté"
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CharacterEvolution;
