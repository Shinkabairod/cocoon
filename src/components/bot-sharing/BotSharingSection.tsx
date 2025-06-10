
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Share2, 
  Users, 
  DollarSign, 
  Settings, 
  Eye,
  Copy,
  ExternalLink,
  Crown
} from 'lucide-react';

const BotSharingSection = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState('9.99');
  const [subscriberCount, setSubscriberCount] = useState(12);
  const [totalRevenue, setTotalRevenue] = useState(119.88);

  const botUrl = `https://ai-coach.app/bot/john-creator-bot`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(botUrl);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

        {/* Toggle Public/Private */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <span className="font-medium">Public Access</span>
            <p className="text-xs text-muted-foreground">
              Allow others to subscribe to your bot
            </p>
          </div>
          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
        </div>
      </Card>

      {/* Bot Configuration */}
      {isPublic && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Bot Configuration
          </h3>
          
          <div className="space-y-4">
            {/* Pricing */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Monthly Subscription Price ($)
              </label>
              <Input
                type="number"
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(e.target.value)}
                placeholder="9.99"
                step="0.01"
              />
            </div>

            {/* Bot URL */}
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
                <Button variant="outline" size="icon" onClick={handleCopyUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-soft-blue rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">
                What subscribers get access to:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your personalized AI assistant</li>
                <li>• All your curated resources</li>
                <li>• Your content templates & scripts</li>
                <li>• Your expertise and knowledge base</li>
                <li>• Priority support from your bot</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Statistics */}
      {isPublic && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Sharing Statistics
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-soft-purple rounded-lg">
              <div className="text-2xl font-bold text-coach-primary">{subscriberCount}</div>
              <div className="text-sm text-muted-foreground">Active Subscribers</div>
            </div>
            <div className="text-center p-3 bg-soft-green rounded-lg">
              <div className="text-2xl font-bold text-green-600">${totalRevenue}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
          </div>

          {/* Recent Subscribers */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Recent Subscribers</h4>
            <div className="space-y-2">
              {['Alice M.', 'John D.', 'Sarah K.'].map((name, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm">{name}</span>
                  <Badge variant="outline" className="text-xs">
                    ${monthlyPrice}/month
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Premium Features */}
      <Card className="p-4 border-2 border-coach-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold">Premium Bot Sharing</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            Advanced analytics and insights
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            Custom pricing tiers
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Subscriber management tools
          </div>
          
          <Button className="w-full gradient-bg" variant="default">
            Upgrade to Premium
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      {isPublic && (
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Bot
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview Bot
          </Button>
        </div>
      )}
    </div>
  );
};

export default BotSharingSection;
