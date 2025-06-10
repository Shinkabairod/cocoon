
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, FileText, Zap, MessageSquare, BarChart3, 
  TrendingUp, Plus, Eye, Github, BookOpen, Shield, Sparkles
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
      {/* AI Tools Header */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold mb-2">AI Content Tools</h2>
        <p className="text-muted-foreground">Supercharge your content creation with AI</p>
      </div>

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

      {/* AI Insights */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-coach-primary" />
          AI Insights
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 mt-0.5">💡</div>
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Trending Content Format</p>
                <p className="text-xs text-blue-700">Short videos (30-60s) generate 3x more engagement this week</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-0.5">🎯</div>
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Optimal Posting Time</p>
                <p className="text-xs text-green-700">Your audience is most active between 6-9 PM</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-purple-600 mt-0.5">📈</div>
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">Growth Opportunity</p>
                <p className="text-xs text-purple-700">Consider collaborating with creators in your niche</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ToolsTab;
