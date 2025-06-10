
import { useState } from 'react';
import { ContentItem, ContentType, ContentStatus } from '@/types/content';

const useContentLibrary = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'My Personal Story',
      type: 'script',
      description: 'Script to share my journey',
      content: 'Intro: Hello, I am... [develop]',
      status: 'draft',
      createdAt: new Date(),
      tags: ['personal', 'story'],
      platform: ['Instagram', 'TikTok']
    },
    {
      id: '2',
      title: 'Creativity Tips',
      type: 'concept',
      description: 'Series on creative techniques',
      content: '5 techniques to unlock your creativity...',
      status: 'planned',
      createdAt: new Date(),
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      tags: ['tips', 'creativity'],
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
