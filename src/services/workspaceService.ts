// src/services/workspaceService.ts
import { supabase } from '@/integrations/supabase/client';

export interface WorkspaceFile {
  id: string;
  name: string;
  type: 'text' | 'pdf' | 'video' | 'image' | 'link' | 'onboarding';
  content?: string;
  url?: string;
  size?: string;
  lastModified: string;
  folderId: string;
  userId: string;
}

export interface WorkspaceFolder {
  id: string;
  name: string;
  emoji: string;
  color: string;
  type: 'personal' | 'resources';
  userId: string;
  createdAt: string;
  isExpanded?: boolean;
}

class WorkspaceService {
  
  /**
   * Charge TOUS les dossiers d'un utilisateur depuis Supabase
   */
  async loadUserFolders(userId: string): Promise<WorkspaceFolder[]> {
    try {
      console.log('📁 Loading folders for user:', userId);
      
      const { data: folders, error } = await supabase
        .from('vault_files')
        .select('*')
        .eq('user_id', userId)
        .eq('file_type', 'folder')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Error loading folders:', error);
        return [];
      }

      const workspaceFolders = (folders || []).map(folder => {
        const metadata = folder.metadata as any || {};
        const folderData = JSON.parse(folder.content || '{}');
        
        return {
          id: folder.path.replace('folders/', ''),
          name: folderData.name || metadata.name || 'Dossier sans nom',
          emoji: folderData.emoji || metadata.emoji || '📁',
          color: folderData.color || metadata.color || '#3B82F6',
          type: folderData.type || metadata.type || 'personal',
          userId: folder.user_id || '',
          createdAt: folder.created_at || '',
          isExpanded: false
        } as WorkspaceFolder;
      });

      console.log('✅ Loaded folders:', workspaceFolders.length);
      return workspaceFolders;

    } catch (error) {
      console.error('❌ Exception loading folders:', error);
      return [];
    }
  }

  /**
   * Sauvegarde UN DOSSIER dans Supabase
   */
  async saveFolder(folder: WorkspaceFolder): Promise<boolean> {
    try {
      console.log('💾 Saving folder:', folder.name);

      const { error } = await supabase
        .from('vault_files')
        .upsert({
          user_id: folder.userId,
          path: `folders/${folder.id}`,
          content: JSON.stringify({
            name: folder.name,
            emoji: folder.emoji,
            color: folder.color,
            type: folder.type
          }),
          file_type: 'folder',
          metadata: {
            folderId: folder.id,
            isFolder: true,
            name: folder.name,
            emoji: folder.emoji,
            color: folder.color,
            type: folder.type
          } as any
        });

      if (error) {
        console.error('❌ Error saving folder:', error);
        return false;
      }

      console.log('✅ Folder saved:', folder.name);
      return true;
    } catch (error) {
      console.error('❌ Exception saving folder:', error);
      return false;
    }
  }

  /**
   * Supprime UN DOSSIER de Supabase
   */
  async deleteFolder(folderId: string, userId: string): Promise<boolean> {
    try {
      console.log('🗑️ Deleting folder:', folderId);

      // Supprimer d'abord tous les fichiers du dossier
      await supabase
        .from('vault_files')
        .delete()
        .eq('user_id', userId)
        .neq('file_type', 'folder')
        .like('path', `${folderId}/%`);

      // Puis supprimer le dossier lui-même
      const { error } = await supabase
        .from('vault_files')
        .delete()
        .eq('user_id', userId)
        .eq('path', `folders/${folderId}`);

      if (error) {
        console.error('❌ Error deleting folder:', error);
        return false;
      }

      console.log('✅ Folder deleted:', folderId);
      return true;
    } catch (error) {
      console.error('❌ Exception deleting folder:', error);
      return false;
    }
  }

  /**
   * Charge TOUS les fichiers d'un utilisateur depuis Supabase
   */
  async loadUserFiles(userId: string): Promise<WorkspaceFile[]> {
    try {
      console.log('📄 Loading files for user:', userId);
      
      const { data: files, error } = await supabase
        .from('vault_files')
        .select('*')
        .eq('user_id', userId)
        .neq('file_type', 'folder')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error loading files:', error);
        return [];
      }

      const workspaceFiles = (files || []).map(file => {
        const metadata = file.metadata as any || {};
        
        return {
          id: file.id.toString(),
          name: file.path.split('/').pop() || 'Fichier sans nom',
          type: file.file_type as any || 'text',
          content: file.content || '',
          lastModified: file.updated_at?.split('T')[0] || '',
          folderId: metadata.folderId || file.path.split('/')[0] || 'default',
          userId: file.user_id || ''
        } as WorkspaceFile;
      });

      console.log('✅ Loaded files:', workspaceFiles.length);
      return workspaceFiles;

    } catch (error) {
      console.error('❌ Exception loading files:', error);
      return [];
    }
  }

  /**
   * Sauvegarde UN FICHIER dans Supabase
   */
  async saveFile(file: WorkspaceFile): Promise<boolean> {
    try {
      console.log('💾 Saving file:', file.name);

      const { error } = await supabase
        .from('vault_files')
        .upsert({
          user_id: file.userId,
          path: `${file.folderId}/${file.name}`,
          content: file.content,
          file_type: file.type,
          metadata: {
            folderId: file.folderId,
            lastModified: file.lastModified,
            fileName: file.name,
            fileType: file.type
          } as any
        });

      if (error) {
        console.error('❌ Error saving file:', error);
        return false;
      }

      console.log('✅ File saved:', file.name);
      return true;
    } catch (error) {
      console.error('❌ Exception saving file:', error);
      return false;
    }
  }

  /**
   * Supprime UN FICHIER de Supabase
   */
  async deleteFile(fileId: string, userId: string): Promise<boolean> {
    try {
      console.log('🗑️ Deleting file:', fileId);

      const { error } = await supabase
        .from('vault_files')
        .delete()
        .eq('id', parseInt(fileId))
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Error deleting file:', error);
        return false;
      }

      console.log('✅ File deleted:', fileId);
      return true;
    } catch (error) {
      console.error('❌ Exception deleting file:', error);
      return false;
    }
  }

  /**
   * Met à jour UN FICHIER dans Supabase
   */
  async updateFile(fileId: string, content: string, userId: string): Promise<boolean> {
    try {
      console.log('📝 Updating file:', fileId);

      const { error } = await supabase
        .from('vault_files')
        .update({
          content: content,
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(fileId))
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Error updating file:', error);
        return false;
      }

      console.log('✅ File updated:', fileId);
      return true;
    } catch (error) {
      console.error('❌ Exception updating file:', error);
      return false;
    }
  }

  /**
   * Déplace UN FICHIER vers un autre dossier
   */
  async moveFile(fileId: string, newFolderId: string, fileName: string, userId: string): Promise<boolean> {
    try {
      console.log('📁 Moving file:', fileId, 'to folder:', newFolderId);

      const { error } = await supabase
        .from('vault_files')
        .update({
          path: `${newFolderId}/${fileName}`,
          metadata: {
            folderId: newFolderId,
            fileName: fileName,
            lastModified: new Date().toISOString().split('T')[0]
          } as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(fileId))
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Error moving file:', error);
        return false;
      }

      console.log('✅ File moved:', fileId);
      return true;
    } catch (error) {
      console.error('❌ Exception moving file:', error);
      return false;
    }
  }

  /**
   * Charge les données d'onboarding et les convertit en fichiers
   */
  async loadOnboardingAsFiles(userId: string): Promise<WorkspaceFile[]> {
    try {
      console.log('📂 Loading onboarding data for user:', userId);
      
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('profile_data')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('❌ Error loading profile:', error);
        return [];
      }

      if (!profile?.profile_data) {
        console.log('⚠️ No profile data found');
        return [];
      }

      const onboardingData = profile.profile_data as any;
      const files: WorkspaceFile[] = [];

      // Créer les fichiers d'onboarding
      const onboardingFiles = [
        {
          id: 'profile-main',
          name: 'Mon Profil Créateur.md',
          folderId: 'personal-profile',
          content: this.formatProfileContent(onboardingData)
        },
        {
          id: 'goals-2025',
          name: 'Mes Objectifs.md',
          folderId: 'personal-goals',
          content: this.formatGoalsContent(onboardingData)
        },
        {
          id: 'business-model',
          name: 'Mon Business Model.md',
          folderId: 'personal-business',
          content: this.formatBusinessContent(onboardingData)
        },
        {
          id: 'platforms-strategy',
          name: 'Stratégie Plateformes.md',
          folderId: 'personal-platforms',
          content: this.formatPlatformsContent(onboardingData)
        },
        {
          id: 'challenges-solutions',
          name: 'Défis & Solutions.md',
          folderId: 'personal-challenges',
          content: this.formatChallengesContent(onboardingData)
        }
      ];

      for (const fileData of onboardingFiles) {
        files.push({
          id: fileData.id,
          name: fileData.name,
          type: 'onboarding',
          content: fileData.content,
          lastModified: new Date().toISOString().split('T')[0],
          folderId: fileData.folderId,
          userId
        });
      }

      // Sauvegarder automatiquement les fichiers d'onboarding si ils n'existent pas déjà
      for (const file of files) {
        const { data: existing } = await supabase
          .from('vault_files')
          .select('id')
          .eq('user_id', userId)
          .eq('path', `${file.folderId}/${file.name}`)
          .single();

        if (!existing) {
          await this.saveFile(file);
        }
      }

      console.log('✅ Generated onboarding files:', files.length);
      return files;

    } catch (error) {
      console.error('❌ Error in loadOnboardingAsFiles:', error);
      return [];
    }
  }

  // Fonctions de formatage (inchangées)
  private formatProfileContent(data: any): string {
    return `# 👤 Mon Profil Créateur

## 🎯 Informations de base
- **Expérience**: ${data.experienceLevel || 'Non défini'}
- **Objectif**: ${data.contentGoal || 'Non défini'}
- **Niche**: ${data.niche || 'Non défini'}
- **Localisation**: ${data.city || ''}, ${data.country || ''}

## 🏢 Business
- **Type**: ${data.businessType || 'Non défini'}
- **Description**: ${data.businessDescription || 'Non défini'}

## 🎯 Stratégie
- **Plateformes**: ${Array.isArray(data.platforms) ? data.platforms.join(', ') : 'Non défini'}
- **Types de contenu**: ${Array.isArray(data.contentTypes) ? data.contentTypes.join(', ') : 'Non défini'}
- **Audience**: ${data.targetGeneration || 'Non défini'}

## ⏰ Ressources
- **Temps disponible**: ${data.timeAvailable || 'Non défini'}
- **Équipement**: ${Array.isArray(data.equipmentOwned) ? data.equipmentOwned.join(', ') : 'Non défini'}
- **Défis**: ${data.contentChallenge || data.mainChallenges || 'Non défini'}

## 💰 Monétisation
- **Intention**: ${data.monetizationIntent || 'Non défini'}

---
**Mis à jour le**: ${new Date().toLocaleDateString('fr-FR')}`;
  }

  private formatGoalsContent(data: any): string {
    return `# 🎯 Mes Objectifs

## 📊 Objectif principal
${data.contentGoal || 'Définir mes objectifs de création de contenu'}

## 🎬 Types de contenu visés
${Array.isArray(data.contentTypes) ? 
  data.contentTypes.map((type: string) => `- ${type}`).join('\n') : 
  '- À définir'}

## 📱 Plateformes prioritaires
${Array.isArray(data.platforms) ? 
  data.platforms.map((platform: string) => `- ${platform}`).join('\n') : 
  '- À définir'}

## 🎯 Audience cible
- **Génération**: ${data.targetGeneration || 'À définir'}
- **Niche**: ${data.niche || 'À définir'}

## ⏰ Planning
- **Temps disponible**: ${data.timeAvailable || 'À définir'}

---
**Créé le**: ${new Date().toLocaleDateString('fr-FR')}`;
  }

  private formatBusinessContent(data: any): string {
    return `# 🏢 Mon Business Model

## 💼 Type de business
${data.businessType || 'À définir'}

## 📝 Description
${data.businessDescription || 'Décrire mon activité'}

## 💰 Stratégie de monétisation
${data.monetizationIntent || 'À définir'}

## 🎯 Positionnement
- **Niche**: ${data.niche || 'À définir'}
- **Expérience**: ${data.experienceLevel || 'À définir'}

## 📊 Métriques importantes
- Abonnés
- Engagement
- Revenus
- Croissance

---
**Créé le**: ${new Date().toLocaleDateString('fr-FR')}`;
  }

  private formatPlatformsContent(data: any): string {
    const platforms = Array.isArray(data.platforms) ? data.platforms : [];
    
    return `# 📱 Ma Stratégie Multi-Plateformes

## Plateformes sélectionnées
${platforms.length > 0 ? 
  platforms.map((platform: string) => `### ${platform}\n- Stratégie: À définir\n- Fréquence: À planifier\n- Objectifs: À fixer\n`).join('\n') :
  'Aucune plateforme sélectionnée'}

