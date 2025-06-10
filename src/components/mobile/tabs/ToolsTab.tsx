
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, FileText, Zap, MessageSquare, BarChart3, 
  TrendingUp, Plus, Eye, Github, BookOpen, Shield
} from 'lucide-react';

interface ToolsTabProps {
  onIconClick: (id: string) => void;
}

const ToolsTab = ({ onIconClick }: ToolsTabProps) => {
  const aiToolCategories = [
    {
      title: "Content Creation",
      description: "Generate and enhance your content",
      icons: [
        { id: "concept", icon: <Lightbulb className="h-6 w-6" />, label: "Concepts" },
        { id: "script", icon: <FileText className="h-6 w-6" />, label: "Scripts" },
        { id: "ideas", icon: <Zap className="h-6 w-6" />, label: "Ideas" }
      ]
    },
    {
      title: "Analysis & Feedback",
      description: "Improve with AI insights",
      icons: [
        { id: "feedback", icon: <MessageSquare className="h-6 w-6" />, label: "Feedback" },
        { id: "analytics", icon: <BarChart3 className="h-6 w-6" />, label: "Analytics" },
        { id: "optimize", icon: <TrendingUp className="h-6 w-6" />, label: "Optimize" }
      ]
    },
    {
      title: "Creator References",
      description: "Add and manage creator accounts for inspiration",
      icons: [
        { id: "add-creator", icon: <Plus className="h-6 w-6" />, label: "Add Creator" },
        { id: "view-references", icon: <Eye className="h-6 w-6" />, label: "References" },
        { id: "analyze-creators", icon: <BarChart3 className="h-6 w-6" />, label: "Analyze" }
      ]
    }
  ];

  const resourceIcons = [
    { id: "github", icon: <Github className="h-5 w-5" />, label: "GitHub", status: "connected" },
    { id: "notion", icon: <BookOpen className="h-5 w-5" />, label: "Notion", status: "disconnected" },
    { id: "obsidian", icon: <Eye className="h-5 w-5" />, label: "Obsidian", status: "connected" },
    { id: "logseq", icon: <Shield className="h-5 w-5" />, label: "LogSeq", status: "disconnected" }
  ];

  return (
    <div className="space-y-6">
      {/* Tool Categories */}
      {aiToolCategories.map((category, index) => (
        <Card key={index} className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {category.icons.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onIconClick(tool.id)}
                className="flex flex-col items-center p-4 rounded-lg bg-soft-blue hover:bg-soft-blue/80 transition-colors"
              >
                <div className="text-coach-primary mb-2">{tool.icon}</div>
                <span className="text-xs font-medium text-center">{tool.label}</span>
              </button>
            ))}
          </div>
        </Card>
      ))}

      {/* Connected Resources */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-coach-primary" />
          Connected Resources
        </h3>
        <div className="space-y-3">
          {resourceIcons.map(({ id, icon, label, status }) => (
            <div key={id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-coach-primary">{icon}</div>
                <span className="text-sm font-medium">{label}</span>
              </div>
              <Badge 
                variant={status === 'connected' ? 'default' : 'outline'}
                className={status === 'connected' ? 'bg-green-100 text-green-700' : ''}
              >
                {status === 'connected' ? 'Connected' : 'Connect'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ToolsTab;
