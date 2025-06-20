
import { supabase } from '@/integrations/supabase/client';

const HF_SPACE_URL = "https://Cocoonai-cocoon-ai-assistant.hf.space";
const HF_TOKEN = "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";

// Helper pour vérifier l'auth
const ensureAuth = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    console.error('❌ Erreur auth:', authError);
    throw new Error(`Authentication error: ${authError.message}`);
  }
  
  if (!user) {
    console.error('❌ Utilisateur non connecté');
    throw new Error('User not authenticated - please log in');
  }

  console.log('✅ Utilisateur authentifié:', user.id);
  return user;
};

// Helper pour les requêtes HF
const makeHFRequest = async (endpoint: string, payload: any) => {
  const url = `${HF_SPACE_URL}${endpoint}`;
  console.log('📤 Requête HF:', url, payload);

  const response = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${HF_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  console.log('📥 Réponse HF:', response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Erreur HF:', errorText);
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  return await response.json();
};

export const huggingfaceService = {
  async testConnection() {
    try {
      console.log('🔗 Test de connectivité HF...');
      
      const user = await ensureAuth();

      const result = await makeHFRequest('/test', {
        user_id: user.id,
        message: "Test de connectivité depuis Lovable"
      });

      console.log('✅ Test de connectivité réussi:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur test connectivité:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Cannot reach Hugging Face service. Check if the service is running.');
      }
      throw error;
    }
  },

  async saveNote(title: string, content: string, noteType: string = 'general') {
    try {
      console.log('📝 Sauvegarde note:', { title, noteType });
      
      const user = await ensureAuth();

      const result = await makeHFRequest('/note', {
        user_id: user.id,
        title: title,
        content: content,
        note_type: noteType
      });

      console.log('✅ Note sauvegardée:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur saveNote:', error);
      throw error;
    }
  },

  async saveObsidianFile(userId: string, filePath: string, content: string) {
    try {
      console.log('🗂️ Sauvegarde fichier Obsidian:', { userId, filePath });

      const result = await makeHFRequest('/obsidian', {
        user_id: userId,
        file_path: `vaults/user_${userId}/${filePath}`,
        content: content
      });

      console.log(`✅ Fichier ${filePath} sauvegardé:`, result);
      return result;
    } catch (error) {
      console.error(`❌ Erreur fichier ${filePath}:`, error);
      throw error;
    }
  },

  async saveProfile(profileData: any) {
    try {
      console.log('👤 Sauvegarde profil:', profileData);
      
      const user = await ensureAuth();

      const result = await makeHFRequest('/profile', {
        user_id: user.id,
        profile_data: profileData
      });

      console.log('✅ Profil sauvegardé:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur saveProfile:', error);
      throw error;
    }
  },

  async askAI(question: string, context?: string) {
    try {
      console.log('🤖 Question IA:', { question, context });
      
      const user = await ensureAuth();

      const result = await makeHFRequest('/ask', {
        user_id: user.id,
        question: question,
        context: context
      });

      console.log('✅ Réponse IA reçue:', result);
      return result.answer;
    } catch (error) {
      console.error('❌ Erreur askAI:', error);
      throw error;
    }
  },

  async generateScript(topic: string) {
    try {
      const user = await ensureAuth();

      const result = await makeHFRequest('/script', {
        user_id: user.id,
        topic: topic
      });

      return result.script;
    } catch (error) {
      console.error('❌ Erreur generateScript:', error);
      throw error;
    }
  },

  async generateConcepts() {
    try {
      const user = await ensureAuth();

      const result = await makeHFRequest('/concepts', {
        user_id: user.id
      });

      return result.concepts;
    } catch (error) {
      console.error('❌ Erreur generateConcepts:', error);
      throw error;
    }
  },

  async generateIdeas(category: string) {
    try {
      const user = await ensureAuth();

      const result = await makeHFRequest('/ideas', {
        user_id: user.id,
        category: category
      });

      return result.ideas;
    } catch (error) {
      console.error('❌ Erreur generateIdeas:', error);
      throw error;
    }
  },

  async saveOnboardingData(onboardingData: any) {
    try {
      console.log('💾 Début sauvegarde onboarding data...');
      
      console.log('📊 Sauvegarde profil structuré...');
      await this.saveProfile(onboardingData);
      
      console.log('📝 Sauvegarde note brute...');
      const content = JSON.stringify(onboardingData, null, 2);
      const result = await this.saveNote('onboarding_raw_data', content, 'onboarding');
      
      console.log('✅ Onboarding data sauvegardé');
      return result;
    } catch (error) {
      console.error('❌ Erreur saveOnboardingData:', error);
      throw error;
    }
  }
};
