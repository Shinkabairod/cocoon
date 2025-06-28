// src/hooks/useUserStats.ts
// Hook pour récupérer et calculer les vraies stats utilisateur

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  MessageSquare, 
  Upload, 
  Sparkles, 
  CheckCircle,
  TrendingUp,
  Brain
} from 'lucide-react';

export interface UserStats {
  // Stats principales
  scriptsGenerated: number;
  chatConversations: number;
  resourcesUploaded: number;
  timeSaved: number;
  totalScore: number;
  
  // Nouvelles propriétés manquantes - AJOUTÉES
  totalChats: number;
  totalScripts: number;
  totalUploads: number;
  streak: number;
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
        userProfile,
        dashboardData
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
          .maybeSingle(),
        
        // Données dashboard (table qu'on va créer)
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()
      ]);

      // Calculer les stats réelles
      const totalChats = chatConversations.data?.length || 0;
      const totalFiles = vaultFiles.data?.length || 0;
      const profileData = userProfile.data;
      const dashboard = dashboardData.data;

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

      // Propriétés calculées
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
      const recentFiles: RecentFile[] = vaultFiles.data?.slice(0, 6).map(file => ({
        id: file.id.toString(),
        name: file.path?.split('/').pop() || 'Fichier sans nom',
        type: file.file_type || 'unknown',
        size: formatFileSize(getFileSize(file.metadata)),
        uploadedAt: formatRelativeTime(file.created_at)
      })) || [];

      // Insights IA personnalisés
      const aiInsights: AIInsight[] = generatePersonalizedInsights(
        scriptsGenerated, 
        totalChats, 
        totalFiles, 
        profileData
      );

      // Progression du contenu
      const contentProgress: ContentProgress = {
        currentStreak: 0,
        weeklyGoal: 10,
        weeklyProgress: getWeeklyProgress(vaultFiles.data || []),
        monthlyStats: {
          scripts: getMonthlyCount(vaultFiles.data || [], 'script'),
          chats: getMonthlyCount(chatConversations.data || [], 'chat'),
          uploads: getMonthlyCount(vaultFiles.data || [], 'upload')
        }
      };

      // Données workspace
      const workspace: WorkspaceData = {
        totalFiles: totalFiles,
        storageUsed: calculateStorageUsed(vaultFiles.data || []),
        storageLimit: 1000,
        folders: getUniqueFolders(vaultFiles.data || []),
        lastSync: vaultFiles.data?.[0]?.updated_at || new Date().toISOString()
      };

      return {
        scriptsGenerated,
        chatConversations: totalChats,
        resourcesUploaded: totalFiles,
        timeSaved,
        totalScore,
        
        // Nouvelles propriétés ajoutées
        totalChats,
        totalScripts: scriptsGenerated,
        totalUploads: totalFiles,
        streak: 0, // TODO: calculer la vraie streak
        totalResources,
        contentGenerated,
        
        scriptsChange: calculateChange(scriptsGenerated, 0),
        chatChange: calculateChange(totalChats, 0),
        resourcesChange: calculateChange(totalFiles, 0),
        timeChange: `+${timeSaved}h`,
        
        todayActivity,
        completedGoals: 0,
        
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
  if (file.path?.includes('script')) return FileText;
  if (file.file_type === 'chat') return MessageSquare;
  return Upload;
};

const formatRelativeTime = (dateString: string): string => {
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

const getWeeklyProgress = (files: any[]): number => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weeklyFiles = files.filter(file => 
    new Date(file.created_at) > oneWeekAgo
  );
  
  return weeklyFiles.length;
};

const getMonthlyCount = (items: any[], type: string): number => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return items.filter(item => {
    const itemDate = new Date(item.created_at);
    if (type === 'script') {
      return itemDate > oneMonthAgo && item.path?.includes('script');
    }
    return itemDate > oneMonthAgo;
  }).length;
};

const calculateStorageUsed = (files: any[]): number => {
  return files.reduce((total, file) => {
    return total + (file.metadata?.size || 0);
  }, 0) / (1024 * 1024);
};

const getUniqueFolders = (files: any[]): string[] => {
  const folders = files
    .map(file => file.path?.split('/')[0])
    .filter(Boolean);
  return [...new Set(folders)];
};

const generatePersonalizedInsights = (
  scripts: number, 
  chats: number, 
  files: number, 
  profile: any
): AIInsight[] => {
  const insights: AIInsight[] = [];
  
  if (scripts === 0) {
    insights.push({
      id: '1',
      title: 'Générez votre premier script',
      description: 'Utilisez l\'IA pour créer votre premier script personnalisé',
      type: 'suggestion',
      priority: 'high'
    });
  }
  
  if (chats > 10) {
    insights.push({
      id: '2',
      title: 'Utilisateur actif !',
      description: `Vous avez eu ${chats} conversations avec l'IA ce mois`,
      type: 'achievement',
      priority: 'medium'
    });
  }
  
  if (files < 5) {
    insights.push({
      id: '3',
      title: 'Ajoutez plus de ressources',
      description: 'Plus vous ajoutez de ressources, meilleurs seront les résultats IA',
      type: 'tip',
      priority: 'medium'
    });
  }
  
  return insights;
};
