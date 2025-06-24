
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageSquare,
  Sparkles,
  Upload,
  BarChart3,
  FileText,
  Brain,
  TrendingUp,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  MoreHorizontal,
  Folder
} from 'lucide-react';

const FunctionalDashboard = () => {
  const { user } = useAuth();
  const { data: userStats, isLoading } = useUserStats(user?.id);

  // Actions rapides dans le header
  const quickActions = [
    { 
      label: 'Chat IA', 
      icon: MessageSquare, 
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: 'C'
    },
    { 
      label: 'Générer Script', 
      icon: Sparkles, 
      color: 'bg-purple-500 hover:bg-purple-600',
      shortcut: 'G'
    },
    { 
      label: 'Ajouter Ressource', 
      icon: Upload, 
      color: 'bg-green-500 hover:bg-green-600',
      shortcut: 'U'
    },
    { 
      label: 'Analyser', 
      icon: BarChart3, 
      color: 'bg-orange-500 hover:bg-orange-600',
      shortcut: 'A'
    }
  ];

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gem';

  if (isLoading) {
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation et actions */}
      <header className="bg-white border-b border-gray-200">
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
              
              {/* Navigation */}
              <nav className="hidden md:flex space-x-1">
                <Button variant="default" size="sm" className="bg-gray-900 text-white">
                  <div className="w-4 h-4 mr-2 grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
                  Projets
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </nav>
            </div>

            {/* Actions rapides et profil */}
            <div className="flex items-center space-x-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    className={`${action.color} text-white shadow-sm`}
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
              
              {/* Profile avec badge Gem */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Gem
                  </div>
                  <span className="text-sm font-medium">Create</span>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-600 text-white text-sm">
                    G
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Message de bienvenue */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {greeting}, {userName} ! 👋
                  </h2>
                  <p className="text-blue-100 mb-4">
                    Prêt à créer du contenu incroyable aujourd'hui ?
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Profil complété</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">{userStats?.completedGoals || 0} objectifs atteints</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{userStats?.totalScore || 0}</div>
                  <div className="text-sm text-blue-200">Score Créateur</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Scripts Générés</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats?.scriptsGenerated || 0}</p>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      {userStats?.scriptsChange || '0%'} ce mois
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Conversations IA</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats?.chatConversations || 0}</p>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      {userStats?.chatChange || '0%'} ce mois
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Ressources Uploadées</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats?.resourcesUploaded || 0}</p>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      {userStats?.resourcesChange || '0%'} ce mois
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Upload className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Temps Economisé</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats?.timeSaved || 0}h</p>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      {userStats?.timeChange || '+0h'} ce mois
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Grille principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Activité récente */}
            <div className="lg:col-span-2">
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
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <div className="w-8 h-8 border-2 border-gray-300 rounded-full relative">
                        <div className="absolute inset-2 border border-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune activité récente</h3>
                    <p className="text-sm text-gray-500">Commencez à utiliser Cocoon AI pour voir vos activités ici</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar droite */}
            <div className="space-y-6">
              {/* Stats rapides */}
              <Card>
                <CardHeader>
                  <CardTitle>Stats Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Scripts générés</span>
                    </div>
                    <span className="font-medium">{userStats?.scriptsGenerated || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Sessions IA</span>
                    </div>
                    <span className="font-medium">{userStats?.chatConversations || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Upload className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Ressources</span>
                    </div>
                    <span className="font-medium">{userStats?.resourcesUploaded || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Score Total</span>
                    </div>
                    <span className="font-medium">{userStats?.totalScore || 0}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Fichiers récents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Fichiers Récents</span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Folder className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-600 mb-1">Aucun fichier récent</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Section progression */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progression du contenu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Progression du Contenu</span>
                  <Target className="h-5 w-5 text-gray-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Objectif Hebdomadaire</span>
                    <span className="text-sm text-gray-500">
                      {userStats?.contentProgress?.weeklyProgress || 0}/{userStats?.contentProgress?.weeklyGoal || 10}
                    </span>
                  </div>
                  <Progress 
                    value={(userStats?.contentProgress?.weeklyProgress || 0) / (userStats?.contentProgress?.weeklyGoal || 10) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Plus que {(userStats?.contentProgress?.weeklyGoal || 10) - (userStats?.contentProgress?.weeklyProgress || 0)} contenus cette semaine
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-orange-900">Série Actuelle</p>
                      <p className="text-sm text-orange-700">{userStats?.contentProgress?.currentStreak || 0} jours consécutifs</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {userStats?.contentProgress?.currentStreak || 0} 🔥
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FunctionalDashboard;
