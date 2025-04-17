
import { FileText, Video, BookOpen, Pencil, Users, Wrench, Database } from "lucide-react";
import { ResourceType } from "@/types/onboarding";

export const getResourceIcon = (type: ResourceType) => {
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
