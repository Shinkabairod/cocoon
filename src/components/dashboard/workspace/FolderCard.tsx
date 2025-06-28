
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface FolderCardProps {
  folder: any;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  onClick,
  onEdit,
  onDelete
}) => {
  const IconComponent = folder.iconData?.icon || (() => <div>📁</div>);

  return (
    <Card 
      className="border-2 transition-all duration-200 cursor-pointer group relative backdrop-blur-md bg-opacity-60 hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-sm mx-auto mb-2 backdrop-blur-sm bg-opacity-90">
          <IconComponent className="h-6 w-6" />
        </div>
        <h3 className="font-medium text-sm text-gray-700 truncate mb-1">
          {folder.name}
        </h3>
        <p className="text-xs text-gray-500">{folder.files?.length || 0} files</p>
        
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-red-500 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FolderCard;
