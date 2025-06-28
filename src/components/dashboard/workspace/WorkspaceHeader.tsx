// src/components/dashboard/workspace/WorkspaceHeader.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Download, Upload, Plus } from 'lucide-react';

interface WorkspaceHeaderProps {
  foldersCount: number;
  onExport: () => void;
  onImport: () => void;
  onNewFolder: () => void;
  onAddFile: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  foldersCount,
  onExport,
  onImport,
  onNewFolder,
  onAddFile
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <FolderOpen className="h-8 w-8 text-purple-600" />
      <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
      <Badge variant="secondary" className="ml-2">
        {foldersCount} folders
      </Badge>
    </div>
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="h-4 w-4 mr-1" />
        Export
      </Button>
      <Button variant="outline" size="sm" onClick={() => document.getElementById('import-input')?.click()}>
        <Upload className="h-4 w-4 mr-1" />
        Import
      </Button>
      <Button onClick={onNewFolder} className="bg-purple-600 hover:bg-purple-700">
        <Plus className="h-4 w-4 mr-1" />
        New Folder
      </Button>
      <Button onClick={onAddFile} variant="outline">
        <Upload className="h-4 w-4 mr-1" />
        Add File
      </Button>
    </div>
  </div>
);
