
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface DashboardModalsProps {
  activeModal: string | null;
  onCloseModal: () => void;
  
  // Script Generator Modal
  scriptTopic: string;
  onScriptTopicChange: (value: string) => void;
  isGenerating: boolean;
  onGenerateScript: () => void;
  
  // New Folder Modal
  showNewFolderModal: boolean;
  newFolder: { name: string; emoji: string; category: string };
  onNewFolderChange: (field: string, value: string) => void;
  onAddFolder: () => void;
  onCloseNewFolderModal: () => void;
  
  // New Item Modal
  showNewItemModal: boolean;
  newItemData: {
    type: string;
    title: string;
    content: string;
    url: string;
    file: File | null;
    folderId: string;
  };
  onNewItemChange: (field: string, value: any) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddItem: () => void;
  onCloseNewItemModal: () => void;
  
  // Generated Content
  generatedContent: string;
}

const DashboardModals: React.FC<DashboardModalsProps> = ({
  activeModal,
  onCloseModal,
  scriptTopic,
  onScriptTopicChange,
  isGenerating,
  onGenerateScript,
  showNewFolderModal,
  newFolder,
  onNewFolderChange,
  onAddFolder,
  onCloseNewFolderModal,
  showNewItemModal,
  newItemData,
  onNewItemChange,
  onFileUpload,
  onAddItem,
  onCloseNewItemModal,
  generatedContent
}) => {
  return (
    <>
      {/* Script Generator Modal */}
      <Dialog open={activeModal === 'script-generator'} onOpenChange={onCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Générateur de Script IA</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Sujet du script</Label>
              <Input
                placeholder="Ex: Comment débuter sur YouTube en 2024"
                value={scriptTopic}
                onChange={(e) => onScriptTopicChange(e.target.value)}
              />
            </div>
            <Button 
              onClick={onGenerateScript}
              disabled={!scriptTopic.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                'Générer le script'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Script Result Modal */}
      <Dialog open={activeModal === 'script-result'} onOpenChange={onCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Script généré</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[300px]"
            />
            <Button onClick={onCloseModal} className="w-full">
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Folder Modal */}
      <Dialog open={showNewFolderModal} onOpenChange={onCloseNewFolderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau Dossier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nom du dossier</Label>
              <Input
                placeholder="Nom du dossier"
                value={newFolder.name}
                onChange={(e) => onNewFolderChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label>Emoji</Label>
              <Input
                placeholder="📁"
                value={newFolder.emoji}
                onChange={(e) => onNewFolderChange('emoji', e.target.value)}
                maxLength={2}
              />
            </div>
            <div>
              <Label>Catégorie</Label>
              <Select
                value={newFolder.category}
                onValueChange={(value) => onNewFolderChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resources">Ressources</SelectItem>
                  <SelectItem value="personal">Personnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCloseNewFolderModal} className="flex-1">
                Annuler
              </Button>
              <Button onClick={onAddFolder} className="flex-1">
                Créer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Item Modal */}
      <Dialog open={showNewItemModal} onOpenChange={onCloseNewItemModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une ressource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Type</Label>
              <Select
                value={newItemData.type}
                onValueChange={(value) => onNewItemChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texte</SelectItem>
                  <SelectItem value="link">Lien</SelectItem>
                  <SelectItem value="file">Fichier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Titre</Label>
              <Input
                placeholder="Titre de la ressource"
                value={newItemData.title}
                onChange={(e) => onNewItemChange('title', e.target.value)}
              />
            </div>
            {newItemData.type === 'text' && (
              <div>
                <Label>Contenu</Label>
                <Textarea
                  placeholder="Contenu de la ressource"
                  value={newItemData.content}
                  onChange={(e) => onNewItemChange('content', e.target.value)}
                />
              </div>
            )}
            {newItemData.type === 'link' && (
              <div>
                <Label>URL</Label>
                <Input
                  placeholder="https://..."
                  value={newItemData.url}
                  onChange={(e) => onNewItemChange('url', e.target.value)}
                />
              </div>
            )}
            {newItemData.type === 'file' && (
              <div>
                <Label>Fichier</Label>
                <Input
                  type="file"
                  onChange={onFileUpload}
                  accept="*"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCloseNewItemModal} className="flex-1">
                Annuler
              </Button>
              <Button onClick={onAddItem} className="flex-1">
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardModals;
