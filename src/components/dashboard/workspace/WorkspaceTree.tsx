// src/components/dashboard/workspace/WorkspaceTree.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons, Icon2D, getIcon } from '@/components/ui/icons';
import { FolderItem } from '@/hooks/useWorkspace';

interface WorkspaceTreeProps {
  folders: FolderItem[];
  searchQuery: string;
  onFileSelect: (file: any) => void;
  onFolderSelect: (folder: any) => void;
}

export const WorkspaceTree: React.FC<WorkspaceTreeProps> = ({
  folders,
  searchQuery,
  onFileSelect,
  onFolderSelect
}) => {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.files.some(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Obtenir l'icône Lucide à partir du nom stocké
  const getFolderIcon = (iconName: string) => {
    // Essayer dans folders d'abord, puis dans les autres catégories
    const folderIcon = getIcon('folders', iconName);
    if (folderIcon) return folderIcon;
    
    const fileIcon = getIcon('files', iconName);
    if (fileIcon) return fileIcon;
    
    const businessIcon = getIcon('business', iconName);
    if (businessIcon) return businessIcon;
    
    // Fallback vers l'icône de dossier par défaut
    return Icons.folders.Folder;
  };

  return (
    <div className="space-y-2">
      {filteredFolders.map((folder) => {
        const FolderIconComponent = getFolderIcon(folder.emoji);
        
        return (
          <div key={folder.id} className="space-y-1">
            {/* Folder Header */}
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto"
              onClick={() => {
                toggleFolder(folder.id);
                onFolderSelect(folder);
              }}
            >
              {expandedFolders.has(folder.id) ? (
                <Icon2D icon={Icons.actions.ChevronDown} size={16} className="mr-2" />
              ) : (
                <Icon2D icon={Icons.actions.ChevronRight} size={16} className="mr-2" />
              )}
              <Icon2D 
                icon={FolderIconComponent} 
                size={18} 
                color={folder.color}
                className="mr-2"
              />
              <span className="text-sm flex-1 text-left">{folder.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {folder.files.length}
              </span>
            </Button>

            {/* Files List */}
            {expandedFolders.has(folder.id) && (
              <div className="ml-6 space-y-1">
                {folder.files.map((file) => (
                  <Button
                    key={file.id}
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto text-xs"
                    onClick={() => onFileSelect(file)}
                  >
                    <Icon2D 
                      icon={file.type === 'link' ? Icons.files.Link : Icons.files.FileText} 
                      size={14} 
                      className="mr-2" 
                    />
                    <span className="truncate">{file.name}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
