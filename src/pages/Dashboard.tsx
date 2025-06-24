
// Dashboard PC complètement redesigné avec vraies données

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Upload,
  Settings,
  TrendingUp,
  Brain,
  Sparkles,
  Calendar,
  Target,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
  Activity
} from 'lucide-react';
import { 
  ContentProgress, 
  QuickStats, 
  RecentFiles, 
  AIInsights, 
  WorkspaceSection 
} from '@/components/dashboard/DashboardComponents';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: userStats, isLoading } = useUserStats(user?.id);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // Actions principales dans le header
  const quickActions = [
    { 
      id: 'chat', 
      label: 'Chat IA', 
      icon: MessageSquare, 
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: 'C'
    },
    { 
      id: 'generate', 
      label: 'Générer Script', 
      icon: Sparkles, 
      color: 'bg-purple-500 hover:bg-purple-600',
      shortcut: 'G'
    },
    { 
      id: 'upload', 
      label: 'Ajouter Ressource', 
      icon: Upload, 
      color: 'bg-green-500 hover:bg-green-600',
      shortcut: 'U'
    },
    { 
      id: 'analyze', 
      label: 'Analyser', 
      icon: BarChart3, 
      color: 'bg-orange-500 hover:bg-orange-600',
      shortcut: 'A'
    }
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header moderne avec actions */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et navigation */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Cocoon AI</h1>
              </div>
              
              {/* Navigation secondaire */}
              <nav className="hidden md:flex space-x-1">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
                  Projets
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Activity className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </nav>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center space-x-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    onClick={() => setActiveAction(action.id)}
                    className={`${action.color} text-white shadow-sm relative group`}
                    size="sm"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.label}
                    <kbd className="ml-2 opacity-70 text-xs border border-white/20 px-1 rounded">
                      {action.shortcut}
                    </kbd>
                  </Button>
                );
              })}
              
              {/* Profile */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500">Créateur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Message de bienvenue personnalisé */}
          <WelcomeSection user={user} stats={userStats} />
          
          {/* KPIs principales */}
          <StatsOverview stats={userStats} />
          
          {/* Grille principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity activities={userStats?.recentActivities} />
              <ContentProgress progress={userStats?.contentProgress} />
            </div>
            
            {/* Sidebar droite */}
            <div className="space-y-6">
              <QuickStats stats={userStats} />
              <RecentFiles files={userStats?.recentFiles} />
              <AIInsights insights={userStats?.aiInsights} />
            </div>
          </div>
          
          {/* Section workspace intégrée */}
          <WorkspaceSection workspace={userStats?.workspace} />
        </div>
      </main>
    </div>
  );
};

// Composant message de bienvenue avec contexte
const WelcomeSection: React.FC<{ user: any; stats: any }> = ({ user, stats }) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Créateur';

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {greeting}, {userName} ! 👋
            </h2>
            <p className="text-blue-100 mb-4">
              {stats?.todayActivity > 0 
                ? `Vous avez déjà généré ${stats.todayActivity} contenus aujourd'hui !`
                : "Prêt à créer du contenu incroyable aujourd'hui ?"
              }
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Profil complété</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">{stats?.completedGoals || 0} objectifs atteints</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats?.totalScore || 0}</div>
            <div className="text-sm text-blue-200">Score Créateur</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats overview avec vraies données
const StatsOverview: React.FC<{ stats: any }> = ({ stats }) => {
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

// Activité récente avec timeline
const RecentActivity: React.FC<{ activities: any[] }> = ({ activities = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Activité Récente</span>
          <Button variant="ghost" size="sm">
            Voir tout <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? activities.map((activity, index) => {
            const ActivityIcon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ActivityIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            );
          }) : (
            <div className="text-center py-6">
              <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Aucune activité récente</p>
              <p className="text-xs text-gray-400">Commencez à utiliser Cocoon AI pour voir vos activités ici</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton loader
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white border-b p-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="p-6 space-y-6">
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
