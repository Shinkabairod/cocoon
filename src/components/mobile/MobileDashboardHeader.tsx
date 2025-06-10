
import React from 'react';
import StarDisplay from '@/components/ui/star-display';

interface MobileDashboardHeaderProps {
  userStars: number;
  characterName: string;
  characterLevel: number;
}

const MobileDashboardHeader = ({ userStars, characterName, characterLevel }: MobileDashboardHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">AI Content Coach</h1>
        <div className="flex items-center gap-3">
          <StarDisplay count={userStars} size="sm" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level {characterLevel}</span>
            <div className="w-8 h-8 bg-gradient-to-br from-coach-primary to-coach-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
              {characterName[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboardHeader;
