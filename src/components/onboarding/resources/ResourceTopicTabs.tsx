
import { Resource, ResourceTopic } from "@/types/onboarding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResourceCard from "./ResourceCard";

interface ResourceTopicTabsProps {
  activeTab: ResourceTopic;
  setActiveTab: (topic: ResourceTopic) => void;
  resources: Resource[];
  resourceTopics: ResourceTopic[];
  toggleResourceSelection: (resourceId: string) => void;
  getResourcesForTopic: (topic: ResourceTopic) => Resource[];
}

const ResourceTopicTabs = ({ 
  activeTab, 
  setActiveTab, 
  resources, 
  resourceTopics, 
  toggleResourceSelection,
  getResourcesForTopic
}: ResourceTopicTabsProps) => {
  return (
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
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    toggleResourceSelection={toggleResourceSelection} 
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No resources available on this topic at the moment.
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ResourceTopicTabs;
