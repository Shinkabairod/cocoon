
import { Resource } from "@/types/onboarding";
import { Card } from "@/components/ui/card";
import { Check, FileText, Video, BookOpen, Pencil, Users, Wrench, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ResourceDetails from "./ResourceDetails";

interface ResourceCardProps {
  resource: Resource;
  toggleResourceSelection: (resourceId: string) => void;
}

const ResourceCard = ({ resource, toggleResourceSelection }: ResourceCardProps) => {
  const getResourceIcon = (type: string) => {
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

  return (
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
            >
              Details
            </Button>
          </SheetTrigger>
          <ResourceDetails resource={resource} toggleResourceSelection={toggleResourceSelection} />
        </Sheet>
      </div>
    </Card>
  );
};

export default ResourceCard;
