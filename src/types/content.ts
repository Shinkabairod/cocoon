
export type ContentType = 'script' | 'concept' | 'idea' | 'video' | 'post';
export type ContentStatus = 'draft' | 'planned' | 'published' | 'archived';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  description: string;
  content: string;
  status: ContentStatus;
  createdAt: Date;
  scheduledAt?: Date;
  platform?: string[];
  tags: string[];
  thumbnail?: string;
}

export interface CalendarEvent {
  id: string;
  contentId: string;
  date: Date;
  platform: string;
  status: ContentStatus;
}
