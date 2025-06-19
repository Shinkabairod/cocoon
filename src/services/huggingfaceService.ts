
import { supabase } from '@/integrations/supabase/client';

const HF_SPACE_URL = "https://huggingface.co/spaces/Cocoonai/cocoon-ai-assistant";

export const huggingfaceService = {
  async saveNote(title: string, content: string, noteType: string = 'general') {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          title: title,
          content: content,
          note_type: noteType
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  },

  async saveObsidianFile(userId: string, filePath: string, content: string) {
    try {
      // Utiliser l'endpoint /obsidian pour sauvegarder directement dans la structure de vault
      const response = await fetch(`${HF_SPACE_URL}/obsidian`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          file_path: `vaults/user_${userId}/${filePath}`,
          content: content
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to save Obsidian file: ${filePath}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error saving Obsidian file ${filePath}:`, error);
      throw error;
    }
  },

  async saveProfile(profileData: any) {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          profile_data: profileData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  },

  async askAI(question: string, context?: string) {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          question: question,
          context: context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Error asking AI:', error);
      throw error;
    }
  },

  async generateScript(topic: string) {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/script`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          topic: topic
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      return data.script;
    } catch (error) {
      console.error('Error generating script:', error);
      throw error;
    }
  },

  async generateConcepts() {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/concepts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate concepts');
      }

      const data = await response.json();
      return data.concepts;
    } catch (error) {
      console.error('Error generating concepts:', error);
      throw error;
    }
  },

  async generateIdeas(category: string) {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${HF_SPACE_URL}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          category: category
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate ideas');
      }

      const data = await response.json();
      return data.ideas;
    } catch (error) {
      console.error('Error generating ideas:', error);
      throw error;
    }
  },

  async testConnection() {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Test de la connectivité avec l'endpoint /test
      const response = await fetch(`${HF_SPACE_URL}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          message: "Test de connectivité depuis Lovable"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to test connection');
      }

      const data = await response.json();
      console.log('✅ Test de connectivité Hugging Face réussi:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur de connectivité Hugging Face:', error);
      throw error;
    }
  },

  async saveOnboardingData(onboardingData: any) {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Sauvegarder dans Obsidian via HF backend
      await this.saveProfile(onboardingData);
      
      // Également sauvegarder comme note pour référence
      const content = JSON.stringify(onboardingData, null, 2);
      return await this.saveNote('onboarding_raw_data', content, 'onboarding');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  }
};
