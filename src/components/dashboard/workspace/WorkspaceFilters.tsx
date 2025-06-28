
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface WorkspaceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: { Personal: number; Resources: number };
}

const WorkspaceFilters: React.FC<WorkspaceFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryCounts
}) => (
  <div className="flex items-center space-x-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search in your files..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
    <div className="flex space-x-2">
      <Button
        variant={selectedCategory === 'Personal' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('Personal')}
        size="sm"
      >
        👤 Personal ({categoryCounts.Personal})
      </Button>
      <Button
        variant={selectedCategory === 'Resources' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('Resources')}
        size="sm"
      >
        📁 Resources ({categoryCounts.Resources})
      </Button>
    </div>
  </div>
);

export default WorkspaceFilters;
