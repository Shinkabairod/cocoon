
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useOnboardingComplete } from '@/hooks/useOnboardingComplete';
import { Sparkles, Rocket, CheckCircle, Loader2, User, Target, Clock } from 'lucide-react';
import OnboardingLayout from '../OnboardingLayout';
import { Card } from '@/components/ui/card';

const SummaryStep: React.FC = () => {
  const { onboardingData, prevStep } = useOnboarding();
  const { completeOnboarding, isProcessing } = useOnboardingComplete();
  const [isCreating, setIsCreating] = useState(false);

  const handleComplete = async () => {
    setIsCreating(true);
    
    try {
      await completeOnboarding();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getSummary = () => {
    return {
      name: onboardingData.fullName || 'Utilisateur',
      profession: onboardingData.profession || 'Non spécifié',
      objectivesCount: onboardingData.objectives?.length || 0,
      challengesCount: onboardingData.challenges?.length || 0,
      toolsCount: onboardingData.toolsPreferences?.length || 0,
      aiAreasCount: onboardingData.aiAssistanceAreas?.length || 0
    };
  };

  const summary = getSummary();

  if (isCreating || isProcessing) {
    return (
      <OnboardingLayout showProgress={false}>
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-12 w-12 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Configuration de votre <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Assistant IA</span>...
            </h1>
            <p className="text-xl text-gray-600">Personnalisation en cours...</p>
          </div>

          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Analyse de votre profil</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Configuration des préférences</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="h-5 w-5 text-violet-600 animate-spin" />
              <span>Création de votre espace de travail</span>
            </div>
          </div>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout
      title="Configuration terminée ! 🎉"
      subtitle="Votre assistant IA personnel est prêt"
      showProgress={false}
    >
      <div className="space-y-8">
        {/* Résumé du profil */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-violet-50 to-blue-50 border-violet-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profil</p>
                <p className="font-medium">{summary.name}</p>
                <p className="text-sm text-gray-500">{summary.profession}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Objectifs</p>
                <p className="font-medium">{summary.objectivesCount} définis</p>
                <p className="text-sm text-gray-500">Assistance ciblée</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Spécialisation</p>
                <p className="font-medium">{summary.aiAreasCount} domaines</p>
                <p className="text-sm text-gray-500">IA optimisée</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Fonctionnalités disponibles */}
        <Card className="p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Votre assistant vous aidera avec :
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Idées personnalisées</h4>
              <p className="text-sm text-gray-600">Adaptées à vos objectifs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Stratégies ciblées</h4>
              <p className="text-sm text-gray-600">Pour relever vos défis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Accompagnement</h4>
              <p className="text-sm text-gray-600">À votre rythme</p>
            </div>
          </div>
        </Card>

        {/* Boutons d'action */}
        <div className="flex justify-between items-center pt-4">
          <Button 
            variant="outline"
            onClick={prevStep}
            className="px-6"
          >
            Retour
          </Button>
          
          <Button
            onClick={handleComplete}
            disabled={isCreating}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Rocket className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            Commencer avec mon assistant IA
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SummaryStep;
