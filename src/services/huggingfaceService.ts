
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

  // Poser une question à l'IA
  async askAI(question: string) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        question: question
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

  // Sauvegarder une note
  async saveNote(title: string, content: string) {
    try {
      const user = await ensureAuth();

      const payload = {
        user_id: user.id,
        title: title,
        content: content
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
