import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SummaryStepProps {
  data: any;
}

const SummaryStep = () => {
  const { data, setIsOnboardingComplete } = useOnboarding();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCompleteOnboarding = async () => {
    if (!user?.id) {
      console.error('❌ User ID not available');
      return;
    }

    setIsCompleting(true);
    
    try {
      console.log('🚀 Starting onboarding completion...');
      
      // Créer le payload complet
      const completePayload = {
        user_id: user.id,
        onboarding_completed: true,
        profile_data: data,
        preferences: {
          content_types: data.contentTypes || [],
          platforms: data.platforms || [],
          experience_level: data.experienceLevel || 'beginner'
        },
        updated_at: new Date().toISOString()
      };

      console.log('📦 Payload to save:', completePayload);

      const { error } = await supabase
        .from('user_profiles')
        .upsert(completePayload);

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Onboarding data saved successfully');
      
      // Marquer l'onboarding comme terminé dans le contexte
      setIsOnboardingComplete(true);
      
      // Rediriger vers le dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Error completing onboarding:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-2xl font-bold">Résumé</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Informations Personnelles</h3>
          <p>Nom: {data.fullName}</p>
          <p>Email: {user?.email}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Votre Objectif Principal</h3>
          <p>{data.mainGoal}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Types de Contenu</h3>
          <ul>
            {data.contentTypes?.map((type: string) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Plateformes</h3>
          <ul>
            {data.platforms?.map((platform: string) => (
              <li key={platform}>{platform}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Niveau d'Expérience</h3>
          <p>{data.experienceLevel}</p>
        </div>
      </div>
      
      <Button 
        onClick={handleCompleteOnboarding}
        disabled={isCompleting}
      >
        {isCompleting ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finalisation...
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Terminer l'Onboarding
          </>
        )}
      </Button>
    </div>
  );
};

export default SummaryStep;
