
import { useState, useEffect } from 'react';
import { modernIcons } from '@/lib/iconConfig';

export const useWorkspaceData = () => {
  const getInitialFolders = () => {
    try {
      const savedFolders = localStorage.getItem('myworkspace_folders');
      if (savedFolders) {
        return JSON.parse(savedFolders);
      }
    } catch (error) {
      console.error('Error loading folders from localStorage:', error);
    }
    
    return {
      Personal: [
        { 
          id: '1', 
          name: 'My Profile', 
          iconData: modernIcons[0],
          color: 'blue', 
          files: []
        }
      ],
      Resources: []
    };
  };

  const [folders, setFolders] = useState(getInitialFolders);

  useEffect(() => {
    try {
      localStorage.setItem('myworkspace_folders', JSON.stringify(folders));
    } catch (error) {
      console.error('Error saving folders to localStorage:', error);
    }
  }, [folders]);

  const addFolder = (folderData: any) => {
    const newFolder = {
      id: `folder_${Date.now()}`,
      ...folderData,
      files: []
    };

    setFolders(prev => ({
      ...prev,
      [folderData.category]: [...prev[folderData.category], newFolder]
    }));
  };

  const editFolder = (folderId: string, folderData: any, category: string) => {
    setFolders(prev => ({
      ...prev,
      [category]: prev[category].map(folder =>
        folder.id === folderId ? { ...folder, ...folderData } : folder
      )
    }));
  };

  const deleteFolder = (folderId: string, category: string) => {
    setFolders(prev => ({
      ...prev,
      [category]: prev[category].filter(folder => folder.id !== folderId)
    }));
  };

  const addFile = (fileData: any, category: string) => {
    const newFile = {
      id: `f_${Date.now()}`,
      ...fileData,
      date: new Date().toISOString().split('T')[0]
    };

    setFolders(prev => ({
      ...prev,
      [category]: prev[category].map(folder =>
        folder.id === fileData.folderId
          ? { ...folder, files: [...folder.files, newFile] }
          : folder
      )
    }));
  };

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(folders, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `myworkspace_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setFolders(importedData);
      } catch (error) {
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return {
    folders,
    addFolder,
    editFolder,
    deleteFolder,
    addFile,
    exportData,
    importData
  };
};
