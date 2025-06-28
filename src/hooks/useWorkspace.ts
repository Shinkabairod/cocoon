
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { workspaceService, WorkspaceFile } from '@/services/workspaceService';
import { useToast } from '@/hooks/use-toast';

export interface FolderItem {
  id: string;
  name: string;
  emoji: string;
  type: 'personal' | 'resources';
  files: WorkspaceFile[];
  isExpanded?: boolean;
}

export const useWorkspace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Structure des dossiers par défaut
  const defaultFolders: FolderItem[] = [
    {
      id: 'personal-profile',
      name: 'My Profile',
      emoji: '👤',
      type: 'personal',
      isExpanded: true,
      files: []
    },
    {
      id: 'personal-goals',
      name: 'My Goals',
      emoji: '🎯',
      type: 'personal',
      isExpanded: false,
      files: []
    },
    {
      id: 'personal-business',
      name: 'My Business',
      emoji: '🏢',
      type: 'personal',
      isExpanded: false,
      files: []
    },
    {
      id: 'personal-platforms',
      name: 'My Platforms',
      emoji: '📱',
      type: 'personal',
      isExpanded: false,
      files: []
    },
    {
      id: 'personal-challenges',
      name: 'My Challenges',
      emoji: '⚡',
      type: 'personal',
      isExpanded: false,
      files: []
    },
    {
      id: 'resources-scripts',
      name: 'Video Scripts',
      emoji: '🎬',
      type: 'resources',
      isExpanded: false,
      files: []
    },
    {
      id: 'resources-templates',
      name: 'Templates',
      emoji: '📋',
      type: 'resources',
      isExpanded: false,
      files: []
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
      console.log('📂 Loading workspace data for user:', user.id);

      // Charger les fichiers d'onboarding depuis Supabase
      const onboardingFiles = await workspaceService.loadOnboardingAsFiles(user.id);
      
      // Charger les autres fichiers utilisateur
      const userFiles = await workspaceService.loadUserFiles(user.id);
      
      // Combiner tous les fichiers
      const allFiles = [...onboardingFiles, ...userFiles];

      // Organiser les fichiers dans les dossiers
      const updatedFolders = defaultFolders.map(folder => ({
        ...folder,
        files: allFiles.filter(file => file.folderId === folder.id)
      }));

      setFolders(updatedFolders);
      console.log('✅ Workspace loaded with', allFiles.length, 'files');

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

  // Ajouter un nouveau dossier
  const addFolder = (name: string, emoji: string, type: 'personal' | 'resources') => {
    const newFolder: FolderItem = {
      id: `${type}-${Date.now()}`,
      name,
      emoji,
      type,
      isExpanded: true,
      files: []
    };

    setFolders(prev => [...prev, newFolder]);
    
    toast({
      title: "✅ Dossier créé",
      description: `Le dossier "${name}" a été ajouté.`
    });
  };

  // Supprimer un dossier
  const deleteFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder && folder.files.length > 0) {
      toast({
        title: "❌ Impossible de supprimer",
        description: "Ce dossier contient des fichiers.",
        variant: "destructive"
      });
      return false;
    }

    setFolders(prev => prev.filter(f => f.id !== folderId));
    toast({
      title: "✅ Dossier supprimé",
      description: `Le dossier "${folder?.name}" a été supprimé.`
    });
    return true;
  };

  // Toggle l'expansion d'un dossier
  const toggleFolder = (folderId: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, isExpanded: !folder.isExpanded }
        : folder
    ));
  };

  // Ajouter un nouveau fichier
  const addFile = async (name: string, content: string, folderId: string) => {
    if (!user) return false;

    const newFile: WorkspaceFile = {
      id: `file-${Date.now()}`,
      name: name.endsWith('.md') ? name : `${name}.md`,
      type: 'text',
      content,
      lastModified: new Date().toISOString().split('T')[0],
      folderId,
      userId: user.id
    };

    // Sauvegarder dans Supabase
    const saved = await workspaceService.saveFile(newFile);
    
    if (saved) {
      setFolders(prev => prev.map(folder => 
        folder.id === folderId
          ? { ...folder, files: [...folder.files, newFile] }
          : folder
      ));

      toast({
        title: "✅ Fichier créé",
        description: `Le fichier "${newFile.name}" a été ajouté.`
      });
      return true;
    } else {
      toast({
        title: "❌ Erreur",
        description: "Impossible de créer le fichier",
        variant: "destructive"
      });
      return false;
    }
  };

  // Mettre à jour un fichier
  const updateFile = async (fileId: string, newContent: string) => {
    if (!user) return false;

    // Mettre à jour localement
    let updatedFile: WorkspaceFile | null = null;
    setFolders(prev => prev.map(folder => ({
      ...folder,
      files: folder.files.map(file => {
        if (file.id === fileId) {
          updatedFile = { 
            ...file, 
            content: newContent, 
            lastModified: new Date().toISOString().split('T')[0] 
          };
          return updatedFile;
        }
        return file;
      })
    })));

    // Sauvegarder dans Supabase
    if (updatedFile) {
      const saved = await workspaceService.saveFile(updatedFile);
      if (saved) {
        toast({
          title: "✅ Fichier sauvegardé",
          description: "Vos modifications ont été enregistrées."
        });
        return true;
      }
    }

    toast({
      title: "❌ Erreur de sauvegarde",
      description: "Impossible de sauvegarder le fichier",
      variant: "destructive"
    });
    return false;
  };

  // Supprimer un fichier
  const deleteFile = async (fileId: string) => {
    if (!user) return false;

    const success = await workspaceService.deleteFile(fileId, user.id);
    
    if (success) {
      setFolders(prev => prev.map(folder => ({
        ...folder,
        files: folder.files.filter(file => file.id !== fileId)
      })));

      toast({
        title: "✅ Fichier supprimé",
        description: "Le fichier a été supprimé."
      });
      return true;
    } else {
      toast({
        title: "❌ Erreur",
        description: "Impossible de supprimer le fichier",
        variant: "destructive"
      });
      return false;
    }
  };

  // Déplacer un fichier
  const moveFile = (fileId: string, newFolderId: string) => {
    setFolders(prev => {
      let fileToMove: WorkspaceFile | null = null;
      
      // Retirer le fichier de son dossier actuel
      const foldersWithoutFile = prev.map(folder => ({
        ...folder,
        files: folder.files.filter(file => {
          if (file.id === fileId) {
            fileToMove = { ...file, folderId: newFolderId };
            return false;
          }
          return true;
        })
      }));

      // Ajouter le fichier au nouveau dossier
      if (fileToMove) {
        return foldersWithoutFile.map(folder => 
          folder.id === newFolderId
            ? { ...folder, files: [...folder.files, fileToMove!] }
            : folder
        );
      }

      return foldersWithoutFile;
    });

    toast({
      title: "✅ Fichier déplacé",
      description: "Le fichier a été déplacé vers le nouveau dossier."
    });
  };

  // Filtrer les dossiers
  const getFilteredFolders = (type: 'personal' | 'resources', searchQuery: string = '') => {
    return folders.filter(folder => {
      const matchesType = folder.type === type;
      const matchesSearch = searchQuery === '' || 
        folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folder.files.some(file => 
          file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.content?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesType && matchesSearch;
    });
  };

  // Statistiques
  const getStats = () => {
    const totalFiles = folders.reduce((sum, folder) => sum + folder.files.length, 0);
    const personalFiles = folders
      .filter(f => f.type === 'personal')
      .reduce((sum, folder) => sum + folder.files.length, 0);
    const resourceFiles = folders
      .filter(f => f.type === 'resources')
      .reduce((sum, folder) => sum + folder.files.length, 0);

    return {
      totalFolders: folders.length,
      totalFiles,
      personalFiles,
      resourceFiles
    };
  };

  return {
    folders,
    loading,
    addFolder,
    deleteFolder,
    toggleFolder,
    addFile,
    updateFile,
    deleteFile,
    moveFile,
    getFilteredFolders,
    getStats,
    refreshWorkspace: loadWorkspaceData
  };
};
