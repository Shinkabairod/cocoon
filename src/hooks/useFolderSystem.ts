
import { useState, useCallback } from 'react';
import { FolderItem, FileContent, FolderStructure } from '@/types/folders';
import { useAuth } from '@/contexts/AuthContext';
import { huggingfaceService } from '@/services/huggingfaceService';

export const useFolderSystem = () => {
  const { user } = useAuth();
  const [folderStructure, setFolderStructure] = useState<FolderStructure>({
    folders: [],
    files: []
  });
  const [loading, setLoading] = useState(false);

  const createFolder = useCallback(async (name: string, parentId?: string, options?: {
    description?: string;
    color?: string;
    icon?: string;
  }) => {
    if (!user) return;

    const parentPath = parentId 
      ? folderStructure.folders.find(f => f.id === parentId)?.path || ''
      : '';
    
    const newFolder: FolderItem = {
      id: `folder_${Date.now()}`,
      name,
      type: 'folder',
      parentId,
      path: parentPath ? `${parentPath}/${name}` : name,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: options?.description,
      color: options?.color,
      icon: options?.icon
    };

    setFolderStructure(prev => ({
      ...prev,
      folders: [...prev.folders, newFolder]
    }));

    // Save to HF service
    try {
      await huggingfaceService.saveNote(
        `folder_structure_${newFolder.id}`,
        JSON.stringify(newFolder),
        'folder'
      );
    } catch (error) {
      console.error('Error saving folder:', error);
    }

    return newFolder;
  }, [user, folderStructure.folders]);

  const createFile = useCallback(async (
    title: string,
    content: string,
    folderId: string,
    contentType: FileContent['contentType'] = 'note'
  ) => {
    if (!user) return;

    const newFile: FileContent = {
      id: `file_${Date.now()}`,
      folderId,
      title,
      content,
      contentType,
      metadata: {
        wordCount: content.split(/\s+/).length,
        readingTime: Math.ceil(content.split(/\s+/).length / 200),
        lastModified: new Date()
      }
    };

    setFolderStructure(prev => ({
      ...prev,
      files: [...prev.files, newFile]
    }));

    // Save to HF service
    try {
      await huggingfaceService.saveNote(title, content, contentType);
    } catch (error) {
      console.error('Error saving file:', error);
    }

    return newFile;
  }, [user]);

  const updateFolder = useCallback(async (folderId: string, updates: Partial<FolderItem>) => {
    setFolderStructure(prev => ({
      ...prev,
      folders: prev.folders.map(folder =>
        folder.id === folderId
          ? { ...folder, ...updates, updatedAt: new Date() }
          : folder
      )
    }));
  }, []);

  const updateFile = useCallback(async (fileId: string, updates: Partial<FileContent>) => {
    setFolderStructure(prev => ({
      ...prev,
      files: prev.files.map(file =>
        file.id === fileId
          ? { 
              ...file, 
              ...updates,
              metadata: {
                ...file.metadata,
                lastModified: new Date(),
                wordCount: updates.content ? updates.content.split(/\s+/).length : file.metadata?.wordCount,
                readingTime: updates.content ? Math.ceil(updates.content.split(/\s+/).length / 200) : file.metadata?.readingTime
              }
            }
          : file
      )
    }));

    // Update in HF service if content changed
    if (updates.content || updates.title) {
      const file = folderStructure.files.find(f => f.id === fileId);
      if (file) {
        try {
          await huggingfaceService.saveNote(
            updates.title || file.title,
            updates.content || file.content,
            file.contentType
          );
        } catch (error) {
          console.error('Error updating file:', error);
        }
      }
    }
  }, [folderStructure.files]);

  const deleteFolder = useCallback(async (folderId: string) => {
    // Remove folder and all its children
    const getFolderChildren = (parentId: string): string[] => {
      const children = folderStructure.folders
        .filter(f => f.parentId === parentId)
        .map(f => f.id);
      
      return children.concat(children.flatMap(getFolderChildren));
    };

    const allFolderIds = [folderId, ...getFolderChildren(folderId)];
    
    setFolderStructure(prev => ({
      folders: prev.folders.filter(f => !allFolderIds.includes(f.id)),
      files: prev.files.filter(f => !allFolderIds.includes(f.folderId))
    }));
  }, [folderStructure.folders]);

  const deleteFile = useCallback(async (fileId: string) => {
    setFolderStructure(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  }, []);

  const getFolderTree = useCallback(() => {
    const buildTree = (parentId?: string): (FolderItem & { children: any[] })[] => {
      return folderStructure.folders
        .filter(folder => folder.parentId === parentId)
        .map(folder => ({
          ...folder,
          children: buildTree(folder.id)
        }));
    };

    return buildTree();
  }, [folderStructure.folders]);

  const getFilesInFolder = useCallback((folderId: string) => {
    return folderStructure.files.filter(file => file.folderId === folderId);
  }, [folderStructure.files]);

  return {
    folderStructure,
    loading,
    createFolder,
    createFile,
    updateFolder,
    updateFile,
    deleteFolder,
    deleteFile,
    getFolderTree,
    getFilesInFolder
  };
};
