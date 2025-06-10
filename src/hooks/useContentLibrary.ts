
import { useState } from 'react';
import { ContentItem, ContentType, ContentStatus } from '@/types/content';

const useContentLibrary = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Personal Story',
      type: 'script',
      description: 'Script for sharing journey',
      content: 'Script content here...',
      status: 'draft',
      createdAt: new Date(),
      tags: ['personal', 'story'],
      platform: ['Instagram', 'TikTok']
    },
    {
      id: '2',
      title: 'Creative Video',
      type: 'concept',
      description: 'Video concept idea',
      content: 'Concept details...',
      status: 'planned',
      createdAt: new Date(),
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      tags: ['video', 'creative'],
      platform: ['YouTube']
    }
  ]);

  const addContent = (content: Omit<ContentItem, 'id' | 'createdAt'>) => {
    const newContent: ContentItem = {
      ...content,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setContents(prev => [newContent, ...prev]);
  };

  const updateContent = (id: string, updates: Partial<ContentItem>) => {
    setContents(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteContent = (id: string) => {
    setContents(prev => prev.filter(item => item.id !== id));
  };

  const getContentsByType = (type: ContentType) => {
    return contents.filter(item => item.type === type);
  };

  const getContentsByStatus = (status: ContentStatus) => {
    return contents.filter(item => item.status === status);
  };

  return {
    contents,
    addContent,
    updateContent,
    deleteContent,
    getContentsByType,
    getContentsByStatus
  };
};

export default useContentLibrary;
