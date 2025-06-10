
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ContentItem } from '@/types/content';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentCalendarProps {
  contents: ContentItem[];
}

const ContentCalendar = ({ contents }: ContentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const getScheduledContents = (date: Date) => {
    return contents.filter(content => 
      content.scheduledAt && 
      content.scheduledAt.toDateString() === date.toDateString()
    );
  };

  const getUpcomingContents = () => {
    const now = new Date();
    return contents
      .filter(content => content.scheduledAt && content.scheduledAt > now)
      .sort((a, b) => (a.scheduledAt?.getTime() || 0) - (b.scheduledAt?.getTime() || 0))
      .slice(0, 5);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Editorial Calendar</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            onClick={() => setViewMode('calendar')}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md"
            />
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-3">
              Scheduled content for {formatDate(selectedDate)}
            </h4>
            {getScheduledContents(selectedDate).length === 0 ? (
              <p className="text-muted-foreground text-sm">No content scheduled</p>
            ) : (
              <div className="space-y-2">
                {getScheduledContents(selectedDate).map(content => (
                  <div key={content.id} className="p-2 border rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-sm">{content.title}</h5>
                        <p className="text-xs text-muted-foreground">
                          {content.platform?.join(', ')}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      ) : (
        <Card className="p-4">
          <h4 className="font-medium mb-3">Upcoming scheduled content</h4>
          {getUpcomingContents().length === 0 ? (
            <p className="text-muted-foreground">No scheduled content</p>
          ) : (
            <div className="space-y-3">
              {getUpcomingContents().map(content => (
                <div key={content.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <h5 className="font-medium">{content.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      {content.scheduledAt && formatDate(content.scheduledAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{content.type}</Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      {content.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ContentCalendar;
