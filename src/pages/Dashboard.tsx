// src/pages/Dashboard.tsx
import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';

// Import des composants Dashboard
import UserSettingsSection from '@/components/dashboard/UserSettingsSection';
import OnboardingDataSection from '@/components/dashboard/OnboardingDataSection';
import CreationsSection from '@/components/dashboard/CreationsSection';

const Dashboard = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
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

  // Emojis populaires pour les dossiers
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

  // Fonction pour gérer l'exécution des boutons personnalisés
  const handleExecuteCustomButton = async (buttonData, placeholderValues) => {
    console.log('🚀 Exécution du bouton:', buttonData.name);
    console.log('📝 Prompt:', buttonData.prompt);
    console.log('🔧 Paramètres:', placeholderValues);
    console.log('📁 Dossiers connectés:', buttonData.connectedFolders);

    try {
      setIsGenerating(true);
      
      // 1. Remplacer les placeholders dans le prompt
      let finalPrompt = buttonData.prompt;
      Object.entries(placeholderValues).forEach(([key, value]) => {
        finalPrompt = finalPrompt.replace(new RegExp(`{${key}}`, 'g'), value);
      });
      
      // 2. Récupérer le contenu des dossiers connectés
      const connectedContent = [];
      buttonData.connectedFolders.forEach(folderId => {
        const folder = [...folders.resources, ...folders.personal].find(f => f.id === folderId);
        if (folder && folder.items.length > 0) {
          connectedContent.push(`\n## Ressources de "${folder.name}" :\n`);
          folder.items.forEach(item => {
            connectedContent.push(`- ${item.name}: ${item.content || item.description || 'Contenu disponible'}\n`);
          });
        }
      });
      
      // 3. Créer le prompt final avec le contexte
      const contextualPrompt = `${finalPrompt}\n\n${connectedContent.length > 0 ? 'Contexte et ressources disponibles :' + connectedContent.join('') : ''}`;
      
      // 4. Simuler l'appel à l'IA (tu pourras connecter ton API ici)
      console.log('🤖 Prompt final envoyé à l'IA:', contextualPrompt);
      
      // Simulation de génération (remplace par ton appel API réel)
      setTimeout(() => {
        const generatedContent = `✨ Contenu généré par "${buttonData.name}":\n\n` +
          `Prompt utilisé: ${finalPrompt}\n\n` +
          `Paramètres:\n${Object.entries(placeholderValues).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n` +
          `Ressources utilisées: ${buttonData.connectedFolders.length} dossier(s)\n\n` +
          `[Ici serait le contenu généré par l'IA basé sur ton prompt et tes ressources]`;
        
        setGeneratedContent(generatedContent);
        setIsGenerating(false);
        
        toast({
          title: `✅ ${buttonData.name} terminé`,
          description: "Le contenu a été généré avec succès!"
        });
        
        // Tu peux aussi ouvrir automatiquement le modal de chat ou de résultats
        setActiveModal('chat');
      }, 3000);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'exécution:', error);
      setIsGenerating(false);
      toast({
        title: "❌ Erreur",
        description: "Une erreur s'est produite lors de la génération."
      });
    }
  };

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
        description: "Veuillez saisir une URL pour le lien."
      });
      return;
    }

    if (newItemData.type === 'file' && !newItemData.file) {
      toast({
        title: "❌ Fichier manquant",
        description: "Veuillez sélectionner un fichier."
      });
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemData.name,
      type: newItemData.type,
      content: newItemData.content,
      url: newItemData.url,
      file: newItemData.file,
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
      description: `"${newItem.name}" a été ajouté au dossier.`
    });
  };

  // Fonction pour le chat IA
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      setIsGenerating(true);
      
      // Simuler réponse IA (remplace par ton service réel)
      setTimeout(() => {
        const aiResponse = `Voici ma réponse à "${userMessage}" basée sur vos ressources et profil créateur...`;
        setChatMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
        setIsGenerating(false);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur chat:', error);
      setIsGenerating(false);
      toast({
        title: "❌ Erreur",
        description: "Erreur lors de la conversation avec l'IA."
      });
    }
  };

  // Fonction pour générer un script
  const handleScriptGeneration = async () => {
    if (!scriptTopic.trim()) {
      toast({
        title: "❌ Sujet manquant",
        description: "Veuillez entrer un sujet pour le script."
      });
      return;
    }

    try {
      setIsGenerating(true);
      
      // Simuler génération de script
      setTimeout(() => {
        const script = `# Script pour "${scriptTopic}"\n\n## Introduction\nBonjour et bienvenue dans cette nouvelle vidéo...\n\n## Développement\n[Contenu principal basé sur vos ressources]\n\n## Conclusion\nJ'espère que cette vidéo vous a plu...`;
        setGeneratedContent(script);
        setIsGenerating(false);
        
        toast({
          title: "✅ Script généré",
          description: "Votre script personnalisé est prêt !"
        });
      }, 3000);
      
    } catch (error) {
      console.error('Erreur génération script:', error);
      setIsGenerating(false);
    }
  };

  // Fonctions de rendu pour chaque page
  const renderWelcomePage = () => (
    <UserSettingsSection />
  );

  const renderResourcesPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Folder className="h-6 w-6" />
            Mes Ressources
          </h2>
          <p className="text-muted-foreground">
            Organisez vos fichiers et ressources pour l'IA
          </p>
        </div>
      </div>

      {/* Catégories */}
      <div className="flex gap-2">
        <Button
          variant={activeCategory === 'resources' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('resources')}
          className="gap-2"
        >
          <Folder className="h-4 w-4" />
          Ressources
        </Button>
        <Button
          variant={activeCategory === 'personal' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('personal')}
          className="gap-2"
        >
          <User className="h-4 w-4" />
          Personnel
        </Button>
      </div>

      {/* Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders[activeCategory].map(folder => (
          <Card key={folder.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{folder.emoji}</div>
                  <div>
                    <CardTitle className="text-base">{folder.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {folder.items.length} élément(s)
                    </p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setSelectedFolder(folder);
                  setShowNewItemModal(true);
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Ajouter un élément
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {/* Bouton nouveau dossier */}
        <Card className="border-dashed border-2 hover:border-gray-400 transition-colors">
          <CardContent className="flex items-center justify-center h-32">
            <Button
              variant="ghost"
              onClick={() => setShowNewFolderModal(true)}
              className="h-full w-full flex-col gap-2"
            >
              <Plus className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">Nouveau dossier</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300
        ${isMobile ? 'w-72' : 'w-64'}
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Cocoon
              </span>
            </div>
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
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

      {/* Main Content */}
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        {/* Header Mobile */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-semibold">Cocoon</span>
            <div className="w-8" />
          </div>
        )}

        {/* Page Content */}
        <div className={`p-4 md:p-8 ${isMobile ? 'pt-0' : ''}`}>
          {activePage === 'welcome' && renderWelcomePage()}
          {activePage === 'resources' && renderResourcesPage()}
          {activePage === 'creation' && (
            <CreationsSection 
              folders={folders}
              onExecuteButton={handleExecuteCustomButton}
            />
          )}
          {activePage === 'monetization' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Mon Bot IA</h2>
              <Card className="p-6">
                <div className="text-center">
                  <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Fonctionnalité Premium</h3>
                  <p className="text-muted-foreground mb-4">
                    Créez et partagez votre propre bot IA personnalisé
                  </p>
                  <Button disabled>
                    Bientôt disponible
                  </Button>
                </div>
              </Card>
            </div>
          )}
          {activePage === 'settings' && <OnboardingDataSection />}
        </div>
      </div>

      {/* Modales */}
      
      {/* Modal Chat IA */}
      {activeModal === 'chat' && (
        <Dialog open={true} onOpenChange={() => setActiveModal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Assistant IA</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Messages */}
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                {chatMessages.length > 0 ? (
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white border'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Commencez une conversation avec votre IA</p>
                  </div>
                )}
                
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-white border rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">L'IA réfléchit...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Zone de contenu généré */}
              {generatedContent && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                </div>
              )}
              
              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Posez votre question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSubmit();
                    }
                  }}
                />
                <Button onClick={handleChatSubmit} disabled={isGenerating}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveModal(null)}>
                  Fermer
                </Button>
                {generatedContent && (
                  <Button onClick={() => {
                    navigator.clipboard.writeText(generatedContent);
                    toast({ title: "📋 Copié!", description: "Le contenu a été copié." });
                  }}>
                    Copier le résultat
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Génération Script */}
      {activeModal === 'script' && (
        <Dialog open={true} onOpenChange={() => setActiveModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Générer un Script</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="scriptTopic">Sujet du script</Label>
                <Input
                  id="scriptTopic"
                  placeholder="Ex: Comment créer du contenu viral"
                  value={scriptTopic}
                  onChange={(e) => setScriptTopic(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveModal(null)}>
                  Annuler
                </Button>
                <Button onClick={handleScriptGeneration} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    'Générer'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Nouveau Dossier */}
      {showNewFolderModal && (
        <Dialog open={true} onOpenChange={setShowNewFolderModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau dossier</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="folderName">Nom du dossier</Label>
                <Input
                  id="folderName"
                  placeholder="Ex: Mes scripts"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
              </div>
              
              <div>
                <Label>Emoji</Label>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {popularEmojis.map(emoji => (
                    <Button
                      key={emoji}
                      variant={newFolderEmoji === emoji ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewFolderEmoji(emoji)}
                      className="h-10 w-10 p-0"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewFolderModal(false)}>
                  Annuler
                </Button>
                <Button onClick={addFolder}>
                  Créer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Ajouter un élément */}
      {showNewItemModal && selectedFolder && (
        <Dialog open={true} onOpenChange={setShowNewItemModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter à "{selectedFolder.name}"</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Nom</Label>
                <Input
                  id="itemName"
                  placeholder="Nom de l'élément"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="itemType">Type</Label>
                <Select
                  value={newItemData.type}
                  onValueChange={(value) => setNewItemData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texte</SelectItem>
                    <SelectItem value="file">Fichier</SelectItem>
                    <SelectItem value="link">Lien</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newItemData.type === 'text' && (
                <div>
                  <Label htmlFor="itemContent">Contenu</Label>
                  <Textarea
                    id="itemContent"
                    placeholder="Votre contenu..."
                    value={newItemData.content}
                    onChange={(e) => setNewItemData(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
              )}
              
              {newItemData.type === 'file' && (
                <div>
                  <Label htmlFor="itemFile">Fichier</Label>
                  <Input
                    id="itemFile"
                    type="file"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
              
              {newItemData.type === 'link' && (
                <div>
                  <Label htmlFor="itemUrl">URL</Label>
                  <Input
                    id="itemUrl"
                    type="url"
                    placeholder="https://..."
                    value={newItemData.url}
                    onChange={(e) => setNewItemData(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewItemModal(false)}>
                  Annuler
                </Button>
                <Button onClick={addItem}>
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;