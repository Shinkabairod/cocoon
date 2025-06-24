
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Upload,
  Sparkles,
  BarChart3,
  Activity
} from 'lucide-react';
import { 
  ContentProgress, 
  QuickStats, 
  RecentFiles, 
  AIInsights, 
  WorkspaceSection 
} from '@/components/dashboard/DashboardComponents';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

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

export default Dashboard;
