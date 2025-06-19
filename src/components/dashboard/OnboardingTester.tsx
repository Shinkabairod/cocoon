
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboardingComplete } from '@/hooks/useOnboardingComplete';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Play, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

const OnboardingTester = () => {
  const { user } = useAuth();
  const { completeOnboarding, isProcessing, isCompleted } = useOnboardingComplete();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  const setupTestData = () => {
    console.log('🎯 Configuration des données de test...');
    // Simuler des données d'onboarding complètes pour le test
    const testData = {
      step: 21,
      experienceLevel: 'Beginner' as const,
      contentGoal: 'Grow an audience' as const,
      country: 'France',
      city: 'Paris',
      businessType: 'Personal Brand' as const,
      businessDescription: 'Créateur de contenu tech et lifestyle',
      platforms: ['YouTube', 'Instagram', 'TikTok'],
      contentTypes: ['Videos', 'Social Media Posts'],
      niche: 'Tech & Lifestyle',
      contentChallenges: ['Script writing', 'Editing', 'Promotion'],
      timeAvailable: '3-5 hours' as const,
      targetGeneration: 'Millennials' as const,
      impactGoals: ['Educate', 'Entertain'],
      learningStyle: 'Video tutorials' as const,
      monetization: 'Yes' as const
    };
    
    console.log('📋 Données de test configurées:', testData);
    updateOnboardingData(testData);
  };

  const runCompleteTest = async () => {
    if (!user) {
      console.error('❌ Pas d\'utilisateur connecté');
      return;
    }
    
    console.log('🚀 Début du test d\'onboarding complet...');
    setupTestData();
    await completeOnboarding();
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-md border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <span>Test réussi !</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-600">
            L'onboarding complet a été testé avec succès. 
            Votre structure Obsidian est créée et fonctionnelle.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="h-5 w-5" />
          <span>Test onboarding complet</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user && (
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-700">
              Vous devez être connecté pour tester
            </span>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Teste la création complète de la structure Obsidian avec des données simulées.
        </p>
        
        <Button 
          onClick={runCompleteTest}
          disabled={isProcessing || !user}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Création en cours...
            </>
          ) : (
            'Lancer le test complet'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OnboardingTester;
