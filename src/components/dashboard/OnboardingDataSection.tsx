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

// Refactored components
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

  const formatProfileData = (data: Partial<OnboardingData>) => {
    return {
      experienceLevel: data.experienceLevel,
      contentGoal: data.contentGoal,
      country: data.country,
      city: data.city,
      businessType: data.businessType,
      businessDescription: data.businessDescription,
      niche: data.niche,
      targetGeneration: data.targetGeneration,
      timeAvailable: data.timeAvailable,
      monetizationIntent: data.monetization,
      platforms: data.platforms,
      contentTypes: data.contentTypes,
      mainChallenges: Array.isArray(data.contentChallenges) ? data.contentChallenges.join(', ') : data.contentChallenge,
      resources: `Equipment: ${data.equipmentOwned?.join(', ') || 'Not specified'}, Time: ${data.timeAvailable || 'Not specified'}`
    };
  };

  const handleFieldChange = (key: keyof OnboardingData, value: any) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "❌ Authentication Error",
        description: "You must be logged in to save.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    setLastSyncStatus(null);
    setSyncDetails('');
    
    try {
      console.log('🚀 Starting save for user:', user.id);
      console.log('📋 Data to save:', editData);

      // Step 1: Update local context
      console.log('1️⃣ Updating local context...');
      updateOnboardingData(editData);

      // Step 2: Test HF connectivity
      console.log('2️⃣ Testing Hugging Face connectivity...');
      try {
        await huggingfaceService.testConnection();
        console.log('✅ HF connectivity confirmed');
      } catch (hfError) {
        console.error('❌ HF connectivity issue:', hfError);
        throw new Error(`Unable to connect to Hugging Face: ${hfError.message}`);
      }

      // Step 3: Save to Hugging Face with formatted data
      console.log('3️⃣ Saving to Hugging Face...');
      try {
        const formattedData = formatProfileData(editData);
        const payload = {
          user_id: user.id,
          profile_data: formattedData
        };
        console.log('📤 Sending formatted payload:', payload);
        
        await huggingfaceService.saveProfile(formattedData);
        console.log('✅ Data saved to HF');
      } catch (hfSaveError) {
        console.error('❌ HF save error:', hfSaveError);
        throw new Error(`HF save failed: ${hfSaveError.message}`);
      }

      // Step 4: Obsidian sync
      console.log('4️⃣ Obsidian synchronization...');
      setIsUpdatingObsidian(true);
      try {
        await obsidianStructureService.createUserVault(user.id, editData as OnboardingData);
        const fileCount = obsidianStructureService.getFileCount(editData as OnboardingData);
        console.log(`✅ Obsidian structure created: ${fileCount} files`);
        
        setLastSyncStatus('success');
        setSyncDetails(`${fileCount} files synchronized successfully`);
        
        toast({
          title: "✅ Complete save successful",
          description: `Data updated and ${fileCount} files synchronized with Obsidian.`,
        });

      } catch (obsidianError) {
        console.error('❌ Obsidian sync error:', obsidianError);
        setLastSyncStatus('partial');
        setSyncDetails(`Data saved but Obsidian error: ${obsidianError.message}`);
        
        toast({
          title: "⚠️ Partial save",
          description: "Data saved to HF but Obsidian sync error.",
          variant: "destructive",
        });
      }

      setIsEditing(false);

    } catch (error) {
      console.error('❌ Global save error:', error);
      setLastSyncStatus('error');
      setSyncDetails(error instanceof Error ? error.message : 'Unknown error');
      
      toast({
        title: "❌ Save failed",
        description: error instanceof Error ? error.message : 'An error occurred.',
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
        title: "❌ Authentication Error",
        description: "You must be logged in to synchronize.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingObsidian(true);
    setLastSyncStatus(null);
    setSyncDetails('');

    try {
      console.log('🔄 Synchronizing Obsidian only...');
      
      // Test of HF connectivity first
      try {
        await huggingfaceService.testConnection();
        console.log('✅ HF connectivity confirmed for sync');
      } catch (hfError) {
        throw new Error(`Service Hugging Face indisponible: ${hfError.message}`);
      }

      await obsidianStructureService.createUserVault(user.id, onboardingData);
      const fileCount = obsidianStructureService.getFileCount(onboardingData);
      
      setLastSyncStatus('success');
      setSyncDetails(`${fileCount} files synchronized`);
      
      toast({
        title: "🗂️ Obsidian synchronized",
        description: `${fileCount} files updated in your Obsidian space.`,
      });

    } catch (error) {
      console.error('❌ Obsidian sync error:', error);
      setLastSyncStatus('error');
      setSyncDetails(error instanceof Error ? error.message : 'Sync error');
      
      toast({
        title: "❌ Sync error",
        description: error instanceof Error ? error.message : 'Unable to synchronize with Obsidian.',
        variant: "destructive",
      });
    } finally {
      setIsUpdatingObsidian(false);
    }
  };

  const sections = [
    {
      title: "Personal Profile",
      icon: <User className="h-5 w-5" />,
      fields: [
        { key: 'experienceLevel' as keyof OnboardingData, label: 'Experience Level', type: 'select' as const, options: ['Beginner', 'Intermediate', 'Experienced'] },
        { key: 'contentGoal' as keyof OnboardingData, label: 'Main Goal', type: 'select' as const, options: ['Grow an audience', 'Share knowledge', 'Make money', 'Build a brand', 'Have fun'] },
        { key: 'country' as keyof OnboardingData, label: 'Country' },
        { key: 'city' as keyof OnboardingData, label: 'City' },
      ]
    },
    {
      title: "Business",
      icon: <Building className="h-5 w-5" />,
      fields: [
        { key: 'businessType' as keyof OnboardingData, label: 'Business Type', type: 'select' as const, options: ['Personal Brand', 'Small Business', 'Startup', 'Established Company', 'Educational Institution', 'Non-Profit', 'Agency', 'Other'] },
        { key: 'businessDescription' as keyof OnboardingData, label: 'Business Description', type: 'textarea' as const },
        { key: 'niche' as keyof OnboardingData, label: 'Niche/Domain' },
      ]
    },
    {
      title: "Audience & Impact",
      icon: <Users className="h-5 w-5" />,
      fields: [
        { key: 'targetGeneration' as keyof OnboardingData, label: 'Target Generation', type: 'select' as const, options: ['Gen Z', 'Millennials', 'Gen X', 'Baby Boomers', 'All Ages'] },
        { key: 'timeAvailable' as keyof OnboardingData, label: 'Available Time', type: 'select' as const, options: ['Less than 1 hour', '1-3 hours', '3-5 hours', '5+ hours'] },
        { key: 'monetization' as keyof OnboardingData, label: 'Monetization', type: 'select' as const, options: ['Yes', 'No', 'Not sure yet'] },
      ]
    },
    {
      title: "Content & Platforms",
      icon: <Video className="h-5 w-5" />,
      fields: [
        { key: 'platforms' as keyof OnboardingData, label: 'Platforms' },
        { key: 'contentTypes' as keyof OnboardingData, label: 'Content Types' },
        { key: 'contentChallenges' as keyof OnboardingData, label: 'Main Challenges' },
        { key: 'impactGoals' as keyof OnboardingData, label: 'Impact Goals' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            My Onboarding Data
          </h2>
          <p className="text-muted-foreground">
            View and edit your personal information
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
          userProfileData={formatProfileData(onboardingData)}
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
