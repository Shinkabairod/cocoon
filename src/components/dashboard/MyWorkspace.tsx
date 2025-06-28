// src/components/dashboard/MyWorkspace.tsx - Version refactorisée et modulaire
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FolderOpen, Plus, Search, Download, Upload } from 'lucide-react';
import { useWorkspaceData } from '@/hooks/useWorkspaceData';
import WorkspaceHeader from './workspace/WorkspaceHeader';
import WorkspaceFilters from './workspace/WorkspaceFilters';
import FolderGrid from './workspace/FolderGrid';
import FolderView from './workspace/FolderView';
import FolderModal from './workspace/FolderModal';
import FileModal from './workspace/FileModal';
import FilePreview from './workspace/FilePreview';

const MyWorkspace = () => {
  const { toast } = useToast();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Personal');
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showEditFolderModal, setShowEditFolderModal] = useState(false);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState<any>(null);
  const [editingFolder, setEditingFolder] = useState<any>(null);

  // Custom hook for workspace data management
  const {
    folders,
    addFolder,
    editFolder,
    deleteFolder,
    addFile,
    exportData,
    importData
  } = useWorkspaceData();

  // Filter folders based on search and category
  const filteredFolders = folders[selectedCategory as keyof typeof folders]?.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.files.some(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  // Handle folder actions
  const handleCreateFolder = (folderData: any) => {
    addFolder(folderData);
    setShowNewFolderModal(false);
    toast({
      title: "✅ Folder Created",
      description: `${folderData.name} has been created successfully`
    });
  };

  const handleEditFolder = (folderData: any) => {
    editFolder(editingFolder.id, folderData, selectedCategory);
    setEditingFolder(null);
    setShowEditFolderModal(false);
    toast({
      title: "✅ Folder Updated",
      description: "Folder has been updated successfully"
    });
  };

  const handleDeleteFolder = (folderId: string) => {
    deleteFolder(folderId, selectedCategory);
    toast({
      title: "🗑️ Folder Deleted",
      description: "Folder and its contents have been removed"
    });
  };

  const handleAddFile = (fileData: any) => {
    addFile(fileData, selectedCategory);
    setShowAddFileModal(false);
    toast({
      title: "✅ File Added",
      description: `${fileData.name} has been added successfully`
    });
  };

  // Folder view render
  if (selectedFolder) {
    return (
      <div className="space-y-6">
        <FolderView
          folder={selectedFolder}
          onBack={() => setSelectedFolder(null)}
          onAddFile={() => setShowAddFileModal(true)}
          onFilePreview={setShowFilePreview}
        />
        
        <FilePreview 
          file={showFilePreview} 
          onClose={() => setShowFilePreview(null)} 
        />
        
        <FileModal
          isOpen={showAddFileModal}
          onClose={() => setShowAddFileModal(false)}
          onSubmit={handleAddFile}
          targetFolderId={selectedFolder.id}
          availableFolders={[selectedFolder]}
        />
      </div>
    );
  }

  // Main workspace view
  return (
    <div className="space-y-6">
      <WorkspaceHeader
        foldersCount={folders.Personal.length + folders.Resources.length}
        onExport={exportData}
        onImport={importData}
        onNewFolder={() => setShowNewFolderModal(true)}
        onAddFile={() => setShowAddFileModal(true)}
      />

      <WorkspaceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={{
          Personal: folders.Personal.length,
          Resources: folders.Resources.length
        }}
      />

      <FolderGrid
        folders={filteredFolders}
        onFolderClick={setSelectedFolder}
        onEditFolder={(folder) => {
          setEditingFolder(folder);
          setShowEditFolderModal(true);
        }}
        onDeleteFolder={handleDeleteFolder}
      />

      {/* Modals */}
      <FolderModal
        isOpen={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
        onSubmit={handleCreateFolder}
        title="Create New Folder"
        description="Organize your files with a custom folder"
      />

      <FolderModal
        isOpen={showEditFolderModal}
        onClose={() => setShowEditFolderModal(false)}
        onSubmit={handleEditFolder}
        title="Edit Folder"
        description="Modify your folder settings"
        initialData={editingFolder}
      />

      <FileModal
        isOpen={showAddFileModal}
        onClose={() => setShowAddFileModal(false)}
        onSubmit={handleAddFile}
        availableFolders={folders[selectedCategory as keyof typeof folders]}
      />

      <FilePreview 
        file={showFilePreview} 
        onClose={() => setShowFilePreview(null)} 
      />
    </div>
  );
};

export default MyWorkspace;