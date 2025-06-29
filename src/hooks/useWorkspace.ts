// src/hooks/useWorkspace.ts - Version avec données réelles Supabase + icônes UI
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
  const [selectedFile, setSelectedFile] = useState<WorkspaceFile | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);

  // Structure des dossiers par défaut - ICÔNES 2D LUCIDE UNIQUEMENT
  const defaultFolders: Omit<WorkspaceFolder, 'userId' | 'createdAt'>[] = [
    {
      id: 'personal-profile',
      name: 'My Profile',
      emoji: 'User',           // Icône Lucide au lieu d'emoji
      color: '#3B82F6',
      type: 'personal'
    },
    {
      id: 'personal-goals',
      name: 'My Goals',
      emoji: 'Target',         // Icône Lucide au lieu d'emoji
      color: '#10B981',
      type: 'personal'
    },
    {
      id: 'personal-business',
      name: 'My Business',
      emoji: 'Building',       // Icône Lucide au lieu d'emoji
      color: '#8B5CF6',
      type: 'personal'
    },
    {
      id: 'personal-platforms',
      name: 'My Platforms',
      emoji: 'Smartphone',     // Icône Lucide au lieu d'emoji
      color: '#F59E0B',
      type: 'personal'
    },
    {
      id: 'personal-challenges',
      name: 'My Challenges',
      emoji: 'Zap',           // Icône Lucide au lieu d'emoji
      color: '#EF4444',
      type: 'personal'
    },
    {
      id: 'resources-scripts',
      name: 'Video Scripts',
      emoji: 'Video',         // Icône Lucide au lieu d'emoji
      color: '#06B6D4',
      type: 'resources'
    },
    {
      id: 'resources-templates',
      name: 'Templates',
      emoji: 'Clipboard',     // Icône Lucide au lieu d'emoji
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

  // Chargement des données depuis Supabase
  const loadWorkspaceData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('📂 Loading workspace for user:', user.id);

      // 1. Charger dossiers existants
      const existingFolders = await workspaceService.loadUserFolders(user.id);
      
      // 2. Créer dossiers par défaut si manquants
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

      // 3. Charger fichiers utilisateur + onboarding
      const [userFiles, onboardingFiles] = await Promise.all([
        workspaceService.loadUserFiles(user.id),
        workspaceService.loadOnboardingAsFiles(user.id)
      ]);

      const allFiles = [...userFiles, ...onboardingFiles];

      // 4. Organiser dans structure finale
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

  // Stats calculées en temps réel
  const totalFolders = folders.length;
  const totalFiles = folders.reduce((sum, folder) => sum + folder.files.length, 0);
  const resourceFiles = folders.reduce((sum, folder) => 
    sum + folder.files.filter(f => f.type === 'link').length, 0
  );
  const videoFiles = folders.reduce((sum, folder) => 
    sum + folder.files.filter(f => f.type === 'video').length, 0
  );

  // Actions de sélection
  const handleFileSelect = (file: WorkspaceFile) => {
    setSelectedFile(file);
    setSelectedFolder(null);
    console.log('📄 File selected:', file.name);
  };

  const handleFolderSelect = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setSelectedFile(null);
    console.log('📁 Folder selected:', folder.name);
  };

  const handleCloseEditor = () => {
    setSelectedFile(null);
    setSelectedFolder(null);
  };

  // Actions CRUD avec persistance Supabase
  const handleNewNote = async () => {
    if (!user) return;
    
    const newFile: WorkspaceFile = {
      id: `note_${Date.now()}`,
      name: `New Note ${new Date().toLocaleDateString()}.md`,
      type: 'text',
      content: '# Nouvelle Note\n\nCommencez à écrire...',
      lastModified: new Date().toISOString().split('T')[0],
      folderId: 'personal-profile',
      userId: user.id
    };

    try {
      const saved = await workspaceService.saveFile(newFile);
      if (saved) {
        await loadWorkspaceData();
        setSelectedFile(newFile);
        toast({
          title: "📝 Note créée",
          description: "Nouvelle note ajoutée avec succès"
        });
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de créer la note",
        variant: "destructive"
      });
    }
  };

  const handleAddLink = async () => {
    const url = prompt('URL de la ressource:');
    const title = prompt('Titre de la ressource:');
    
    if (!url || !title || !user) return;

    const newFile: WorkspaceFile = {
      id: `link_${Date.now()}`,
      name: `${title}.link`,
      type: 'link',
      content: url,
      url: url,
      lastModified: new Date().toISOString().split('T')[0],
      folderId: 'resources-templates',
      userId: user.id
    };

    try {
      const saved = await workspaceService.saveFile(newFile);
      if (saved) {
        await loadWorkspaceData();
        toast({
          title: "🔗 Lien ajouté",
          description: `${title} sauvegardé`
        });
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible d'ajouter le lien",
        variant: "destructive"
      });
    }
  };

  const handleUploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.md';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !user) return;

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          
          const newFile: WorkspaceFile = {
            id: `file_${Date.now()}`,
            name: file.name,
            type: 'text',
            content: content,
            size: `${Math.round(file.size / 1024)} KB`,
            lastModified: new Date().toISOString().split('T')[0],
            folderId: 'personal-profile',
            userId: user.id
          };

          const saved = await workspaceService.saveFile(newFile);
          if (saved) {
            await loadWorkspaceData();
            toast({
              title: "📁 Fichier uploadé",
              description: file.name
            });
          }
        };
        reader.readAsText(file);
      } catch (error) {
        toast({
          title: "❌ Erreur d'upload",
          description: "Impossible d'uploader le fichier",
          variant: "destructive"
        });
      }
    };
    input.click();
  };

  const handleNewFolder = async () => {
    const name = prompt('Nom du dossier:');
    const iconName = prompt('Icône du dossier (User, Target, Building, etc.):') || 'Folder';
    
    if (!name || !user) return;

    const newFolder: WorkspaceFolder = {
      id: `custom-${Date.now()}`,
      name,
      emoji: iconName,        // Nom d'icône Lucide au lieu d'emoji
      color: '#3B82F6',
      type: 'personal',
      userId: user.id,
      createdAt: new Date().toISOString(),
      isExpanded: true
    };

    try {
      const saved = await workspaceService.saveFolder(newFolder);
      if (saved) {
        await loadWorkspaceData();
        toast({
          title: "📂 Dossier créé",
          description: name
        });
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de créer le dossier",
        variant: "destructive"
      });
    }
  };

  // Sauvegarder fichier modifié
  const handleSaveFile = async (fileId: string, content: string) => {
    if (!user) return false;

    try {
      const saved = await workspaceService.updateFile(fileId, content, user.id);
      if (saved) {
        // Mettre à jour localement
        setFolders(prev => prev.map(folder => ({
          ...folder,
          files: folder.files.map(file => 
            file.id === fileId ? { ...file, content, lastModified: new Date().toISOString().split('T')[0] } : file
          )
        })));
        
        toast({
          title: "💾 Sauvegardé",
          description: "Fichier mis à jour"
        });
        return true;
      }
    } catch (error) {
      toast({
        title: "❌ Erreur de sauvegarde",
        description: "Impossible de sauvegarder",
        variant: "destructive"
      });
    }
    return false;
  };

  return {
    // États
    folders,
    loading,
    selectedFile,
    selectedFolder,
    
    // Stats
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
    handleSaveFile,
    
    // Utilitaires
    loadWorkspaceData
  };
};