## Types de contenu par plateforme
${Array.isArray(data.contentTypes) ? 
  data.contentTypes.map((type: string) => `- ${type}`).join('\n') : 
  '- À définir'}

## Planning de publication
- **Fréquence globale**: À définir selon le temps disponible (${data.timeAvailable || 'non spécifié'})

---
**Créé le**: ${new Date().toLocaleDateString('fr-FR')}`;
  }

  private formatChallengesContent(data: any): string {
    return `# ⚡ Mes Défis & Solutions

## 🔥 Défis identifiés
${data.contentChallenge || data.mainChallenges || 'À identifier'}

## 🛠️ Équipement disponible
${Array.isArray(data.equipmentOwned) ? 
  data.equipmentOwned.map((equipment: string) => `- ${equipment}`).join('\n') : 
  '- À inventorier'}

## ⏰ Contraintes de temps
- **Temps disponible**: ${data.timeAvailable || 'À évaluer'}

## 💡 Plan d'action
1. Identifier les priorités
2. Développer un workflow efficace
3. Optimiser les ressources disponibles
4. Mesurer et ajuster

## 🎯 Solutions à explorer
- Automatisation des tâches répétitives
- Planification et batch content
- Formation continue
- Networking avec d'autres créateurs

---
**Créé le**: ${new Date().toLocaleDateString('fr-FR')}`;
  }
}

export const workspaceService = new WorkspaceService();