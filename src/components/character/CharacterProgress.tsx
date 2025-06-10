
import React from 'react';
import { CharacterData } from '@/types/character';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Zap, Target, TrendingUp, BookOpen } from 'lucide-react';

interface CharacterProgressProps {
  character: CharacterData;
}

const CharacterProgress = ({ character }: CharacterProgressProps) => {
  const xpPercentage = (character.xp / character.xpToNext) * 100;

  const statIcons = {
    creativity: <Zap className="w-4 h-4" />,
    technical: <Target className="w-4 h-4" />,
    marketing: <TrendingUp className="w-4 h-4" />,
    storytelling: <BookOpen className="w-4 h-4" />
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Niveau {character.level}</span>
            <span className="text-xs text-muted-foreground">
              {character.xp}/{character.xpToNext} XP
            </span>
          </div>
          <Progress value={xpPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(character.stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center gap-2">
              <div className="text-coach-primary">
                {statIcons[stat as keyof typeof statIcons]}
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground capitalize">{stat}</div>
                <Progress value={(value / 100) * 100} className="h-1" />
              </div>
              <span className="text-xs font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t text-center">
          <div>
            <div className="text-lg font-bold text-coach-primary">{character.contentCreated}</div>
            <div className="text-xs text-muted-foreground">Contenus</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">${character.revenue}</div>
            <div className="text-xs text-muted-foreground">Revenus</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{character.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CharacterProgress;
