// src/pages/Dashboard.tsx - Version complète avec TOUS les composants existants
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
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
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ✅ TOUS VOS ICONES LUCIDE
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
  Save,
  ChevronRight,
  Crown,
  PlayCircle,
  Edit,
  Smile,
  User,
  MoreHorizontal,
  FolderOpen,
  Play,
  ArrowRight,
  Building,
  ExternalLink,
  Search,
  Bell,
  LogOut,
  HelpCircle,
  BookOpen
} from 'lucide-react';

// ✅ TOUS VOS COMPOSANTS DASHBOARD (avec gestion des erreurs)
import SettingsSection from '@/components/dashboard/SettingsSection';
import OnboardingDataSection from '@/components/dashboard/OnboardingDataSection';
import CreationsSection from '@/components/dashboard/CreationsSection';
import ConnectionTest from '@/components/dashboard/ConnectionTest';

// ✅ COMPOSANTS OPTIONNELS (avec try/catch si ils n'existent pas)
let MyWorkspace: React.ComponentType<any> | null = null;
let useWorkspace: (() => any) | null = null;

try {
  MyWorkspace = require('@/components/dashboard/MyWorkspace').default;
} catch (e) {
  console.log('MyWorkspace component not found, skipping...');
}

try {
  const workspaceHook = require('@/hooks/useWorkspace');
  useWorkspace = workspaceHook.useWorkspace;
} catch (e) {
  console.log('useWorkspace hook not found, skipping...');
}

