
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import { huggingfaceService } from "@/services/huggingfaceService";
import { obsidianStructureService } from "@/services/obsidianStructureService";
import { 
  User, 
  Building, 
  Users, 
  Video,
  Settings
} from "lucide-react";
import type { OnboardingData } from "@/types/onboarding";

// Composants refactorisés
import OnboardingActionButtons from "./onboarding/OnboardingActionButtons";
import OnboardingSyncStatus from "./onboarding/OnboardingSyncStatus";
import OnboardingSectionCard from "./onboarding/OnboardingSectionCard";
import OnboardingUpdateIndicator from "./onboarding/OnboardingUpdateIndicator";

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

  const handleFieldChange = (key: keyof OnboardingData, value: any) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

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
        
        <OnboardingActionButtons
          isEditing={isEditing}
          isSaving={isSaving}
          isUpdatingObsidian={isUpdatingObsidian}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onSyncObsidian={updateObsidianOnly}
        />
      </div>

      <OnboardingSyncStatus 
        status={lastSyncStatus} 
        details={syncDetails} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <OnboardingSectionCard
            key={section.title}
            title={section.title}
            icon={section.icon}
            fields={section.fields}
            data={onboardingData}
            editData={editData}
            isEditing={isEditing}
            onChange={handleFieldChange}
          />
        ))}
      </div>

      <OnboardingUpdateIndicator isUpdating={isUpdatingObsidian} />
    </div>
  );
};

export default OnboardingDataSection;
