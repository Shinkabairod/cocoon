
import React from 'react';
import { CharacterData, CharacterStage } from '@/types/character';
import { cn } from '@/lib/utils';
import { Crown, Star, Zap, Sparkles } from 'lucide-react';

interface CharacterAvatarProps {
  character: CharacterData;
  size?: 'sm' | 'md' | 'lg';
}

const CharacterAvatar = ({ character, size = 'md' }: CharacterAvatarProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12';
      case 'md': return 'w-20 h-20';
      case 'lg': return 'w-32 h-32';
    }
  };

  const getStageColor = (stage: CharacterStage) => {
    switch (stage) {
      case 'Beginner': return 'from-gray-400 to-gray-600';
      case 'Creator': return 'from-blue-400 to-blue-600';
      case 'Influencer': return 'from-purple-400 to-purple-600';
      case 'Expert': return 'from-yellow-400 to-yellow-600';
      case 'Legend': return 'from-pink-400 via-purple-500 to-yellow-500';
    }
  };

  const getStageIcon = (stage: CharacterStage) => {
    switch (stage) {
      case 'Beginner': return <Star className="w-4 h-4" />;
      case 'Creator': return <Zap className="w-4 h-4" />;
      case 'Influencer': return <Sparkles className="w-4 h-4" />;
      case 'Expert': return <Crown className="w-4 h-4" />;
      case 'Legend': return <Crown className="w-4 h-4 text-yellow-300" />;
    }
  };

  return (
    <div className="relative">
      <div 
        className={cn(
          "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold relative overflow-hidden",
          getSizeClasses(),
          getStageColor(character.stage)
        )}
      >
        {/* Character representation */}
        <div className="text-lg">{character.name[0]}</div>
        
        {/* Stage indicator */}
        <div className="absolute -top-1 -right-1 bg-background rounded-full p-1 border-2 border-background">
          {getStageIcon(character.stage)}
        </div>
        
        {/* Level indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-coach-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {character.level}
        </div>
      </div>
    </div>
  );
};

export default CharacterAvatar;
