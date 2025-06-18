
import { useState } from 'react';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useToast } from '@/hooks/use-toast';

export const useAITools = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateConcepts = async () => {
    setLoading(true);
    try {
      const response = await huggingfaceService.askAI(
        "Generate 5 creative Instagram content concepts based on my profile and interests"
      );
      
      toast({
        title: "Concepts générés !",
        description: "Vos concepts Instagram sont prêts.",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer les concepts.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateScript = async (topic: string) => {
    setLoading(true);
    try {
      const response = await huggingfaceService.askAI(
        `Generate a video script for: ${topic}. Make it engaging and suitable for my target audience.`
      );
      
      toast({
        title: "Script généré !",
        description: "Votre script vidéo est prêt.",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le script.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateIdeas = async (category: string) => {
    setLoading(true);
    try {
      const response = await huggingfaceService.askAI(
        `Generate content ideas for ${category} that would resonate with my audience and align with my brand values.`
      );
      
      toast({
        title: "Idées générées !",
        description: "Vos idées de contenu sont prêtes.",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer les idées.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getFeedback = async (content: string) => {
    setLoading(true);
    try {
      const response = await huggingfaceService.askAI(
        `Analyze this content and provide constructive feedback: ${content}`
      );
      
      toast({
        title: "Feedback reçu !",
        description: "Votre analyse de contenu est prête.",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'obtenir le feedback.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const analyzePerformance = async () => {
    setLoading(true);
    try {
      const response = await huggingfaceService.askAI(
        "Analyze my content performance and suggest optimization strategies based on my goals and audience."
      );
      
      toast({
        title: "Analyse terminée !",
        description: "Votre rapport de performance est prêt.",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'analyser les performances.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const optimizeContent = async (content: string) => {
    setLoading(true);
    try {
      const response = await huggingfaceService.askAI(
        `Optimize this content for better engagement and reach: ${content}`
      );
      
      toast({
        title: "Contenu optimisé !",
        description: "Vos suggestions d'optimisation sont prêtes.",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'optimiser le contenu.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    generateConcepts,
    generateScript,
    generateIdeas,
    getFeedback,
    analyzePerformance,
    optimizeContent
  };
};
