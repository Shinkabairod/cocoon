// src/components/dashboard/pages/WorkspacePage.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons, Icon2D } from '@/components/ui/icons';
import { WorkspaceFolderCards } from '../workspace/WorkspaceFolderCards';
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
  const [activeTab, setActiveTab] = useState<'Personal' | 'Resources'>('Personal');
  
  const {
    // États
    folders,
    loading,
    selectedFile,
    selectedFolder,
    
    // Stats calculées en temps réel
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
            icon={Icons.actions.Settings} 
            className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" 
          />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Filtrer les dossiers par type
  const personalFolders = folders.filter(folder => folder.type === 'personal');
  const resourceFolders = folders.filter(folder => folder.type === 'resources');
  const displayedFolders = activeTab === 'Personal' ? personalFolders : resourceFolders;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Icon2D icon={Icons.folders.FolderOpen} size={32} color="#8B5CF6" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
              <p className="text-gray-600">{totalFolders} folders</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Icon2D icon={Icons.actions.Download} size={16} className="mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon2D icon={Icons.actions.Upload} size={16} className="mr-1" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Icon2D icon={Icons.actions.RefreshCw} size={16} className="mr-1" />
            Refresh
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Icon2D icon={Icons.actions.Plus} size={16} className="mr-1" />
            New Folder
          </Button>
          <Button variant="outline">
            <Icon2D icon={Icons.actions.Upload} size={16} className="mr-1" />
            Add File
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Icon2D 
          icon={Icons.actions.Search} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          size={16}
        />
        <Input
          placeholder="Search in your files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <Button
          variant={activeTab === 'Personal' ? 'default' : 'outline'}
          onClick={() => setActiveTab('Personal')}
          className="flex items-center gap-2"
        >
          <Icon2D icon={Icons.folders.User} size={16} />
          Personal ({personalFolders.length})
        </Button>
        <Button
          variant={activeTab === 'Resources' ? 'default' : 'outline'}
          onClick={() => setActiveTab('Resources')}
          className="flex items-center gap-2"
        >
          <Icon2D icon={Icons.folders.Archive} size={16} />
          Resources ({resourceFolders.length})
        </Button>
      </div>

      {/* Folder Cards Grid - NOUVEAU DESIGN */}
      <WorkspaceNeomorphicCards
        folders={displayedFolders}
        onFolderClick={handleFolderSelect}
      />

      {/* File Editor Modal/Sidebar when folder selected */}
      {selectedFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[80vh] overflow-hidden">
            <WorkspaceFileEditor
              selectedFile={selectedFile}
              selectedFolder={selectedFolder}
              onClose={handleCloseEditor}
              onSaveFile={handleSaveFile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspacePage;
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
