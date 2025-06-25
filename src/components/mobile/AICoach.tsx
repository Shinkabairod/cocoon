
import React, { useState } from 'react';
import { apiService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface AICoachProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AICoach = ({ isOpen, onOpenChange }: AICoachProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{role: string, content: string, timestamp: Date}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (message: string) => {
    if (!user) return;
    
    const userMessage = { role: 'user', content: message, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await apiService.askAI(user.id, message);
      const aiMessage = {
        role: 'assistant',
        content: response.answer || 'Désolé, je n\'ai pas pu traiter votre demande.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur AI:', error);
      // Message d'erreur à l'utilisateur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-coach">
      {/* Chat interface will be implemented here */}
    </div>
  );
};

export default AICoach;
