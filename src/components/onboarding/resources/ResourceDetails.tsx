
import { Resource } from "@/types/onboarding";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getResourceIcon } from "@/utils/resourceIcons";

interface ResourceDetailsProps {
  resource: Resource;
  toggleResourceSelection: (resourceId: string) => void;
}

const ResourceDetails = ({ resource, toggleResourceSelection }: ResourceDetailsProps) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{resource.title}</SheetTitle>
        <SheetDescription>
          <div className="flex items-center mt-1 mb-4">
            {getResourceIcon(resource.type)}
            <span className="text-sm ml-1">{resource.type}</span>
          </div>
        </SheetDescription>
      </SheetHeader>
      <div className="mt-6">
        <p className="mb-4">{resource.description}</p>
        <p className="text-sm text-muted-foreground">
          This resource helps with challenges related to {resource.topic}.
          It will be integrated into your AI Coach to provide personalized advice.
        </p>
        <div className="mt-6">
          <Button 
            onClick={() => toggleResourceSelection(resource.id)}
            className="w-full"
            variant={resource.selected ? "outline" : "default"}
          >
            {resource.selected ? "Remove from selection" : "Add to selection"}
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default ResourceDetails;
