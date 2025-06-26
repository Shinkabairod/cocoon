
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Monitor,
  Camera,
  Mail,
  Shield,
  Bell,
  Trash2,
  Save,
  Edit3,
  Check,
  X,
  Globe,
  Key,
  Smartphone,
  Download,
  Upload,
  AlertTriangle
} from 'lucide-react';

const SettingsSection = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const { toast } = useToast();

  // États pour l'édition du profil
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    bio: user?.user_metadata?.bio || '',
    location: user?.user_metadata?.location || '',
    website: user?.user_metadata?.website || '',
    phone: user?.user_metadata?.phone || ''
  });

  // États pour les notifications
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailUpdates: true,
    pushNotifications: true,
    weeklyDigest: false,
    aiSuggestions: true
  });

  // États pour la sécurité
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24h',
    dataRetention: '1year'
  });

  const handleProfileSave = async () => {
    try {
      // Ici tu peux ajouter la logique pour sauvegarder le profil
      // await updateUserProfile(profileData);
      
      setIsEditingProfile(false);
      toast({
        title: "✅ Profil mis à jour",
        description: "Vos informations ont été sauvegardées."
      });
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de sauvegarder le profil."
      });
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Ici tu peux ajouter la logique pour uploader l'avatar
      toast({
        title: "📸 Avatar mis à jour",
        description: "Votre photo de profil a été modifiée."
      });
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'system': return <Monitor className="h-4 w-4" />;
    }
  };

  const getAccountTypeBadge = () => {
    // Tu peux déterminer le type de compte basé sur l'utilisateur
    return <Badge variant="default">Gratuit</Badge>;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "👋 À bientôt",
        description: "Vous avez été déconnecté avec succès."
      });
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de se déconnecter."
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <Settings className="h-6 w-6" />
          Réglages
        </h2>
        <p className="text-muted-foreground">
          Gérez votre compte, vos préférences et votre sécurité
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profil utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profil utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar et infos principales */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl">
                      {profileData.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-background border rounded-full p-1.5 cursor-pointer hover:bg-accent">
                    <Camera className="h-3 w-3" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {profileData.fullName || 'Utilisateur'}
                    </h3>
                    {getAccountTypeBadge()}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{profileData.email}</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Compte créé le {new Date(user?.created_at || '').toLocaleDateString()}</span>
                  </div>
                </div>

                <Button
                  variant={isEditingProfile ? "outline" : "default"}
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Modifier
                    </>
                  )}
                </Button>
              </div>

              {/* Formulaire d'édition */}
              {isEditingProfile && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Parlez-nous de vous..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Ville, Pays"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Site web</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button onClick={handleProfileSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Apparence et thème */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getThemeIcon()}
                Apparence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Thème de l'interface</Label>
                <Select value={theme} onValueChange={(value: 'light' | 'dark' | 'system') => setTheme(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Clair
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Sombre
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        Système
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {theme === 'system' ? 'Suit les préférences de votre système' : 
                   theme === 'dark' ? 'Interface sombre pour une meilleure lisibilité' : 
                   'Interface claire et lumineuse'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { key: 'emailMarketing', label: 'Emails marketing', description: 'Nouveautés et offres spéciales' },
                  { key: 'emailUpdates', label: 'Mises à jour produit', description: 'Nouvelles fonctionnalités et améliorations' },
                  { key: 'pushNotifications', label: 'Notifications push', description: 'Alertes en temps réel' },
                  { key: 'weeklyDigest', label: 'Résumé hebdomadaire', description: 'Synthèse de votre activité' },
                  { key: 'aiSuggestions', label: 'Suggestions IA', description: 'Recommandations personnalisées' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          
          {/* Statistiques du compte */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Statistiques du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contenus créés</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ressources uploadées</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Temps gagné</span>
                <span className="font-medium">3.2h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dernière connexion</span>
                <span className="font-medium">Aujourd'hui</span>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Authentification à 2 facteurs</Label>
                  <p className="text-xs text-muted-foreground">Sécurité renforcée</p>
                </div>
                <Switch
                  checked={security.twoFactorEnabled}
                  onCheckedChange={(checked) => 
                    setSecurity(prev => ({ ...prev, twoFactorEnabled: checked }))
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Expiration de session</Label>
                <Select 
                  value={security.sessionTimeout} 
                  onValueChange={(value) => setSecurity(prev => ({ ...prev, sessionTimeout: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 heure</SelectItem>
                    <SelectItem value="24h">24 heures</SelectItem>
                    <SelectItem value="7d">7 jours</SelectItem>
                    <SelectItem value="30d">30 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Key className="h-4 w-4 mr-2" />
                Changer le mot de passe
              </Button>
            </CardContent>
          </Card>

          {/* Actions du compte */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Actions du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
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
              <Button variant="destructive" size="sm" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer le compte
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Cette action est irréversible
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
