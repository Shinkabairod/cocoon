// src/components/dashboard/workspace/FolderGrid.tsx
import React from 'react';
import FolderCard from './FolderCard';

interface FolderGridProps {
  folders: any[];
  onFolderClick: (folder: any) => void;
  onEditFolder: (folder: any) => void;
  onDeleteFolder: (folderId: string) => void;
}

export const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  onFolderClick,
  onEditFolder,
  onDeleteFolder
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 justify-items-center">
    {folders.map((folder) => (
      <FolderCard
        key={folder.id}
        folder={folder}
        onClick={() => onFolderClick(folder)}
        onEdit={() => onEditFolder(folder)}
        onDelete={() => onDeleteFolder(folder.id)}
      />
    ))}
  </div>
);

export default FolderGrid;
