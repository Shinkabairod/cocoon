
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Copy, ExternalLink } from 'lucide-react';

interface BotConfigurationProps {
  monthlyPrice: string;
  onPriceChange: (price: string) => void;
  botUrl: string;
  onCopyUrl: () => void;
}

const BotConfiguration = ({ monthlyPrice, onPriceChange, botUrl, onCopyUrl }: BotConfigurationProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5" />
        Bot Configuration
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Monthly Subscription Price ($)
          </label>
          <Input
            type="number"
            value={monthlyPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="9.99"
            step="0.01"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Your Bot URL
          </label>
          <div className="flex gap-2">
            <Input 
              value={botUrl} 
              readOnly 
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={onCopyUrl}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-soft-blue rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            What subscribers get access to:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Your personalized AI assistant</li>
            <li>• All your curated resources</li>
            <li>• Your expertise and knowledge base</li>
            <li>• Priority support from your bot</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default BotConfiguration;
