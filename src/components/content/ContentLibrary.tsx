
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentItem, ContentType } from '@/types/content';
import { 
  FileText, Lightbulb, Video, Edit, 
  Calendar, MoreHorizontal, Clock, User
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
      case 'script': return <FileText className="h-5 w-5" />;
      case 'concept': return <Lightbulb className="h-5 w-5" />;
      case 'idea': return <Edit className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: ContentType) => {
    switch (type) {
      case 'concept': return 'from-yellow-50 to-yellow-100 border-yellow-200';
      case 'idea': return 'from-purple-50 to-purple-100 border-purple-200';
      case 'script': return 'from-blue-50 to-blue-100 border-blue-200';
      case 'video': return 'from-green-50 to-green-100 border-green-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const filterContentsByType = (type: ContentType) => {
    return contents.filter(content => content.type === type);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="concept" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Concepts</span>
          </TabsTrigger>
          <TabsTrigger value="idea" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Ideas</span>
          </TabsTrigger>
          <TabsTrigger value="script" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Scripts</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
        </TabsList>

        {(['concept', 'idea', 'script', 'video'] as ContentType[]).map(type => (
          <TabsContent key={type} value={type} className="space-y-4">
            {filterContentsByType(type).length === 0 ? (
              <Card className={`p-8 text-center bg-gradient-to-br ${getTypeColor(type)}`}>
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-4 rounded-full bg-white/80">
                    {getTypeIcon(type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Aucun {type} pour le moment</h3>
                    <p className="text-muted-foreground text-sm">
                      Commencez à créer du contenu avec l'IA
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filterContentsByType(type).map(content => (
                  <Card key={content.id} className={`overflow-hidden bg-gradient-to-br ${getTypeColor(content.type)} hover:shadow-lg transition-all duration-200`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg">
                            {getTypeIcon(content.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{content.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {content.description}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(content.status)} font-medium`}>
                          {content.status}
                        </Badge>
                      </div>

                      {content.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {content.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs bg-white/60 border-white/80">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(content.createdAt)}
                          </div>
                          {content.platform && content.platform.length > 0 && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {content.platform.join(', ')}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onEdit(content)}
                            className="bg-white/80 hover:bg-white border-white/80"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onSchedule(content)}
                            className="bg-white/80 hover:bg-white border-white/80"
                          >
                            <Calendar className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-white/80 hover:bg-white border-white/80"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentLibrary;
