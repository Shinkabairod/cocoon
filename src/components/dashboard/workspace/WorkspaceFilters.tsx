
// src/components/dashboard/workspace/WorkspaceFilters.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons, Icon2D } from '@/components/ui/icons';

interface WorkspaceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WorkspaceFilters: React.FC<WorkspaceFiltersProps> = ({
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Icon2D 
          icon={Icons.actions.Search} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          size={16}
        />
        <Input
          placeholder="Search files and folders..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      <Button variant="outline" size="sm">
        <Icon2D icon={Icons.actions.Filter} size={16} className="mr-1" />
        Filter
      </Button>
    </div>
  );
};
