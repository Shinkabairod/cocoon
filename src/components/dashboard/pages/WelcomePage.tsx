// src/components/dashboard/pages/WelcomePage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText, Upload, TrendingUp, Sparkles } from 'lucide-react';
import ConnectionTest from '@/components/dashboard/ConnectionTest';

interface WelcomePageProps {
  user: any;
  userStats: any;
  isLoading: boolean;
  getUserName: () => string;
  handleNavigation: (page: string) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  user,
  userStats,
  isLoading,
  getUserName,
  handleNavigation
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="space-y-6">
      {/* Header de bienvenue */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {getGreeting()} {getUserName()} ! 👋
        </h1>
        <p className="opacity-90">
          Prêt à créer du contenu exceptionnel aujourd'hui ?
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.totalChats || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Conversations IA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.totalScripts || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Scripts créés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.totalUploads || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Ressources ajoutées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : (userStats?.streak || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Jours actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleNavigation('chat')}
            >
              <MessageSquare className="h-6 w-6" />
              <span>Nouveau Chat</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleNavigation('resources')}
            >
              <Upload className="h-6 w-6" />
              <span>Ajouter Ressource</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleNavigation('creations')}
            >
              <Sparkles className="h-6 w-6" />
              <span>Mes Créations</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test de connexion */}
      <ConnectionTest />
    </div>
  );
};

export default WelcomePage;
