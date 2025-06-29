
// src/components/dashboard/workspace/WorkspaceHeader.tsx
import React from 'react';
import { Icons, Icon2D } from '@/components/ui/icons';

interface WorkspaceHeaderProps {
  title: string;
  description?: string;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Icon2D icon={Icons.folders.FolderOpen} size={32} color="#3B82F6" />
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};
