
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Brain,
  Edit,
  Lightbulb,
  BarChart3,
  Target,
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react';

const ChatPageSection: React.FC = () => {
  const { toast } = useToast();
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isGenerating) return;
    
    const userMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsGenerating(true);

    try {
      // TODO: Intégrer vraie API IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiResponse = { 
        text: "Je comprends votre demande. Voici ma suggestion basée sur vos ressources personnelles...", 
        isUser: false 
      };
      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "❌ Erreur IA",
        description: "Impossible de contacter l'assistant IA",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Brain className="h-7 w-7 mr-2 text-purple-500" />
          Assistant IA Personnel
        </h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            En ligne
          </Badge>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button variant="outline" size="sm" onClick={() => setChatInput("Aide-moi à créer un script de vidéo")}>
          <Edit className="h-3 w-3 mr-1" />
          Script vidéo
        </Button>
        <Button variant="outline" size="sm" onClick={() => setChatInput("Donne-moi des idées de contenu")}>
          <Lightbulb className="h-3 w-3 mr-1" />
          Idées contenu
        </Button>
        <Button variant="outline" size="sm" onClick={() => setChatInput("Analyse mes performances")}>
          <BarChart3 className="h-3 w-3 mr-1" />
          Analytics
        </Button>
        <Button variant="outline" size="sm" onClick={() => setChatInput("Comment améliorer mon engagement ?")}>
          <Target className="h-3 w-3 mr-1" />
          Engagement
        </Button>
      </div>

      <Card className="h-96 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
            {chatMessages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">Bonjour ! Je suis votre assistant IA personnel</p>
                <p className="text-sm">Posez-moi n'importe quelle question sur la création de contenu</p>
              </div>
            ) : (
              chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>L'IA réfléchit...</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Textarea
              placeholder="Demandez-moi d'analyser votre contenu, créer un script, ou améliorer votre stratégie..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1"
              rows={2}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPageSection;
