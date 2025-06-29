// src/components/dashboard/workspace/WorkspaceTree.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';
import { useFolderSystem } from '@/hooks/useFolderSystem';

interface WorkspaceTreeProps {
  searchQuery: string;
  onFileSelect: (file: any) => void;
  onFolderSelect: (folder: any) => void;
}

export const WorkspaceTree: React.FC<WorkspaceTreeProps> = ({
  searchQuery,
  onFileSelect,
  onFolderSelect
}) => {
  const { folderStructure } = useFolderSystem();
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

  const filteredFolders = folderStructure.folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.files.some(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-2">
      {filteredFolders.map((folder) => (
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
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            <Folder className="h-4 w-4 mr-2" style={{ color: folder.color }} />
            <span className="text-sm">{folder.name}</span>
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
                  <FileText className="h-3 w-3 mr-2" />
                  <span>{file.name}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
