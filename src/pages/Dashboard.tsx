// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreationsSection from '@/components/dashboard/CreationsSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Smile
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: userStats, isLoading, refetch } = useUserStats(user?.id);
  const { toast } = useToast();
  const [activePage, setActivePage] = useState('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // États pour les modales et actions
  const [activeModal, setActiveModal] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [scriptTopic, setScriptTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // États pour la section Ressources
  const [activeCategory, setActiveCategory] = useState('resources');
  const [folders, setFolders] = useState({
    resources: [
      { id: '1', name: 'Scripts Vidéos', emoji: '🎬', items: [] },
      { id: '2', name: 'Images de marque', emoji: '🎨', items: [] }
    ],
    personal: [
      { id: '3', name: 'Profil créateur', emoji: '👤', items: [] },
      { id: '4', name: 'Objectifs', emoji: '🎯', items: [] }
    ]
  });
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderEmoji, setNewFolderEmoji] = useState('📁');
  const [renameFolderData, setRenameFolderData] = useState({ name: '', emoji: '' });
  const [newItemData, setNewItemData] = useState({ 
    name: '', 
    type: 'text', 
    content: '', 
    file: null,
    url: '' 
  });

  // Navigation avec thème Cocoon
  const navigation = [
    {
      id: 'welcome',
      name: 'Mon compte',
      icon: Home,
      description: 'Votre espace personnel'
    },
    {
      id: 'resources',
      name: 'Mes ressources',
      icon: Folder,
      description: 'Ressources et données'
    },
    {
      id: 'creation',
      name: 'Mes créations',
      icon: Sparkles,
      description: 'Création de contenu'
    },
    {
      id: 'monetization',
      name: 'Mon bot IA',
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

  // Emojis populaires pour les dossiers (version étendue avec plus d'emojis utilisés)
  const popularEmojis = [
    '📁', '📂', '🎬', '🎨', '📝', '💼', '🎯', '💡', 
    '🚀', '⭐', '📊', '🎵', '📷', '🎥', '📖', '💻',
    '🏆', '❤️', '🔥', '✨', '🌟', '🎉', '👤', '🏠',
    '📱', '🌐', '🔧', '📈', '💰', '🎪', '🎨', '🎭',
    '😊', '😍', '🤔', '💪', '👍', '🎁', '⚡', '🌈',
    '🍕', '☕', '🎸', '🎲', '🎈', '🎊', '🌺', '🌸',
    '🦄', '🐱', '🐶', '🎀', '💝', '💎', '🔮', '🌙',
    '☀️', '⭐', '💫', '🌊', '🔑', '🎪', '🎯', '📚'
  ];

  // Fonction pour gérer l'upload de fichiers
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewItemData(prev => ({ 
        ...prev, 
        file: file,
        name: prev.name || file.name // Auto-remplir le nom si vide
      }));
      
      toast({
        title: "📁 Fichier sélectionné",
        description: `"${file.name}" prêt à être ajouté.`
      });
    }
  };

  // Fonctions pour les ressources
  const addFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      emoji: newFolderEmoji,
      items: []
    };
    
    setFolders(prev => ({
      ...prev,
      [activeCategory]: [...prev[activeCategory], newFolder]
    }));
    
    setNewFolderName('');
    setNewFolderEmoji('📁');
    setShowNewFolderModal(false);
    
    toast({
      title: "✅ Dossier créé",
      description: `Le dossier "${newFolderEmoji} ${newFolderName}" a été ajouté.`
    });
  };

  const renameFolder = () => {
    if (!renameFolderData.name.trim() || !selectedFolder) return;
    
    setFolders(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(folder => 
        folder.id === selectedFolder.id 
          ? { ...folder, name: renameFolderData.name, emoji: renameFolderData.emoji }
          : folder
      )
    }));
    
    setShowRenameFolderModal(false);
    setSelectedFolder(null);
    setRenameFolderData({ name: '', emoji: '' });
    
    toast({
      title: "✅ Dossier renommé",
      description: `Dossier mis à jour : "${renameFolderData.emoji} ${renameFolderData.name}"`
    });
  };

  const deleteFolder = (folderId) => {
    setFolders(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].filter(folder => folder.id !== folderId)
    }));
    
    toast({
      title: "🗑️ Dossier supprimé",
      description: "Le dossier a été supprimé avec succès."
    });
  };

  const addItem = () => {
    if (!newItemData.name.trim() || !selectedFolder) return;
    
    // Validation selon le type
    if (newItemData.type === 'link' && !newItemData.url.trim()) {
      toast({
        title: "❌ URL manquante",
        description: "Veuillez saisir une URL pour le lien.",
        variant: "destructive"
      });
      return;
    }
    
    if (['document', 'image', 'video'].includes(newItemData.type) && !newItemData.file) {
      toast({
        title: "❌ Fichier manquant",
        description: "Veuillez sélectionner un fichier.",
        variant: "destructive"
      });
      return;
    }
    
    const newItem = {
      id: Date.now().toString(),
      name: newItemData.name,
      type: newItemData.type,
      content: newItemData.content,
      file: newItemData.file ? {
        name: newItemData.file.name,
        size: newItemData.file.size,
        type: newItemData.file.type,
        // En production, ici vous uploaderiez le fichier vers votre serveur
        // et stockeriez l'URL. Pour la démo, on simule :
        url: URL.createObjectURL(newItemData.file)
      } : null,
      url: newItemData.url,
      createdAt: new Date().toISOString()
    };
    
    setFolders(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(folder => 
        folder.id === selectedFolder.id 
          ? { ...folder, items: [...folder.items, newItem] }
          : folder
      )
    }));
    
    setNewItemData({ name: '', type: 'text', content: '', file: null, url: '' });
    setShowNewItemModal(false);
    setSelectedFolder(null);
    
    toast({
      title: "✅ Élément ajouté",
      description: `"${newItemData.name}" a été ajouté au dossier.`
    });
  };

  const deleteItem = (folderId, itemId) => {
    setFolders(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(folder => 
        folder.id === folderId 
          ? { ...folder, items: folder.items.filter(item => item.id !== itemId) }
          : folder
      )
    }));
    
    toast({
      title: "🗑️ Élément supprimé",
      description: "L'élément a été supprimé avec succès."
    });
  };

  const getItemIcon = (type) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'link': return <Globe className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Fonction pour afficher les éléments avec preview
  const renderItemContent = (item) => {
    const openFile = () => {
      if (item.type === 'link' && item.url) {
        window.open(item.url, '_blank');
      } else if (item.file?.url) {
        window.open(item.file.url, '_blank');
      }
    };

    return (
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded group hover:bg-gray-100 transition-colors">
        <div 
          className="flex items-center space-x-2 flex-1 cursor-pointer" 
          onClick={openFile}
        >
          {getItemIcon(item.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium truncate">{item.name}</span>
              <Badge variant="secondary" className="text-xs">
                {item.type}
              </Badge>
            </div>
            {item.file && (
              <p className="text-xs text-gray-500 truncate">
                {item.file.name} ({(item.file.size / 1024).toFixed(1)} KB)
              </p>
            )}
            {item.type === 'link' && item.url && (
              <p className="text-xs text-blue-600 truncate">{item.url}</p>
            )}
          </div>
          {(item.type === 'link' || item.file) && (
            <Eye className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(item.folderId, item.id);
          }}
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </Button>
      </div>
    );
  };

  // Fonctions d'action
  const handleChatIA = async () => {
    if (!chatInput.trim()) return;
    
    setIsGenerating(true);
    setChatMessages(prev => [...prev, { type: 'user', content: chatInput }]);
    
    try {
      const response = await huggingfaceService.askAI(chatInput);
      setChatMessages(prev => [...prev, { type: 'ai', content: response.answer || response }]);
      setChatInput('');
      toast({
        title: "✅ Réponse générée",
        description: "L'IA a répondu à votre question"
      });
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de générer une réponse",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateScript = async () => {
    if (!scriptTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await huggingfaceService.generateScript(scriptTopic);
      setGeneratedContent(response.script || response);
      toast({
        title: "✅ Script généré",
        description: "Votre script a été créé avec succès"
      });
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

  // SECTION WELCOME AMÉLIORÉE
  const renderWelcomePage = () => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gem';

    const nextSteps = [
      {
        id: 'feed-chrysalis',
        title: 'Alimentez votre Chrysalide',
        description: 'Ajoutez des ressources pour enrichir votre IA',
        icon: Folder,
        action: () => setActivePage('resources'),
        color: 'bg-blue-500'
      },
      {
        id: 'first-transformation',
        title: 'Première Transformation',
        description: 'Générez votre premier script personnalisé',
        icon: PlayCircle,
        action: () => setActivePage('creation'),
        color: 'bg-purple-500'
      },
      {
        id: 'monetization',
        title: 'Partagez votre Envol',
        description: 'Configurez votre assistant pour la monétisation',
        icon: DollarSign,
        action: () => setActivePage('monetization'),
        color: 'bg-green-500'
      }
    ];

    return (
      <div className="p-4 md:p-8 space-y-8">
        {/* En-tête de bienvenue */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {greeting}, {userName} ! 🦋
            </h1>
            <p className="text-purple-100 text-lg mb-6">
              Transformez vos idées en contenu captivant.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-5 w-5" />
                  <span className="font-medium">Objectif du Jour</span>
                </div>
                <p className="text-sm text-purple-100">Commencer votre transformation</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Progression</span>
                </div>
                <p className="text-sm text-purple-100">Score créateur : {userStats?.totalScore || 0}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Temps Économisé</span>
                </div>
                <p className="text-sm text-purple-100">{userStats?.timeSaved || 0} heures ce mois</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-700">{userStats?.scriptsGenerated || 0}</div>
              <div className="text-sm text-gray-600">Scripts Créés</div>
              <div className="text-xs text-green-600 mt-1">0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">{userStats?.chatConversations || 0}</div>
              <div className="text-sm text-gray-600">Conversations IA</div>
              <div className="text-xs text-green-600 mt-1">0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <Folder className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700">{userStats?.totalResources || 0}</div>
              <div className="text-sm text-gray-600">Ressources</div>
              <div className="text-xs text-green-600 mt-1">0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-700">{userStats?.contentGenerated || 0}</div>
              <div className="text-sm text-gray-600">Transformations</div>
              <div className="text-xs text-green-600 mt-1">+0%</div>
            </CardContent>
          </Card>
        </div>

        {/* Prochaines Étapes - AVEC BOUTONS CLIQUABLES */}
        <Card>
          <CardHeader>
            <CardTitle>Prochaines Étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <Button
                    key={step.id}
                    variant="ghost"
                    className="w-full p-4 h-auto justify-start hover:bg-gray-50 transition-all duration-200"
                    onClick={step.action}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <StepIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{step.title}</div>
                        <div className="text-sm text-gray-500">{step.description}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Évolution Récente */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">📈</div>
              <p className="text-gray-500">Aucune activité récente</p>
              <p className="text-sm text-gray-400">Commencez votre première transformation pour voir vos progrès ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Page Ressources COMPLÈTE avec Upload et Renommage
  const renderResourcesPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Ressources</h2>
        <Button onClick={() => setShowNewFolderModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Dossier
        </Button>
      </div>

      {/* Onglets Catégories */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveCategory('resources')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeCategory === 'resources'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Ressources
        </button>
        <button
          onClick={() => setActiveCategory('personal')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeCategory === 'personal'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Infos Personnelles
        </button>
      </div>

      {/* Liste des Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders[activeCategory].map((folder) => (
          <Card key={folder.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <span className="text-2xl mr-2">{folder.emoji}</span>
                  <span className="truncate">{folder.name}</span>
                </CardTitle>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFolder(folder);
                      setRenameFolderData({ name: folder.name, emoji: folder.emoji });
                      setShowRenameFolderModal(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFolder(folder);
                      setShowNewItemModal(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFolder(folder.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {folder.items.length} élément(s)
              </p>
            </CardHeader>
            
            <CardContent>
              {folder.items.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  <span className="text-3xl block mb-2">{folder.emoji}</span>
                  <p className="text-sm">Dossier vide</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {folder.items.map((item) => (
                    <div key={item.id}>
                      {renderItemContent({ ...item, folderId: folder.id })}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {folders[activeCategory].length === 0 && (
          <div className="col-span-full text-center py-12">
            <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Aucun dossier dans {activeCategory === 'resources' ? 'Ressources' : 'Infos Personnelles'}
            </h3>
            <p className="text-gray-500 mb-4">
              Créez votre premier dossier pour organiser vos contenus.
            </p>
            <Button onClick={() => setShowNewFolderModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer un dossier
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour Desktop */}
      {!isMobile && (
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Cocoon AI
              </h1>
            </div>
          </div>
          
          <nav className="px-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Cocoon AI
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute top-0 left-0 w-64 h-full bg-white transform transition-transform">
            <div className="p-6 pt-20">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activePage === item.id
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'pt-16' : ''}`}>
        {activePage === 'welcome' && renderWelcomePage()}
        {activePage === 'resources' && renderResourcesPage()}
        {activePage === 'creation' && (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Mes Créations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Chat avec l'IA</h3>
                    <p className="text-sm text-gray-500">Conversation personnalisée</p>
                  </div>
                </div>
                <Button onClick={() => setActiveModal('chat')} className="w-full">
                  Commencer une conversation
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Générer un Script</h3>
                    <p className="text-sm text-gray-500">Création de contenu</p>
                  </div>
                </div>
                <Button onClick={() => setActiveModal('script')} variant="outline" className="w-full">
                  Créer un script
                </Button>
              </Card>
            </div>
          </div>
        )}
        {activePage === 'monetization' && (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Mon Bot IA</h2>
            <Card className="p-6">
              <div className="text-center">
                <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Bientôt Disponible</h3>
                <p className="text-gray-600">
                  Partagez et monétisez votre assistant IA personnalisé
                </p>
              </div>
            </Card>
          </div>
        )}
        {activePage === 'settings' && (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Réglages</h2>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Profil Utilisateur</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-purple-500 text-white text-xl">
                        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.user_metadata?.full_name || 'Utilisateur'}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Thème</Label>
                      <p className="text-sm text-gray-500">Clair (par défaut)</p>
                    </div>
                    <div>
                      <Label>Langue</Label>
                      <p className="text-sm text-gray-500">Français</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Modal Chat IA */}
      <Dialog open={activeModal === 'chat'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>💬 Chat avec votre IA personnalisée</DialogTitle>
            <DialogDescription>
              Posez vos questions et obtenez des réponses adaptées à vos ressources
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="h-80 overflow-y-auto border rounded-lg p-4 space-y-3">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <Brain className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Commencez une conversation avec votre IA...</p>
                </div>
              ) : (
                chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>L'IA réfléchit...</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 min-h-[40px] max-h-32"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChatIA();
                  }
                }}
              />
              <Button 
                onClick={handleChatIA} 
                disabled={isGenerating || !chatInput.trim()}
                size="sm"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Génération Script */}
      <Dialog open={activeModal === 'script'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>🎬 Générer un Script Personnalisé</DialogTitle>
            <DialogDescription>
              Créez un script adapté à votre style et vos ressources
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scriptTopic">Sujet du script</Label>
              <Textarea
                id="scriptTopic"
                value={scriptTopic}
                onChange={(e) => setScriptTopic(e.target.value)}
                placeholder="Ex: Comment bien commencer sur YouTube, Les erreurs à éviter en création de contenu..."
                className="min-h-[80px]"
              />
            </div>
            
            {generatedContent && (
              <div className="space-y-2">
                <Label>Script généré</Label>
                <div className="border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(generatedContent)}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Copier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setGeneratedContent('')}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Fermer
              </Button>
              <Button 
                onClick={handleGenerateScript} 
                disabled={isGenerating || !scriptTopic.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Générer le script
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Nouveau Dossier */}
      <Dialog open={showNewFolderModal} onOpenChange={setShowNewFolderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau dossier</DialogTitle>
            <DialogDescription>
              Ajoutez un dossier dans {activeCategory === 'resources' ? 'Ressources' : 'Infos Personnelles'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folderEmoji">Emoji du dossier</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="folderEmoji"
                  value={newFolderEmoji}
                  onChange={(e) => setNewFolderEmoji(e.target.value)}
                  className="w-16 text-center text-xl"
                  maxLength={2}
                />
                <div className="flex-1">
                  <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto border rounded p-2">
                    {popularEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setNewFolderEmoji(emoji)}
                        className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="folderName">Nom du dossier</Label>
              <Input
                id="folderName"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Nom du dossier"
                onKeyPress={(e) => e.key === 'Enter' && addFolder()}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setShowNewFolderModal(false);
                setNewFolderName('');
                setNewFolderEmoji('📁');
              }}>
                Annuler
              </Button>
              <Button onClick={addFolder} disabled={!newFolderName.trim()}>
                Créer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Renommer Dossier */}
      <Dialog open={showRenameFolderModal} onOpenChange={setShowRenameFolderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renommer le dossier</DialogTitle>
            <DialogDescription>
              Modifiez le nom et l'emoji de "{selectedFolder?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="renameEmoji">Emoji du dossier</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="renameEmoji"
                  value={renameFolderData.emoji}
                  onChange={(e) => setRenameFolderData(prev => ({ ...prev, emoji: e.target.value }))}
                  className="w-16 text-center text-xl"
                  maxLength={2}
                />
                <div className="flex-1">
                  <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto border rounded p-2">
                    {popularEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setRenameFolderData(prev => ({ ...prev, emoji }))}
                        className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="renameName">Nom du dossier</Label>
              <Input
                id="renameName"
                value={renameFolderData.name}
                onChange={(e) => setRenameFolderData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nom du dossier"
                onKeyPress={(e) => e.key === 'Enter' && renameFolder()}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setShowRenameFolderModal(false);
                setRenameFolderData({ name: '', emoji: '' });
                setSelectedFolder(null);
              }}>
                Annuler
              </Button>
              <Button onClick={renameFolder} disabled={!renameFolderData.name.trim()}>
                Renommer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Nouvel Élément */}
      <Dialog open={showNewItemModal} onOpenChange={setShowNewItemModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un élément</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel élément à "{selectedFolder?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Nom de l'élément</Label>
              <Input
                id="itemName"
                value={newItemData.name}
                onChange={(e) => setNewItemData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nom de l'élément"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="itemType">Type</Label>
              <select
                id="itemType"
                value={newItemData.type}
                onChange={(e) => setNewItemData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="text">Texte</option>
                <option value="link">Lien</option>
                <option value="document">Document</option>
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
              </select>
            </div>
            
            {newItemData.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="itemContent">Contenu</Label>
                <Textarea
                  id="itemContent"
                  value={newItemData.content}
                  onChange={(e) => setNewItemData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Contenu du texte..."
                  className="min-h-[80px]"
                />
              </div>
            )}
            
            {newItemData.type === 'link' && (
              <div className="space-y-2">
                <Label htmlFor="itemUrl">URL</Label>
                <Input
                  id="itemUrl"
                  value={newItemData.url}
                  onChange={(e) => setNewItemData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            )}
            
            {['document', 'image', 'video'].includes(newItemData.type) && (
              <div className="space-y-2">
                <Label htmlFor="itemFile">Fichier</Label>
                <Input
                  id="itemFile"
                  type="file"
                  onChange={handleFileUpload}
                  accept={
                    newItemData.type === 'image' ? 'image/*' :
                    newItemData.type === 'video' ? 'video/*' :
                    '.pdf,.doc,.docx,.txt'
                  }
                />
                {newItemData.file && (
                  <p className="text-sm text-gray-500">
                    Fichier sélectionné: {newItemData.file.name}
                  </p>
                )}
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setShowNewItemModal(false);
                setNewItemData({ name: '', type: 'text', content: '', file: null, url: '' });
                setSelectedFolder(null);
              }}>
                Annuler
              </Button>
              <Button onClick={addItem} disabled={!newItemData.name.trim()}>
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
