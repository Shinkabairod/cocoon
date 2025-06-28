
import { useState } from 'react';

export const useResourcesManagement = () => {
  const [folders, setFolders] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Personal');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newFolder, setNewFolder] = useState({ name: '', color: '', emoji: '' });
  const [newItemData, setNewItemData] = useState({ name: '', content: '', folderId: '' });

  const addFolder = (folderData: any) => {
    const newFolderItem = {
      id: Date.now().toString(),
      ...folderData,
      files: [],
      createdAt: new Date()
    };
    setFolders(prev => [...prev, newFolderItem]);
  };

  const addItem = (itemData: any) => {
    console.log('Adding item:', itemData);
    // Logic to add item to folder
  };

  const handleFileUpload = (files: FileList) => {
    console.log('Uploading files:', files);
    // Logic to handle file upload
  };

  return {
    folders,
    activeCategory,
    setActiveCategory,
    showNewFolderModal,
    setShowNewFolderModal,
    showNewItemModal,
    setShowNewItemModal,
    newFolder,
    setNewFolder,
    newItemData,
    setNewItemData,
    addFolder,
    addItem,
    handleFileUpload
  };
};
