import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FolderCardProps {
  folder: {
    id: string;
    name: string;
    iconData?: {
      component: React.ComponentType<any>;
      name: string;
    };
    color?: string;
    files?: any[];
    description?: string;
  };
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
  const IconComponent = folder.iconData?.component;
  const fileCount = folder.files?.length || 0;

  // Couleurs pour les variantes (EXACTEMENT comme ton HTML)
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          hoverBorder: 'hover:border-[#6c00f8]',
          hoverIcon: 'group-hover:bg-[#667eea]',
          cardClass: 'card-blue'
        };
      case 'green':
        return {
          hoverBorder: 'hover:border-[#6c00f8]',
          hoverIcon: 'group-hover:bg-[#4facfe]',
          cardClass: 'card-green'
        };
      case 'orange':
        return {
          hoverBorder: 'hover:border-[#6c00f8]',
          hoverIcon: 'group-hover:bg-[#fa709a]',
          cardClass: 'card-orange'
        };
      case 'purple':
        return {
          hoverBorder: 'hover:border-[#6c00f8]',
          hoverIcon: 'group-hover:bg-[#a8edea]',
          cardClass: 'card-purple'
        };
      case 'red':
        return {
          hoverBorder: 'hover:border-[#6c00f8]',
          hoverIcon: 'group-hover:bg-[#ff9a9e]',
          cardClass: 'card-red'
        };
      default:
        return {
          hoverBorder: 'hover:border-[#6c00f8]',
          hoverIcon: 'group-hover:bg-[#434343]',
          cardClass: 'card-dark'
        };
    }
  };

  const colorClasses = getColorClasses(folder.color || 'blue');

  return (
    <div className="relative group">
      {/* Card EXACTEMENT comme ton design HTML */}
      <div 
        className={`
          w-[190px] h-[280px] rounded-[20px] bg-[#f5f5f5] relative p-7 
          border-2 border-[#c3c6ce] transition-all duration-500 ease-out 
          overflow-visible cursor-pointer group
          ${colorClasses.hoverBorder}
          hover:shadow-[10px_5px_18px_0_rgba(255,255,255,0.877)]
        `}
        onClick={onClick}
      >
        {/* Contenu - alignement top-left exact */}
        <div className="h-full gap-2 grid place-content-start font-sans">
          {/* Icône - EXACTEMENT comme ton HTML */}
          <div className={`
            w-[50px] h-[50px] rounded-[12px] flex items-center justify-center mb-4 
            transition-all duration-300 bg-[#e2e8f0] self-start
            group-hover:scale-105 ${colorClasses.hoverIcon}
          `}>
            {IconComponent && (
              <IconComponent 
                className="w-7 h-7 stroke-[1.5] text-[#64748b] group-hover:text-white transition-colors" 
              />
            )}
          </div>

          {/* Titre - EXACTEMENT comme ton HTML */}
          <div className="text-2xl font-bold text-[rgb(162,0,255)] text-left mb-2">
            {folder.name}
          </div>

          {/* Description - EXACTEMENT comme ton HTML */}
          <div className="text-[rgb(134,134,134)] text-sm leading-[1.4] text-left">
            {folder.description || 'Personal information and creator profile settings'}
          </div>

          {/* Badge - EXACTEMENT comme ton HTML */}
          <div className="bg-[rgba(108,0,248,0.1)] text-[#6c00f8] px-3 py-1 rounded-[20px] text-xs font-medium mt-2 self-start w-fit">
            {fileCount} files
          </div>
        </div>

        {/* Bouton au hover - EXACTEMENT comme ton HTML */}
        <button className={`
          absolute left-1/2 bottom-0 w-[70%] rounded-2xl border-none 
          bg-[#6c00f8] text-white text-base py-2 px-4 font-medium
          transform -translate-x-1/2 translate-y-[125%] opacity-0 
          transition-all duration-300 ease-out cursor-pointer
          group-hover:translate-y-1/2 group-hover:opacity-100
          font-sans
        `}>
          Open Folder
        </button>
      </div>

      {/* Menu dropdown */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FolderCard;
