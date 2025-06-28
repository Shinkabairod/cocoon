
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
  type: 'personal' | 'resources';
  userId: string;
  createdAt: string;
}

class WorkspaceService {
  
  /**
   * Charge les données d'onboarding depuis Supabase et les convertit en fichiers
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

      // Créer le fichier profil principal
      files.push({
        id: 'profile-main',
        name: 'Mon Profil Créateur.md',
        type: 'onboarding',
        content: this.formatProfileContent(onboardingData),
        lastModified: new Date().toISOString().split('T')[0],
        folderId: 'personal-profile',
        userId
      });

      // Créer le fichier objectifs
      files.push({
        id: 'goals-2025',
        name: 'Mes Objectifs.md',
        type: 'onboarding',
        content: this.formatGoalsContent(onboardingData),
        lastModified: new Date().toISOString().split('T')[0],
        folderId: 'personal-goals',
        userId
      });

      // Créer le fichier business
      files.push({
        id: 'business-model',
        name: 'Mon Business Model.md',
        type: 'onboarding',
        content: this.formatBusinessContent(onboardingData),
        lastModified: new Date().toISOString().split('T')[0],
        folderId: 'personal-business',
        userId
      });

      // Créer le fichier plateformes
      files.push({
        id: 'platforms-strategy',
        name: 'Stratégie Plateformes.md',
        type: 'onboarding',
        content: this.formatPlatformsContent(onboardingData),
        lastModified: new Date().toISOString().split('T')[0],
        folderId: 'personal-platforms',
        userId
      });

      // Créer le fichier défis
      files.push({
        id: 'challenges-solutions',
        name: 'Défis & Solutions.md',
        type: 'onboarding',
        content: this.formatChallengesContent(onboardingData),
        lastModified: new Date().toISOString().split('T')[0],
        folderId: 'personal-challenges',
        userId
      });

      console.log('✅ Generated files from onboarding:', files.length);
      return files;

    } catch (error) {
      console.error('❌ Error in loadOnboardingAsFiles:', error);
      return [];
    }
  }

  /**
   * Sauvegarde un fichier dans Supabase
   */
  async saveFile(file: WorkspaceFile): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('vault_files')
        .upsert({
          user_id: file.userId,
          path: `${file.folderId}/${file.name}`,
          content: file.content,
          file_type: file.type,
          metadata: {
            folderId: file.folderId,
            lastModified: file.lastModified
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
   * Charge tous les fichiers d'un utilisateur
   */
  async loadUserFiles(userId: string): Promise<WorkspaceFile[]> {
    try {
      const { data: files, error } = await supabase
        .from('vault_files')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error loading files:', error);
        return [];
      }

      return (files || []).map(file => ({
        id: file.id.toString(),
        name: file.path.split('/').pop() || '',
        type: file.file_type as any || 'text',
        content: file.content || '',
        lastModified: file.updated_at?.split('T')[0] || '',
        folderId: (file.metadata as any)?.folderId || 'default',
        userId: file.user_id || ''
      }));

    } catch (error) {
      console.error('❌ Exception loading files:', error);
      return [];
    }
  }

  /**
   * Supprime un fichier
   */
  async deleteFile(fileId: string, userId: string): Promise<boolean> {
    try {
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

  // Formatters pour le contenu des fichiers
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
