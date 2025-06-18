
import { supabase } from '@/integrations/supabase/client';

const HF_SPACE_URL = "https://your-space-url.hf.space"; // À remplacer par votre URL

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

  async saveOnboardingData(onboardingData: any) {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const content = JSON.stringify(onboardingData, null, 2);
      
      return await this.saveNote('onboarding', content, 'onboarding');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  }
};
