import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, FileText, Search, Filter, Link, Upload, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FolderTree from './FolderTree';
import FileEditor from './FileEditor';
import { FileContent, FolderItem } from '@/types/folders';
import { useFolderSystem } from '@/hooks/useFolderSystem';

const UserWorkspace = () => {
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'tree' | 'editor'>('tree');
  const { folderStructure } = useFolderSystem();

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

  const totalFolders = folderStructure.folders.length;
  const totalFiles = folderStructure.files.length;
  const resourceFiles = folderStructure.files.filter(f => f.contentType === 'resource').length;
  const videoFiles = folderStructure.files.filter(f => f.contentType === 'video').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FolderOpen className="h-6 w-6" />
            My Workspace
          </h2>
          <p className="text-muted-foreground">
            Organize your content, notes, links, and resources in custom folders synced with Obsidian
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="neomorphic" className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Plus className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium">New Note</p>
                <p className="text-xs text-muted-foreground">Create a new note</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="neomorphic" className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Link className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium">Add Link</p>
                <p className="text-xs text-muted-foreground">Save web resources</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="neomorphic" className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium">Upload Files</p>
                <p className="text-xs text-muted-foreground">PDFs, videos, docs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="neomorphic" className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium">New Folder</p>
                <p className="text-xs text-muted-foreground">Organize content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folder Tree */}
        <div className="lg:col-span-1">
          <Card variant="neomorphic" className="h-[600px]">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="neomorphic">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Folders</p>
                <p className="text-2xl font-bold">{totalFolders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="neomorphic">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{totalFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="neomorphic">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Link className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Saved Links</p>
                <p className="text-2xl font-bold">{resourceFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="neomorphic">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Video Files</p>
                <p className="text-2xl font-bold">{videoFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserWorkspace;