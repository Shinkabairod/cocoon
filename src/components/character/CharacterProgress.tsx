
import React from 'react';
import { CharacterData } from '@/types/character';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface CharacterProgressProps {
  character: CharacterData;
}

const CharacterProgress = ({ character }: CharacterProgressProps) => {
  const xpPercentage = (character.xp / character.xpToNext) * 100;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Level {character.level}</span>
            <span className="text-xs text-muted-foreground">
              {character.xp}/{character.xpToNext} XP
            </span>
          </div>
          <Progress value={xpPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t text-center">
          <div>
            <div className="text-lg font-bold text-coach-primary">{character.contentCreated}</div>
            <div className="text-xs text-muted-foreground">Content</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">${character.revenue}</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
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
