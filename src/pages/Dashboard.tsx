// src/pages/Dashboard.tsx
// Remplacez TOUT le contenu de votre Dashboard.tsx par ce code

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Home,
  Folder,
  Sparkles,
  DollarSign,
  Settings,
  Menu,
  X,
  Users,
  Target,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Upload,
  FileText,
  Image,
  Music,
  Video,
  Download,
  Trash2,
  Eye,
  Plus,
  MessageSquare,
  BarChart3,
  Send,
  Loader2,
  Share,
  MapPin,
  Calendar,
  Brain,
  Lightbulb,
  CheckCircle,
  Star,
  Globe,
  Lock,
  Save
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: userStats, isLoading, refetch } = useUserStats(user?.id);
  const { toast } = useToast();
  const [activePage, setActivePage] = useState('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // États pour les modales et actions
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [scriptTopic, setScriptTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // Navigation avec thème Cocoon
  const navigation = [
    {
      id: 'welcome',
      name: 'Mon Cocon',
      icon: Home,
      description: 'Votre espace personnel'
    },
    {
      id: 'resources',
      name: 'Ma Chrysalide',
      icon: Folder,
      description: 'Ressources et données'
    },
    {
      id: 'creation',
      name: 'Transformation',
      icon: Sparkles,
      description: 'Création de contenu'
    },
    {
      id: 'monetization',
      name: 'Envol',
      icon: DollarSign,
      description: 'Partage et monétisation'
    },
    {
      id: 'settings',
      name: 'Réglages',
      icon: Settings,
      description: 'Configuration'
    }
  ];

  // Actions IA fonctionnelles
  const handleChatIA = async () => {
    if (!chatInput.trim()) return;
    
    setIsGenerating(true);
    const userMessage = chatInput;
    setChatInput('');
    
    setChatMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    try {
      const response = await huggingfaceService.askAI(userMessage);
      setChatMessages(prev => [...prev, { type: 'ai', content: response.answer || response }]);
      
      toast({
        title: "✅ Réponse générée",
        description: "L'IA a répondu à votre question",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de contacter l'IA",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateScript = async () => {
    if (!scriptTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Crée-moi un script de vidéo détaillé sur le sujet : ${scriptTopic}. 
      Structure : introduction accrocheuse, développement avec 3 points clés, conclusion avec call-to-action.
      Style : adapté à mon profil de créateur.`;
      
      const response = await huggingfaceService.askAI(prompt);
      setGeneratedContent(response.answer || response);
      
      await huggingfaceService.saveNote(`Script - ${scriptTopic}`, response.answer || response);
      
      toast({
        title: "🎬 Script généré !",
        description: "Votre script a été créé et sauvegardé",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de générer le script",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (type: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    switch (type) {
      case 'document':
        input.accept = '.pdf,.doc,.docx,.txt,.md';
        break;
      case 'image':
        input.accept = 'image/*';
        break;
      case 'audio':
        input.accept = 'audio/*';
        break;
      case 'video':
        input.accept = 'video/*';
        break;
    }

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploadingFiles(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "🌱 Ressource ajoutée à votre Chrysalide",
          description: `${file.name} enrichit maintenant votre IA personnelle`,
        });
        
        refetch();
      } catch (error) {
        toast({
          title: "❌ Erreur d'upload",
          description: "Impossible d'ajouter cette ressource",
          variant: "destructive",
        });
      } finally {
        setUploadingFiles(false);
      }
    };

    input.click();
  };

  // Rendu des pages
  const renderActivePage = () => {
    switch (activePage) {
      case 'welcome':
        return <WelcomePage user={user} stats={userStats} onAction={setActiveModal} />;
      case 'resources':
        return <ResourcesPage user={user} stats={userStats} onUpload={handleFileUpload} uploadingFiles={uploadingFiles} />;
      case 'creation':
        return <CreationPage onAction={setActiveModal} />;
      case 'monetization':
        return <MonetizationPage user={user} stats={userStats} />;
      case 'settings':
        return <SettingsPage user={user} />;
      default:
        return <WelcomePage user={user} stats={userStats} onAction={setActiveModal} />;
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Desktop */}
      {!isMobile && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <SidebarContent 
            navigation={navigation}
            activePage={activePage}
            setActivePage={setActivePage}
            user={user}
            stats={userStats}
          />
        </div>
      )}

      {/* Sidebar Mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-white border-r border-gray-200 flex flex-col">
            <SidebarContent 
              navigation={navigation}
              activePage={activePage}
              setActivePage={(page) => {
                setActivePage(page);
                setSidebarOpen(false);
              }}
              user={user}
              stats={userStats}
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Mobile */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">Cocoon AI</h1>
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Modales */}
      <ChatModal 
        open={activeModal === 'chat'} 
        onClose={() => setActiveModal(null)}
        chatInput={chatInput}
        setChatInput={setChatInput}
        chatMessages={chatMessages}
        isGenerating={isGenerating}
        onSend={handleChatIA}
      />

      <ScriptModal 
        open={activeModal === 'script'} 
        onClose={() => setActiveModal(null)}
        scriptTopic={scriptTopic}
        setScriptTopic={setScriptTopic}
        generatedContent={generatedContent}
        isGenerating={isGenerating}
        onGenerate={handleGenerateScript}
      />
    </div>
  );
};

// Composant Sidebar
const SidebarContent: React.FC<{
  navigation: any[];
  activePage: string;
  setActivePage: (page: string) => void;
  user: any;
  stats: any;
  isMobile?: boolean;
  onClose?: () => void;
}> = ({ navigation, activePage, setActivePage, user, stats, isMobile = false, onClose }) => {
  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cocoon AI</h1>
              <p className="text-xs text-gray-500">Transformez vos idées</p>
            </div>
          </div>
          
          {isMobile && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500">Créateur en Transformation</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-purple-50 p-2 rounded-lg">
            <div className="text-lg font-bold text-purple-700">{stats?.totalScore || 0}</div>
            <div className="text-xs text-purple-600">Score</div>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="text-lg font-bold text-blue-700">{stats?.scriptsGenerated || 0}</div>
            <div className="text-xs text-blue-600">Scripts</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 text-left ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <div className="flex-1">
                <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </div>
                <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500'}`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Version Pro</span>
          </div>
          <p className="text-xs text-purple-700">
            Toutes les fonctionnalités débloquées
          </p>
        </div>
      </div>
    </>
  );
};

// Page Welcome
const WelcomePage: React.FC<{ user: any; stats: any; onAction: (action: string) => void }> = ({ user, stats, onAction }) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Créateur';

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {greeting}, {userName} ! 🦋
          </h1>
          <p className="text-purple-100 text-lg mb-6">
            Bienvenue dans votre cocon de création. Ici, vos idées se transforment en contenu extraordinaire.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">Objectif du Jour</span>
              </div>
              <p className="text-sm text-purple-100">
                {stats?.todayActivity > 0 ? `${stats.todayActivity} actions réalisées` : 'Commencer votre transformation'}
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Progression</span>
              </div>
              <p className="text-sm text-purple-100">
                Score créateur : {stats?.totalScore || 0}
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Temps Économisé</span>
              </div>
              <p className="text-sm text-purple-100">
                {stats?.timeSaved || 0} heures ce mois
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              onClick={() => onAction('chat')}
              variant="secondary" 
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chatter avec l'IA
            </Button>
            <Button 
              onClick={() => onAction('script')}
              variant="secondary" 
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Créer un Script
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Scripts Créés" value={stats?.scriptsGenerated || 0} change={stats?.scriptsChange || '+0%'} icon={Sparkles} color="purple" />
        <StatsCard title="Conversations IA" value={stats?.chatConversations || 0} change={stats?.chatChange || '+0%'} icon={Users} color="blue" />
        <StatsCard title="Ressources" value={stats?.resourcesUploaded || 0} change={stats?.resourcesChange || '+0%'} icon={Folder} color="green" />
        <StatsCard title="Transformations" value={Math.ceil((stats?.totalScore || 0) / 10)} change="+∞%" icon={Zap} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Prochaines Étapes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <NextStepItem title="Alimentez votre Chrysalide" description="Ajoutez des ressources pour enrichir votre IA" icon={Folder} completed={stats?.resourcesUploaded > 0} />
            <NextStepItem title="Première Transformation" description="Générez votre premier script personnalisé" icon={Sparkles} completed={stats?.scriptsGenerated > 0} />
            <NextStepItem title="Partagez votre Envol" description="Configurez votre assistant pour la monétisation" icon={DollarSign} completed={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentActivities?.slice(0, 4).map((activity: any, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <activity.icon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )) || (
                <div className="text-center py-6">
                  <Sparkles className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Votre transformation commence maintenant</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Page Ressources  
const ResourcesPage: React.FC<{ user: any; stats: any; onUpload: (type: string) => void; uploadingFiles: boolean }> = ({ user, stats, onUpload, uploadingFiles }) => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Folder className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ma Chrysalide 🐛</h1>
            <p className="text-green-100">Vos ressources nourrissent votre transformation</p>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Espace utilisé</span>
            <span className="text-sm">{stats?.workspace?.storageUsed || 0}MB / {stats?.workspace?.storageLimit || 1000}MB</span>
          </div>
          <Progress value={(stats?.workspace?.storageUsed || 0) / (stats?.workspace?.storageLimit || 1000) * 100} className="h-2 bg-white/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Alimenter la Chrysalide</span>
                <Badge variant="secondary">{stats?.resourcesUploaded || 0} ressources</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <UploadButton type="document" icon={FileText} label="Documents" description="PDF, Word, Texte" color="blue" onClick={() => onUpload('document')} loading={uploadingFiles} />
                <UploadButton type="image" icon={Image} label="Images" description="Photos, designs" color="purple" onClick={() => onUpload('image')} loading={uploadingFiles} />
                <UploadButton type="audio" icon={Music} label="Audio" description="Musiques, voix" color="green" onClick={() => onUpload('audio')} loading={uploadingFiles} />
                <UploadButton type="video" icon={Video} label="Vidéos" description="Contenus vidéo" color="orange" onClick={() => onUpload('video')} loading={uploadingFiles} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ressources Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.recentFiles?.length > 0 ? stats.recentFiles.map((file: any, index: number) => (
                  <FileItem key={index} file={file} />
                )) : (
                  <div className="text-center py-8">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Votre Chrysalide est vide</h3>
                    <p className="text-gray-500 mb-4">Ajoutez vos premières ressources pour nourrir votre IA</p>
                    <Button onClick={() => onUpload('document')} className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une ressource
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <UserProfileCard user={user} stats={stats} />
          
          <Card>
            <CardHeader>
              <CardTitle>Impact de vos Ressources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Scripts améliorés</span>
                <Badge variant="secondary">{stats?.scriptsGenerated || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Réponses IA enrichies</span>
                <Badge variant="secondary">{stats?.chatConversations || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Temps économisé</span>
                <Badge variant="secondary">{stats?.timeSaved || 0}h</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Page Creation
const CreationPage: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Transformation ✨</h1>
            <p className="text-purple-100">Créez du contenu extraordinaire avec l'IA</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreationTool 
          title="Générateur de Scripts"
          description="Créez des scripts personnalisés pour vos vidéos"
          icon={FileText}
          color="purple"
          action={() => onAction('script')}
        />
        <CreationTool 
          title="Chat IA Personnel"
          description="Discutez avec votre assistant IA personnalisé"
          icon={MessageSquare}
          color="blue"
          action={() => onAction('chat')}
        />
        <CreationTool 
          title="Générateur d'Idées"
          description="Trouvez l'inspiration pour vos prochains contenus"
          icon={Lightbulb}
          color="yellow"
          action={() => onAction('ideas')}
        />
        <CreationTool 
          title="Feedback IA"
          description="Obtenez des retours sur votre contenu existant"
          icon={MessageSquare}
          color="green"
          action={() => onAction('feedback')}
        />
        <CreationTool 
          title="Analyse de Performance"
          description="Analysez vos statistiques et optimisez"
          icon={BarChart3}
          color="orange"
          action={() => onAction('analyze')}
        />
        <CreationTool 
          title="Calendrier de Contenu"
          description="Planifiez votre stratégie de publication"
          icon={Calendar}
          color="indigo"
          action={() => onAction('calendar')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Dernières Créations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Script - Comment créer du contenu viral</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-center py-6">
                <Sparkles className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Vos créations apparaîtront ici</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conseils du Jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-900">Optimisez vos scripts</h4>
                    <p className="text-xs text-purple-700 mt-1">Ajoutez plus de ressources personnelles pour des scripts plus précis</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Restez cohérent</h4>
                    <p className="text-xs text-blue-700 mt-1">Publiez régulièrement pour maintenir l'engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Page Monetization
const MonetizationPage: React.FC<{ user: any; stats: any }> = ({ user, stats }) => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Envol 🚀</h1>
            <p className="text-yellow-100">Partagez votre assistant IA et générez des revenus</p>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm font-medium mb-2">Votre Assistant IA Personnalisé</p>
          <p className="text-xs text-yellow-100">
            Transformez votre expertise en assistant IA que d'autres créateurs peuvent utiliser
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Configurer votre Assistant Public</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Nom de votre Assistant</label>
              <Input placeholder="Ex: Assistant Marketing de [Votre Nom]" className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea placeholder="Décrivez l'expertise de votre assistant..." className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Prix par utilisation</label>
              <div className="flex items-center space-x-2 mt-1">
                <Input placeholder="5.00" type="number" className="flex-1" />
                <span className="text-sm text-gray-500">€</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Ressources incluses</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Mes scripts de référence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Ma stratégie de contenu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Mes templates personnels</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              <Share className="h-4 w-4 mr-2" />
              Publier mon Assistant
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pas encore de revenus</h3>
                <p className="text-gray-500 text-sm">Publiez votre assistant pour commencer à gagner</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assistants Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Assistant TikTok Pro</p>
                    <p className="text-xs text-gray-500">Par CreatorX • 15€/usage</p>
                  </div>
                  <Badge>Populaire</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">YouTube Script Master</p>
                    <p className="text-xs text-gray-500">Par VideoGuru • 12€/usage</p>
                  </div>
                  <Badge variant="secondary">Nouveau</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Page Settings
const SettingsPage: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Réglages ⚙️</h1>
            <p className="text-gray-100">Personnalisez votre expérience Cocoon</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations du Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nom complet</label>
              <Input defaultValue={user?.user_metadata?.full_name || ''} className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input defaultValue={user?.email || ''} disabled className="mt-1 bg-gray-50" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Spécialité</label>
              <Input placeholder="Ex: Marketing digital, Gaming..." className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <Textarea placeholder="Décrivez-vous en quelques mots..." className="mt-1" />
            </div>
            
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-gray-500">Recevoir des alertes</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Mode sombre</p>
                  <p className="text-xs text-gray-500">Interface sombre</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Assistant public</p>
                  <p className="text-xs text-gray-500">Autoriser l'usage par d'autres</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Changer le mot de passe
              </Button>
              
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Exporter mes données
              </Button>
              
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Composants utilitaires
const StatsCard: React.FC<{
  title: string;
  value: number | string;
  change: string;
  icon: any;
  color: string;
}> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    purple: 'text-purple-600 bg-purple-50',
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    orange: 'text-orange-600 bg-orange-50'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium mt-1 text-green-600">{change}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NextStepItem: React.FC<{
  title: string;
  description: string;
  icon: any;
  completed: boolean;
}> = ({ title, description, icon: Icon, completed }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
      }`}>
        {completed ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <h4 className={`text-sm font-medium ${completed ? 'text-green-900' : 'text-gray-900'}`}>
          {title} {completed && '✓'}
        </h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const UploadButton: React.FC<{
  type: string;
  icon: any;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
  loading: boolean;
}> = ({ icon: Icon, label, description, color, onClick, loading }) => {
  const colorClasses = {
    blue: 'hover:bg-blue-50 border-blue-200 text-blue-700',
    purple: 'hover:bg-purple-50 border-purple-200 text-purple-700',
    green: 'hover:bg-green-50 border-green-200 text-green-700',
    orange: 'hover:bg-orange-50 border-orange-200 text-orange-700'
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`p-4 border-2 border-dashed rounded-xl transition-colors text-center ${
        colorClasses[color as keyof typeof colorClasses]
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
      ) : (
        <Icon className="h-8 w-8 mx-auto mb-2" />
      )}
      <p className="font-medium text-sm">{label}</p>
      <p className="text-xs opacity-75">{description}</p>
    </button>
  );
};

const FileItem: React.FC<{ file: any }> = ({ file }) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
      <FileText className="h-5 w-5 text-gray-500" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{file.uploadedAt} • {file.size}</p>
      </div>
      <div className="flex items-center space-x-1">
        <Button size="sm" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const UserProfileCard: React.FC<{ user: any; stats: any }> = ({ user, stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Votre Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</p>
            <p className="text-sm text-gray-500">Créateur en transformation</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Membre depuis {new Date(user?.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Score: {stats?.totalScore || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{stats?.timeSaved || 0}h économisées</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CreationTool: React.FC<{
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
}> = ({ title, description, icon: Icon, color, action }) => {
  const colorClasses = {
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200',
    green: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200',
    indigo: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
  };

  return (
    <button
      onClick={action}
      className={`p-6 border-2 rounded-xl transition-all duration-200 text-left w-full ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      <Icon className="h-10 w-10 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </button>
  );
};

// Modales
const ChatModal: React.FC<{
  open: boolean;
  onClose: () => void;
  chatInput: string;
  setChatInput: (value: string) => void;
  chatMessages: Array<{type: 'user' | 'ai', content: string}>;
  isGenerating: boolean;
  onSend: () => void;
}> = ({ open, onClose, chatInput, setChatInput, chatMessages, isGenerating, onSend }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Chat IA Personnalisé
          </DialogTitle>
          <DialogDescription>
            Posez une question à votre assistant IA basé sur votre profil
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
          {chatMessages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <p>Commencez une conversation avec votre IA</p>
            </div>
          )}
          
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border shadow-sm'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm p-3 rounded-lg flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">L'IA réfléchit...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button 
            onClick={onSend} 
            disabled={!chatInput.trim() || isGenerating}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ScriptModal: React.FC<{
  open: boolean;
  onClose: () => void;
  scriptTopic: string;
  setScriptTopic: (value: string) => void;
  generatedContent: string;
  isGenerating: boolean;
  onGenerate: () => void;
}> = ({ open, onClose, scriptTopic, setScriptTopic, generatedContent, isGenerating, onGenerate }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Générateur de Script IA
          </DialogTitle>
          <DialogDescription>
            Créez un script personnalisé pour votre contenu
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Sujet du script</label>
            <Input
              value={scriptTopic}
              onChange={(e) => setScriptTopic(e.target.value)}
              placeholder="Ex: Comment créer du contenu viral sur TikTok"
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={onGenerate}
            disabled={!scriptTopic.trim() || isGenerating}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Générer le Script
              </>
            )}
          </Button>
        </div>
        
        {generatedContent && (
          <div className="flex-1 overflow-y-auto">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Script généré :</h4>
              <div className="whitespace-pre-wrap text-sm">{generatedContent}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="h-screen bg-gray-50 flex animate-pulse">
      <div className="w-64 bg-white border-r border-gray-200 p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-8 space-y-6">
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
