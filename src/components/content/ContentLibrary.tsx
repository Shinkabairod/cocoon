
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentItem, ContentType } from '@/types/content';
import { 
  FileText, Lightbulb, Video, Edit, 
  Calendar, MoreHorizontal, Zap
} from 'lucide-react';

interface ContentLibraryProps {
  contents: ContentItem[];
  onEdit: (content: ContentItem) => void;
  onSchedule: (content: ContentItem) => void;
}

const ContentLibrary = ({ contents, onEdit, onSchedule }: ContentLibraryProps) => {
  const [activeTab, setActiveTab] = useState<ContentType>('concept');

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'concept': return <Lightbulb className="h-4 w-4" />;
      case 'idea': return <Zap className="h-4 w-4" />;
      case 'script': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterContentsByType = (type: ContentType) => {
    return contents.filter(content => content.type === type);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concept">Concepts</TabsTrigger>
          <TabsTrigger value="idea">Ideas</TabsTrigger>
          <TabsTrigger value="script">Scripts</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
        </TabsList>

        {(['concept', 'idea', 'script', 'video'] as ContentType[]).map(type => (
          <TabsContent key={type} value={type} className="space-y-3">
            {filterContentsByType(type).length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No {type}s yet</p>
              </Card>
            ) : (
              filterContentsByType(type).map(content => (
                <Card key={content.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(content.type)}
                        <h4 className="font-medium">{content.title}</h4>
                        <Badge className={getStatusColor(content.status)}>
                          {content.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {content.description}
                      </p>
                      <div className="flex gap-1 mb-2">
                        {content.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {content.platform && content.platform.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Platforms: {content.platform.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(content)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onSchedule(content)}>
                        <Calendar className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentLibrary;
