import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle,
  ArrowLeft,
  Settings,
  Moon,
  Sun,
  Globe,
  HelpCircle
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    marketing: boolean;
  };
  privacy: {
    profilePublic: boolean;
    analyticsOptIn: boolean;
  };
}

const SettingsApp: React.FC = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Créateur de contenu passionné'
  });

  const [settings, setSettings] = useState<AppSettings>({
    theme: 'system',
    language: 'fr',
    notifications: {
      push: true,
      email: true,
      marketing: false
    },
    privacy: {
      profilePublic: false,
      analyticsOptIn: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsUpdate = (section: keyof AppSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleExportData = () => {
    toast({
      title: "Export en cours",
      description: "Vos données seront téléchargées sous peu.",
    });
  };

  const handleSignOut = () => {
    toast({
      title: "Déconnexion",
      description: "Vous allez être déconnecté.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Suppression du compte",
      description: "Cette action nécessite une confirmation.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h1 className="font-semibold">Paramètres</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-2xl space-y-6">
        
        {/* Section Profil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={user.phone || ''}
                onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={user.bio || ''}
                onChange={(e) => setUser(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Décrivez-vous en quelques mots..."
              />
            </div>
            
            <Button onClick={handleProfileUpdate} disabled={isLoading} className="w-full">
              {isLoading ? "Sauvegarde..." : "Mettre à jour le profil"}
            </Button>
          </CardContent>
        </Card>

        {/* Section Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications push</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications sur mobile
                </p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(value) => handleSettingsUpdate('notifications', 'push', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des emails de mise à jour
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(value) => handleSettingsUpdate('notifications', 'email', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Emails marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des conseils et nouveautés
                </p>
              </div>
              <Switch
                checked={settings.notifications.marketing}
                onCheckedChange={(value) => handleSettingsUpdate('notifications', 'marketing', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section Apparence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Thème</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={settings.theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSettingsUpdate('theme', 'theme', 'light')}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" />
                  Clair
                </Button>
                <Button
                  variant={settings.theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSettingsUpdate('theme', 'theme', 'dark')}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" />
                  Sombre
                </Button>
                <Button
                  variant={settings.theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSettingsUpdate('theme', 'theme', 'system')}
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  Auto
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Langue</Label>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">Français</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Confidentialité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Confidentialité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profil public</Label>
                <p className="text-sm text-muted-foreground">
                  Permettre aux autres utilisateurs de voir votre profil
                </p>
              </div>
              <Switch
                checked={settings.privacy.profilePublic}
                onCheckedChange={(value) => handleSettingsUpdate('privacy', 'profilePublic', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytiques</Label>
                <p className="text-sm text-muted-foreground">
                  Aider à améliorer l'app avec des données anonymes
                </p>
              </div>
              <Switch
                checked={settings.privacy.analyticsOptIn}
                onCheckedChange={(value) => handleSettingsUpdate('privacy', 'analyticsOptIn', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section Actions du compte */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Actions du compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Exporter mes données
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Importer des données
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleSignOut}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Se déconnecter
            </Button>
          </CardContent>
        </Card>

        {/* Zone danger */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-sm text-destructive">Zone de danger</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm" className="w-full" onClick={handleDeleteAccount}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer le compte
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Cette action est irréversible
            </p>
          </CardContent>
        </Card>

        {/* Section Aide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Aide et support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Centre d'aide
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Contacter le support
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Conditions d'utilisation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Version 1.0.0 • Cocoon AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;