
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ContentLibrary from '@/components/content/ContentLibrary';
import ContentCalendar from '@/components/content/ContentCalendar';
import { ContentItem } from '@/types/content';
import { UserStats } from '@/hooks/useUserStats';
import { Plus, Calendar, FileText, FolderOpen, Database } from 'lucide-react';

interface LibraryTabProps {
  contents: ContentItem[];
  getContentsByStatus: (status: string) => ContentItem[];
  userStats?: UserStats;
}

const LibraryTab = ({ contents, getContentsByStatus, userStats }: LibraryTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-coach-primary">Mes Ressources</h2>
          <p className="text-sm text-muted-foreground mt-1">Gérez et organisez vos contenus</p>
        </div>
        <Button className="gradient-bg shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Créer
        </Button>
      </div>

      {/* Real Workspace Stats */}
      {userStats?.workspace && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center glass-card">
            <div className="text-2xl font-bold text-blue-600 mb-1">{userStats.workspace.totalFiles}</div>
            <div className="text-xs text-blue-700 font-medium">Fichiers</div>
            <div className="text-xs text-blue-600 mt-1">Total</div>
          </Card>
          <Card className="p-4 text-center glass-card">
            <div className="text-2xl font-bold text-green-600 mb-1">{userStats.workspace.folders.length}</div>
            <div className="text-xs text-green-700 font-medium">Dossiers</div>
            <div className="text-xs text-green-600 mt-1">Organisés</div>
          </Card>
          <Card className="p-4 text-center glass-card">
            <div className="text-2xl font-bold text-purple-600 mb-1">{Math.round(userStats.workspace.storageUsed)}MB</div>
            <div className="text-xs text-purple-700 font-medium">Stockage</div>
            <div className="text-xs text-purple-600 mt-1">Utilisé</div>
          </Card>
        </div>
      )}

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">{getContentsByStatus('draft').length}</div>
          <div className="text-xs text-blue-700 font-medium">Brouillons</div>
          <div className="text-xs text-blue-600 mt-1">À éditer</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600 mb-1">{getContentsByStatus('planned').length}</div>
          <div className="text-xs text-yellow-700 font-medium">Planifiés</div>
          <div className="text-xs text-yellow-600 mt-1">Programmés</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-1">{getContentsByStatus('published').length}</div>
          <div className="text-xs text-green-700 font-medium">Publiés</div>
          <div className="text-xs text-green-600 mt-1">En ligne</div>
        </Card>
      </div>

      {/* Recent Files */}
      {userStats?.recentFiles && userStats.recentFiles.length > 0 && (
        <Card className="p-6 glass-card">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-coach-primary" />
            Fichiers Récents
          </h3>
          <div className="space-y-3">
            {userStats.recentFiles.slice(0, 5).map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.type} • {file.size}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{file.uploadedAt}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Content Library Component */}
      <Card className="p-1">
        <ContentLibrary 
          contents={contents}
          onEdit={(content) => console.log('Edit:', content)}
          onSchedule={(content) => console.log('Schedule:', content)}
        />
      </Card>

      {/* Editorial Calendar */}
      <Card className="p-6 glass-card">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-coach-primary" />
          Calendrier Éditorial
        </h3>
        <ContentCalendar contents={contents} />
      </Card>
    </div>
  );
};

export default LibraryTab;
