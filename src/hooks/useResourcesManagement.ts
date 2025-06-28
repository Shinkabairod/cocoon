// src/hooks/useResourcesManagement.ts
import { useState } from 'react';

export const useResourcesManagement = () => {
  const [activeCategory, setActiveCategory] = useState('resources');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newFolder, setNewFolder] = useState({ name: '', emoji: '📁', category: 'resources' });
  const [newItemData, setNewItemData] = useState({
    type: 'text',
    title: '',
    content: '',
    url: '',
    file: null as File | null,
    folderId: ''
  });

  // Données des dossiers (initialement hardcodées, à connecter avec API/localStorage)
  const [folders, setFolders] = useState({
    resources: [
      { id: '1', name: 'Video Scripts', emoji: '🎬', items: [] },
      { id: '2', name: 'Brand Images', emoji: '🎨', items: [] }
    ],
    personal: [
      { id: '3', name: 'My Profile', emoji: '👤', items: [] },
      { id: '4', name: 'My Goals', emoji: '🎯', items: [] },
      { id: '5', name: 'My Business', emoji: '🏢', items: [] },
      { id: '6', name: 'My Platforms', emoji: '📱', items: [] },
      { id: '7', name: 'My Challenges', emoji: '⚡', items: [] }
    ]
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewItemData(prev => ({ ...prev, file }));
    }
  };

  const addFolder = () => {
    if (!newFolder.name.trim()) return;
    
    const newFolderObj = {
      id: Date.now().toString(),
      name: newFolder.name,
      emoji: newFolder.emoji,
      items: []
    };

    setFolders(prev => ({
      ...prev,
      [newFolder.category]: [...prev[newFolder.category], newFolderObj]
    }));

    setNewFolder({ name: '', emoji: '📁', category: 'resources' });
    setShowNewFolderModal(false);
  };

  const addItem = () => {
    if (!newItemData.title.trim() || !newItemData.folderId) return;
    
    const newItem = {
      id: Date.now().toString(),
      title: newItemData.title,
      type: newItemData.type,
      content: newItemData.content,
      url: newItemData.url,
      createdAt: new Date().toISOString()
    };

    // Logique d'ajout d'item aux dossiers
    // À implémenter selon la structure des données
    
    setNewItemData({
      type: 'text',
      title: '',
      content: '',
      url: '',
      file: null,
      folderId: ''
    });
    setShowNewItemModal(false);
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
