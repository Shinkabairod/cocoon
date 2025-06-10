
import { useState } from 'react';
import { ContentItem, ContentType, ContentStatus } from '@/types/content';

const useContentLibrary = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Mon Histoire Personnelle',
      type: 'script',
      description: 'Script pour partager mon parcours',
      content: 'Intro: Bonjour, je suis... [développer]',
      status: 'draft',
      createdAt: new Date(),
      tags: ['personnel', 'story'],
      platform: ['Instagram', 'TikTok']
    },
    {
      id: '2',
      title: 'Conseils Créativité',
      type: 'concept',
      description: 'Série sur les techniques créatives',
      content: '5 techniques pour débloquer sa créativité...',
      status: 'planned',
      createdAt: new Date(),
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      tags: ['tips', 'créativité'],
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
