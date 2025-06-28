
import { useState } from 'react';

export const useChatManagement = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = () => {
    if (!chatInput.trim() || isGenerating) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: 'Merci pour votre message ! Je suis là pour vous aider avec vos créations de contenu.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 1500);
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
