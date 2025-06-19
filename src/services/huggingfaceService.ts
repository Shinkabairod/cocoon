
import { supabase } from '@/integrations/supabase/client';

const HF_SPACE_URL = "https://cocoonai-cocoon-ai-assistant.hf.space";
const HF_TOKEN = "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";

export const huggingfaceService = {
  async saveNote(title: string, content: string, noteType: string = 'general') {
    try {
      console.log('🔍 Tentative de sauvegarde note:', { title, noteType });
      
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

      const payload = {
        user_id: user.id,
        title: title,
        content: content,
        note_type: noteType
      };

      console.log('📤 Envoi vers HF:', `${HF_SPACE_URL}/note`, payload);

      const response = await fetch(`${HF_SPACE_URL}/note`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 Réponse HF status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur HF response:', errorText);
        throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Note sauvegardée avec succès:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur complète saveNote:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Hugging Face service. Please check your internet connection.');
      }
      throw error;
    }
  },

  async saveObsidianFile(userId: string, filePath: string, content: string) {
    try {
      console.log('🔍 Sauvegarde fichier Obsidian:', { userId, filePath });
      
      const payload = {
        user_id: userId,
        file_path: `vaults/user_${userId}/${filePath}`,
        content: content
      };

      console.log('📤 Envoi fichier vers HF:', payload);

      const response = await fetch(`${HF_SPACE_URL}/obsidian`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 Réponse fichier HF:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Erreur fichier ${filePath}:`, errorText);
        throw new Error(`Failed to save Obsidian file: ${filePath} - Status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log(`✅ Fichier ${filePath} sauvegardé:`, result);
      return result;
    } catch (error) {
      console.error(`❌ Erreur sauvegarde fichier ${filePath}:`, error);
      throw error;
    }
  },

  async saveProfile(profileData: any) {
    try {
      console.log('🔍 Sauvegarde profil:', profileData);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated for profile save');
      }

      const response = await fetch(`${HF_SPACE_URL}/profile`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          user_id: user.id,
          profile_data: profileData
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur profil:', errorText);
        throw new Error(`Failed to save profile: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
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
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated for AI query');
      }

      const response = await fetch(`${HF_SPACE_URL}/ask`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          user_id: user.id,
          question: question,
          context: context
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur IA:', errorText);
        throw new Error(`AI query failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Réponse IA reçue:', data);
      return data.answer;
    } catch (error) {
      console.error('❌ Erreur askAI:', error);
      throw error;
    }
  },

  async generateScript(topic: string) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/script`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          user_id: user.id,
          topic: topic
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Script generation failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.script;
    } catch (error) {
      console.error('❌ Erreur generateScript:', error);
      throw error;
    }
  },

  async generateConcepts() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/concepts`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          user_id: user.id
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Concept generation failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.concepts;
    } catch (error) {
      console.error('❌ Erreur generateConcepts:', error);
      throw error;
    }
  },

  async generateIdeas(category: string) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/ideas`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          user_id: user.id,
          category: category
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Idea generation failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.ideas;
    } catch (error) {
      console.error('❌ Erreur generateIdeas:', error);
      throw error;
    }
  },

  async testConnection() {
    try {
      console.log('🔗 Test de connectivité HF...');
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('❌ Erreur auth test:', authError);
        throw new Error(`Authentication error: ${authError.message}`);
      }
      
      if (!user) {
        console.error('❌ Pas d\'utilisateur pour test');
        throw new Error('User not authenticated - please log in first');
      }

      console.log('✅ User OK pour test:', user.id);

      const testUrl = `${HF_SPACE_URL}/test`;
      console.log('📤 Test URL:', testUrl);

      const response = await fetch(testUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          user_id: user.id,
          message: "Test de connectivité depuis Lovable"
        })
      });

      console.log('📥 Test response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Test échec response:', errorText);
        throw new Error(`Connection test failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Test de connectivité réussi:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur test connectivité complète:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Cannot reach Hugging Face service. Check if the service is running.');
      }
      throw error;
    }
  },

  async saveOnboardingData(onboardingData: any) {
    try {
      console.log('💾 Début sauvegarde onboarding data...');
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated for onboarding save');
      }

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
