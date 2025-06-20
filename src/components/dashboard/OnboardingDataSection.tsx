import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import { huggingfaceService } from "@/services/huggingfaceService";
import { obsidianStructureService } from "@/services/obsidianStructureService";
import { 
  Edit, 
  Save, 
  X, 
  User, 
  Target, 
  Globe, 
  Building, 
  Users, 
  Video,
  RefreshCw,
  Settings,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import type { OnboardingData } from "@/types/onboarding";

const OnboardingDataSection = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<OnboardingData>>(onboardingData);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingObsidian, setIsUpdatingObsidian] = useState(false);
  const [lastSyncStatus, setLastSyncStatus] = useState<'success' | 'error' | 'partial' | null>(null);
  const [syncDetails, setSyncDetails] = useState<string>('');

  useEffect(() => {
    setEditData(onboardingData);
  }, [onboardingData]);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "❌ Erreur d'authentification",
        description: "Vous devez être connecté pour sauvegarder.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    setLastSyncStatus(null);
    setSyncDetails('');
    
    try {
      console.log('🚀 Début sauvegarde pour user:', user.id);
      console.log('📋 Données à sauvegarder:', editData);

      // Étape 1: Mise à jour du contexte local
      console.log('1️⃣ Mise à jour contexte local...');
      updateOnboardingData(editData);

      // Étape 2: Test de connectivité HF
      console.log('2️⃣ Test connectivité Hugging Face...');
      try {
        await huggingfaceService.testConnection();
        console.log('✅ Connectivité HF confirmée');
      } catch (hfError) {
        console.error('❌ Problème connectivité HF:', hfError);
        throw new Error(`Impossible de se connecter à Hugging Face: ${hfError.message}`);
      }

      // Étape 3: Sauvegarde sur Hugging Face
      console.log('3️⃣ Sauvegarde sur Hugging Face...');
      try {
        await huggingfaceService.saveOnboardingData(editData);
        console.log('✅ Données sauvegardées sur HF');
      } catch (hfSaveError) {
        console.error('❌ Erreur sauvegarde HF:', hfSaveError);
        throw new Error(`Échec sauvegarde Hugging Face: ${hfSaveError.message}`);
      }

      // Étape 4: Synchronisation Obsidian
      console.log('4️⃣ Synchronisation Obsidian...');
      setIsUpdatingObsidian(true);
      try {
        await obsidianStructureService.createUserVault(user.id, editData as OnboardingData);
        const fileCount = obsidianStructureService.getFileCount(editData as OnboardingData);
        console.log(`✅ Structure Obsidian créée: ${fileCount} fichiers`);
        
        setLastSyncStatus('success');
        setSyncDetails(`${fileCount} fichiers synchronisés avec succès`);
        
        toast({
          title: "✅ Sauvegarde complète réussie",
          description: `Données mises à jour et ${fileCount} fichiers synchronisés avec Obsidian.`,
        });

      } catch (obsidianError) {
        console.error('❌ Erreur sync Obsidian:', obsidianError);
        setLastSyncStatus('partial');
        setSyncDetails(`Données sauvegardées mais erreur Obsidian: ${obsidianError.message}`);
        
        toast({
          title: "⚠️ Sauvegarde partielle",
          description: "Données sauvegardées sur HF mais erreur de synchronisation Obsidian.",
          variant: "destructive",
        });
      }

      setIsEditing(false);

    } catch (error) {
      console.error('❌ Erreur globale sauvegarde:', error);
      setLastSyncStatus('error');
      setSyncDetails(error instanceof Error ? error.message : 'Erreur inconnue');
      
      toast({
        title: "❌ Échec de sauvegarde",
        description: error instanceof Error ? error.message : 'Une erreur est survenue.',
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      setIsUpdatingObsidian(false);
    }
  };

  const handleCancel = () => {
    setEditData(onboardingData);
    setIsEditing(false);
  };

  const updateObsidianOnly = async () => {
    if (!user) {
      toast({
        title: "❌ Erreur d'authentification",
        description: "Vous devez être connecté pour synchroniser.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingObsidian(true);
    setLastSyncStatus(null);
    setSyncDetails('');

    try {
      console.log('🔄 Synchronisation Obsidian uniquement...');
      
      // Test de connectivité d'abord
      try {
        await huggingfaceService.testConnection();
        console.log('✅ Connectivité HF confirmée pour sync');
      } catch (hfError) {
        throw new Error(`Service Hugging Face indisponible: ${hfError.message}`);
      }

      await obsidianStructureService.createUserVault(user.id, onboardingData);
      const fileCount = obsidianStructureService.getFileCount(onboardingData);
      
      setLastSyncStatus('success');
      setSyncDetails(`${fileCount} fichiers synchronisés`);
      
      toast({
        title: "🗂️ Obsidian synchronisé",
        description: `${fileCount} fichiers mis à jour dans votre espace Obsidian.`,
      });

    } catch (error) {
      console.error('❌ Erreur sync Obsidian seul:', error);
      setLastSyncStatus('error');
      setSyncDetails(error instanceof Error ? error.message : 'Erreur de synchronisation');
      
      toast({
        title: "❌ Erreur de synchronisation",
        description: error instanceof Error ? error.message : 'Impossible de synchroniser avec Obsidian.',
        variant: "destructive",
      });
    } finally {
      setIsUpdatingObsidian(false);
    }
  };

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge key={index} variant="secondary">{item}</Badge>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="text-sm">
              <span className="font-medium">{key}:</span> {String(val)}
            </div>
          ))}
        </div>
      );
    }

    return <span className="text-sm text-gray-600">{String(value) || 'Non défini'}</span>;
  };

  const renderField = (
    key: keyof OnboardingData,
    label: string,
    type: 'text' | 'textarea' | 'select' = 'text',
    options?: string[]
  ) => {
    const value = isEditing ? editData[key] : onboardingData[key];

    if (!isEditing) {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {renderValue(value)}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <Textarea
            value={String(value || '')}
            onChange={(e) => setEditData(prev => ({ ...prev, [key]: e.target.value }))}
            rows={3}
          />
        </div>
      );
    }

    if (type === 'select' && options) {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <Select
            value={String(value || '')}
            onValueChange={(newValue) => setEditData(prev => ({ ...prev, [key]: newValue }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Choisir ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input
          value={String(value || '')}
          onChange={(e) => setEditData(prev => ({ ...prev, [key]: e.target.value }))}
        />
      </div>
    );
  };

  const sections = [
    {
      title: "Profil Personnel",
      icon: <User className="h-5 w-5" />,
      fields: [
        { key: 'experienceLevel' as keyof OnboardingData, label: 'Niveau d\'expérience', type: 'select' as const, options: ['Beginner', 'Intermediate', 'Experienced'] },
        { key: 'contentGoal' as keyof OnboardingData, label: 'Objectif principal', type: 'select' as const, options: ['Grow an audience', 'Share knowledge', 'Make money', 'Build a brand', 'Have fun'] },
        { key: 'country' as keyof OnboardingData, label: 'Pays' },
        { key: 'city' as keyof OnboardingData, label: 'Ville' },
      ]
    },
    {
      title: "Business",
      icon: <Building className="h-5 w-5" />,
      fields: [
        { key: 'businessType' as keyof OnboardingData, label: 'Type d\'activité', type: 'select' as const, options: ['Personal Brand', 'Small Business', 'Startup', 'Established Company', 'Educational Institution', 'Non-Profit', 'Agency', 'Other'] },
        { key: 'businessDescription' as keyof OnboardingData, label: 'Description de votre activité', type: 'textarea' as const },
        { key: 'niche' as keyof OnboardingData, label: 'Niche/Domaine' },
      ]
    },
    {
      title: "Audience & Impact",
      icon: <Users className="h-5 w-5" />,
      fields: [
        { key: 'targetGeneration' as keyof OnboardingData, label: 'Génération cible', type: 'select' as const, options: ['Gen Z', 'Millennials', 'Gen X', 'Baby Boomers', 'All Ages'] },
        { key: 'timeAvailable' as keyof OnboardingData, label: 'Temps disponible', type: 'select' as const, options: ['Less than 1 hour', '1-3 hours', '3-5 hours', '5+ hours'] },
        { key: 'monetization' as keyof OnboardingData, label: 'Monétisation', type: 'select' as const, options: ['Yes', 'No', 'Not sure yet'] },
      ]
    },
    {
      title: "Contenu & Plateformes",
      icon: <Video className="h-5 w-5" />,
      fields: [
        { key: 'platforms' as keyof OnboardingData, label: 'Plateformes' },
        { key: 'contentTypes' as keyof OnboardingData, label: 'Types de contenu' },
        { key: 'contentChallenges' as keyof OnboardingData, label: 'Défis principaux' },
        { key: 'impactGoals' as keyof OnboardingData, label: 'Objectifs d\'impact' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Mes Données d'Onboarding
          </h2>
          <p className="text-muted-foreground">
            Visualisez et modifiez vos informations personnelles
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={updateObsidianOnly}
            disabled={isUpdatingObsidian || isSaving}
          >
            {isUpdatingObsidian ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sync en cours...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Obsidian
              </>
            )}
          </Button>
          
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} disabled={isSaving}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline" disabled={isSaving}>
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button onClick={handleSave} disabled={isSaving || isUpdatingObsidian}>
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Status de synchronisation */}
      {lastSyncStatus && (
        <Card className={`border-l-4 ${
          lastSyncStatus === 'success' ? 'border-l-green-500 bg-green-50' :
          lastSyncStatus === 'partial' ? 'border-l-orange-500 bg-orange-50' :
          'border-l-red-500 bg-red-50'
        }`}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              {lastSyncStatus === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${
                  lastSyncStatus === 'success' ? 'text-green-800' :
                  lastSyncStatus === 'partial' ? 'text-orange-800' :
                  'text-red-800'
                }`}>
                  {lastSyncStatus === 'success' ? 'Synchronisation réussie' :
                   lastSyncStatus === 'partial' ? 'Synchronisation partielle' :
                   'Erreur de synchronisation'}
                </p>
                <p className={`text-sm ${
                  lastSyncStatus === 'success' ? 'text-green-600' :
                  lastSyncStatus === 'partial' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {syncDetails}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.fields.map((field) => renderField(
                field.key,
                field.label,
                field.type,
                field.options
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {isUpdatingObsidian && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-blue-700">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Synchronisation avec votre espace Obsidian en cours...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OnboardingDataSection;
