
// src/services/huggingfaceService.ts
// Service amélioré avec gestion d'erreurs et configuration flexible

import { supabase } from '@/integrations/supabase/client';
import { CONFIG } from '@/config/constants';

// Helper pour vérifier l'authentification
const ensureAuth = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    console.error('❌ Erreur auth:', authError);
    throw new Error(`Erreur d'authentification: ${authError.message}`);
  }
  
  if (!user) {
    console.error('❌ Utilisateur non connecté');
    throw new Error('Vous devez être connecté pour utiliser cette fonctionnalité');
  }

  console.log('✅ Utilisateur authentifié:', user.id);
  return user;
};

// Helper pour les requêtes vers le backend
const makeBackendRequest = async (endpoint: string, payload: any, method: 'GET' | 'POST' = 'POST') => {
  const url = `${CONFIG.HF_SPACE_URL}${endpoint}`;
  console.log(`📤 Requête ${method}:`, url, payload);

  const options: RequestInit = {
    method,
    headers: { 
      "Content-Type": "application/json",
    }
  };

  if (method === 'POST' && payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(url, options);
    console.log('📥 Réponse:', response.status, response.statusText);

    if (!response.ok) {
      let errorMessage = `Erreur ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        errorMessage = await response.text() || errorMessage;
      }
      
      console.error('❌ Erreur API:', errorMessage);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Impossible de joindre le serveur. Vérifiez que le backend est démarré.');
    }
    throw error;
  }
};

export const huggingfaceService = {
  // Test de connectivité
  async testConnection() {
    try {
      console.log('🔗 Test de connectivité backend...');
      
      const result = await makeBackendRequest('/health', null, 'GET');
      console.log('✅ Backend accessible:', result);
      return result;
    } catch (error) {
      console.error('❌ Backend inaccessible:', error);
      throw error;
    }
  },

  // Sauvegarder le profil utilisateur
  async saveProfile(profileData: any) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        profile_data: profileData
      };

      console.log('💾 Sauvegarde profil...');
      const result = await makeBackendRequest('/profile', payload);
      console.log('✅ Profil sauvegardé:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur sauvegarde profil:', error);
      throw error;
    }
  },

  // Sauvegarder les données d'onboarding
  async saveOnboardingData(onboardingData: any) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        onboarding_data: onboardingData
      };

      console.log('💾 Sauvegarde données onboarding...');
      const result = await makeBackendRequest('/onboarding', payload);
      console.log('✅ Données onboarding sauvegardées:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur sauvegarde onboarding:', error);
      throw error;
    }
  },

  // Poser une question à l'IA (signature flexible)
  async askAI(question: string, context?: string) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        question: question,
        context: context
      };

      console.log('🤖 Question à l\'IA:', question);
      const result = await makeBackendRequest('/ask', payload);
      console.log('✅ Réponse IA reçue');
      return result;
    } catch (error) {
      console.error('❌ Erreur IA:', error);
      throw error;
    }
  },

  // Sauvegarder une note (signature flexible)
  async saveNote(title: string, content: string, noteType?: string) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        title: title,
        content: content,
        note_type: noteType || 'note'
      };

      console.log('📝 Sauvegarde note:', title);
      const result = await makeBackendRequest('/note', payload);
      console.log('✅ Note sauvegardée');
      return result;
    } catch (error) {
      console.error('❌ Erreur sauvegarde note:', error);
      throw error;
    }
  },

  // Récupérer une note
  async getNote(noteId: string) {
    try {
      const user = await ensureAuth();
      
      console.log('📖 Récupération note:', noteId);
      const result = await makeBackendRequest(`/note/${noteId}?user_id=${user.id}`, null, 'GET');
      console.log('✅ Note récupérée');
      return result;
    } catch (error) {
      console.error('❌ Erreur récupération note:', error);
      throw error;
    }
  },

  // Sauvegarder un fichier Obsidian
  async saveObsidianFile(userId: string, filePath: string, content: string) {
    try {
      const payload = {
        user_id: userId,
        file_path: filePath,
        content: content
      };

      console.log('🗂️ Sauvegarde fichier Obsidian:', filePath);
      const result = await makeBackendRequest('/obsidian/file', payload);
      console.log('✅ Fichier Obsidian sauvegardé');
      return result;
    } catch (error) {
      console.error('❌ Erreur sauvegarde fichier Obsidian:', error);
      throw error;
    }
  },

  // Générer des concepts
  async generateConcepts() {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        type: 'concepts'
      };

      console.log('🎨 Génération de concepts...');
      const result = await makeBackendRequest('/generate/concepts', payload);
      console.log('✅ Concepts générés');
      return result;
    } catch (error) {
      console.error('❌ Erreur génération concepts:', error);
      throw error;
    }
  },

  // Générer un script
  async generateScript(topic: string) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        topic: topic
      };

      console.log('📝 Génération script pour:', topic);
      const result = await makeBackendRequest('/generate/script', payload);
      console.log('✅ Script généré');
      return result;
    } catch (error) {
      console.error('❌ Erreur génération script:', error);
      throw error;
    }
  },

  // Générer des idées
  async generateIdeas(category: string) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        category: category
      };

      console.log('💡 Génération idées pour:', category);
      const result = await makeBackendRequest('/generate/ideas', payload);
      console.log('✅ Idées générées');
      return result;
    } catch (error) {
      console.error('❌ Erreur génération idées:', error);
      throw error;
    }
  },

  // Obtenir le statut utilisateur
  async getUserStatus() {
    try {
      const user = await ensureAuth();
      
      console.log('📊 Récupération statut utilisateur...');
      const result = await makeBackendRequest(`/user/${user.id}/status`, null, 'GET');
      console.log('✅ Statut récupéré');
      return result;
    } catch (error) {
      console.error('❌ Erreur statut utilisateur:', error);
      throw error;
    }
  },

  // Obtenir la structure du vault
  async getVaultStructure() {
    try {
      const user = await ensureAuth();
      
      console.log('🗂️ Récupération structure vault...');
      const result = await makeBackendRequest(`/user/${user.id}/vault_structure`, null, 'GET');
      console.log('✅ Structure vault récupérée');
      return result;
    } catch (error) {
      console.error('❌ Erreur structure vault:', error);
      throw error;
    }
  }
};
