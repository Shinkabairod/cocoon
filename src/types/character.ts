
export type CharacterStage = 'Beginner' | 'Creator' | 'Influencer' | 'Expert' | 'Legend';
export type CharacterType = 'Artist' | 'Entrepreneur' | 'Teacher' | 'Entertainer';

export interface CharacterStats {
  creativity: number;
  technical: number;
  marketing: number;
  storytelling: number;
}

export interface CharacterData {
  name: string;
  type: CharacterType;
  stage: CharacterStage;
  level: number;
  xp: number;
  xpToNext: number;
  stats: CharacterStats;
  achievements: string[];
  contentCreated: number;
  revenue: number;
  followers: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: {
    type: 'content' | 'revenue' | 'followers' | 'level';
    value: number;
  };
}
