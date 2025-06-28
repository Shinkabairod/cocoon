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
import EmojiColorPicker from './EmojiColorPicker';
import { FolderOpen, FileText, Search, Filter, Link, Upload, Plus, MoreHorizontal, Edit, Trash2, FolderPlus, Eye, Move, User, Target, Building, Smartphone, Zap, Save, X, File, Video, Image, Loader2, RefreshCw } from 'lucide-react';
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
    refreshWorkspace
  } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedFile, setSelectedFile] = useState<WorkspaceFile | null>(null);

  // États de chargement pour les actions
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isDeletingFile, setIsDeletingFile] = useState<string | null>(null);
  const [isSavingFile, setIsSavingFile] = useState(false);
  const [isMovingFile, setIsMovingFile] = useState(false);

  // Modales
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [isNewFileOpen, setIsNewFileOpen] = useState(false);
  const [isMoveFileOpen, setIsMoveFileOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  // Données formulaires
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderEmoji, setNewFolderEmoji] = useState('📁');
  const [newFolderColor, setNewFolderColor] = useState('#3B82F6');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [fileToMove, setFileToMove] = useState<WorkspaceFile | null>(null);

  // Actions avec persistence
  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;
    setIsCreatingFolder(true);
    try {
      const success = await addFolder(newFolderName, newFolderEmoji, newFolderColor, activeTab as 'personal' | 'resources');
      if (success) {
        setNewFolderName('');
        setNewFolderEmoji('📁');
        setNewFolderColor('#3B82F6');
        setIsNewFolderOpen(false);
      }
    } finally {
      setIsCreatingFolder(false);
    }
  };
  const handleEmojiSelect = (emoji: string, color: string) => {
    setNewFolderEmoji(emoji);
    setNewFolderColor(color);
  };
  const handleAddFile = async () => {
    if (!newFileName.trim() || !selectedFolderId) return;
    setIsCreatingFile(true);
    try {
      const success = await addFile(newFileName, newFileContent, selectedFolderId);
      if (success) {
        setNewFileName('');
        setNewFileContent('');
        setSelectedFolderId('');
        setIsNewFileOpen(false);
      }
    } finally {
      setIsCreatingFile(false);
    }
  };
  const handleMoveFile = async () => {
    if (!fileToMove || !selectedFolderId) return;
    setIsMovingFile(true);
    try {
      const success = await moveFile(fileToMove.id, selectedFolderId);
      if (success) {
        setFileToMove(null);
        setSelectedFolderId('');
        setIsMoveFileOpen(false);
      }
    } finally {
      setIsMovingFile(false);
    }
  };
  const handleSaveFile = async () => {
    if (!selectedFile || !selectedFile.content) return;
    setIsSavingFile(true);
    try {
      await updateFile(selectedFile.id, selectedFile.content);
    } finally {
      setIsSavingFile(false);
    }
  };
  const handleDeleteFile = async (fileId: string) => {
    setIsDeletingFile(fileId);
    try {
      const success = await deleteFile(fileId);
      if (success && selectedFile?.id === fileId) {
        setSelectedFile(null);
      }
    } finally {
      setIsDeletingFile(null);
    }
  };
  const handleDeleteFolder = async (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder && folder.files.length > 0) {
      return; // Le hook gère déjà cette validation
    }
    await deleteFolder(folderId);
  };

  // Données filtrées
  const filteredFolders = getFilteredFolders(activeTab as 'personal' | 'resources', searchQuery);

  // Affichage du loading
  if (loading) {
    return <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement de votre workspace...</p>
        </div>
      </div>;
  }

  // Icône selon le type de fichier
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="h-4 w-4 text-red-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-blue-500" />;
      case 'image':
        return <Image className="h-4 w-4 text-green-500" />;
      case 'link':
        return <Link className="h-4 w-4 text-purple-500" />;
      case 'onboarding':
        return <User className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 font-bold text-violet-600 text-5xl">
            <FolderOpen className="h-6 w-6" />
            My Workspace
          </h2>
          
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={refreshWorkspace} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>

          <Dialog open={isNewFolderOpen} onOpenChange={setIsNewFolderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="bg-violet-600 hover:bg-violet-500 text-slate-50">
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
                  <Input id="folder-name" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} placeholder="Ex: Mes Templates" disabled={isCreatingFolder} />
                </div>
                
                <div>
                  <Label>Emoji et couleur</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow" style={{
                    backgroundColor: newFolderColor + '20',
                    borderColor: newFolderColor
                  }} onClick={() => setIsEmojiPickerOpen(true)}>
                      <span className="text-xl">{newFolderEmoji}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEmojiPickerOpen(true)} disabled={isCreatingFolder}>
                      Changer
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleAddFolder} className="w-full" disabled={isCreatingFolder || !newFolderName.trim()}>
                  {isCreatingFolder ? <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Création...
                    </> : 'Créer le dossier'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewFileOpen} onOpenChange={setIsNewFileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-black bg-violet-400 hover:bg-violet-300">
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
                  <Input id="file-name" value={newFileName} onChange={e => setNewFileName(e.target.value)} placeholder="Ex: Mon Script Vidéo" disabled={isCreatingFile} />
                </div>
                <div>
                  <Label htmlFor="folder-select">Dossier de destination</Label>
                  <Select value={selectedFolderId} onValueChange={setSelectedFolderId} disabled={isCreatingFile}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un dossier" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.filter(f => f.type === activeTab).map(folder => <SelectItem key={folder.id} value={folder.id}>
                          {folder.emoji} {folder.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file-content">Contenu</Label>
                  <Textarea id="file-content" value={newFileContent} onChange={e => setNewFileContent(e.target.value)} placeholder="Tapez le contenu de votre fichier..." rows={6} disabled={isCreatingFile} />
                </div>
                <Button onClick={handleAddFile} className="w-full" disabled={isCreatingFile || !newFileName.trim() || !selectedFolderId}>
                  {isCreatingFile ? <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Création...
                    </> : 'Créer le fichier'}
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
          <Input placeholder="Rechercher dans vos fichiers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        
      </div>

      {/* Tabs Personal/Resources */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Upload className="h-4 w-4 mr-2" />
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
                    {filteredFolders.map(folder => <div key={folder.id} className="mb-2">
                        <div onClick={() => toggleFolder(folder.id)} className="flex items-center justify-between p-2 rounded cursor-pointer group bg-slate-200">
                          <div className="">
                            <div style={{
                          backgroundColor: folder.color + '30',
                          border: `1px solid ${folder.color}`
                        }} className="w-8 h-8 rounded flex items-center justify-center text-sm">
                              {folder.emoji}
                            </div>
                            <span className="font-medium">{folder.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {folder.files.length}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" onClick={e => {
                        e.stopPropagation();
                        handleDeleteFolder(folder.id);
                      }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {folder.isExpanded && <div className="ml-6 border-l border-muted pl-4">
                            {folder.files.map(file => <div key={file.id} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded cursor-pointer group" onClick={() => {
                        setSelectedFile(file);
                      }}>
                                <div className="flex items-center gap-2">
                                  {getFileIcon(file.type)}
                                  <span className="text-sm">{file.name}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                  <Button variant="ghost" size="sm" onClick={e => {
                            e.stopPropagation();
                            setFileToMove(file);
                            setIsMoveFileOpen(true);
                          }} disabled={isMovingFile}>
                                    <Move className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={e => {
                            e.stopPropagation();
                            handleDeleteFile(file.id);
                          }} disabled={isDeletingFile === file.id}>
                                    {isDeletingFile === file.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                                  </Button>
                                </div>
                              </div>)}
                          </div>}
                      </div>)}
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
                      {selectedFile ? <>
                          {getFileIcon(selectedFile.type)}
                          <span className="ml-2">{selectedFile.name}</span>
                        </> : 'Sélectionnez un fichier'}
                    </span>
                    {selectedFile && <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleSaveFile} disabled={isSavingFile}>
                          {isSavingFile ? <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sauvegarde...
                            </> : <>
                              <Save className="h-4 w-4 mr-2" />
                              Sauvegarder
                            </>}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? <div className="h-[350px]">
                      <Textarea value={selectedFile.content || ''} onChange={e => {
                    const updatedFile = {
                      ...selectedFile,
                      content: e.target.value
                    };
                    setSelectedFile(updatedFile);
                  }} className="h-full resize-none" placeholder="Contenu du fichier..." disabled={isSavingFile} />
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Dernière modification: {selectedFile.lastModified}</span>
                        <span>{selectedFile.content?.length || 0} caractères</span>
                      </div>
                    </div> : <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Sélectionnez un fichier pour commencer à l'éditer</p>
                        <p className="text-xs mt-2">Toutes les modifications sont sauvegardées automatiquement</p>
                      </div>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des dossiers Resources */}
            <div className="lg:col-span-1">
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle className="text-lg">Ressources</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto px-4">
                    {filteredFolders.length > 0 ? filteredFolders.map(folder => <div key={folder.id} className="mb-2">
                          <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer group" onClick={() => toggleFolder(folder.id)}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded flex items-center justify-center text-sm" style={{
                          backgroundColor: folder.color + '30',
                          border: `1px solid ${folder.color}`
                        }}>
                                {folder.emoji}
                              </div>
                              <span className="font-medium">{folder.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {folder.files.length}
                              </Badge>
                            </div>
                          </div>
                          
                          {folder.isExpanded && <div className="ml-6 border-l border-muted pl-4">
                              {folder.files.map(file => <div key={file.id} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded cursor-pointer group" onClick={() => {
                        setSelectedFile(file);
                      }}>
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(file.type)}
                                    <span className="text-sm">{file.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                    <Button variant="ghost" size="sm" onClick={e => {
                            e.stopPropagation();
                            setFileToMove(file);
                            setIsMoveFileOpen(true);
                          }}>
                                      <Move className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={e => {
                            e.stopPropagation();
                            handleDeleteFile(file.id);
                          }} disabled={isDeletingFile === file.id}>
                                      {isDeletingFile === file.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                                    </Button>
                                  </div>
                                </div>)}
                            </div>}
                        </div>) : <div className="text-center py-8">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Aucun dossier de ressources</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Créez un nouveau dossier pour commencer
                        </p>
                      </div>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Éditeur de fichier Resources */}
            <div className="lg:col-span-2">
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedFile ? <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          {getFileIcon(selectedFile.type)}
                          <span className="ml-2">{selectedFile.name}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={handleSaveFile} disabled={isSavingFile}>
                            {isSavingFile ? <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sauvegarde...
                              </> : <>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                              </>}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div> : 'Vos ressources externes'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? <div className="h-[350px]">
                      <Textarea value={selectedFile.content || ''} onChange={e => {
                    const updatedFile = {
                      ...selectedFile,
                      content: e.target.value
                    };
                    setSelectedFile(updatedFile);
                  }} className="h-full resize-none" placeholder="Contenu du fichier..." disabled={isSavingFile} />
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Dernière modification: {selectedFile.lastModified}</span>
                        <span>{selectedFile.content?.length || 0} caractères</span>
                      </div>
                    </div> : <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Upload className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Ressources externes</h3>
                        <p className="mb-4">
                          Ajoutez vos PDFs, vidéos, images et liens utiles
                        </p>
                        <Button onClick={() => setIsNewFileOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter une ressource
                        </Button>
                      </div>
                    </div>}
                </CardContent>
              </Card>
            </div>
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
            <Select value={selectedFolderId} onValueChange={setSelectedFolderId} disabled={isMovingFile}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un dossier" />
              </SelectTrigger>
              <SelectContent>
                {folders.filter(f => f.type === activeTab && f.id !== fileToMove?.folderId).map(folder => <SelectItem key={folder.id} value={folder.id}>
                      {folder.emoji} {folder.name}
                    </SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={handleMoveFile} className="flex-1" disabled={isMovingFile || !selectedFolderId}>
                {isMovingFile ? <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Déplacement...
                  </> : 'Déplacer'}
              </Button>
              <Button variant="outline" onClick={() => {
              setIsMoveFileOpen(false);
              setFileToMove(null);
              setSelectedFolderId('');
            }} className="flex-1" disabled={isMovingFile}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sélecteur d'emoji */}
      <EmojiColorPicker isOpen={isEmojiPickerOpen} onClose={() => setIsEmojiPickerOpen(false)} onSelect={handleEmojiSelect} currentEmoji={newFolderEmoji} currentColor={newFolderColor} />
    </div>;
};
export default MyWorkspace;