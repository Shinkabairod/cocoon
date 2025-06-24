
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, MessageSquare, Upload, Clock } from 'lucide-react';

interface StatsOverviewProps {
  stats: any;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Scripts Générés',
      value: stats?.scriptsGenerated || 0,
      change: stats?.scriptsChange || '+0%',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversations IA',
      value: stats?.chatConversations || 0,
      change: stats?.chatChange || '+0%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Ressources Uploadées',
      value: stats?.resourcesUploaded || 0,
      change: stats?.resourcesChange || '+0%',
      trend: 'up',
      icon: Upload,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Temps Economisé',
      value: `${stats?.timeSaved || 0}h`,
      change: stats?.timeChange || '+0h',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} ce mois
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsOverview;
