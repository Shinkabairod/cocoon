
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, Folder, Sparkles, DollarSign, Settings } from 'lucide-react';

// Import refactored components
import SidebarContent from '@/components/dashboard/DashboardSidebar';
import WelcomePage from '@/components/dashboard/WelcomePage';
import ChatModal from '@/components/dashboard/ChatModal';
import ScriptModal from '@/components/dashboard/ScriptModal';
import LoadingSkeleton from '@/components/dashboard/LoadingSkeleton';
import MobileHeader from '@/components/dashboard/MobileHeader';

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

  // Actions IA fonctionnelles
  const handleChatIA = async () => {
    if (!chatInput.trim()) return;
    
    setIsGenerating(true);
    const userMessage = chatInput;
    setChatInput('');
    
    setChatMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    try {
      const response = await huggingfaceService.askQuestion(user?.id || '', userMessage);
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
      const response = await huggingfaceService.generateScript(user?.id || '', scriptTopic);
      setGeneratedContent(response.script || response);
      
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

  // Rendu des pages
  const renderActivePage = () => {
    switch (activePage) {
      case 'welcome':
        return <WelcomePage user={user} stats={userStats} onAction={setActiveModal} />;
      case 'resources':
        return (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Mes Ressources</h2>
            <div className="text-center py-12">
              <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Fonctionnalité de ressources en développement</p>
            </div>
          </div>
        );
      case 'creation':
        return (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Mes Créations</h2>
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Fonctionnalité de création en développement</p>
            </div>
          </div>
        );
      case 'monetization':
        return (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Mon Bot IA</h2>
            <div className="text-center py-12">
              <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Fonctionnalité de monétisation en développement</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Réglages</h2>
            <div className="text-center py-12">
              <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Paramètres en cours de développement</p>
            </div>
          </div>
        );
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
          <MobileHeader onMenuClick={() => setSidebarOpen(true)} user={user} />
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

export default Dashboard;
