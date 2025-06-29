
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface FolderItem {
  id: string;
  name: string;
  type: 'personal' | 'resources';
  emoji: string;
  files: WorkspaceFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceFile {
  id: string;
  name: string;
  content: string;
  type: string;
  size: string;
  folderId: string;
  uploadedAt: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock service for now
const mockWorkspaceService = {
  async loadWorkspace(userId: string) {
    // Mock data matching the expected structure
    const mockFolders: FolderItem[] = [
      {
        id: 'personal-profile',
        name: 'Personal Profile',
        type: 'personal',
        emoji: 'User',
        files: [
          {
            id: '1',
            name: 'bio.txt',
            content: 'My personal bio...',
            type: 'text',
            size: '2KB',
            folderId: 'personal-profile',
            uploadedAt: new Date().toISOString(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'personal-goals',
        name: 'Goals & Objectives',
        type: 'personal',
        emoji: 'Target',
        files: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'resources-scripts',
        name: 'Video Scripts',
        type: 'resources',
        emoji: 'Video',
        files: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return { folders: mockFolders };
  }
};

export const useWorkspace = () => {
  const { user } = useAuth();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<WorkspaceFile | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);

  // Calculate stats
  const totalFolders = folders.length;
  const totalFiles = folders.reduce((acc, folder) => acc + folder.files.length, 0);
  const resourceFiles = folders
    .filter(f => f.type === 'resources')
    .reduce((acc, folder) => acc + folder.files.length, 0);
  const personalFiles = folders
    .filter(f => f.type === 'personal')
    .reduce((acc, folder) => acc + folder.files.length, 0);
  const videoFiles = folders
    .reduce((acc, folder) => acc + folder.files.filter(f => f.type === 'video').length, 0);

  // Load workspace data
  const loadWorkspace = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      console.log('📂 Loading workspace for user:', user.id);
      
      const workspaceData = await mockWorkspaceService.loadWorkspace(user.id);
      setFolders(workspaceData.folders || []);
      
      console.log('✅ Workspace loaded:', {
        folders: workspaceData.folders?.length || 0,
        files: workspaceData.folders?.reduce((acc: number, f: FolderItem) => acc + f.files.length, 0) || 0
      });
    } catch (error) {
      console.error('❌ Error loading workspace:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadWorkspace();
    }
  }, [user, loadWorkspace]);

  // Selection handlers
  const handleFileSelect = useCallback((file: WorkspaceFile) => {
    setSelectedFile(file);
  }, []);

  const handleFolderSelect = useCallback((folder: FolderItem) => {
    setSelectedFolder(folder);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setSelectedFile(null);
    setSelectedFolder(null);
  }, []);

  // CRUD operations
  const handleNewNote = useCallback(async () => {
    console.log('Creating new note...');
    // TODO: Implement note creation
  }, []);

  const handleAddLink = useCallback(async () => {
    console.log('Adding new link...');
    // TODO: Implement link addition
  }, []);

  const handleUploadFile = useCallback(async () => {
    console.log('Uploading file...');
    // TODO: Implement file upload
  }, []);

  const handleNewFolder = useCallback(async () => {
    console.log('Creating new folder...');
    // TODO: Implement folder creation
  }, []);

  const handleSaveFile = useCallback(async (fileId: string, content: string) => {
    console.log('Saving file:', fileId);
    // TODO: Implement file saving
  }, []);

  // Get workspace stats
  const getWorkspaceStats = useCallback(() => {
    return {
      totalFolders,
      totalFiles,
      resourceFiles,
      personalFiles, // ✅ Ajout de personalFiles
      videoFiles,
      folders: folders.length,
      storageUsed: folders.reduce((acc, folder) => 
        acc + folder.files.reduce((fileAcc, file) => 
          fileAcc + parseInt(file.size?.replace('MB', '') || '0'), 0), 0),
      storageLimit: 1000,
      lastSync: new Date().toISOString()
    };
  }, [totalFolders, totalFiles, resourceFiles, personalFiles, videoFiles, folders]);

  return {
    // State
    folders,
    loading,
    selectedFile,
    selectedFolder,
    
    // Computed stats
    totalFolders,
    totalFiles,
    resourceFiles,
    personalFiles, // ✅ Export de personalFiles
    videoFiles,
    
    // Selection handlers
    handleFileSelect,
    handleFolderSelect,
    handleCloseEditor,
    
    // CRUD operations
    handleNewNote,
    handleAddLink,
    handleUploadFile,
    handleNewFolder,
    handleSaveFile,
    
    // Utilities
    getWorkspaceStats,
    loadWorkspace
  };
};
