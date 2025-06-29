import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, CheckCircle, Folder } from 'lucide-react';

// Section workspace
export const WorkspaceSection: React.FC<{ workspace: any }> = ({ workspace }) => {
  return (
    <Card variant="neomorphic">
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