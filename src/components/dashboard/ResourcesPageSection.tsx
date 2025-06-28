
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Folder,
  Plus,
  Upload,
  FileText,
  User,
  MoreHorizontal
} from 'lucide-react';

interface ResourcesPageSectionProps {
  folders: {
    resources: Array<{ id: string; name: string; emoji: string; items: any[] }>;
    personal: Array<{ id: string; name: string; emoji: string; items: any[] }>;
  };
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onOpenNewFolder: () => void;
  onOpenNewItem: () => void;
}

const ResourcesPageSection: React.FC<ResourcesPageSectionProps> = ({
  folders,
  activeCategory,
  onCategoryChange,
  onOpenNewFolder,
  onOpenNewItem
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Folder className="h-7 w-7 mr-2 text-blue-500" />
          Mes Ressources
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={onOpenNewFolder} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nouveau dossier
          </Button>
          <Button onClick={onOpenNewItem} size="sm">
            <Upload className="h-4 w-4 mr-1" />
            Ajouter ressource
          </Button>
        </div>
      </div>

      {/* Catégories */}
      <div className="flex space-x-2">
        <Button
          variant={activeCategory === 'resources' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('resources')}
          size="sm"
        >
          <FileText className="h-4 w-4 mr-1" />
          Ressources ({folders.resources.length})
        </Button>
        <Button
          variant={activeCategory === 'personal' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('personal')}
          size="sm"
        >
          <User className="h-4 w-4 mr-1" />
          Personnel ({folders.personal.length})
        </Button>
      </div>

      {/* Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders[activeCategory as keyof typeof folders].map((folder) => (
          <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{folder.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {folder.items.length} éléments
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPageSection;
