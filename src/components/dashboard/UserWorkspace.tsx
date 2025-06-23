
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, FileText, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FolderTree from './FolderTree';
import FileEditor from './FileEditor';
import { FileContent, FolderItem } from '@/types/folders';

const UserWorkspace = () => {
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'tree' | 'editor'>('tree');

  const handleFileSelect = (file: FileContent) => {
    setSelectedFile(file);
    setActiveView('editor');
  };

  const handleFolderSelect = (folder: FolderItem) => {
    setSelectedFolder(folder);
  };

  const handleCloseEditor = () => {
    setSelectedFile(null);
    setActiveView('tree');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FolderOpen className="h-6 w-6" />
            My Workspace
          </h2>
          <p className="text-muted-foreground">
            Organize your content, notes, and resources in custom folders
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folder Tree */}
        <div className="lg:col-span-1">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Folders & Files
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] overflow-y-auto px-4 pb-4">
                <FolderTree 
                  onFileSelect={handleFileSelect}
                  onFolderSelect={handleFolderSelect}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Editor */}
        <div className="lg:col-span-2">
          <div className="h-[600px]">
            <FileEditor 
              file={selectedFile}
              onClose={handleCloseEditor}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Folders</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <p className="text-2xl font-bold">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserWorkspace;
