// src/pages/Dashboard.tsx
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
  ExternalLink
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
      { id: '3', name: 'Mon Profil', emoji: '👤', items: [] },
      { id: '4', name: 'Mes Objectifs', emoji: '🎯', items: [] },
      { id: '5', name: 'Mon Business', emoji: '🏢', items: [] },
      { id: '6', name: 'Mes Plateformes', emoji: '📱', items: [] },
      { id: '7', name: 'Mes Défis', emoji: '⚡', items: [] }
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

  // Fonction pour auto-classer les données d'onboarding
  const autoClassifyOnboardingData = () => {
    if (!onboardingData || folders.personal.some(folder => folder.items.length > 0)) {
      return; // Déjà classé ou pas de données
    }

    const updatedFolders = { ...folders };

    // Classer dans "Mon Profil"
    const profileItems = [];
    if (onboardingData.experienceLevel) {
      profileItems.push({
        id: 'profile_experience',
        name: 'Niveau d\'expérience',
        type: 'text',
        content: onboardingData.experienceLevel,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.niche) {
      profileItems.push({
        id: 'profile_niche',
        name: 'Ma niche',
        type: 'text',
        content: onboardingData.niche,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.targetGeneration) {
      profileItems.push({
        id: 'profile_audience',
        name: 'Audience cible',
        type: 'text',
        content: onboardingData.targetGeneration,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }

    // Classer dans "Mes Objectifs"
    const objectiveItems = [];
    if (onboardingData.contentGoal) {
      objectiveItems.push({
        id: 'obj_content_goal',
        name: 'Objectif de contenu',
        type: 'text',
        content: onboardingData.contentGoal,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.monetization) {
      objectiveItems.push({
        id: 'obj_monetization',
        name: 'Stratégie de monétisation',
        type: 'text',
        content: onboardingData.monetization,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.timeAvailable) {
      objectiveItems.push({
        id: 'obj_time',
        name: 'Temps disponible',
        type: 'text',
        content: onboardingData.timeAvailable,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }

    // Classer dans "Mon Business"
    const businessItems = [];
    if (onboardingData.businessType) {
      businessItems.push({
        id: 'biz_type',
        name: 'Type de business',
        type: 'text',
        content: onboardingData.businessType,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.businessDescription) {
      businessItems.push({
        id: 'biz_desc',
        name: 'Description du business',
        type: 'text',
        content: onboardingData.businessDescription,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.city && onboardingData.country) {
      businessItems.push({
        id: 'biz_location',
        name: 'Localisation',
        type: 'text',
        content: `${onboardingData.city}, ${onboardingData.country}`,
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }

    // Classer dans "Mes Plateformes"
    const platformItems = [];
    if (onboardingData.platforms && onboardingData.platforms.length > 0) {
      platformItems.push({
        id: 'platforms_list',
        name: 'Plateformes utilisées',
        type: 'text',
        content: onboardingData.platforms.join(', '),
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.contentTypes && onboardingData.contentTypes.length > 0) {
      platformItems.push({
        id: 'content_types',
        name: 'Types de contenu',
        type: 'text',
        content: onboardingData.contentTypes.join(', '),
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }

    // Classer dans "Mes Défis"
    const challengeItems = [];
    if (onboardingData.contentChallenges && onboardingData.contentChallenges.length > 0) {
      challengeItems.push({
        id: 'challenges_list',
        name: 'Défis de création de contenu',
        type: 'text',
        content: onboardingData.contentChallenges.join(', '),
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }
    if (onboardingData.equipmentOwned && onboardingData.equipmentOwned.length > 0) {
      challengeItems.push({
        id: 'equipment_owned',
        name: 'Équipement possédé',
        type: 'text',
        content: onboardingData.equipmentOwned.join(', '),
        createdAt: new Date().toISOString(),
        source: 'onboarding'
      });
    }

    // Mettre à jour les dossiers avec les items
    updatedFolders.personal = updatedFolders.personal.map(folder => {
      if (folder.id === '3') return { ...folder, items: profileItems };
      if (folder.id === '4') return { ...folder, items: objectiveItems };
      if (folder.id === '5') return { ...folder, items: businessItems };
      if (folder.id === '6') return { ...folder, items: platformItems };
      if (folder.id === '7') return { ...folder, items: challengeItems };
      return folder;
    });

    setFolders(updatedFolders);

    if (profileItems.length > 0 || objectiveItems.length > 0 || businessItems.length > 0) {
      toast({
        title: "🎯 Données organisées",
        description: "Vos informations d'onboarding ont été automatiquement classées dans vos dossiers personnels."
      });
    }
  };

  // Auto-classer au chargement
  useEffect(() => {
    if (onboardingData && Object.keys(onboardingData).length > 0) {
      autoClassifyOnboardingData();
    }
  }, [onboardingData]);

  // Fonction pour obtenir l'icône selon le type de fichier
  const getFileIcon = (type, fileName = '') => {
    if (type === 'file') {
      const extension = fileName.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return <Image className="h-4 w-4 text-blue-500" />;
      if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) return <Video className="h-4 w-4 text-red-500" />;
      if (['mp3', 'wav', 'flac'].includes(extension)) return <Music className="h-4 w-4 text-purple-500" />;
      if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) return <FileText className="h-4 w-4 text-green-500" />;
    }
    if (type === 'link') return <ExternalLink className="h-4 w-4 text-blue-500" />;
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  // Fonction pour obtenir l'aperçu du fichier
  const getFilePreview = (item) => {
    if (item.type === 'text') {
      return item.content.length > 100 ? item.content.substring(0, 100) + '...' : item.content;
    }
    if (item.type === 'link') {
      return item.url;
    }
    if (item.type === 'file' && item.file) {
      return `Fichier: ${item.file.name} (${(item.file.size / 1024).toFixed(1)} KB)`;
    }
    return 'Aucun aperçu disponible';
  };

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
      console.log('🤖 Prompt final envoyé à l\'IA:', contextualPrompt);
      
      // Simulation de génération (remplace par ton appel API réel)
      setTimeout(() => {
        const generatedContent = `✨ Contenu généré par "${buttonData.name}":\n\n` +
          `Prompt utilisé: ${finalPrompt}\n\n` +
          `Paramètres:\n${Object.entries(placeholderValues).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n` +
          `Ressources utilisées: ${buttonData.connectedFolders.length} dossier(s)\n\n` +
          `[Ici serait le contenu généré par l\'IA basé sur ton prompt et tes ressources]`;
        
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
      description: "L'élément a été retiré du dossier."
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
          <Badge variant="secondary" className="ml-1">
            {folders.personal.reduce((acc, folder) => acc + folder.items.length, 0)}
          </Badge>
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
              {/* Aperçu des éléments */}
              {folder.items.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {folder.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {getFileIcon(item.type, item.file?.name)}
                        <span className="truncate">{item.name}</span>
                        {item.source === 'onboarding' && (
                          <Badge variant="secondary" className="text-xs">Auto</Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => {
                            setSelectedFile(item);
                            setShowFilePreviewModal(true);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => deleteItem(folder.id, item.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {folder.items.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{folder.items.length - 3} autres éléments
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Dossier vide</p>
                </div>
              )}
              
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

      {/* Modal Aperçu Fichier */}
      {showFilePreviewModal && selectedFile && (
        <Dialog open={true} onOpenChange={setShowFilePreviewModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getFileIcon(selectedFile.type, selectedFile.file?.name)}
                {selectedFile.name}
                {selectedFile.source === 'onboarding' && (
                  <Badge variant="secondary">Onboarding</Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Informations du fichier */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {selectedFile.type}
                </div>
                <div>
                  <span className="font-medium">Créé le:</span> {new Date(selectedFile.createdAt).toLocaleDateString()}
                </div>
                {selectedFile.file && (
                  <>
                    <div>
                      <span className="font-medium">Taille:</span> {(selectedFile.file.size / 1024).toFixed(1)} KB
                    </div>
                    <div>
                      <span className="font-medium">Type de fichier:</span> {selectedFile.file.type || 'Non spécifié'}
                    </div>
                  </>
                )}
              </div>
              
              {/* Aperçu du contenu */}
              <div>
                <Label>Aperçu:</Label>
                <div className="bg-gray-50 p-4 rounded-lg text-sm max-h-60 overflow-y-auto">
                  {selectedFile.type === 'text' && (
                    <p>{selectedFile.content}</p>
                  )}
                  {selectedFile.type === 'link' && (
                    <div>
                      <p className="mb-2">Lien externe:</p>
                      <a href={selectedFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        {selectedFile.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  {selectedFile.type === 'file' && (
                    <div>
                      <p className="mb-2">Fichier uploadé:</p>
                      <div className="flex items-center gap-2 p-2 bg-white rounded border">
                        {getFileIcon(selectedFile.type, selectedFile.file?.name)}
                        <span>{selectedFile.file?.name}</span>
                      </div>
                      {selectedFile.file?.type?.startsWith('image/') && (
                        <div className="mt-2">
                          <img 
                            src={URL.createObjectURL(selectedFile.file)} 
                            alt={selectedFile.name}
                            className="max-w-full h-auto rounded border"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowFilePreviewModal(false)}>
                  Fermer
                </Button>
                {selectedFile.type === 'link' && (
                  <Button onClick={() => window.open(selectedFile.url, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ouvrir le lien
                  </Button>
                )}
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
                  {newItemData.file && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      Fichier sélectionné: {newItemData.file.name}
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