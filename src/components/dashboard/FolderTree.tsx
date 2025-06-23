
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Folder,
  FolderPlus,
  File,
  FileText,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Plus
} from 'lucide-react';
import { FolderItem, FileContent } from '@/types/folders';
import { useFolderSystem } from '@/hooks/useFolderSystem';

interface FolderTreeProps {
  onFileSelect?: (file: FileContent) => void;
  onFolderSelect?: (folder: FolderItem) => void;
}

const FolderTree = ({ onFileSelect, onFolderSelect }: FolderTreeProps) => {
  const {
    createFolder,
    createFile,
    updateFolder,
    deleteFolder,
    deleteFile,
    getFolderTree,
    getFilesInFolder
  } = useFolderSystem();

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newFolderDialog, setNewFolderDialog] = useState(false);
  const [newFileDialog, setNewFileDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDescription, setNewFolderDescription] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    
    await createFolder(newFolderName, selectedFolder || undefined, {
      description: newFolderDescription
    });
    
    setNewFolderName('');
    setNewFolderDescription('');
    setNewFolderDialog(false);
  };

  const handleCreateFile = async () => {
    if (!newFileName.trim() || !selectedFolder) return;
    
    await createFile(newFileName, newFileContent, selectedFolder);
    
    setNewFileName('');
    setNewFileContent('');
    setNewFileDialog(false);
  };

  const renderFolderNode = (folder: FolderItem & { children: any[] }, level = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const files = getFilesInFolder(folder.id);
    const hasChildren = folder.children.length > 0 || files.length > 0;

    return (
      <div key={folder.id} className="select-none">
        <div 
          className={`flex items-center py-2 px-2 hover:bg-muted/50 rounded cursor-pointer ${
            selectedFolder === folder.id ? 'bg-muted' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            setSelectedFolder(folder.id);
            onFolderSelect?.(folder);
          }}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 mr-1"
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          
          <Folder className="h-4 w-4 mr-2 text-blue-600" />
          <span className="flex-1 text-sm font-medium">{folder.name}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => {
                setSelectedFolder(folder.id);
                setNewFolderDialog(true);
              }}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setSelectedFolder(folder.id);
                setNewFileDialog(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => deleteFolder(folder.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isExpanded && (
          <div>
            {folder.children.map(child => 
              renderFolderNode(child, level + 1)
            )}
            {files.map(file => (
              <div
                key={file.id}
                className="flex items-center py-2 px-2 hover:bg-muted/50 rounded cursor-pointer group"
                style={{ paddingLeft: `${(level + 1) * 20 + 8}px` }}
                onClick={() => onFileSelect?.(file)}
              >
                <FileText className="h-4 w-4 mr-2 text-gray-600" />
                <span className="flex-1 text-sm">{file.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {file.contentType}
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const folderTree = getFolderTree();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Workspace</h3>
        <div className="flex gap-2">
          <Dialog open={newFolderDialog} onOpenChange={setNewFolderDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <FolderPlus className="h-4 w-4 mr-1" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                  Create a new folder to organize your content.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder-name">Folder Name</Label>
                  <Input
                    id="folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name..."
                  />
                </div>
                <div>
                  <Label htmlFor="folder-description">Description (optional)</Label>
                  <Textarea
                    id="folder-description"
                    value={newFolderDescription}
                    onChange={(e) => setNewFolderDescription(e.target.value)}
                    placeholder="Describe what this folder will contain..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateFolder}>Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={newFileDialog} onOpenChange={setNewFileDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" disabled={!selectedFolder}>
                <Plus className="h-4 w-4 mr-1" />
                New File
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>
                  Create a new file in the selected folder.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-name">File Name</Label>
                  <Input
                    id="file-name"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="Enter file name..."
                  />
                </div>
                <div>
                  <Label htmlFor="file-content">Content</Label>
                  <Textarea
                    id="file-content"
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    placeholder="Enter your content here..."
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateFile}>Create File</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          {folderTree.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Folder className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-sm">No folders yet. Create your first folder to get started!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {folderTree.map(folder => renderFolderNode(folder))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FolderTree;
