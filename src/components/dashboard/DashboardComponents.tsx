
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Upload,
  Folder,
  Calendar,
  TrendingUp,
  Target,
  Brain,
  CheckCircle,
  ArrowRight,
  Plus,
  MoreHorizontal,
  Download,
  Share,
  Eye,
  Sparkles
} from 'lucide-react';

// Progression du contenu avec objectifs
export const ContentProgress: React.FC<{ progress: any }> = ({ progress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Progression du Contenu</span>
          <Target className="h-5 w-5 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Objectif hebdomadaire */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Objectif Hebdomadaire</span>
            <span className="text-sm text-gray-500">
              {progress?.weeklyProgress || 0}/{progress?.weeklyGoal || 10}
            </span>
          </div>
          <Progress 
            value={(progress?.weeklyProgress || 0) / (progress?.weeklyGoal || 10) * 100} 
            className="h-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Plus que {(progress?.weeklyGoal || 10) - (progress?.weeklyProgress || 0)} contenus cette semaine
          </p>
        </div>

        {/* Streak actuel */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-orange-900">Série Actuelle</p>
              <p className="text-sm text-orange-700">{progress?.currentStreak || 0} jours consécutifs</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {progress?.currentStreak || 0} 🔥
          </Badge>
        </div>

        {/* Stats mensuelles */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{progress?.monthlyStats?.scripts || 0}</div>
            <div className="text-xs text-blue-500">Scripts</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{progress?.monthlyStats?.chats || 0}</div>
            <div className="text-xs text-green-500">Chats IA</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{progress?.monthlyStats?.uploads || 0}</div>
            <div className="text-xs text-purple-500">Uploads</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Stats rapides
export const QuickStats: React.FC<{ stats: any }> = ({ stats }) => {
  return (
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
          <span className="font-medium">{stats?.scriptsGenerated || 0}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-purple-600" />
            <span className="text-sm">Sessions IA</span>
          </div>
          <span className="font-medium">{stats?.chatConversations || 0}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Upload className="h-4 w-4 text-green-600" />
            <span className="text-sm">Ressources</span>
          </div>
          <span className="font-medium">{stats?.resourcesUploaded || 0}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-orange-600" />
            <span className="text-sm">Score Total</span>
          </div>
          <span className="font-medium">{stats?.totalScore || 0}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Fichiers récents
export const RecentFiles: React.FC<{ files: any[] }> = ({ files = [] }) => {
  return (
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
        <div className="space-y-3">
          {files.length > 0 ? files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate max-w-[120px]">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.uploadedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )) : (
            <div className="text-center py-4">
              <Folder className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Aucun fichier récent</p>
            </div>
          )}
        </div>
        
        {files.length > 0 && (
          <Button variant="ghost" className="w-full mt-3 text-xs">
            Voir tous les fichiers <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Insights IA
export const AIInsights: React.FC<{ insights: any[] }> = ({ insights = [] }) => {
  const getInsightColor = (type: string, priority: string) => {
    if (type === 'tip') return 'bg-blue-50 border-blue-200 text-blue-800';
    if (type === 'achievement') return 'bg-green-50 border-green-200 text-green-800';
    if (type === 'suggestion') return 'bg-purple-50 border-purple-200 text-purple-800';
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getInsightIcon = (type: string) => {
    if (type === 'tip') return <Brain className="h-4 w-4" />;
    if (type === 'achievement') return <CheckCircle className="h-4 w-4" />;
    if (type === 'suggestion') return <Sparkles className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>Insights IA</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.length > 0 ? insights.map((insight, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.type, insight.priority)}`}>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-xs mt-1 opacity-80">{insight.description}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-4">
              <Brain className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Pas d'insights pour le moment</p>
              <p className="text-xs text-gray-400">Continuez à utiliser la plateforme pour recevoir des conseils personnalisés</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Section workspace
export const WorkspaceSection: React.FC<{ workspace: any }> = ({ workspace }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mon Workspace</span>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stockage */}
          <div className="space-y-3">
            <h4 className="font-medium">Stockage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Utilisé</span>
                <span>{Math.round(workspace?.storageUsed || 0)} MB / {workspace?.storageLimit || 1000} MB</span>
              </div>
              <Progress 
                value={(workspace?.storageUsed || 0) / (workspace?.storageLimit || 1000) * 100} 
                className="h-2"
              />
            </div>
          </div>

          {/* Fichiers */}
          <div className="space-y-3">
            <h4 className="font-medium">Fichiers</h4>
            <div className="text-2xl font-bold text-blue-600">
              {workspace?.totalFiles || 0}
            </div>
            <p className="text-xs text-gray-500">
              Répartis dans {workspace?.folders?.length || 0} dossiers
            </p>
          </div>

          {/* Dernière sync */}
          <div className="space-y-3">
            <h4 className="font-medium">Dernière Sync</h4>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">
                {workspace?.lastSync ? new Date(workspace.lastSync).toLocaleDateString() : 'Jamais'}
              </span>
            </div>
          </div>
        </div>

        {/* Folders rapides */}
        {workspace?.folders && workspace.folders.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Dossiers Récents</h4>
            <div className="flex flex-wrap gap-2">
              {workspace.folders.slice(0, 6).map((folder: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <Folder className="h-3 w-3" />
                  <span>{folder}</span>
                </Badge>
              ))}
              {workspace.folders.length > 6 && (
                <Badge variant="outline">+{workspace.folders.length - 6} autres</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
