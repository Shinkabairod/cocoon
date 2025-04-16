import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Resource, ResourceTopic, ResourceType } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Check, FileText, Video, BookOpen, Pencil, Users, Wrench, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const ResourcesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [resources, setResources] = useState<Resource[]>(onboardingData.selectedResources || []);
  const [activeTab, setActiveTab] = useState<ResourceTopic>("Storytelling");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    const recommendedResources: Resource[] = generateRecommendedResources();
    
    if (onboardingData.selectedResources && onboardingData.selectedResources.length > 0) {
      setResources(onboardingData.selectedResources);
    } else {
      setResources(recommendedResources);
    }
  }, [onboardingData.contentTypes, onboardingData.contentChallenges]);

  const generateRecommendedResources = (): Resource[] => {
    return [
      {
        id: "1",
        type: "PDF",
        topic: "Storytelling",
        title: "L'art du storytelling pour créateurs de contenu",
        description: "Apprenez à captiver votre audience avec des histoires mémorables et engageantes.",
        selected: false
      },
      {
        id: "2",
        type: "Video",
        topic: "Storytelling",
        title: "Structure narrative pour vidéos courtes",
        description: "Techniques de narration adaptées aux formats courts (TikTok, Instagram Reels).",
        selected: false
      },
      {
        id: "3",
        type: "Book",
        topic: "Storytelling",
        title: "Le héros aux mille visages",
        description: "Principes fondamentaux du voyage du héros et son application en création de contenu.",
        selected: false
      },
      {
        id: "4",
        type: "Course",
        topic: "Camera Techniques",
        title: "Maîtriser les fondamentaux de la vidéo avec smartphone",
        description: "Techniques professionnelles pour filmer avec un téléphone portable.",
        selected: false
      },
      {
        id: "5",
        type: "Template",
        topic: "Scripting",
        title: "Modèles de scripts pour différents formats vidéo",
        description: "Collection de templates pour vlogs, tutoriels, interviews et plus encore.",
        selected: false
      },
      {
        id: "6",
        type: "PDF",
        topic: "Editing",
        title: "Guide des techniques de montage vidéo essentielles",
        description: "Les principes fondamentaux du montage pour débutants et intermédiaires.",
        selected: false
      },
      {
        id: "7",
        type: "Tool",
        topic: "Content Planning",
        title: "Calendrier éditorial optimisé",
        description: "Planifiez votre contenu de manière stratégique avec ce template personnalisable.",
        selected: false
      },
      {
        id: "8",
        type: "Community",
        topic: "Business Strategy",
        title: "Communauté de créateurs de contenu francophones",
        description: "Rejoignez un groupe de créateurs pour échanger des conseils et obtenir du feedback.",
        selected: false
      },
      {
        id: "9",
        type: "PDF",
        topic: "SEO",
        title: "SEO pour créateurs de contenu vidéo",
        description: "Optimisez vos vidéos pour les moteurs de recherche et augmentez votre visibilité.",
        selected: false
      }
    ];
  };

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      case "Book":
        return <BookOpen className="h-5 w-5" />;
      case "Course":
        return <Pencil className="h-5 w-5" />;
      case "Template":
        return <FileText className="h-5 w-5" />;
      case "Tool":
        return <Wrench className="h-5 w-5" />;
      case "Community":
        return <Users className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const resourceTopics: ResourceTopic[] = [
    "Storytelling",
    "Camera Techniques",
    "Editing",
    "Scripting",
    "Business Strategy",
    "SEO",
    "Marketing",
    "Content Planning",
    "Analytics"
  ];

  const toggleResourceSelection = (resourceId: string) => {
    const updatedResources = resources.map(resource => {
      if (resource.id === resourceId) {
        return { ...resource, selected: !resource.selected };
      }
      return resource;
    });
    
    setResources(updatedResources);
    updateOnboardingData({ 
      selectedResources: updatedResources
    });
  };

  const handleResourceDetails = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const getResourcesForTopic = (topic: ResourceTopic) => {
    return resources.filter(resource => resource.topic === topic);
  };

  const getSelectedResourcesCount = () => {
    return resources.filter(resource => resource.selected).length;
  };

  const handleContinue = () => {
    updateOnboardingData({ 
      selectedResources: resources 
    });
    nextStep();
  };

  return (
    <OnboardingLayout 
      title="Ressources Pédagogiques" 
      subtitle="Sélectionnez des ressources pour améliorer vos compétences et enrichir votre AI Coach"
    >
      <div className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg border border-muted">
          <p className="text-sm text-center">
            En fonction de votre profil et de vos objectifs, nous avons sélectionné des ressources 
            qui pourraient vous être utiles. Votre AI Coach utilisera ces ressources pour vous guider.
          </p>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as ResourceTopic)}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
            {resourceTopics.slice(0, 5).map((topic) => (
              <TabsTrigger key={topic} value={topic} className="text-xs">
                {topic}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            {resourceTopics.slice(5).map((topic) => (
              <TabsTrigger key={topic} value={topic} className="text-xs">
                {topic}
              </TabsTrigger>
            ))}
          </TabsList>

          {resourceTopics.map((topic) => (
            <TabsContent key={topic} value={topic} className="mt-0">
              <ScrollArea className="h-[320px] rounded-md border p-4">
                <div className="grid grid-cols-1 gap-4">
                  {getResourcesForTopic(topic).length > 0 ? (
                    getResourcesForTopic(topic).map((resource) => (
                      <Card key={resource.id} className="p-4 cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <div 
                            className={`min-w-[24px] h-6 flex items-center justify-center rounded-full border ${
                              resource.selected ? 'bg-primary border-primary' : 'border-muted-foreground'
                            }`}
                            onClick={() => toggleResourceSelection(resource.id)}
                          >
                            {resource.selected && <Check className="h-4 w-4 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1 space-x-1">
                              {getResourceIcon(resource.type)}
                              <span className="text-xs font-medium text-muted-foreground">{resource.type}</span>
                            </div>
                            <h4 className="font-medium mb-1">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => handleResourceDetails(resource)}
                              >
                                Détails
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>{selectedResource?.title}</SheetTitle>
                                <SheetDescription>
                                  <div className="flex items-center mt-1 mb-4">
                                    {selectedResource && getResourceIcon(selectedResource.type)}
                                    <span className="text-sm ml-1">{selectedResource?.type}</span>
                                  </div>
                                </SheetDescription>
                              </SheetHeader>
                              <div className="mt-6">
                                <p className="mb-4">{selectedResource?.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  Cette ressource aide à résoudre les défis liés à {selectedResource?.topic}.
                                  Elle sera intégrée à votre AI Coach pour vous fournir des conseils personnalisés.
                                </p>
                                <div className="mt-6">
                                  <Button 
                                    onClick={() => selectedResource && toggleResourceSelection(selectedResource.id)}
                                    className="w-full"
                                    variant={selectedResource?.selected ? "outline" : "default"}
                                  >
                                    {selectedResource?.selected ? "Retirer de la sélection" : "Ajouter à la sélection"}
                                  </Button>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucune ressource disponible sur ce sujet pour le moment.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-between items-center pt-4">
          <div className="text-sm">
            {getSelectedResourcesCount()} ressource(s) sélectionnée(s)
          </div>
          <Button 
            className="gradient-bg"
            onClick={handleContinue}
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ResourcesStep;
