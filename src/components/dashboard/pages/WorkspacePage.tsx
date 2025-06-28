
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, FileText, Folder } from 'lucide-react';

interface WorkspacePageProps {
  user: any;
  userStats: any;
  isLoading: boolean;
  toast: any;
  getUserName: () => string;
  handleNavigation: (page: string) => void;
}

const WorkspacePage: React.FC<WorkspacePageProps> = ({
  getUserName
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workspace</h1>
          <p className="text-gray-600">Votre espace de travail personnel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Folder className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Dossiers</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fichiers</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projets</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenue dans votre Workspace, {getUserName()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Votre workspace est l'endroit où vous pouvez organiser tous vos projets, 
            fichiers et ressources de création de contenu.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Prochaines étapes :</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• Créez votre premier dossier de projet</li>
              <li>• Importez vos ressources existantes</li>
              <li>• Organisez votre contenu par thème</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspacePage;
