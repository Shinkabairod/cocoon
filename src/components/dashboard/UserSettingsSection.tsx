// src/components/dashboard/UserSettingsSection.tsx - Version modifiée
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User, 
  ArrowRight, 
  FileText, 
  BarChart, 
  FolderOpen, 
  Sparkles,
  Target,
  Calendar,
  Upload,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useToast } from '@/hooks/use-toast';

const UserSettingsSection = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const { toast } = useToast();

  // Informations utilisateur extraites des données
  const getUserInfo = () => {
    return {
      name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gem',
      email: user?.email || '',
      status: 'Créateur en transformation',
      experienceLevel: onboardingData?.experienceLevel || 'Non défini',
      niche: onboardingData?.niche || 'Non défini',
      platforms: onboardingData?.platforms || [],
      contentGoal: onboardingData?.contentGoal || 'Non défini'
    };
  };

  const userInfo = getUserInfo();

  // NAVIGATION VERS LES SECTIONS DU DASHBOARD ⬇️
  const navigateToSection = (section: string) => {
    // Simuler la navigation vers les onglets
    const tabElement = document.querySelector(`[value="${section}"]`) as HTMLElement;
    if (tabElement) {
      tabElement.click();
      toast({
        title: `Navigation vers ${section}`,
        description: "Section ouverte avec succès"
      });
    } else {
      toast({
        title: "Navigation",
        description: `Redirection vers la section ${section}`,
      });
    }
  };

  // PROCHAINES ÉTAPES AVEC BOUTONS DE NAVIGATION ⬇️
  const nextSteps = [
    {
      title: 'Compléter mon profil',
      description: 'Vérifiez et mettez à jour vos informations dans votre profil créateur',
      icon: <User className="h-5 w-5" />,
      action: () => navigateToSection('profile'),
      completed: onboardingData?.experienceLevel && onboardingData?.niche
    },
    {
      title: 'Organiser mon espace de travail',
      description: 'Uploadez vos fichiers et organisez vos ressources',
      icon: <FolderOpen className="h-5 w-5" />,
      action: () => navigateToSection('workspace'),
      completed: false
    },
    {
      title: 'Explorer les outils IA',
      description: 'Découvrez les générateurs de contenu personnalisés',
      icon: <Sparkles className="h-5 w-5" />,
      action: () => navigateToSection('tools'),
      completed: false
    },
    {
      title: 'Consulter le tableau de bord',
      description: 'Accédez à vos statistiques et ressources principales',
      icon: <BarChart className="h-5 w-5" />,
      action: () => navigateToSection('dashboard'),
      completed: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header avec informations utilisateur en haut à droite */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Mon Compte
          </h2>
          <p className="text-muted-foreground">
            Gérez votre compte et suivez votre progression
          </p>
        </div>
        
        {/* INFORMATIONS UTILISATEUR EN HAUT À DROITE ⬇️ */}
        <Card className="w-80">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold">
                  {userInfo.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{userInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{userInfo.status}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {userInfo.experienceLevel}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PROCHAINES ÉTAPES AVEC BOUTONS DE NAVIGATION ⬇️ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Prochaines étapes recommandées
          </CardTitle>
          <CardDescription>
            Continuez votre parcours de créateur en explorant les différentes sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${step.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {step.completed ? <CheckCircle className="h-5 w-5" /> : step.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      <Button 
                        onClick={step.action}
                        size="sm"
                        variant={step.completed ? "outline" : "default"}
                        className="w-full"
                      >
                        {step.completed ? 'Revoir' : 'Commencer'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informations de profil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Votre profil créateur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Objectif :</span>
              <span className="font-medium">{userInfo.contentGoal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Niche :</span>
              <span className="font-medium">{userInfo.niche}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plateformes :</span>
              <span className="font-medium">{userInfo.platforms.length} active(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email :</span>
              <span className="font-medium text-sm">{userInfo.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profil complété</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Continuez à remplir votre profil pour débloquer plus de fonctionnalités IA
            </div>
            <Button 
              onClick={() => navigateToSection('profile')} 
              variant="outline" 
              size="sm"
              className="w-full"
            >
              Compléter mon profil
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Raccourcis rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Accès rapide</CardTitle>
          <CardDescription>
            Raccourcis vers les fonctionnalités les plus utilisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={() => navigateToSection('tools')} 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-xs">Outils IA</span>
            </Button>
            <Button 
              onClick={() => navigateToSection('workspace')} 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
            >
              <FolderOpen className="h-5 w-5" />
              <span className="text-xs">Mes fichiers</span>
            </Button>
            <Button 
              onClick={() => navigateToSection('dashboard')} 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
            >
              <BarChart className="h-5 w-5" />
              <span className="text-xs">Statistiques</span>
            </Button>
            <Button 
              onClick={() => navigateToSection('profile')} 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Mon profil</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingsSection;