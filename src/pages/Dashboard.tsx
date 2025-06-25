// src/pages/Dashboard.tsx
// CODE COMPLET 100% À JOUR avec toutes les modifications demandées

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
  Save,
  ChevronRight,
  Crown,
  PlayCircle
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

  // Fonctions d'action
  const handleChatIA = async () => {
    if (!chatInput.trim()) return;
    
    setIsGenerating(true);
    setChatMessages(prev => [...prev, { type: 'user', content: chatInput }]);
    
    try {
      const response = await huggingfaceService.askQuestion(user?.id || '', chatInput);
      setChatMessages(prev => [...prev, { type: 'ai', content: response.answer }]);
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
      const response = await huggingfaceService.generateScript(user?.id || '', scriptTopic);
      setGeneratedContent(response.script);
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

  const handleFileUpload = async (files: FileList) => {
    setUploadingFiles(true);
    try {
      for (const file of Array.from(files)) {
        // Logique d'upload des fichiers
        console.log('Uploading file:', file.name);
      }
      toast({
        title: "✅ Fichiers uploadés",
        description: `${files.length} fichier(s) ajouté(s) avec succès`
      });
      refetch();
    } catch (error) {
      toast({
        title: "❌ Erreur d'upload",
        description: "Impossible d'uploader les fichiers",
        variant: "destructive"
      });
    } finally {
      setUploadingFiles(false);
    }
  };

  // SECTION WELCOME AMÉLIORÉE - SANS Chat/Script + Boutons cliquables
  const renderWelcomePage = () => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gem';

    // Prochaines étapes avec boutons cliquables
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
        {/* En-tête de bienvenue - SANS les boutons Chat/Script */}
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
              <div className="text-2xl font-bold text-blue-700">{userStats?.conversations || 0}</div>
              <div className="text-sm text-gray-600">Conversations IA</div>
              <div className="text-xs text-green-600 mt-1">0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <Folder className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700">{userStats?.resources || 0}</div>
              <div className="text-sm text-gray-600">Ressources</div>
              <div className="text-xs text-green-600 mt-1">0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-700">{userStats?.transformations || 0}</div>
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

  // Page Ressources
  const renderResourcesPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Ressources</h2>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Ajouter des fichiers
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Aucun document uploadé</p>
            <Button variant="outline" className="mt-2 w-full">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Aucune image uploadée</p>
            <Button variant="outline" className="mt-2 w-full">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2" />
              Vidéos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Aucune vidéo uploadée</p>
            <Button variant="outline" className="mt-2 w-full">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Page Créations
  const renderCreationPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Créations</h2>
        <div className="space-x-2">
          <Button onClick={() => setActiveModal('chat')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat IA
          </Button>
          <Button onClick={() => setActiveModal('script')}>
            <Sparkles className="h-4 w-4 mr-2" />
            Nouveau Script
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-dashed border-2 border-gray-300 flex items-center justify-center h-48">
          <div className="text-center">
            <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Créez votre premier contenu</p>
            <Button variant="outline" className="mt-2" onClick={() => setActiveModal('script')}>
              Commencer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  // Page Monétisation
  const renderMonetizationPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold">Mon Bot IA</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuration de votre assistant IA</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">
            Configurez votre assistant IA personnalisé pour partager vos connaissances et générer des revenus.
          </p>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configurer l'assistant
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Page Réglages
  const renderSettingsPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold">Réglages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="h-5 w-5 mr-2 text-purple-600" />
              Abonnement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gérez votre abonnement et accédez aux fonctionnalités premium.</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Crown className="h-4 w-4 mr-2" />
              Passer à Pro
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Configurez vos préférences et paramètres de compte.</p>
            <Button variant="outline">
              Modifier les paramètres
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Fonction de rendu des pages
  const renderActivePage = () => {
    switch (activePage) {
      case 'welcome':
        return renderWelcomePage();
      case 'resources':
        return renderResourcesPage();
      case 'creation':
        return renderCreationPage();
      case 'monetization':
        return renderMonetizationPage();
      case 'settings':
        return renderSettingsPage();
      default:
        return renderWelcomePage();
    }
  };

  // Composant Sidebar SANS PROFIL + Version Pro cliquable
  const SidebarContent: React.FC<{
    navigation: any[];
    activePage: string;
    setActivePage: (page: string) => void;
    user: any;
    stats: any;
    isMobile?: boolean;
    onClose?: () => void;
  }> = ({ navigation, activePage, setActivePage, user, stats, isMobile = false, onClose }) => (
    <>
      {/* En-tête simplifié SANS profil utilisateur */}
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

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                if (isMobile && onClose) onClose();
              }}
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

      {/* Version Pro - CLIQUABLE pour aller aux réglages */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-2 text-purple-600 hover:bg-purple-50"
          onClick={() => {
            setActivePage('settings');
            if (isMobile && onClose) onClose();
          }}
        >
          <Crown className="h-4 w-4" />
          <span>Version Pro</span>
        </Button>
        <p className="text-xs text-gray-500 mt-1 px-2">
          Toutes les fonctionnalités débloquées
        </p>
      </div>
    </>
  );

  // Modales
  const ChatModal = ({ open, onClose, chatInput, setChatInput, chatMessages, isGenerating, onSend }: any) => (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat avec l'IA</DialogTitle>
          <DialogDescription>Posez vos questions sur la création de contenu</DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {chatMessages.map((message: any, index: number) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Tapez votre question..."
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
          />
          <Button onClick={onSend} disabled={isGenerating}>
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ScriptModal = ({ open, onClose, scriptTopic, setScriptTopic, generatedContent, isGenerating, onGenerate }: any) => (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Générateur de Script</DialogTitle>
          <DialogDescription>Créez un script personnalisé pour vos vidéos</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Textarea
            value={scriptTopic}
            onChange={(e) => setScriptTopic(e.target.value)}
            placeholder="Décrivez le sujet de votre vidéo..."
            rows={3}
          />
          <Button onClick={onGenerate} disabled={isGenerating} className="w-full">
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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="h-screen bg-gray-50 flex">
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
          <div className="fixed in