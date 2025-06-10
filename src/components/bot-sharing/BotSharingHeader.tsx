
import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Share2 } from 'lucide-react';

interface BotSharingHeaderProps {
  isPublic: boolean;
  onTogglePublic: (checked: boolean) => void;
}

const BotSharingHeader = ({ isPublic, onTogglePublic }: BotSharingHeaderProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-coach-primary to-coach-secondary flex items-center justify-center">
          <Share2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Share Your AI Bot</h2>
          <p className="text-sm text-muted-foreground">
            Let others access your personalized AI and resources
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
        <div>
          <span className="font-medium">Public Access</span>
          <p className="text-xs text-muted-foreground">
            Allow others to subscribe to your bot
          </p>
        </div>
        <Switch checked={isPublic} onCheckedChange={onTogglePublic} />
      </div>
    </Card>
  );
};

export default BotSharingHeader;
