
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen, 
  Folder, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { FolderItem, WorkspaceFile } from '@/hooks/useWorkspace';

interface WorkspaceTreeProps {
  folders: FolderItem[];
  searchQuery: string;
  onFileSelect: (file: WorkspaceFile) => void;
  onFolderSelect: (folder: FolderItem) => void;
}

export const WorkspaceTree: React.FC<WorkspaceTreeProps> = ({
  folders,
  searchQuery,
  onFileSelect,
  onFolderSelect
}) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.files.some(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getFolderColor = (folderId: string): string => {
    const colorMap: { [key: string]: string } = {
      'personal-profile': 'text-blue-600',
      'personal-goals': 'text-green-600', 
      'personal-business': 'text-purple-600',
      'personal-platforms': 'text-orange-600',
      'personal-challenges': 'text-red-600',
      'resources-scripts': 'text-gray-600',
      'resources-templates': 'text-blue-600'
    };
    return colorMap[folderId] || 'text-blue-600';
  };

  return (
    <div className="space-y-2">
      {filteredFolders.map((folder) => (
        <div key={folder.id} className="space-y-1">
          {/* Folder Header */}
          <div 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer group"
            onClick={() => {
              toggleFolder(folder.id);
              onFolderSelect(folder);
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
            >
              {expandedFolders.includes(folder.id) ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
            
            <FolderOpen className={`h-4 w-4 ${getFolderColor(folder.id)}`} />
            
            <span className="text-sm font-medium flex-1">{folder.name}</span>
            
            <span className="text-xs text-gray-500">
              {folder.files.length} files
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>

          {/* Files List */}
          {expandedFolders.includes(folder.id) && (
            <div className="ml-6 space-y-1">
              {folder.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => onFileSelect(file)}
                >
                  <FileText className="h-3 w-3 text-gray-500" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{file.size}</span>
                </div>
              ))}
              
              {/* Add file button */}
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-500">
                <Plus className="h-3 w-3" />
                <span className="text-sm">Add file</span>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {filteredFolders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No folders found</p>
        </div>
      )}
    </div>
  );
};
