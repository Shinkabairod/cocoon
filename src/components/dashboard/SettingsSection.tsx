import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle,
  Settings,
  Moon,
  Sun,
  Globe,
  HelpCircle,
  LogOut
} from 'lucide-react';

const SettingsSection = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const [userProfile, setUserProfile] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    bio: 'Créateur de contenu passionné'
  });

  const [settings, setSettings] = useState({
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

  const handleSettingsUpdate = (section: string, key: string, value: any) => {
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
    signOut();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Suppression du compte",
      description: "Cette action nécessite une confirmation par email.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold">Paramètres</h2>
          <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
        </div>
      </div>

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
                value={userProfile.name}
                onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={userProfile.phone}
              onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+33 6 12 34 56 78"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={userProfile.bio}
              onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Décrivez-vous en quelques mots..."
            />
          </div>
          
          <Button onClick={handleProfileUpdate} disabled={isLoading} className="w-full md:w-auto">
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
                onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Clair
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Sombre
              </Button>
              <Button
                variant={settings.theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings(prev => ({ ...prev, theme: 'system' }))}
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
            <LogOut className="h-4 w-4 mr-2" />
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
  );
};

export default SettingsSection;