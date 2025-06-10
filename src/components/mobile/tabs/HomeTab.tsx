
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CharacterEvolution from '@/components/character/CharacterEvolution';
import { Target, Sparkles } from 'lucide-react';
import { CharacterData } from '@/types/character';

interface HomeTabProps {
  character: CharacterData;
  onAddXP: (xp: number, type: string) => void;
}

const HomeTab = ({ character, onAddXP }: HomeTabProps) => {
  return (
    <div className="space-y-6">
      {/* Character Evolution - More Prominent */}
      <CharacterEvolution character={character} />
      
      {/* Daily Challenge - Enhanced */}
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
