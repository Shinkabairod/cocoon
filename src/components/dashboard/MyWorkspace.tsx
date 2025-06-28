
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkspace } from '@/hooks/useWorkspace';
import { WorkspaceFile } from '@/services/workspaceService';
import { useToast } from '@/hooks/use-toast';
import { 
  FolderOpen, FileText, Search, Filter, Plus, 
  MoreHorizontal, Edit, Trash2, FolderPlus, Eye, Move,
  User, Target, Building, Smartphone, Zap, Save, X,
  File, Video, Image, Loader2
} from 'lucide-react';

const MyWorkspace = () => {
  const {
    folders,
    loading,
    addFolder,
    deleteFolder,
    toggleFolder,
    addFile,
    updateFile,
    deleteFile,
    moveFile,
    getFilteredFolders,
    getStats
  } = useWorkspace();

  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedFile, setSelectedFile] = useState<WorkspaceFile | null>(null);
  
  // Modales
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [isNewFileOpen, setIsNewFileOpen] = useState(false);
  const [isMoveFileOpen, setIsMoveFileOpen] = useState(false);
  
  // Données formulaires
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderEmoji, setNewFolderEmoji] = useState('📁');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [fileToMove, setFileToMove] = useState<WorkspaceFile | null>(null);

  // Affichage du loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement de votre workspace...</p>
        </div>
      </div>
    );
  }

  // Actions
  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;
    
    addFolder(newFolderName, newFolderEmoji, activeTab as 'personal' | 'resources');
    setNewFolderName('');
    setNewFolderEmoji('📁');
    setIsNewFolderOpen(false);
  };

  const handleAddFile = async () => {
    if (!newFileName.trim() || !selectedFolderId) return;
    
    const success = await addFile(newFileName, newFileContent, selectedFolderId);
    if (success) {
      setNewFileName('');
      setNewFileContent('');
      setSelectedFolderId('');
      setIsNewFileOpen(false);
    }
  };

  const handleMoveFile = () => {
    if (!fileToMove || !selectedFolderId) return;
    
    moveFile(fileToMove.id, selectedFolderId);
    setFileToMove(null);
    setSelectedFolderId('');
    setIsMoveFileOpen(false);
  };

  const handleSaveFile = async () => {
    if (!selectedFile || !selectedFile.content) return;
    await updateFile(selectedFile.id, selectedFile.content);
  };

  // Données filtrées
  const filteredFolders = getFilteredFolders(activeTab as 'personal' | 'resources', searchQuery);
  const stats = getStats();

  // Icône selon le type de fichier
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <File className="h-4 w-4 text-red-500" />;
      case 'video': return <Video className="h-4 w-4 text-blue-500" />;
      case 'image': return <Image className="h-4 w-4 text-green-500" />;
      case 'link': return <FolderOpen className="h-4 w-4 text-purple-500" />;
      case 'onboarding': return <User className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FolderOpen className="h-6 w-6" />
            My Workspace
          </h2>
          <p className="text-muted-foreground">
            Organisez vos contenus, notes, liens et ressources
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isNewFolderOpen} onOpenChange={setIsNewFolderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 mr-2" />
                Nouveau Dossier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouveau dossier</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder-name">Nom du dossier</Label>
                  <Input
                    id="folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Ex: Mes Templates"
                  />
                </div>
                <div>
                  <Label htmlFor="folder-emoji">Emoji</Label>
                  <Input
                    id="folder-emoji"
                    value={newFolderEmoji}
                    onChange={(e) => setNewFolderEmoji(e.target.value)}
                    placeholder="📁"
                    maxLength={2}
                  />
                </div>
                <Button onClick={handleAddFolder} className="w-full">
                  Créer le dossier
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewFileOpen} onOpenChange={setIsNewFileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Fichier
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un nouveau fichier</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-name">Nom du fichier</Label>
                  <Input
                    id="file-name"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="Ex: Mon Script Vidéo"
                  />
                </div>
                <div>
                  <Label htmlFor="folder-select">Dossier de destination</Label>
                  <Select value={selectedFolderId} onValueChange={setSelectedFolderId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un dossier" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.filter(f => f.type === activeTab).map(folder => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.emoji} {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file-content">Contenu</Label>
                  <Textarea
                    id="file-content"
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    placeholder="Tapez le contenu de votre fichier..."
                    rows={6}
                  />
                </div>
                <Button onClick={handleAddFile} className="w-full">
                  Créer le fichier
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans vos fichiers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Dossiers</p>
                <p className="text-2xl font-bold">{stats.totalFolders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Fichiers</p>
                <p className="text-2xl font-bold">{stats.totalFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Personnel</p>
                <p className="text-2xl font-bold">{stats.personalFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Ressources</p>
                <p className="text-2xl font-bold">{stats.resourceFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Personal/Resources */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Target className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des dossiers */}
            <div className="lg:col-span-1">
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle className="text-lg">Dossiers Personnels</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto px-4">
                    {filteredFolders.map(folder => (
                      <div key={folder.id} className="mb-2">
                        <div 
                          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer group"
                          onClick={() => toggleFolder(folder.id)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{folder.emoji}</span>
                            <span className="font-medium">{folder.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {folder.files.length}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFolder(folder.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {folder.isExpanded && (
                          <div className="ml-6 border-l border-muted pl-4">
                            {folder.files.map(file => (
                              <div 
                                key={file.id}
                                className="flex items-center justify-between p-2 hover:bg-muted/30 rounded cursor-pointer group"
                                onClick={() => setSelectedFile(file)}
                              >
                                <div className="flex items-center gap-2">
                                  {getFileIcon(file.type)}
                                  <span className="text-sm">{file.name}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFileToMove(file);
                                      setIsMoveFileOpen(true);
                                    }}
                                  >
                                    <Move className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteFile(file.id);
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Éditeur de fichier */}
            <div className="lg:col-span-2">
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>
                      {selectedFile ? (
                        <>
                          {getFileIcon(selectedFile.type)}
                          <span className="ml-2">{selectedFile.name}</span>
                        </>
                      ) : (
                        'Sélectionnez un fichier'
                      )}
                    </span>
                    {selectedFile && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveFile()}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Sauvegarder
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? (
                    <div className="h-[350px]">
                      <Textarea
                        value={selectedFile.content || ''}
                        onChange={(e) => {
                          const updatedFile = { ...selectedFile, content: e.target.value };
                          setSelectedFile(updatedFile);
                        }}
                        className="h-full resize-none"
                        placeholder="Contenu du fichier..."
                      />
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Dernière modification: {selectedFile.lastModified}</span>
                        <span>{selectedFile.content?.length || 0} caractères</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Sélectionnez un fichier pour commencer à l'éditer</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="text-center py-8">
            <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Ressources externes</h3>
            <p className="text-muted-foreground mb-4">
              Ajoutez vos PDFs, vidéos, images et liens utiles
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une ressource
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog pour déplacer un fichier */}
      <Dialog open={isMoveFileOpen} onOpenChange={setIsMoveFileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Déplacer le fichier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Déplacer "{fileToMove?.name}" vers :</p>
            <Select value={selectedFolderId} onValueChange={setSelectedFolderId}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un dossier" />
              </SelectTrigger>
              <SelectContent>
                {folders
                  .filter(f => f.type === activeTab && f.id !== fileToMove?.folderId)
                  .map(folder => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.emoji} {folder.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={handleMoveFile} className="flex-1">
                Déplacer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsMoveFileOpen(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyWorkspace;
