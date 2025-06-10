
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ContentLibrary from '@/components/content/ContentLibrary';
import ContentCalendar from '@/components/content/ContentCalendar';
import { ContentItem } from '@/types/content';
import { Plus, Calendar } from 'lucide-react';

interface LibraryTabProps {
  contents: ContentItem[];
  getContentsByStatus: (status: string) => ContentItem[];
}

const LibraryTab = ({ contents, getContentsByStatus }: LibraryTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-coach-primary">Content Library</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and organize your content</p>
        </div>
        <Button className="gradient-bg shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">{getContentsByStatus('draft').length}</div>
          <div className="text-xs text-blue-700 font-medium">Drafts</div>
          <div className="text-xs text-blue-600 mt-1">Ready to edit</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600 mb-1">{getContentsByStatus('planned').length}</div>
          <div className="text-xs text-yellow-700 font-medium">Planned</div>
          <div className="text-xs text-yellow-600 mt-1">Scheduled</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-1">{getContentsByStatus('published').length}</div>
          <div className="text-xs text-green-700 font-medium">Published</div>
          <div className="text-xs text-green-600 mt-1">Live content</div>
        </Card>
      </div>

      {/* Content Library Component */}
      <Card className="p-1">
        <ContentLibrary 
          contents={contents}
          onEdit={(content) => console.log('Edit:', content)}
          onSchedule={(content) => console.log('Schedule:', content)}
        />
      </Card>

      {/* Editorial Calendar */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-coach-primary" />
          Editorial Calendar
        </h3>
        <ContentCalendar contents={contents} />
      </Card>
    </div>
  );
};

export default LibraryTab;
