
import { useState, useEffect } from 'react';
import { CharacterData, CharacterStage, CharacterType } from '@/types/character';

const useCharacter = () => {
  const [character, setCharacter] = useState<CharacterData>({
    name: 'Mon Avatar',
    type: 'Creator' as CharacterType,
    stage: 'Beginner',
    level: 1,
    xp: 0,
    xpToNext: 100,
    stats: {
      creativity: 10,
      technical: 5,
      marketing: 5,
      storytelling: 10
    },
    achievements: [],
    contentCreated: 0,
    revenue: 0,
    followers: 0
  });

  const addXP = (amount: number, source: string = 'general') => {
    setCharacter(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNext;
      let newStage = prev.stage;

      // Level up logic
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = Math.floor(newXPToNext * 1.2);
      }

      // Stage progression logic
      if (newLevel >= 50) newStage = 'Legend';
      else if (newLevel >= 30) newStage = 'Expert';
      else if (newLevel >= 20) newStage = 'Influencer';
      else if (newLevel >= 10) newStage = 'Creator';

      // Update stats based on source
      const newStats = { ...prev.stats };
      switch (source) {
        case 'content':
          newStats.creativity += Math.floor(amount / 20);
          break;
        case 'marketing':
          newStats.marketing += Math.floor(amount / 20);
          break;
        case 'technical':
          newStats.technical += Math.floor(amount / 20);
          break;
        case 'storytelling':
          newStats.storytelling += Math.floor(amount / 20);
          break;
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: newXPToNext,
        stage: newStage,
        stats: newStats
      };
    });
  };

  const completeContent = () => {
    setCharacter(prev => ({
      ...prev,
      contentCreated: prev.contentCreated + 1
    }));
    addXP(50, 'content');
  };

  const addRevenue = (amount: number) => {
    setCharacter(prev => ({
      ...prev,
      revenue: prev.revenue + amount
    }));
    addXP(amount * 2, 'marketing');
  };

  const addFollowers = (amount: number) => {
    setCharacter(prev => ({
      ...prev,
      followers: prev.followers + amount
    }));
    addXP(amount, 'marketing');
  };

  return {
    character,
    addXP,
    completeContent,
    addRevenue,
    addFollowers
  };
};

export default useCharacter;
