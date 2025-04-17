
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Tag, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { resourcesList, resourceTags } from "@/components/onboarding/content-type/contentTypeData";
import { useState } from "react";

const ResourcesTagsStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [selectedTags, setSelectedTags] = useState<string[]>(
    onboardingData.selectedResourceTags || []
  );
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      selectedResourceTags: selectedTags,
      selectedResources: resourcesList.filter(r => 
        r.tags?.some(t => selectedTags.includes(t))
      ).map(r => ({...r, selected: true}))
    });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Resource Tags" 
      subtitle="What specific content creation topics are you interested in learning about?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Tag className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <p className="text-sm mb-3">Select topics you'd like resources on</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {resourceTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    px-3 py-1.5 text-sm cursor-pointer 
                    ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                  `}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
          
          {selectedTags.length > 0 && (
            <div className="space-y-3 mt-5">
              <h3 className="text-sm font-medium">Recommended resources based on your selections:</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {resourcesList
                  .filter(resource => resource.tags?.some(tag => selectedTags.includes(tag)))
                  .slice(0, 3)
                  .map((resource) => (
                    <Card key={resource.id} className="p-3">
                      <div className="flex items-start space-x-3">
                        <BookOpen className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium text-sm">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {resource.tags?.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs px-1.5 py-0"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={selectedTags.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ResourcesTagsStep;
