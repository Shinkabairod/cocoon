
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Resource, ResourceTopic } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { useState, useEffect } from "react";
import ResourceTopicTabs from "./resources/ResourceTopicTabs";
import { generateRecommendedResources, getResourceTopics } from "./resources/ResourcesData";

const ResourcesStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [resources, setResources] = useState<Resource[]>(onboardingData.selectedResources || []);
  const [activeTab, setActiveTab] = useState<ResourceTopic>("Storytelling");
  
  const resourceTopics = getResourceTopics();

  useEffect(() => {
    const recommendedResources: Resource[] = generateRecommendedResources();
    
    if (onboardingData.selectedResources && onboardingData.selectedResources.length > 0) {
      setResources(onboardingData.selectedResources);
    } else {
      setResources(recommendedResources);
    }
  }, [onboardingData.contentTypes, onboardingData.contentChallenges]);

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
      title="Educational Resources" 
      subtitle="Select resources to improve your skills and enhance your AI Coach"
    >
      <div className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg border border-muted">
          <p className="text-sm text-center">
            Based on your profile and goals, we have selected resources 
            that could be useful for you. Your AI Coach will use these resources to guide you.
          </p>
        </div>

        <ResourceTopicTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          resources={resources}
          resourceTopics={resourceTopics}
          toggleResourceSelection={toggleResourceSelection}
          getResourcesForTopic={getResourcesForTopic}
        />
        
        <div className="flex justify-between items-center pt-4">
          <div className="text-sm">
            {getSelectedResourcesCount()} resource(s) selected
          </div>
          <Button 
            className="gradient-bg"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ResourcesStep;
