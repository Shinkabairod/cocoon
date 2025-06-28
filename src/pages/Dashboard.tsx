// src/pages/Dashboard.tsx - Version améliorée avec design cohérent et VRAIS composants
import SettingsSection from '@/components/dashboard/SettingsSection';
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
import MyWorkspace from '@/components/dashboard/MyWorkspace';
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
  ArrowRight,
  Building,
  ExternalLink,
  Search,
  Bell,
  LogOut,
  HelpCircle,
  BookOpen
} from 'lucide-react';

// Import des composants Dashboard EXISTANTS
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

  // États pour les modales
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [showFilePreviewModal, setShowFilePreviewModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderEmoji, setNewFolderEmoji] = useState('📁');
  const [renameFolderData, setRenameFolderData] = useState({ id: '', name: '', emoji: '' });

  // États pour nouveau item
  const [newItemData, setNewItemData] = useState({
    name: '',
    type: 'text',
    content: '',
    url: '',
    file: null
  });

  // Navigation items pour la sidebar (ORDRE MODIFIÉ)
  const navItems = [
    { id: 'welcome', icon: Home, label: "Home", path: "/dashboard" },
    { id: 'resources', icon: FolderOpen, label: "My Workspace", path: "/dashboard/resources" },
    { id: 'creation', icon: FileText, label: "My Creations", path: "/dashboard/scripts" },
    { id: 'monetization', icon: Crown, label: "My AI Bot", path: "/dashboard/monetization" },
    { id: 'settings', icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];
  
  const accountItems = [
    { icon: HelpCircle, label: "Help & Support", path: "/dashboard/support" },
  ];

  // Toutes vos fonctions existantes CONSERVÉES
  const handleExecuteCustomButton = async (buttonData, placeholderValues) => {
    try {
      setIsGenerating(true);
      // Utilise la méthode askAI avec le prompt comme question
      const result = await huggingfaceService.askAI(buttonData.prompt);
      setGeneratedContent(result);
      toast({
        title: "✅ Content Generated",
        description: "Your personalized content is ready!"
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "❌ Error",
        description: "Unable to generate content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    try {
      const response = await huggingfaceService.askAI(chatInput);
      const botMessage = { type: 'bot', content: response };
      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { type: 'bot', content: 'Sorry, I cannot respond at the moment.' };
      setChatMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleScriptGeneration = async () => {
    if (!scriptTopic.trim()) {
      toast({
        title: "❌ Missing Topic",
        description: "Please enter a topic for the script."
      });
      return;
    }

    try {
      setIsGenerating(true);
      
      // Utilise generateScript avec le topic
      const result = await huggingfaceService.generateScript(scriptTopic);
      setGeneratedContent(result);
      setIsGenerating(false);
      
      toast({
        title: "✅ Script Generated",
        description: "Your personalized script is ready!"
      });
      
    } catch (error) {
      console.error('Script generation error:', error);
      toast({
        title: "❌ Error",
        description: "Unable to generate script",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };

  // Fonction pour obtenir les informations utilisateur
  const getUserDisplayInfo = () => {
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return { displayName, initials };
  };

  const { displayName, initials } = getUserDisplayInfo();

  // Fonctions de rendu pour chaque page avec design amélioré
  const renderWelcomePage = () => (
    <div className="space-y-8">
      {/* Hero Section avec design cohérent */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl p-8 text-white overflow-hidden relative">
        {/* Pattern background subtil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hello {displayName}! 👋
              </h1>
              <p className="text-white/80">
                Your creative workspace awaits
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Pro Plan</span>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Created Content', value: 12, icon: FileText },
              { label: 'Resources', value: folders.resources.length + folders.personal.length, icon: FolderOpen },
              { label: 'AI Conversations', value: 5, icon: MessageSquare },
              { label: 'Progress', value: 68, suffix: '%', icon: Target }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-white/80" />
                <div className="text-2xl font-bold mb-1">
                  {stat.value}{stat.suffix || ''}
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section principale avec UserSettingsSection RÉEL */}
      <UserSettingsSection />

      {/* Actions rapides */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Quick Actions</span>
          </h2>
          <button className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Video, label: 'Video Script', color: 'from-red-500 to-red-600', desc: 'Create optimized script', action: () => setActivePage('creation') },
            { icon: MessageSquare, label: 'AI Chat', color: 'from-purple-500 to-purple-600', desc: 'Smart assistant', action: () => setActiveModal('chat') },
            { icon: Upload, label: 'Upload Resources', color: 'from-blue-500 to-blue-600', desc: 'Add files', action: () => setActivePage('resources') },
            { icon: Settings, label: 'Settings', color: 'from-green-500 to-green-600', desc: 'Configure account', action: () => setActivePage('settings') }
          ].map((action, index) => (
            <button
              key={action.label}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left"
              onClick={action.action}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{action.label}</h3>
              <p className="text-sm text-gray-600">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResourcesPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Folder className="h-6 w-6" />
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">My Resources</span>
          </h2>
          <p className="text-gray-600">
            Organize your files and resources for AI
          </p>
        </div>
        <Button 
          onClick={() => setShowNewFolderModal(true)}
          className="bg-black text-white hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>

      {/* Catégories */}
      <div className="flex gap-2">
        <Button
          variant={activeCategory === 'resources' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('resources')}
          className={`gap-2 ${activeCategory === 'resources' ? 'bg-black text-white' : ''}`}
        >
          <Folder className="h-4 w-4" />
          Resources
        </Button>
        <Button
          variant={activeCategory === 'personal' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('personal')}
          className={`gap-2 ${activeCategory === 'personal' ? 'bg-black text-white' : ''}`}
        >
          <User className="h-4 w-4" />
          Personal
        </Button>
      </div>

      {/* Grille des dossiers avec design de la landing page */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders[activeCategory].map((folder) => (
          <div key={folder.id} className="bg-gradient-to-br from-violet-50/50 to-purple-50/50 border border-violet-200/30 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl mb-3 filter grayscale-0">{folder.emoji}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{folder.name}</h3>
              <p className="text-xs text-gray-600">{folder.items.length} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Fonction pour ajouter un nouvel item
  const addItem = async () => {
    if (!newItemData.name.trim() || !selectedFolder) return;

    try {
      const newItem = {
        id: Date.now().toString(),
        name: newItemData.name,
        type: newItemData.type,
        content: newItemData.content,
        url: newItemData.url,
        file: newItemData.file,
        createdAt: new Date().toISOString(),
        source: 'manual'
      };

      setFolders(prev => ({
        ...prev,
        [activeCategory]: prev[activeCategory].map(folder =>
          folder.id === selectedFolder.id
            ? { ...folder, items: [...folder.items, newItem] }
            : folder
        )
      }));

      setShowNewItemModal(false);
      setNewItemData({ name: '', type: 'text', content: '', url: '', file: null });
      setSelectedFolder(null);

      toast({
        title: "✅ Item Added",
        description: `${newItemData.name} has been added to ${selectedFolder.name}`
      });
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "❌ Error",
        description: "Unable to add item",
        variant: "destructive"
      });
    }
  };

  // Fonction pour upload de fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewItemData(prev => ({ ...prev, file, name: file.name }));
    }
  };

  // Rendu conditionnel du contenu principal
  const renderMainContent = () => {
    switch(activePage) {
      case 'welcome': 
        return renderWelcomePage();
      case 'resources': 
        return renderResourcesPage();
      case 'creation': 
        return (
          <CreationsSection 
            folders={folders}
            onExecuteButton={handleExecuteCustomButton}
          />
        );
      case 'monetization': 
        return (
          <div className="text-center py-12">
            <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">My AI Bot</span>
            </h2>
            <p className="text-gray-600 mb-6">Premium feature - Coming soon</p>
            <Button className="bg-black text-white" disabled>
              In Development
            </Button>
          </div>
        );
      case 'settings': 
        return <SettingsSection />;
      default: 
        return renderWelcomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header amélioré */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo et menu mobile */}
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white transform rotate-45 rounded-sm"></div>
                </div>
              </div>
              <span className="text-xl font-bold">Cocoon AI</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveModal('chat')}
              className="relative"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{initials}</span>
              </div>
              <div className="hidden md:block">
                <div className="font-medium">{displayName}</div>
                <div className="text-xs text-gray-500">Pro Plan</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        {!isMobile && (
          <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 flex flex-col">
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                      activePage === item.id 
                        ? 'bg-black text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xs uppercase font-medium text-gray-500 mb-2 px-3">
                  Account
                </h3>
                <div className="space-y-1">
                  {accountItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
            
            <div className="p-4 border-t">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-500 hover:bg-gray-100 transition-all">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </aside>
        )}

        {/* Sidebar Mobile */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                        activePage === item.id 
                          ? 'bg-black text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-6 ${isMobile ? '' : 'ml-0'}`}>
          {renderMainContent()}
        </main>
      </div>

      {/* Modal Chat IA */}
      {activeModal === 'chat' && (
        <Dialog open={true} onOpenChange={() => setActiveModal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Assistant
              </DialogTitle>
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
                            ? 'bg-black text-white' 
                            : 'bg-white border shadow-sm'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with your AI assistant</p>
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modales existantes pour les dossiers */}
      {showNewFolderModal && (
        <Dialog open={true} onOpenChange={() => setShowNewFolderModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Folder Name</Label>
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                />
              </div>
              <div>
                <Label>Emoji</Label>
                <Input
                  value={newFolderEmoji}
                  onChange={(e) => setNewFolderEmoji(e.target.value)}
                  placeholder="📁"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    // Logique de création de dossier
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
                    
                    setShowNewFolderModal(false);
                    setNewFolderName('');
                    setNewFolderEmoji('📁');
                    
                    toast({
                      title: "✅ Folder Created",
                      description: `${newFolderName} has been created successfully`
                    });
                  }}
                  className="bg-black text-white"
                >
                  Create
                </Button>
                <Button variant="outline" onClick={() => setShowNewFolderModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal pour ajouter un nouvel item */}
      {showNewItemModal && (
        <Dialog open={true} onOpenChange={() => setShowNewItemModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Add a new item to {selectedFolder?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Name</Label>
                <Input
                  id="itemName"
                  placeholder="Item name"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="itemType">Type</Label>
                <Select value={newItemData.type} onValueChange={(value) => setNewItemData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Note</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newItemData.type === 'text' && (
                <div>
                  <Label htmlFor="itemContent">Content</Label>
                  <Textarea
                    id="itemContent"
                    placeholder="Enter your text content..."
                    value={newItemData.content}
                    onChange={(e) => setNewItemData(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                  />
                </div>
              )}
              
              {newItemData.type === 'file' && (
                <div>
                  <Label htmlFor="itemFile">File</Label>
                  <Input
                    id="itemFile"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  {newItemData.file && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      Selected file: {newItemData.file.name}
                    </div>
                  )}
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
                  Cancel
                </Button>
                <Button onClick={addItem} className="bg-black text-white">
                  Add Item
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