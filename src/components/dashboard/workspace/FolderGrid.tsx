
import React from 'react';
import FolderCard from './FolderCard';

interface FolderGridProps {
  folders: any[];
  onFolderClick: (folder: any) => void;
  onEditFolder: (folder: any) => void;
  onDeleteFolder: (folderId: string) => void;
}

const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  onFolderClick,
  onEditFolder,
  onDeleteFolder
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
