
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useUserStats } from '@/hooks/useUserStats';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

// Import page components
import WelcomePageSection from '@/components/dashboard/WelcomePageSection';
import ChatPageSection from '@/components/dashboard/ChatPageSection';
import ResourcesPageSection from '@/components/dashboard/ResourcesPageSection';
import DashboardModals from '@/components/dashboard/DashboardModals';

// Import existing components
import SettingsSection from '@/components/dashboard/SettingsSection';
import OnboardingDataSection from '@/components/dashboard/OnboardingDataSection';
import CreationsSection from '@/components/dashboard/CreationsSection';

import {
  Home,
  Folder,
  Sparkles,
  DollarSign,
  Settings,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  User,
  Building
} from 'lucide-react';

// Try to import optional components
let MyWorkspace: React.ComponentType<any> | null = null;
try {
  MyWorkspace = require('@/components/dashboard/MyWorkspace').default;
} catch (e) {
  console.log('MyWorkspace component not found, skipping...');
}

const Dashboard = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const { data: userStats, isLoading, refetch } = useUserStats(user?.id);
  const { toast } = useToast();
  const [activePage, setActivePage] = useState('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [scriptTopic, setScriptTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  // Resources states
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

  // Modal states
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

  const getUserName = () => {
    return user?.user_metadata?.full_name || 
           user?.email?.split('@')[0] || 
           'Créateur';
  };

  const handleNavigation = (page: string) => {
    setActivePage(page);
    if (isMobile) setSidebarOpen(false);
  };

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
      [newFolder.category as keyof typeof prev]: [...prev[newFolder.category as keyof typeof prev], newFolderObj]
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

  const generateScript = async () => {
    if (!scriptTopic.trim()) return;
    
    setIsGenerating(true);
    try {
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

  const Sidebar = () => (
    <div className={`
      ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'w-64'} 
      bg-white border-r border-gray-200 flex flex-col
      ${isMobile && !sidebarOpen ? 'transform -translate-x-full' : ''}
      transition-transform duration-200 ease-in-out
    `}>
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

  const WorkspacePage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center">
        <Building className="h-7 w-7 mr-2 text-green-500" />
        Mon Workspace
      </h2>
      
      {MyWorkspace ? (
        <MyWorkspace />
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar />

      <div className="flex-1 flex flex-col">
        {isMobile && (
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold">Cocoon AI</h1>
            <div className="w-8" />
          </div>
        )}

        <main className="flex-1 p-6 overflow-y-auto">
          {activePage === 'welcome' && (
            <WelcomePageSection 
              onNavigate={handleNavigation}
              onOpenModal={setActiveModal}
            />
          )}
          {activePage === 'chat' && <ChatPageSection />}
          {activePage === 'resources' && (
            <ResourcesPageSection
              folders={folders}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onOpenNewFolder={() => setShowNewFolderModal(true)}
              onOpenNewItem={() => setShowNewItemModal(true)}
            />
          )}
          {activePage === 'workspace' && <WorkspacePage />}
          {activePage === 'creations' && (
            <CreationsSection 
              folders={folders}
              onExecuteButton={() => {}} 
            />
          )}
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
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Section Monétisation en développement</p>
                    <p className="text-sm">Outils de revenus bientôt disponibles</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activePage === 'onboarding' && <OnboardingDataSection />}
          {activePage === 'settings' && <SettingsSection />}
        </main>
      </div>

      <DashboardModals
        activeModal={activeModal}
        onCloseModal={() => setActiveModal(null)}
        scriptTopic={scriptTopic}
        onScriptTopicChange={setScriptTopic}
        isGenerating={isGenerating}
        onGenerateScript={generateScript}
        showNewFolderModal={showNewFolderModal}
        newFolder={newFolder}
        onNewFolderChange={(field, value) => setNewFolder(prev => ({ ...prev, [field]: value }))}
        onAddFolder={addFolder}
        onCloseNewFolderModal={() => setShowNewFolderModal(false)}
        showNewItemModal={showNewItemModal}
        newItemData={newItemData}
        onNewItemChange={(field, value) => setNewItemData(prev => ({ ...prev, [field]: value }))}
        onFileUpload={handleFileUpload}
        onAddItem={addItem}
        onCloseNewItemModal={() => setShowNewItemModal(false)}
        generatedContent={generatedContent}
      />
    </div>
  );
};

export default Dashboard;
