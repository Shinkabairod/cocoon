
// src/components/dashboard/pages/LibraryPage.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons, Icon2D } from '@/components/ui/icons';
import { useWorkspace } from '@/hooks/useWorkspace';

interface LibraryPageProps {
  user: any;
  onboardingData: any;
  userStats: any;
}

const LibraryPage: React.FC<LibraryPageProps> = ({
  user,
  onboardingData,
  userStats
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Utilisons getWorkspaceStats au lieu de getStats
  const { getWorkspaceStats } = useWorkspace();
  const stats = getWorkspaceStats();

  const categories = [
    { id: 'all', label: 'All Items', icon: Icons.folders.Archive },
    { id: 'templates', label: 'Templates', icon: Icons.files.Clipboard },
    { id: 'resources', label: 'Resources', icon: Icons.files.Link },
    { id: 'scripts', label: 'Scripts', icon: Icons.files.FileText },
    { id: 'media', label: 'Media', icon: Icons.files.Video },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Icon2D icon={Icons.folders.BookOpen} size={32} color="#8B5CF6" />
            Library
          </h1>
          <p className="text-muted-foreground mt-2">
            Your collection of templates, resources, and saved content
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon2D 
              icon={Icons.actions.Search} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              size={16}
            />
            <Input
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button>
            <Icon2D icon={Icons.actions.Plus} size={16} className="mr-2" />
            Add to Library
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Icon2D icon={category.icon} size={16} />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.Clipboard} size={24} color="#3B82F6" />
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.Link} size={24} color="#10B981" />
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.resourceFiles}</div>
                <div className="text-sm text-muted-foreground">Resources</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.FileText} size={24} color="#8B5CF6" />
              <div>
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-muted-foreground">Scripts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon2D icon={Icons.files.Video} size={24} color="#F59E0B" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.videoFiles}</div>
                <div className="text-sm text-muted-foreground">Media Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Library Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon2D icon={Icons.folders.Archive} size={20} />
            Library Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Icon2D 
              icon={Icons.folders.BookOpen} 
              size={64} 
              className="mx-auto mb-4 text-muted-foreground" 
            />
            <h3 className="text-lg font-semibold mb-2">Your Library is Empty</h3>
            <p className="text-muted-foreground mb-6">
              Start building your library by saving templates, resources, and content.
            </p>
            <Button>
              <Icon2D icon={Icons.actions.Plus} size={16} className="mr-2" />
              Add First Item
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryPage;
