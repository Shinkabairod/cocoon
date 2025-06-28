// src/hooks/useWorkspace.ts
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { workspaceService, WorkspaceFile, WorkspaceFolder } from '@/services/workspaceService';
import { useToast } from '@/hooks/use-toast';

export interface FolderItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  type: 'personal' | 'resources';
  files: WorkspaceFile[];
  isExpanded?: boolean;
}

export const useWorkspace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Structure des dossiers par défaut (créés automatiquement si ils n'existent pas)
  const defaultFolders: Omit<WorkspaceFolder, 'userId' | 'createdAt'>[] = [
    {
      id: 'personal-profile',
      name: 'My Profile',
      emoji: '👤',
      color: '#3B82F6',
      type: 'personal'
    },
    {
      id: 'personal-goals',
      name: 'My Goals',
      emoji: '🎯',
      color: '#10B981',
      type: 'personal'
    },
    {
      id: 'personal-business',
      name: 'My Business',
      emoji: '🏢',
      color: '#8B5CF6',
      type: 'personal'
    },
    {
      id: 'personal-platforms',
      name: 'My Platforms',
      emoji: '📱',
      color: '#F59E0B',
      type: 'personal'
    },
    {
      id: 'personal-challenges',
      name: 'My Challenges',
      emoji: '⚡',
      color: '#EF4444',
      type: 'personal'
    },
    {
      id: 'resources-scripts',
      name: 'Video Scripts',
      emoji: '🎬',
      color: '#06B6D4',
      type: 'resources'
    },
    {
      id: 'resources-templates',
      name: 'Templates',
      emoji: '📋',
      color: '#84CC16',
      type: 'resources'
    }
  ];

  // Charger les données au démarrage
  useEffect(() => {
    if (user) {
      loadWorkspaceData();
    }
  }, [user]);

  const loadWorkspaceData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('📂 Loading complete workspace for user:', user.id);

      // 1. Charger tous les dossiers existants depuis Supabase
      const existingFolders = await workspaceService.loadUserFolders(user.id);
      
      // 2. Créer les dossiers par défaut s'ils n'existent pas
      const folderPromises = defaultFolders.map(async (defaultFolder) => {
        const exists = existingFolders.find(f => f.id === defaultFolder.id);
        if (!exists) {
          const newFolder: WorkspaceFolder = {
            ...defaultFolder,
            userId: user.id,
            createdAt: new Date().toISOString(),
            isExpanded: false
          };
          
          await workspaceService.saveFolder(newFolder);
          return newFolder;
        }
        return exists;
      });

      const allFolders = await Promise.all(folderPromises);

      // 3. Charger tous les fichiers depuis Supabase
      const [userFiles, onboardingFiles] = await Promise.all([
        workspaceService.loadUserFiles(user.id),
        workspaceService.loadOnboardingAsFiles(user.id)
      ]);

      const allFiles = [...userFiles, ...onboardingFiles];

      // 4. Organiser les fichiers dans les dossiers
      const organizedFolders: FolderItem[] = allFolders.map(folder => ({
        id: folder.id,
        name: folder.name,
        emoji: folder.emoji,
        color: folder.color || '#3B82F6',
        type: folder.type,
        isExpanded: false,
        files: allFiles.filter(file => file.folderId === folder.id)
      }));

      setFolders(organizedFolders);
      console.log('✅ Workspace loaded:', {
        folders: organizedFolders.length,
        files: allFiles.length
      });

    } catch (error) {
      console.error('❌ Error loading workspace:', error);
      toast({
        title: "❌ Erreur de chargement",
        description: "Impossible de charger votre workspace",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Ajouter un nouveau dossier - PERSISTENCE TOTALE
  const addFolder = async (name: string, emoji: string, color: string, type: 'personal' | 'resources') => {
    if (!user) {
      toast({
        title: "❌ Erreur",
        description: "Vous devez être connecté",
        variant: "destructive"
      });
      return false;
    }

    const newFolder: WorkspaceFolder = {
      id: `${type}-${Date.now()}`,
      name,
      emoji,
      color,
      type,
      userId: user.id,
      createdAt: new Date().toISOString(),
      isExpanded: true
    };

    try {
      // 1. Sauvegarder dans Supabase d'abord
      const saved = await workspaceService.saveFolder(newFolder);
      
      if (!saved) {
        toast({
          title: "❌ Erreur de sauvegarde",
          description: "Impossible de sauvegarder le dossier",
          variant: "destructive"
        });
        return false;
      }

      // 2. Mettre à jour l'interface localement
      const folderItem: FolderItem = {
        ...newFolder,
        files: []
      };

      setFolders(prev => [...prev, folderItem]);
      
      toast({
        title: "✅ Dossier créé",
        description: `Le dossier "${name}" a été créé et sauvegardé.`
      });
      
      return true;

    } catch (error) {
      console.error('❌ Error adding folder:', error);
      toast({
        title: "❌ Erreur",
        description: "Une erreur s'est produite lors de la création",
        variant: "destructive"
      });
      return false;
    }
  };

  // ✅ Supprimer un dossier - PERSISTENCE TOTALE
  const deleteFolder = async (folderId: string) => {
    if (!user) return false;

    const folder = folders.find(f => f.id === folderId);
    if (!folder) return false;

    if (folder.files.length > 0) {
      toast({
        title: "❌ Impossible de supprimer",
        description: "Ce dossier contient des fichiers. Supprimez-les d'abord.",
        variant: "destructive"
      });
      return false;
    }

    try {
      // 1. Supprimer de Supabase d'abord
      const deleted = await workspaceService.deleteFolder(folderId, user.id);
      
      if (!deleted) {
        toast({
          title: "❌ Erreur de suppression",
          description: "Impossible de supprimer le dossier",
          variant: "destructive"
        });
        return false;
      }

      // 2. Mettre à jour l'interface localement
      setFolders(prev => prev.filter(f => f.id !== folderId));
      
      toast({
        title: "✅ Dossier supprimé",
        description: `Le dossier "${folder.name}" a été supprimé.`
      });
      
      return true;

    } catch (error) {
      console.error('❌ Error deleting folder:', error);
      toast({
        title: "❌ Erreur",
        description: "Une erreur s'est produite lors de la suppression",
        variant: "destructive"
      });
      return false;
    }
  };

  // ✅ Toggle l'expansion d'un dossier - LOCAL SEULEMENT
  const toggleFolder = (folderId: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, isExpanded: !folder.isExpanded }
        : folder
    ));
  };

  // ✅ Ajouter un nouveau fichier - PERSISTENCE TOTALE
  const addFile = async (name: string, content: string, folderId: string) => {
    if (!user) {
      toast({
        title: "❌ Erreur",
        description: "Vous devez être connecté",
        variant: "destructive"
      });
      return false;
    }

    const newFile: WorkspaceFile = {
      id: `file-${Date.now()}`,
      name: name.endsWith('.md') ? name : `${name}.md`,
      type: 'text',
      content,
      lastModified: new Date().toISOString().split('T')[0],
      folderId,
      userId: user.id
    };

    try {
      // 1. Sauvegarder dans Supabase d'abord
      const saved = await workspaceService.saveFile(newFile);
      
      if (!saved) {
        toast({
          title: "❌ Erreur de sauvegarde",
          description: "Impossible de sauvegarder le fichier",
          variant: "destructive"
        });
        return false;
      }

      // 2. Mettre à jour l'interface localement
      setFolders(prev => prev.map(folder => 
        folder.id === folderId
          ? { ...folder, files: [...folder.files, newFile] }
          : folder
      ));

      toast({
        title: "✅ Fichier créé",
        description: `Le fichier "${newFile.name}" a été créé et sauvegardé.`
      });
      
      return true;

    } catch (error) {
      console.error('❌ Error adding file:', error);
      toast({
        title: "❌ Erreur",
        description: "Une erreur s'est produite lors de la création",
        variant: "destructive"
      });
      return false;
    }
  };

  // ✅ Mettre à jour un fichier - PERSISTENCE TOTALE
  const updateFile = async (fileId: string, newContent: string) => {
    if (!user) return false;

    try {
      // 1. Sauvegarder dans Supabase d'abord
      const updated = await workspaceService.updateFile(fileId, newContent, user.id);
      
      if (!update