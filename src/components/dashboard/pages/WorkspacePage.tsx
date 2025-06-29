
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FolderOpen, Search, Filter, RefreshCw, Plus, Upload, Download } from 'lucide-react';
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
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Filtrer les dossiers par type
  const personalFolders = folders.filter(folder => folder.type === 'personal');
  const resourceFolders = folders.filter(folder => folder.type === 'resources');
  const displayedFolders = activeTab === 'Personal' ? personalFolders : resourceFolders;

  const handleSaveFileFixed = async (fileId: string, content: string): Promise<boolean> => {
    await handleSaveFile(fileId, content);
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
              <p className="text-gray-600">{totalFolders} folders</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-1" />
            New Folder
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-1" />
            Add File
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
          <FolderOpen className="h-4 w-4" />
          Personal ({personalFolders.length})
        </Button>
        <Button
          variant={activeTab === 'Resources' ? 'default' : 'outline'}
          onClick={() => setActiveTab('Resources')}
          className="flex items-center gap-2"
        >
          <FolderOpen className="h-4 w-4" />
          Resources ({resourceFolders.length})
        </Button>
      </div>

      {/* Neomorphic Cards Grid */}
      <WorkspaceNeomorphicCards
        folders={displayedFolders}
        onFolderClick={handleFolderSelect}
      />

      {/* File Editor Modal when folder selected */}
      {selectedFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[80vh] overflow-hidden">
            <WorkspaceFileEditor
              selectedFile={selectedFile}
              selectedFolder={selectedFolder}
              onClose={handleCloseEditor}
              onSaveFile={handleSaveFileFixed}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspacePage;
