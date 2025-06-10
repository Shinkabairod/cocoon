
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Eye, DollarSign, Users } from 'lucide-react';

const PremiumFeatures = () => {
  return (
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
  );
};

export default PremiumFeatures;
