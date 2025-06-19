
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Brain, 
  FileText, 
  Calendar, 
  CheckCircle,
  Loader2
} from "lucide-react";

interface AIToolsSectionProps {
  loading: boolean;
  onToolClick: (toolId: string) => void;
}

const AIToolsSection = ({ loading, onToolClick }: AIToolsSectionProps) => {
  const aiTools = [
    {
      id: "concept-finding",
      title: "Finding Concept",
      icon: <Lightbulb className="h-5 w-5" />,
      description: "Discover video, blog, and post concepts",
      action: "Generate Concepts"
    },
    {
      id: "idea-generation",
      title: "Finding Ideas",
      icon: <Brain className="h-5 w-5" />,
      description: "Get creative ideas for your content",
      action: "Get Ideas"
    },
    {
      id: "script-creation",
      title: "Create Script",
      icon: <FileText className="h-5 w-5" />,
      description: "Generate personalized scripts",
      action: "Create Script"
    },
    {
      id: "content-calendar",
      title: "Content Calendar",
      icon: <Calendar className="h-5 w-5" />,
      description: "Plan your content schedule",
      action: "Plan Content"
    },
    {
      id: "script-feedback",
      title: "Script Feedback",
      icon: <CheckCircle className="h-5 w-5" />,
      description: "Get AI feedback on your scripts",
      action: "Get Feedback"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">AI Assistant Tools</h2>
        <Badge variant="secondary" className="bg-coach-primary/10 text-coach-primary">
          Powered by your resources
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiTools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-coach-primary to-coach-secondary flex items-center justify-center mr-3 text-white group-hover:scale-110 transition-transform">
                  {loading && ['concept-finding', 'script-creation', 'idea-generation', 'script-feedback'].includes(tool.id) ? 
                    <Loader2 className="h-5 w-5 animate-spin" /> : 
                    tool.icon
                  }
                </div>
                {tool.title}
              </CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => onToolClick(tool.id)}
                className="w-full gradient-bg"
                variant="default"
                disabled={loading}
              >
                {tool.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIToolsSection;
