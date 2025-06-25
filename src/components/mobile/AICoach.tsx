// src/components/mobile/AICoach.tsx - AVEC VRAIE API
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useAIChat } from '@/lib/api'; // IMPORT DU HOOK
import { useToast } from '@/hooks/use-toast';

interface AICoachProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialPrompt?: string; // AJOUTÉ pour les prompts pré-remplis
}

const AICoach = ({ isOpen, onOpenChange, initialPrompt }: AICoachProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // UTILISER LE HOOK AVEC VRAIE API ⬇️
  const { messages, sendMessage, loading, error } = useAIChat(user?.id || '');

  // Questions rapides
  const quickPrompts = [
    "Aide-moi à créer un script de vidéo",
    "Comment améliorer mon engagement ?", 
    "Idées de contenu pour cette semaine",
    "Analyser mes métriques récentes",
    "Créer un concept viral",
    "Optimiser mes hashtags"
  ];

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Gérer le prompt initial
  useEffect(() => {
    if (initialPrompt && isOpen) {
      setInput(initialPrompt);
      textareaRef.current?.focus();
    }
  }, [initialPrompt, isOpen]);

  // Afficher les erreurs
  useEffect(() => {
    if (error) {
      toast({
        title: "❌ Erreur de connexion",
        description: "Impossible de contacter l'IA. Vérifiez votre connexion.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleSend = async () => {
    if (!input.trim() || loading || !user) return;
    
    if (!user) {
      toast({
        title: "❌ Non connecté",
        description: "Vous devez être connecté pour utiliser l'IA.",
        variant: "destructive"
      });
      return;
    }
    
    const message = input.trim();
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    try {
      await sendMessage(message);
    } catch (err) {
      console.error('Erreur envoi message:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInput(textarea.value);
    
    // Auto-resize
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <SheetTitle>Coach IA Personnel</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    {loading ? 'IA réfléchit...' : 'Posez votre question'}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Messages vides - première utilisation */}
          {messages.length === 0 && (
            <div className="p-4 space-y-4">
              <div className="text-center py-6">
                <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">Salut ! Je suis votre coach IA 👋</h3>
                <p className="text-muted-foreground text-sm">
                  Je connais votre profil et vos objectifs. Comment puis-je vous aider ?
                </p>
              </div>

              {/* Questions rapides */}
              <div>
                <p className="text-sm font-medium mb-3">Questions populaires :</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickPrompts.slice(0, 4).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-left justify-start h-auto py-3 px-4"
                    >
                      <span className="text-xs">{prompt}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-sm font-medium">
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500">IA réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question au coach IA..."
                  className="min-h-[40px] max-h-[120px] resize-none pr-12 rounded-xl border-gray-200 focus:border-purple-300"
                  rows={1}
                  disabled={loading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  size="sm"
                  className="absolute right-2 bottom-2 w-8 h-8 p-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Coach IA personnalisé</span>
              </div>
              <span>Entrée pour envoyer</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AICoach;