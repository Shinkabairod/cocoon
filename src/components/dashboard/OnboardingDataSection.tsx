
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
  Settings
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

  useEffect(() => {
    setEditData(onboardingData);
  }, [onboardingData]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Mettre à jour le contexte local
      updateOnboardingData(editData);

      // Sauvegarder sur Hugging Face
      await huggingfaceService.saveOnboardingData(editData);

      // Mettre à jour la structure Obsidian
      setIsUpdatingObsidian(true);
      await obsidianStructureService.createUserVault(user.id, editData as OnboardingData);

      toast({
        title: "✅ Données mises à jour",
        description: "Vos données d'onboarding et votre espace Obsidian ont été synchronisés.",
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
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
    if (!user) return;

    setIsUpdatingObsidian(true);
    try {
      await obsidianStructureService.createUserVault(user.id, onboardingData);
      toast({
        title: "🗂️ Obsidian synchronisé",
        description: "Votre espace Obsidian a été mis à jour avec les dernières données.",
      });
    } catch (error) {
      console.error('Erreur sync Obsidian:', error);
      toast({
        title: "Erreur",
        description: "Impossible de synchroniser avec Obsidian.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingObsidian(false);
    }
  };

  const renderField = (
    key: keyof OnboardingData,
    label: string,
    type: 'text' | 'textarea' | 'select' = 'text',
    options?: string[]
  ) => {
    const value = isEditing ? editData[key] : onboardingData[key];

    if (!isEditing) {
      if (Array.isArray(value)) {
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="flex flex-wrap gap-1">
              {value.map((item, index) => (
                <Badge key={index} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <p className="text-sm text-gray-600">{value || 'Non défini'}</p>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <Textarea
            value={value as string || ''}
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
            value={value as string || ''}
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
          value={value as string || ''}
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
            disabled={isUpdatingObsidian}
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
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
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