const Dashboard = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const { data: userStats, isLoading, refetch } = useUserStats(user?.id);
  const { toast } = useToast();
  const [activePage, setActivePage] = useState('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // ✅ HOOK WORKSPACE (optionnel)
  const workspaceData = useWorkspace ? useWorkspace() : null;

  // ✅ TOUS VOS ÉTATS ORIGINAUX
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [scriptTopic, setScriptTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // ✅ ÉTATS POUR LA SECTION RESSOURCES (complets)
  const [activeCategory, setActiveCategory] = useState('resources');
  const [folders, setFolders] = useState({
    resources: [
      { id: '1', name: 'Video Scripts', emoji: '🎬', items: [] },
      { id: '2', name: 'Brand Images', emoji: '🎨', items: [] }
    ],
    personal: [
      { id: '3', name: 'My Profile', emoji: '👤', items: [] },
      { id: '4', name: 'My Goals', emoji: '🎯', items: [] },
      { id: '5', name: 'My Business', emoji: '🏢', items: [] },
      { id: '6', name: 'My Platforms', emoji: '📱', items: [] },
      { id: '7', name: 'My Challenges', emoji: '⚡', items: [] }
    ]
  });

  // ✅ ÉTATS POUR LES MODALES (complets)
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newFolder, setNewFolder] = useState({ name: '', emoji: '📁', category: 'resources' });
  const [newItemData, setNewItemData] = useState({
    type: 'text',
    title: '',
    content: '',
    url: '',
    file: null as File | null,
    folderId: ''
  });

  // ✅ TOUTES VOS FONCTIONS UTILITAIRES
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getUserName = () => {
    return user?.user_metadata?.full_name || 
           user?.email?.split('@')[0] || 
           'Créateur';
  };

  const handleNavigation = (page: string) => {
    setActivePage(page);
    if (isMobile) setSidebarOpen(false);
  };

  // ✅ FONCTIONS DE GESTION DES RESSOURCES
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewItemData(prev => ({ ...prev, file }));
    }
  };

  const addFolder = () => {
    if (!newFolder.name.trim()) return;
    
    const newFolderObj = {
      id: Date.now().toString(),
      name: newFolder.name,
      emoji: newFolder.emoji,
      items: []
    };

    setFolders(prev => ({
      ...prev,
      [newFolder.category]: [...prev[newFolder.category as keyof typeof prev], newFolderObj]
    }));

    setNewFolder({ name: '', emoji: '📁', category: 'resources' });
    setShowNewFolderModal(false);
    
    toast({
      title: "✅ Dossier créé",
      description: `${newFolder.name} a été ajouté avec succès`
    });
  };

  const addItem = () => {
    if (!newItemData.title.trim()) return;
    
    toast({
      title: "✅ Élément ajouté",
      description: `${newItemData.title} a été ajouté à vos ressources`
    });
    
    setNewItemData({
      type: 'text',
      title: '',
      content: '',
      url: '',
      file: null,
      folderId: ''
    });
    setShowNewItemModal(false);
  };

  // ✅ FONCTIONS CHAT IA
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

  const generateScript = async () => {
    if (!scriptTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      // TODO: Intégrer vraie API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedContent(`Script généré pour: "${scriptTopic}"\n\nIntro: Salut tout le monde...\n\nCorps: Développement du sujet...\n\nConclusion: N'oubliez pas de liker et vous abonner !`);
      setActiveModal('script-result');
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de générer le script",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // ✅ MENU DE NAVIGATION COMPLET
  const navigationItems = [
    { id: 'welcome', label: 'Accueil', icon: Home },
    { id: 'chat', label: 'Chat IA', icon: MessageSquare },
    { id: 'resources', label: 'Ressources', icon: Folder },
    { id: 'workspace', label: 'Workspace', icon: Building },
    { id: 'creations', label: 'Créations', icon: Sparkles },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'monetization', label: 'Monétisation', icon: DollarSign },
    { id: 'onboarding', label: 'Mon Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  // ✅ COMPOSANT SIDEBAR COMPLET
  const Sidebar = () => (
    <div className={`
      ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'w-64'} 
      bg-white border-r border-gray-200 flex flex-col
      ${isMobile && !sidebarOpen ? 'transform -translate-x-full' : ''}
      transition-transform duration-200 ease-in-out
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg">Cocoon AI</span>
        </div>
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activePage === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleNavigation(item.id)}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Footer utilisateur */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{getUserName().charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{getUserName()}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ PAGE D'ACCUEIL AVEC TOUTES LES STATS
  const WelcomePage = () => (
    <div className="space-y-6">
      {/* Header de bienvenue */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {getGreeting()} {getUserName()} ! 👋
        </h1>
        <p className="opacity-90">
          Prêt à créer du contenu exceptionnel aujourd'hui ?
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <Badge variant="secondary" className="bg-white/20 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white">
            <Zap className="h-3 w-3 mr-1" />
            IA Active
          </Badge>
        </div>
      </div>

      {/* Stats rapides étendues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.totalChats || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Conversations IA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.totalScripts || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Scripts créés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.totalUploads || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Ressources</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.streak || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Jours actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides étendues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleNavigation('chat')}
            >
              <MessageSquare className="h-6 w-6" />
              <span>Chat IA</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => setActiveModal('script-generator')}
            >
              <Edit className="h-6 w-6" />
              <span>Script Vidéo</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleNavigation('resources')}
            >
              <Upload className="h-6 w-6" />
              <span>Ressources</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleNavigation('creations')}
            >
              <Sparkles className="h-6 w-6" />
              <span>Créations</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test de connexion */}
      <ConnectionTest />
    </div>
  );

  // ✅ PAGE CHAT COMPLÈTE
  const ChatPage = () => (
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

  // ✅ PAGE RESSOURCES COMPLÈTE
  const ResourcesPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Folder className="h-7 w-7 mr-2 text-blue-500" />
          Mes Ressources
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowNewFolderModal(true)} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nouveau dossier
          </Button>
          <Button onClick={() => setShowNewItemModal(true)} size="sm">
            <Upload className="h-4 w-4 mr-1" />
            Ajouter ressource
          </Button>
        </div>
      </div>

      {/* Catégories */}
      <div className="flex space-x-2">
        <Button
          variant={activeCategory === 'resources' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('resources')}
          size="sm"
        >
          <FileText className="h-4 w-4 mr-1" />
          Ressources ({folders.resources.length})
        </Button>
        <Button
          variant={activeCategory === 'personal' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('personal')}
          size="sm"
        >
          <User className="h-4 w-4 mr-1" />
          Personnel ({folders.personal.length})
        </Button>
      </div>

      {/* Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders[activeCategory as keyof typeof folders].map((folder) => (
          <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{folder.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {folder.items.length} éléments
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // ✅ PAGE WORKSPACE (si disponible)
  const WorkspacePage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center">
        <Building className="h-7 w-7 mr-2 text-green-500" />
        Mon Workspace
      </h2>
      
      {MyWorkspace ? (
        <MyWorkspace data={workspaceData} />
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Composant Workspace en développement</p>
              <p className="text-sm">Workspace collaboratif bientôt disponible</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // ✅ RENDU PRINCIPAL AVEC TOUTES LES PAGES
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header mobile */}
        {isMobile && (
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold">Cocoon AI</h1>
            <div className="w-8" />
          </div>
        )}

        {/* Contenu des pages */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activePage === 'welcome' && <WelcomePage />}
          {activePage === 'chat' && <ChatPage />}
          {activePage === 'resources' && <ResourcesPage />}
          {activePage === 'workspace' && <WorkspacePage />}
          {activePage === 'creations' && <CreationsSection />}
          {activePage === 'stats' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center">
                <BarChart3 className="h-7 w-7 mr-2 text-purple-500" />
                Analytics & Performance
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Dashboard Analytics en développement</p>
                    <p className="text-sm">Métriques détaillées bientôt disponibles</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activePage === 'monetization' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center">
                <DollarSign className="h-7 w-7 mr-2 text-green-500" />
                Monétisation
              </h2>