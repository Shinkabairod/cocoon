// src/components/dashboard/pages/WorkspacePage.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FolderOpen, Search, Filter } from 'lucide-react';
import { WorkspaceNeomorphicCards } from '../workspace/NeomorphicCards';
import { WorkspaceTree } from '../workspace/WorkspaceTree';
import { WorkspaceFileEditor } from '../workspace/WorkspaceFileEditor';
import { useWorkspace } from '@/hooks/useWorkspace';

interface WorkspacePageProps {
  user: any;
  onboardingData: any;
  userStats: any;
}

const WorkspacePage: React.FC<WorkspacePageProps> = ({
  user,
  onboardingData,
  userStats
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'tree' | 'editor'>('tree');
  
  const {
    selectedFile,
    selectedFolder,
    totalFolders,
    totalFiles,
    resourceFiles,
    videoFiles,
    handleFileSelect,
    handleFolderSelect,
    handleCloseEditor,
    handleNewNote,
    handleAddLink,
    handleUploadFile,
    handleNewFolder
  } = useWorkspace();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-blue-600" />
            My Workspace
          </h1>
          <p className="text-muted-foreground mt-2">
            Organize your content, notes, links, and resources in custom folders
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

      {/* Neomorphic Cards Grid */}
      <WorkspaceNeomorphicCards
        totalFolders={totalFolders}
        totalFiles={totalFiles}
        resourceFiles={resourceFiles}
        videoFiles={videoFiles}
        onNewNote={handleNewNote}
        onAddLink={handleAddLink}
        onUploadFile={handleUploadFile}
        onNewFolder={handleNewFolder}
      />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folder Tree */}
        <div className="lg:col-span-1">
          <Card className="h-[700px]">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Folders & Files
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] overflow-y-auto px-4 pb-4">
                <WorkspaceTree
                  searchQuery={searchQuery}
                  onFileSelect={handleFileSelect}
                  onFolderSelect={handleFolderSelect}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Editor */}
        <div className="lg:col-span-2">
          <div className="h-[700px]">
            <WorkspaceFileEditor
              selectedFile={selectedFile}
              selectedFolder={selectedFolder}
              onClose={handleCloseEditor}
            />
          </div>
        </div>
      </div>

      {/* Workspace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalFolders}</div>
            <div className="text-sm text-muted-foreground">Total Folders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{totalFiles}</div>
            <div className="text-sm text-muted-foreground">Total Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{resourceFiles}</div>
            <div className="text-sm text-muted-foreground">Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{videoFiles}</div>
            <div className="text-sm text-muted-foreground">Media Files</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspacePage;
