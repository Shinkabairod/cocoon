// src/components/dashboard/CreationsSection.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit3, Trash2, Play, Settings, Folder, Sparkles, MessageSquare, FileText, Video, Image, Mic, FolderOpen, Eye, Copy, Lightbulb, MoreHorizontal } from 'lucide-react';

// Interface pour les boutons personnalisés
interface CustomButton {
  id: string;
  name: string;
  emoji: string;
  color: string;
  prompt: string;
  placeholders: Array<{
    id: string;
    name: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
  }>;
  connectedFolders: string[];
  description?: string;
}

// Interface pour les dossiers (venant de ton système de ressources)
interface Folder {
  id: string;
  name: string;
  emoji: string;
  items: any[];
}
interface CreationsSectionProps {
  folders: {
    resources: Folder[];
    personal: Folder[];
  };
  onExecuteButton: (buttonData: CustomButton, placeholderValues: Record<string, any>) => void;
}
const CreationsSection: React.FC<CreationsSectionProps> = ({
  folders,
  onExecuteButton
}) => {
  const {
    toast
  } = useToast();

  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('buttons'); // 'buttons' ou 'generated'

  // États pour les boutons personnalisés
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([{
    id: '1',
    name: 'Générer Script Vidéo',
    emoji: '🎬',
    color: 'bg-blue-500',
    prompt: 'Crée un script vidéo engageant sur le sujet suivant : {sujet}. La durée doit être de {duree} minutes, pour une audience {audience}.',
    placeholders: [{
      id: 'sujet',
      name: 'Sujet de la vidéo',
      type: 'text'
    }, {
      id: 'duree',
      name: 'Durée (minutes)',
      type: 'number'
    }, {
      id: 'audience',
      name: 'Type d\'audience',
      type: 'select',
      options: ['Débutant', 'Intermédiaire', 'Expert']
    }],
    connectedFolders: ['1', '3'],
    description: 'Génère des scripts vidéo personnalisés'
  }, {
    id: '2',
    name: 'Idées de Contenu',
    emoji: '💡',
    color: 'bg-purple-500',
    prompt: 'Propose 5 idées de contenu créatives pour {plateforme} sur le thème {theme}, adaptées à mon profil créateur.',
    placeholders: [{
      id: 'plateforme',
      name: 'Plateforme',
      type: 'select',
      options: ['YouTube', 'TikTok', 'Instagram', 'LinkedIn']
    }, {
      id: 'theme',
      name: 'Thème',
      type: 'text'
    }],
    connectedFolders: ['4'],
    description: 'Génère des idées de contenu adaptées'
  }]);

  // États pour les contenus générés
  const [generatedContents, setGeneratedContents] = useState([{
    id: '1',
    title: 'Script YouTube - Marketing Digital',
    content: 'Bonjour et bienvenue dans cette vidéo sur le marketing digital...',
    type: 'script',
    buttonUsed: 'Générer Script Vidéo',
    createdAt: new Date().toISOString(),
    folderId: null
  }, {
    id: '2',
    title: 'Idées de contenu - TikTok',
    content: '1. Tendance danse + produit\n2. Before/After transformation\n3. Tutorial express...',
    type: 'ideas',
    buttonUsed: 'Idées de Contenu',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    folderId: null
  }]);

  // États pour les dossiers de contenu généré
  const [contentFolders, setContentFolders] = useState([{
    id: 'folder1',
    name: 'Scripts Vidéos',
    emoji: '🎬',
    color: 'bg-blue-500'
  }, {
    id: 'folder2',
    name: 'Idées de Contenu',
    emoji: '💡',
    color: 'bg-purple-500'
  }, {
    id: 'folder3',
    name: 'Brouillons',
    emoji: '📝',
    color: 'bg-gray-500'
  }]);

  // États pour les modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showMoveContentModal, setShowMoveContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // État pour créer un dossier de contenu
  const [newContentFolder, setNewContentFolder] = useState({
    name: '',
    emoji: '📁',
    color: 'bg-blue-500'
  });

  // Couleurs disponibles pour les boutons
  const availableColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500', 'bg-lime-500', 'bg-rose-500'];

  // Emojis populaires
  const popularEmojis = ['✨', '🎬', '💡', '📝', '🎨', '🎯', '🚀', '⭐', '🔥', '💪', '🎉', '📊', '🎵', '📷', '🎥', '📱', '💻', '🌟', '⚡', '🌈', '🎁', '🔧', '📈', '💰'];

  // Fonction pour créer un dossier de contenu
  const handleCreateContentFolder = () => {
    if (!newContentFolder.name.trim()) {
      toast({
        title: "❌ Erreur",
        description: "Le nom du dossier est obligatoire."
      });
      return;
    }
    const folder = {
      id: `folder_${Date.now()}`,
      name: newContentFolder.name,
      emoji: newContentFolder.emoji,
      color: newContentFolder.color
    };
    setContentFolders(prev => [...prev, folder]);
    setNewContentFolder({
      name: '',
      emoji: '📁',
      color: 'bg-blue-500'
    });
    setShowCreateFolderModal(false);
    toast({
      title: "✅ Dossier créé",
      description: `"${folder.emoji} ${folder.name}" a été créé.`
    });
  };

  // Fonction pour déplacer un contenu vers un dossier
  const handleMoveContent = (folderId: string | null) => {
    if (!selectedContent) return;
    setGeneratedContents(prev => prev.map(content => content.id === selectedContent.id ? {
      ...content,
      folderId
    } : content));
    const folderName = folderId ? contentFolders.find(f => f.id === folderId)?.name || 'Dossier' : 'Non classé';
    setShowMoveContentModal(false);
    setSelectedContent(null);
    toast({
      title: "✅ Contenu déplacé",
      description: `Déplacé vers "${folderName}"`
    });
  };

  // Fonction pour supprimer un contenu généré
  const handleDeleteContent = (contentId: string) => {
    setGeneratedContents(prev => prev.filter(content => content.id !== contentId));
    toast({
      title: "🗑️ Contenu supprimé",
      description: "Le contenu a été supprimé."
    });
  };

  // Fonction pour dupliquer un contenu
  const handleDuplicateContent = (content: any) => {
    const duplicated = {
      ...content,
      id: Date.now().toString(),
      title: `${content.title} (Copie)`,
      createdAt: new Date().toISOString()
    };
    setGeneratedContents(prev => [duplicated, ...prev]);
    toast({
      title: "📋 Contenu dupliqué",
      description: "Une copie a été créée."
    });
  };

  // Filtrer les contenus par dossier
  const getContentsByFolder = (folderId: string | null) => {
    return generatedContents.filter(content => content.folderId === folderId);
  };

  // Obtenir l'icône selon le type de contenu
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'script':
        return <FileText className="h-4 w-4" />;
      case 'ideas':
        return <Lightbulb className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Récupérer tous les dossiers disponibles
  const allFolders = [...folders.resources, ...folders.personal];
  return <div className="space-y-6">
      {/* Header avec onglets */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold flex items-center gap-2 text-violet-600 text-5xl">
            <Sparkles className="h-6 w-6" />
            Mes Créations
          </h2>
          <p className="text-muted-foreground">
            Créez et gérez vos boutons d'IA et contenus générés
          </p>
        </div>
        
        <div className="flex gap-2">
          {activeTab === 'buttons' && <Button className="bg-purple-600 hover:bg-purple-500">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Bouton
            </Button>}
          
          {activeTab === 'generated' && <Button onClick={() => setShowCreateFolderModal(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Dossier
            </Button>}
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
        <Button variant={activeTab === 'buttons' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('buttons')} className="gap-2">
          <Settings className="h-4 w-4" />
          Boutons IA
          <Badge variant="secondary" className="ml-1">
            {customButtons.length}
          </Badge>
        </Button>
        <Button variant={activeTab === 'generated' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('generated')} className="gap-2">
          <FileText className="h-4 w-4" />
          Contenus Générés
          <Badge variant="secondary" className="ml-1">
            {generatedContents.length}
          </Badge>
        </Button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'buttons' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customButtons.map(button => <Card key={button.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${button.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {button.emoji}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{button.name}</CardTitle>
                      {button.description && <p className="text-sm text-muted-foreground">{button.description}</p>}
                    </div>
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Informations sur le bouton */}
                <div className="space-y-2 mb-4">
                  {button.placeholders.length > 0 && <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Settings className="h-3 w-3" />
                      {button.placeholders.length} paramètre(s)
                    </div>}
                  
                  {button.connectedFolders.length > 0 && <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Folder className="h-3 w-3" />
                      {button.connectedFolders.length} dossier(s) connecté(s)
                    </div>}
                </div>

                {/* Dossiers connectés */}
                {button.connectedFolders.length > 0 && <div className="flex flex-wrap gap-1 mb-3">
                    {button.connectedFolders.map(folderId => {
              const folder = allFolders.find(f => f.id === folderId);
              return folder ? <Badge key={folderId} variant="secondary" className="text-xs">
                          {folder.emoji} {folder.name}
                        </Badge> : null;
            })}
                  </div>}
                
                {/* Bouton d'exécution */}
                <Button className={`w-full ${button.color} hover:opacity-90`}>
                  <Play className="h-4 w-4 mr-2" />
                  Lancer
                </Button>
              </CardContent>
            </Card>)}
        </div>}

      {activeTab === 'generated' && <div className="space-y-6">
          {/* Dossiers de contenu */}
          {contentFolders.map(folder => {
        const folderContents = getContentsByFolder(folder.id);
        return <Card key={folder.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${folder.color} rounded-lg flex items-center justify-center text-white`}>
                      {folder.emoji}
                    </div>
                    <span>{folder.name}</span>
                    <Badge variant="secondary">
                      {folderContents.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {folderContents.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {folderContents.map(content => <Card key={content.id} className="group hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                {getContentIcon(content.type)}
                                <div>
                                  <CardTitle className="text-sm">{content.title}</CardTitle>
                                  <p className="text-xs text-muted-foreground">
                                    via {content.buttonUsed}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost" onClick={() => {
                        setSelectedContent(content);
                        setShowMoveContentModal(true);
                      }}>
                                  <FolderOpen className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDuplicateContent(content)}>
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDeleteContent(content.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {content.content}
                            </p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs text-muted-foreground">
                                {new Date(content.createdAt).toLocaleDateString()}
                              </span>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                Voir
                              </Button>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div> : <div className="text-center py-8 text-muted-foreground">
                      <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Aucun contenu dans ce dossier</p>
                    </div>}
                </CardContent>
              </Card>;
      })}

          {/* Contenus sans dossier */}
          {getContentsByFolder(null).length > 0 && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <span>Non classés</span>
                  <Badge variant="outline">
                    {getContentsByFolder(null).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getContentsByFolder(null).map(content => <Card key={content.id} className="group hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getContentIcon(content.type)}
                            <div>
                              <CardTitle className="text-sm">{content.title}</CardTitle>
                              <p className="text-xs text-muted-foreground">
                                via {content.buttonUsed}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" onClick={() => {
                      setSelectedContent(content);
                      setShowMoveContentModal(true);
                    }}>
                              <FolderOpen className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDuplicateContent(content)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteContent(content.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {content.content}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.createdAt).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Voir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </CardContent>
            </Card>}
        </div>}

      {/* Modal Créer Dossier de Contenu */}
      {showCreateFolderModal && <Dialog open={true} onOpenChange={setShowCreateFolderModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un dossier de contenu</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="folderName">Nom du dossier</Label>
                <Input id="folderName" placeholder="Ex: Mes scripts YouTube" value={newContentFolder.name} onChange={e => setNewContentFolder(prev => ({
              ...prev,
              name: e.target.value
            }))} />
              </div>
              
              <div>
                <Label>Emoji</Label>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {popularEmojis.map(emoji => <Button key={emoji} variant={newContentFolder.emoji === emoji ? "default" : "outline"} size="sm" onClick={() => setNewContentFolder(prev => ({
                ...prev,
                emoji
              }))} className="h-10 w-10 p-0">
                      {emoji}
                    </Button>)}
                </div>
              </div>

              <div>
                <Label>Couleur</Label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {availableColors.map(color => <Button key={color} variant="outline" size="sm" onClick={() => setNewContentFolder(prev => ({
                ...prev,
                color
              }))} className={`h-10 w-10 p-0 ${color} ${newContentFolder.color === color ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`} />)}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateFolderModal(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateContentFolder}>
                  Créer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>}

      {/* Modal Déplacer Contenu */}
      {showMoveContentModal && selectedContent && <Dialog open={true} onOpenChange={setShowMoveContentModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Déplacer "{selectedContent.title}"</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" onClick={() => handleMoveContent(null)} className="justify-start h-auto p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <span>Non classé</span>
                  </div>
                </Button>
                
                {contentFolders.map(folder => <Button key={folder.id} variant="outline" onClick={() => handleMoveContent(folder.id)} className="justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${folder.color} rounded-lg flex items-center justify-center text-white`}>
                        {folder.emoji}
                      </div>
                      <span>{folder.name}</span>
                    </div>
                  </Button>)}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMoveContentModal(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>}
    </div>;
};
export default CreationsSection;