
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface BotStatisticsProps {
  subscriberCount: number;
  totalRevenue: number;
  monthlyPrice: string;
}

const BotStatistics = ({ subscriberCount, totalRevenue, monthlyPrice }: BotStatisticsProps) => {
  const recentSubscribers = ['Alice M.', 'John D.', 'Sarah K.'];

  return (
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

      <div className="mt-4">
        <h4 className="font-medium mb-2">Recent Subscribers</h4>
        <div className="space-y-2">
          {recentSubscribers.map((name, index) => (
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
  );
};

export default BotStatistics;
