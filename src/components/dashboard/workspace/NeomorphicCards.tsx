
// src/components/dashboard/workspace/NeomorphicCards.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons, Icon2D } from '@/components/ui/icons';

interface WorkspaceNeomorphicCardsProps {
  totalFolders: number;
  totalFiles: number;
  resourceFiles: number;
  videoFiles: number;
  onNewNote: () => void;
  onAddLink: () => void;
  onUploadFile: () => void;
  onNewFolder: () => void;
}

export const WorkspaceNeomorphicCards: React.FC<WorkspaceNeomorphicCardsProps> = ({
  totalFolders,
  totalFiles,
  resourceFiles,
  videoFiles,
  onNewNote,
  onAddLink,
  onUploadFile,
  onNewFolder
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onNewNote}>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Icon2D icon={Icons.actions.Plus} size={32} color="#3B82F6" />
            <div className="ml-4">
              <p className="text-sm font-medium">New Note</p>
              <p className="text-xs text-muted-foreground">Create a new note</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onAddLink}>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Icon2D icon={Icons.files.Link} size={32} color="#10B981" />
            <div className="ml-4">
              <p className="text-sm font-medium">Add Link</p>
              <p className="text-xs text-muted-foreground">Save web resources</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onUploadFile}>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Icon2D icon={Icons.actions.Upload} size={32} color="#8B5CF6" />
            <div className="ml-4">
              <p className="text-sm font-medium">Upload Files</p>
              <p className="text-xs text-muted-foreground">PDFs, videos, docs</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onNewFolder}>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Icon2D icon={Icons.folders.FolderOpen} size={32} color="#F59E0B" />
            <div className="ml-4">
              <p className="text-sm font-medium">New Folder</p>
              <p className="text-xs text-muted-foreground">Organize content</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const NeomorphicCard = WorkspaceNeomorphicCards;
export const NeomorphicGrid = WorkspaceNeomorphicCards;
