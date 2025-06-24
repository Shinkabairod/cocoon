
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { huggingfaceService } from '@/services/huggingfaceService';
import {
  MessageSquare,
  Send,
  Upload,
  FileText,
  Camera,
  Mic,
  Settings,
  User,
  Brain,
  Sparkles,
  Plus,
  Loader2
} from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tool?: string;
}

const MobileDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Salut ! Je suis ton assistant IA Cocoon. J'ai accès à toutes tes infos et ressources. Comment puis-je t'aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'upload' | 'profile'>('chat');

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Appel à l'IA via le service
      const response = await huggingfaceService.askAI(inputValue);
      
      const aiMessage: Message = {
        type: 'assistant',
        content: response.answer || 'Désolé, je n\'ai pas pu traiter votre demande.',
        timestamp: new Date(),
        tool: response.model_used
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('❌ Erreur IA:', error);
      
      const errorMessage: Message = {
        type: 'assistant',
        content: 'Désolé, une erreur est survenue. Vérifiez que le backend est démarré.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Erreur IA",
        description: "Impossible de contacter l'assistant. Vérifiez votre connexion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (type: 'file' | 'image' | 'audio') => {
    // Créer un input file dynamique
    const input = document.createElement('input');
    input.type = 'file';
    
    switch (type) {
      case 'file':
        input.accept = '.pdf,.doc,.docx,.txt,.md';
        break;
      case 'image':
        input.accept = 'image/*';
        break;
      case 'audio':
        input.accept = 'audio/*';
        break;
    }

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        // Ici vous pourrez implémenter l'upload vers Supabase Storage
        toast({
          title: "Upload réussi",
          description: `${file.name} ajouté à vos ressources`,
        });

        // Ajouter un message pour confirmer l'upload
        const uploadMessage: Message = {
          type: 'assistant',
          content: `✅ J'ai reçu votre fichier "${file.name}". Je peux maintenant l'utiliser pour vous aider !`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, uploadMessage]);

      } catch (error) {
        toast({
          title: "Erreur upload",
          description: "Impossible d'uploader le fichier",
          variant: "destructive",
        });
      }
    };

    input.click();
  };

  const quickActions = [
    { label: 'Concept vidéo', action: () => setInputValue('Crée-moi un concept de vidéo basé sur mon profil') },
    { label: 'Script', action: () => setInputValue('Écris-moi un script de vidéo') },
    { label: 'Idées contenu', action: () => setInputValue('Donne-moi 5 idées de contenu pour cette semaine') },
    { label: 'Feedback', action: () => setInputValue('Analyse mes performances récentes') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {/* Header Mobile */}
      <div className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Cocoon AI</h1>
            <p className="text-xs text-gray-500">Assistant Créateur</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab('profile')}>
          <User className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex gap-2">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'upload', label: 'Ressources', icon: Upload },
            { id: 'profile', label: 'Profil', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(id as any)}
              className="flex-1"
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    {message.tool && (
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {message.tool}
                      </Badge>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-purple-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">L'IA réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions rapides */}
            <div className="p-4 bg-white border-t">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              {/* Zone de saisie */}
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Pose une question à ton assistant IA..."
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="self-end bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Ajouter des ressources</h2>
            <p className="text-gray-600 text-sm">
              Ajoutez vos ressources pour que l'IA puisse mieux vous aider
            </p>

            <div className="grid grid-cols-1 gap-3">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUpload('file')}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Documents</h3>
                    <p className="text-sm text-gray-500">PDF, Word, Texte</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400 ml-auto" />
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUpload('image')}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Images</h3>
                    <p className="text-sm text-gray-500">Photos, designs, captures</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400 ml-auto" />
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUpload('audio')}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mic className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Audio</h3>
                    <p className="text-sm text-gray-500">Enregistrements, musiques</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400 ml-auto" />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-xl font-bold">{user?.email}</h2>
              <p className="text-gray-500">Créateur de contenu</p>
            </div>

            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Statistiques</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-xs text-gray-500">Ressources</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">45</div>
                      <div className="text-xs text-gray-500">Conversations IA</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Actions rapides</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Modifier mon profil
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      Voir mon workspace
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 hover:text-red-700"
                      onClick={signOut}
                    >
                      Déconnexion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileDashboard;
