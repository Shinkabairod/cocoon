// src/hooks/useUserStats.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Icons } from '@/components/ui/icons';

export interface UserStats {
  // Stats principales
  scriptsGenerated: number;
  chatConversations: number;
  resourcesUploaded: number;
  timeSaved: number;
  totalScore: number;
  
  // Nouvelles propriétés
  totalResources: number;
  contentGenerated: number;
  
  // Changements (pour les %)
  scriptsChange: string;
  chatChange: string;
  resourcesChange: string;
  timeChange: string;
  
  // Activité
  todayActivity: number;
  completedGoals: number;
  
  // Données récentes
  recentActivities: Activity[];
  recentFiles: RecentFile[];
  aiInsights: AIInsight[];
  
  // Progression
  contentProgress: ContentProgress;
  workspace: WorkspaceData;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: string;
  icon: any;
}

interface RecentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'achievement' | 'suggestion';
  priority: 'high' | 'medium' | 'low';
}

interface ContentProgress {
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  monthlyStats: MonthlyStats;
}

interface MonthlyStats {
  scripts: number;
  chats: number;
  uploads: number;
}

interface WorkspaceData {
  totalFiles: number;
  storageUsed: number;
  storageLimit: number;
  folders: string[];
  lastSync: string;
}

export const useUserStats = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['userStats', userId],
    queryFn: async (): Promise<UserStats> => {
      if (!userId) throw new Error('User ID required');

      // Récupérer toutes les données en parallèle
      const [
        chatConversations,
        vaultFiles,
        userProfile
      ] = await Promise.all([
        // Conversations IA
        supabase
          .from('vault_files')
          .select('*')
          .eq('user_id', userId)
          .eq('file_type', 'chat')
          .order('created_at', { ascending: false }),
        
        // Fichiers uploadés
        supabase
          .from('vault_files')
          .select('*')
          .eq('user_id', userId)
          .neq('file_type', 'chat')
          .order('created_at', { ascending: false }),
        
        // Profil utilisateur
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()
      ]);

      // Calculer les stats réelles
      const totalChats = chatConversations.data?.length || 0;
      const totalFiles = vaultFiles.data?.length || 0;

      // Calculer les scripts générés (basé sur les fichiers .md avec "script" dans le nom)
      const scriptsGenerated = vaultFiles.data?.filter(file => 
        file.path?.toLowerCase().includes('script') || 
        file.content?.toLowerCase().includes('script')
      ).length || 0;

      // Calculer l'activité d'aujourd'hui
      const today = new Date().toISOString().split('T')[0];
      const todayActivity = vaultFiles.data?.filter(file => 
        file.created_at?.startsWith(today)
      ).length || 0;

      // Calculer le temps économisé (estimation basée sur l'activité)
      const timeSaved = Math.round((scriptsGenerated * 2.5) + (totalChats * 0.5) + (totalFiles * 0.3));

      // Score créateur (algorithme simple)
      const totalScore = (scriptsGenerated * 10) + (totalChats * 5) + (totalFiles * 3) + (timeSaved * 2);

      // Nouvelles propriétés calculées
      const totalResources = totalFiles;
      const contentGenerated = scriptsGenerated + totalChats;

      // Activités récentes (basées sur les vrais fichiers)
      const recentActivities: Activity[] = vaultFiles.data?.slice(0, 5).map(file => ({
        id: file.id.toString(),
        title: getActivityTitle(file),
        description: getActivityDescription(file),
        time: formatRelativeTime(file.created_at),
        type: getActivityType(file),
        icon: getActivityIcon(file)
      })) || [];

      // Fichiers récents
      const recentFiles: RecentFile[] = vaultFiles.data?.slice(0, 8).map(file => ({
        id: file.id.toString(),
        name: file.path?.split('/').pop() || 'Fichier sans nom',
        type: file.file_type || 'unknown',
        size: formatFileSize(getFileSize(file.metadata)),
        uploadedAt: formatRelativeTime(file.created_at)
      })) || [];

      // Insights IA (suggestions basées sur l'activité)
      const aiInsights: AIInsight[] = generateAIInsights({
        scriptsGenerated,
        totalChats,
        totalFiles,
        todayActivity
      });

      // Progression du contenu
      const contentProgress: ContentProgress = {
        currentStreak: calculateCurrentStreak(vaultFiles.data || []),
        weeklyGoal: 5, // Objectif par défaut
        weeklyProgress: calculateWeeklyProgress(vaultFiles.data || []),
        monthlyStats: {
          scripts: scriptsGenerated,
          chats: totalChats,
          uploads: totalFiles
        }
      };

      // Données workspace
      const workspace: WorkspaceData = {
        totalFiles,
        storageUsed: calculateStorageUsed(vaultFiles.data || []),
        storageLimit: 1000, // 1GB par défaut
        folders: [...new Set(vaultFiles.data?.map(f => f.path?.split('/')[0]).filter(Boolean) || [])],
        lastSync: vaultFiles.data?.[0]?.updated_at || new Date().toISOString()
      };

      return {
        scriptsGenerated,
        chatConversations: totalChats,
        resourcesUploaded: totalFiles,
        timeSaved,
        totalScore,
        totalResources,
        contentGenerated,
        scriptsChange: calculateChange(scriptsGenerated, scriptsGenerated - 2),
        chatChange: calculateChange(totalChats, totalChats - 1),
        resourcesChange: calculateChange(totalFiles, totalFiles - 3),
        timeChange: calculateChange(timeSaved, timeSaved - 5),
        todayActivity,
        completedGoals: Math.min(3, Math.floor(totalScore / 100)),
        recentActivities,
        recentFiles,
        aiInsights,
        contentProgress,
        workspace
      };
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true
  });
};

