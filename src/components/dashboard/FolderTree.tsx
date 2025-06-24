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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Plus,
  Link,
  FileVideo,
  Upload
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
  const [linkDialog, setLinkDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDescription, setNewFolderDescription] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [newFileType, setNewFileType] = useState<FileContent['contentType']>('note');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDescription, setLinkDescription] = useState('');

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
    
    await createFile(newFileName, newFileContent, selectedFolder, newFileType);
    
    setNewFileName('');
    setNewFileContent('');
    setNewFileType('note');
    setNewFileDialog(false);
  };

  const handleCreateLink = async () => {
    if (!linkTitle.trim() || !linkUrl.trim() || !selectedFolder) return;
    
    const linkContent = `# ${linkTitle}

**URL:** ${linkUrl}

**Description:** ${linkDescription}

---
*This is a link resource saved in your Obsidian vault.*`;
    
    await createFile(linkTitle, linkContent, selectedFolder, 'resource');
    
    setLinkTitle('');
    setLinkUrl('');
    setLinkDescription('');
    setLinkDialog(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedFolder) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      
      let fileContent = '';
      let contentType: FileContent['contentType'] = 'resource';
      
      if (file.type === 'application/pdf') {
        fileContent = `# ${fileName}

**File Type:** PDF Document
**Original Name:** ${file.name}
**Size:** ${(file.size / 1024 / 1024).toFixed(2)} MB

**Content:** 
This PDF has been added to your Obsidian vault. The file content will be processed and made searchable.

---
*PDF file imported on ${new Date().toLocaleDateString()}*`;
      } else if (file.type.startsWith('video/')) {
        contentType = 'video' as FileContent['contentType'];
        fileContent = `# ${fileName}

**File Type:** Video (${file.type})
**Original Name:** ${file.name}
**Size:** ${(file.size / 1024 / 1024).toFixed(2)} MB

**Description:** 
Video content imported to your Obsidian vault for reference and note-taking.

**Notes:**
- Add your video notes here
- Key timestamps and insights
- Action items from this video

---
*Video imported on ${new Date().toLocaleDateString()}*`;
      }
      
      await createFile(fileName, fileContent, selectedFolder, contentType);
    };
    
    if (file.type === 'application/pdf' || file.type.startsWith('video/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
    
    // Reset input
    event.target.value = '';
  };

  const getFileIcon = (contentType: FileContent['contentType']) => {
    switch (contentType) {
      case 'resource':
        return <Link className="h-4 w-4 text-blue-600" />;
      case 'video':
        return <FileVideo className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
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
                New Note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setSelectedFolder(folder.id);
                setLinkDialog(true);
              }}>
                <Link className="h-4 w-4 mr-2" />
                Add Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setSelectedFolder(folder.id);
                document.getElementById('file-upload')?.click();
              }}>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
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
                {getFileIcon(file.contentType)}
                <span className="flex-1 text-sm ml-2">{file.title}</span>
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
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>
                  Create a new note in the selected folder.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="file-name">Note Title</Label>
                    <Input
                      id="file-name"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="Enter note title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="file-type">Note Type</Label>
                    <Select value={newFileType} onValueChange={(value) => setNewFileType(value as FileContent['contentType'])}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="note">Note</SelectItem>
                        <SelectItem value="script">Script</SelectItem>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="concept">Concept</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <Button onClick={handleCreateFile}>Create Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" disabled={!selectedFolder}>
                <Link className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Link Resource</DialogTitle>
                <DialogDescription>
                  Save a web link to your Obsidian vault for easy reference.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="link-title">Link Title</Label>
                  <Input
                    id="link-title"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    placeholder="Enter a descriptive title..."
                  />
                </div>
                <div>
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="link-description">Description (optional)</Label>
                  <Textarea
                    id="link-description"
                    value={linkDescription}
                    onChange={(e) => setLinkDescription(e.target.value)}
                    placeholder="Describe what this link is about..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateLink}>Add Link</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Hidden file input for uploads */}
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.mp4,.mov,.avi,.mkv,.webm"
        onChange={handleFileUpload}
        className="hidden"
      />

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
