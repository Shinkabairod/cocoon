
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { 
  FileText, 
  Video, 
  Image, 
  Mic,
  Globe,
  MessageSquare,
  Code,
  Target
} from "lucide-react";

const ToolsPreferencesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [toolsPreferences, setToolsPreferences] = useState<string[]>(onboardingData.toolsPreferences || []);
  const [contentTypes, setContentTypes] = useState<string[]>(onboardingData.contentTypes || []);
  const [platforms, setPlatforms] = useState<string[]>(onboardingData.platforms || []);
  
  const tools = [
    { id: 'text_generation', name: 'Génération de texte', icon: <FileText className="h-6 w-6" />, description: 'Articles, emails, descriptions' },
    { id: 'image_creation', name: 'Création d\'images', icon: <Image className="h-6 w-6" />, description: 'Visuels, illustrations, designs' },
    { id: 'video_scripts', name: 'Scripts vidéo', icon: <Video className="h-6 w-6" />, description: 'Scénarios, storyboards' },
    { id: 'audio_content', name: 'Contenu audio', icon: <Mic className="h-6 w-6" />, description: 'Podcasts, voix off' },
    { id: 'social_media', name: 'Réseaux sociaux', icon: <MessageSquare className="h-6 w-6" />, description: 'Posts, hashtags, engagement' },
    { id: 'web_content', name: 'Contenu web', icon: <Globe className="h-6 w-6" />, description: 'Sites, blogs, SEO' },
    { id: 'automation', name: 'Automatisation', icon: <Code className="h-6 w-6" />, description: 'Workflows, tâches répétitives' },
    { id: 'analysis', name: 'Analyse', icon: <Target className="h-6 w-6" />, description: 'Données, performances, insights' }
  ];
  
  const contentTypeOptions = [
    { id: 'articles', name: 'Articles de blog' },
    { id: 'videos', name: 'Vidéos' },
    { id: 'social_posts', name: 'Posts sociaux' },
    { id: 'newsletters', name: 'Newsletters' },
    { id: 'presentations', name: 'Présentations' },
    { id: 'podcasts', name: 'Podcasts' }
  ];
  
  const platformOptions = [
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'twitter', name: 'Twitter/X' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'blog', name: 'Blog personnel' },
    { id: 'website', name: 'Site web' }
  ];
  
  const toggleTool = (toolId: string) => {
    setToolsPreferences(prev => 
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };
  
  const toggleContentType = (typeId: string) => {
    setContentTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };
  
  const togglePlatform = (platformId: string) => {
    setPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      toolsPreferences,
      contentTypes,
      platforms
    });
    nextStep();
  };
  
  const isValid = toolsPreferences.length > 0;
  
  return (
    <OnboardingLayout 
      title="Vos préférences d'outils" 
      subtitle="Personnalisez votre expérience selon vos besoins"
      fullWidth={true}
    >
      <div className="space-y-8">
        {/* Outils IA préférés */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Outils IA qui vous intéressent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((tool) => {
              const isSelected = toolsPreferences.includes(tool.id);
              
              return (
                <Card 
                  key={tool.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? 'ring-2 ring-purple-500 bg-purple-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleTool(tool.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`inline-flex p-3 rounded-full mb-3 ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                    }`}>
                      {tool.icon}
                    </div>
                    <h4 className="font-medium mb-1">{tool.name}</h4>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Types de contenu */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Types de contenu à créer (optionnel)</h3>
          <div className="flex flex-wrap gap-2">
            {contentTypeOptions.map((type) => (
              <Button
                key={type.id}
                variant={contentTypes.includes(type.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleContentType(type.id)}
                className="h-8"
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Plateformes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Plateformes utilisées (optionnel)</h3>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map((platform) => (
              <Button
                key={platform.id}
                variant={platforms.includes(platform.id) ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform(platform.id)}
                className="h-8"
              >
                {platform.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="w-full max-w-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleContinue}
            disabled={!isValid}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ToolsPreferencesStep;
