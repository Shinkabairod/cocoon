
// src/components/dashboard/pages/WorkspacePage.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons, Icon2D } from '@/components/ui/icons';
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
  
  const {
    // États
    folders,
    loading,
    selectedFile,
    selectedFolder,
    
    // Stats
    totalFolders,
    totalFiles,
    resourceFiles,
    videoFiles,
    
    // Actions de sélection
    handleFileSelect,
    handleFolderSelect,
    handleCloseEditor,
    
    // Actions CRUD
    handleNewNote,
    handleAddLink,
    handleUploadFile,
    handleNewFolder,
    handleSaveFile
  } = useWorkspace();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icon2D 
            icon={Icons.status.Loader2} 
            className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" 
          />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Icon2D icon={Icons.folders.FolderOpen} size={32} color="#3B82F6" />
            My Workspace
          </h1>
          <p className="text-muted-foreground mt-2">
            Organize your content, notes, links, and resources in custom folders
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon2D 
              icon={Icons.actions.Search} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              size={16}
            />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Icon2D icon={Icons.actions.Filter} size={16} className="mr-1" />
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
                <Icon2D icon={Icons.folders.FolderOpen} size={20} />
                Folders & Files
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] overflow-y-auto px-4 pb-4">
                <WorkspaceTree
                  folders={folders}
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
              onSaveFile={handleSaveFile}
            />
          </div>
        </div>
      </div>

      {/* Workspace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.folders.FolderOpen} size={24} color="#3B82F6" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalFolders}</div>
                <div className="text-sm text-muted-foreground">Total Folders</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.FileText} size={24} color="#10B981" />
              <div>
                <div className="text-2xl font-bold text-green-600">{totalFiles}</div>
                <div className="text-sm text-muted-foreground">Total Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.Link} size={24} color="#8B5CF6" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{resourceFiles}</div>
                <div className="text-sm text-muted-foreground">Resources</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.Video} size={24} color="#F59E0B" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{videoFiles}</div>
                <div className="text-sm text-muted-foreground">Media Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspacePage;
