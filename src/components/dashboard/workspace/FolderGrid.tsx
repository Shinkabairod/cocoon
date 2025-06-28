
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
}) => {
  if (folders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun dossier</h3>
        <p className="text-gray-500">Créez votre premier dossier pour commencer</p>
      </div>
    );
  }

  return (
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
};
