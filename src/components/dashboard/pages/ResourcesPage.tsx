
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, Plus, Upload } from 'lucide-react';

interface ResourcesPageProps {
  folders: any[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  showNewFolderModal: boolean;
  setShowNewFolderModal: (show: boolean) => void;
  showNewItemModal: boolean;
  setShowNewItemModal: (show: boolean) => void;
  newFolder: any;
  setNewFolder: (folder: any) => void;
  newItemData: any;
  setNewItemData: (data: any) => void;
  addFolder: (folderData: any) => void;
  addItem: (itemData: any) => void;
  handleFileUpload: (files: FileList) => void;
  user: any;
  userStats: any;
  isLoading: boolean;
  toast: any;
  getUserName: () => string;
  handleNavigation: (page: string) => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({
  setShowNewFolderModal,
  setShowNewItemModal,
  getUserName
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Folder className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ressources</h1>
            <p className="text-gray-600">Gérez vos ressources et dossiers</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => setShowNewFolderModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Dossier
          </Button>
          <Button variant="outline" onClick={() => setShowNewItemModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Ajouter Fichier
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mes Ressources - {getUserName()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Folder className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune ressource pour le moment
            </h3>
            <p className="text-gray-600 mb-4">
              Commencez par créer un dossier pour organiser vos ressources
            </p>
            <Button onClick={() => setShowNewFolderModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer mon premier dossier
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;
