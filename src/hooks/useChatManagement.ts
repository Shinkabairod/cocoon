import { useState } from 'react';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChatManagement = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isGenerating) return;
    
    const userMessage: ChatMessage = { 
      text: chatInput, 
      isUser: true, 
      timestamp: new Date() 
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsGenerating(true);

    try {
      // Simuler appel API IA (à remplacer par vraie API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse: ChatMessage = { 
        text: "Je comprends votre demande. Voici ma suggestion basée sur vos ressources personnelles...", 
        isUser: false,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erreur chat:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    chatInput,
    setChatInput,
    chatMessages,
    setChatMessages,
    isGenerating,
    setIsGenerating,
    handleSendMessage
  };
};
