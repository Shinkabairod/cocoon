
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import ConnectionTest from '@/components/dashboard/ConnectionTest';
import {
  Crown,
  Zap,
  MessageSquare,
  FileText,
  Upload,
  TrendingUp,
  Edit,
  Sparkles
} from 'lucide-react';

interface WelcomePageSectionProps {
  onNavigate: (page: string) => void;
  onOpenModal: (modal: string) => void;
}

const WelcomePageSection: React.FC<WelcomePageSectionProps> = ({ onNavigate, onOpenModal }) => {
  const { user } = useAuth();
  const { data: userStats, isLoading } = useUserStats(user?.id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getUserName = () => {
    return user?.user_metadata?.full_name || 
           user?.email?.split('@')[0] || 
           'Créateur';
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
        <div className="mt-4 flex items-center space-x-4">
          <Badge variant="secondary" className="bg-white/20 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white">
            <Zap className="h-3 w-3 mr-1" />
            IA Active
          </Badge>
        </div>
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
                <p className="text-sm text-muted-foreground">Ressources</p>
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
            <Zap className="h-5 w-5 mr-2" />
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('chat')}
            >
              <MessageSquare className="h-6 w-6" />
              <span>Chat IA</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onOpenModal('script-generator')}
            >
              <Edit className="h-6 w-6" />
              <span>Script Vidéo</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('resources')}
            >
              <Upload className="h-6 w-6" />
              <span>Ressources</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('creations')}
            >
              <Sparkles className="h-6 w-6" />
              <span>Créations</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test de connexion */}
      <ConnectionTest />
    </div>
  );
};

export default WelcomePageSection;