// ✅ FONCTION getStats SÉCURISÉE POUR ÉVITER L'ERREUR
export const getStats = (data: UserStats | undefined): UserStats => {
  if (!data) {
    return {
      scriptsGenerated: 0,
      chatConversations: 0,
      resourcesUploaded: 0,
      timeSaved: 0,
      totalScore: 0,
      totalResources: 0,
      contentGenerated: 0,
      scriptsChange: '0%',
      chatChange: '0%',
      resourcesChange: '0%',
      timeChange: '0%',
      todayActivity: 0,
      completedGoals: 0,
      recentActivities: [],
      recentFiles: [],
      aiInsights: [],
      contentProgress: {
        currentStreak: 0,
        weeklyGoal: 5,
        weeklyProgress: 0,
        monthlyStats: {
          scripts: 0,
          chats: 0,
          uploads: 0
        }
      },
      workspace: {
        totalFiles: 0,
        storageUsed: 0,
        storageLimit: 1000,
        folders: [],
        lastSync: new Date().toISOString()
      }
    };
  }
  return data;
};

// Helper function to safely get file size
const getFileSize = (metadata: any): number => {
  if (!metadata) return 0;
  if (typeof metadata === 'object' && 'size' in metadata) {
    return typeof metadata.size === 'number' ? metadata.size : 0;
  }
  return 0;
};

// Fonctions utilitaires
const getActivityTitle = (file: any): string => {
  if (file.path?.includes('script')) return 'Script généré';
  if (file.file_type === 'chat') return 'Conversation IA';
  if (file.path?.includes('upload')) return 'Ressource ajoutée';
  return 'Fichier créé';
};

const getActivityDescription = (file: any): string => {
  const fileName = file.path?.split('/').pop() || 'Fichier';
  return `${fileName} - ${file.file_type || 'unknown'}`;
};

const getActivityType = (file: any): string => {
  if (file.path?.includes('script')) return 'Script';
  if (file.file_type === 'chat') return 'Chat';
  return 'Upload';
};

const getActivityIcon = (file: any) => {
  if (file.path?.includes('script')) return Icons.files.FileText;
  if (file.file_type === 'chat') return Icons.communication.MessageSquare;
  return Icons.actions.Upload;
};

const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return 'Inconnu';
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'À l\'instant';
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
  return `Il y a ${Math.floor(diffInMinutes / 1440)} jour(s)`;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const calculateChange = (current: number, previous: number): string => {
  if (previous === 0) return current > 0 ? '+100%' : '0%';
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? '+' : ''}${Math.round(change)}%`;
};

const calculateCurrentStreak = (files: any[]): number => {
  if (!files.length) return 0;
  
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    
    const hasActivity = files.some(file => 
      file.created_at?.startsWith(dateStr)
    );
    
    if (hasActivity) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
};

const calculateWeeklyProgress = (files: any[]): number => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return files.filter(file => 
    new Date(file.created_at) > oneWeekAgo
  ).length;
};

const calculateStorageUsed = (files: any[]): number => {
  return files.reduce((total, file) => {
    return total + getFileSize(file.metadata);
  }, 0) / (1024 * 1024); // Convert to MB
};

const generateAIInsights = (stats: {
  scriptsGenerated: number;
  totalChats: number;
  totalFiles: number;
  todayActivity: number;
}): AIInsight[] => {
  const insights: AIInsight[] = [];
  
  // Insight basé sur l'activité
  if (stats.todayActivity === 0) {
    insights.push({
      id: 'no-activity',
      title: 'Restez actif !',
      description: 'Aucune activité aujourd\'hui. Créez du contenu pour maintenir votre élan.',
      type: 'tip',
      priority: 'medium'
    });
  }
  
  // Insight basé sur les scripts
  if (stats.scriptsGenerated > 5) {
    insights.push({
      id: 'script-master',
      title: 'Maître des scripts !',
      description: `Vous avez généré ${stats.scriptsGenerated} scripts. Excellent travail !`,
      type: 'achievement',
      priority: 'high'
    });
  }
  
  // Insight basé sur les conversations
  if (stats.totalChats > 10) {
    insights.push({
      id: 'chat-expert',
      title: 'Expert en IA',
      description: 'Vous maîtrisez bien l\'assistant IA. Continuez à explorer ses capacités !',
      type: 'suggestion',
      priority: 'low'
    });
  }
  
  return insights;
};