
// src/components/dashboard/workspace/NeomorphicCards.tsx
import React from 'react';
import { Icons, Icon2D } from '@/components/ui/icons';

interface NeomorphicCardProps {
  title: string;
  subtitle: string;
  icon: 'FolderOpen' | 'FileText' | 'Link' | 'Upload' | 'Plus';
  color: string;
  onClick?: () => void;
  value?: string | number;
}

const iconMap = {
  FolderOpen: Icons.folders.FolderOpen,
  FileText: Icons.files.FileText,
  Link: Icons.files.Link,
  Upload: Icons.actions.Upload,
  Plus: Icons.actions.Plus
};

export const NeomorphicCard: React.FC<NeomorphicCardProps> = ({
  title,
  subtitle,
  icon,
  color,
  onClick,
  value
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div 
      className="neomorphic-card group cursor-pointer"
      onClick={onClick}
      style={{
        width: '190px',
        height: '254px',
        borderRadius: '30px',
        background: '#e0e0e0',
        boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
        transition: 'all 0.3s ease',
        position: 'relative',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '20px 20px 40px #b8b8b8, -20px -20px 40px #ffffff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '15px 15px 30px #bebebe, -15px -15px 30px #ffffff';
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
    >
      {/* Border coloré */}
      <div
        className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(145deg, ${color}20, ${color}10)`,
          border: `2px solid ${color}40`
        }}
      />
      
      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Icône */}
        <div 
          className="relative p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: '#e0e0e0',
            boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
          }}
        >
          <Icon2D 
            icon={IconComponent}
            size={32}
            color={color}
            strokeWidth={1.5}
          />
        </div>
        
        {/* Valeur (optionnelle) */}
        {value && (
          <div className="text-center">
            <div 
              className="text-3xl font-bold mb-1"
              style={{ color }}
            >
              {value}
            </div>
          </div>
        )}
        
        {/* Texte */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            {title}
          </h3>
          <p className="text-xs text-gray-600">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

// Composant pour la grille de cards
interface NeomorphicGridProps {
  cards: Array<{
    id: string;
    title: string;
    subtitle: string;
    icon: 'FolderOpen' | 'FileText' | 'Link' | 'Upload' | 'Plus';
    color: string;
    value?: string | number;
    onClick?: () => void;
  }>;
}

export const NeomorphicGrid: React.FC<NeomorphicGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {cards.map((card) => (
        <NeomorphicCard
          key={card.id}
          title={card.title}
          subtitle={card.subtitle}
          icon={card.icon}
          color={card.color}
          value={card.value}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};

// Cards spécifiques pour My Workspace  
export const WorkspaceNeomorphicCards: React.FC<{
  totalFolders: number;
  totalFiles: number;
  resourceFiles: number;
  videoFiles: number;
  onNewNote: () => void;
  onAddLink: () => void;
  onUploadFile: () => void;
  onNewFolder: () => void;
}> = ({
  totalFolders,
  totalFiles,
  resourceFiles,
  videoFiles,
  onNewNote,
  onAddLink,
  onUploadFile,
  onNewFolder
}) => {
  const workspaceCards = [
    {
      id: 'total-folders',
      title: 'Total Folders',
      subtitle: 'Organized workspace',
      icon: 'FolderOpen' as const,
      color: '#3B82F6',
      value: totalFolders
    },
    {
      id: 'total-files',
      title: 'Total Files',
      subtitle: 'Your content',
      icon: 'FileText' as const,
      color: '#10B981',
      value: totalFiles
    },
    {
      id: 'saved-links',
      title: 'Saved Links',
      subtitle: 'Web resources',
      icon: 'Link' as const,
      color: '#8B5CF6',
      value: resourceFiles
    },
    {
      id: 'video-files',
      title: 'Video Files',
      subtitle: 'Media content',
      icon: 'Upload' as const,
      color: '#F59E0B',
      value: videoFiles
    },
    {
      id: 'new-note',
      title: 'New Note',
      subtitle: 'Create a new note',
      icon: 'Plus' as const,
      color: '#3B82F6',
      onClick: onNewNote
    },
    {
      id: 'add-link',
      title: 'Add Link',
      subtitle: 'Save web resources',
      icon: 'Link' as const,
      color: '#10B981',
      onClick: onAddLink
    },
    {
      id: 'upload-file',
      title: 'Upload Files',
      subtitle: 'PDFs, videos, docs',
      icon: 'Upload' as const,
      color: '#8B5CF6',
      onClick: onUploadFile
    },
    {
      id: 'new-folder',
      title: 'New Folder',
      subtitle: 'Organize content',
      icon: 'FolderOpen' as const,
      color: '#F59E0B',
      onClick: onNewFolder
    }
  ];

  return <NeomorphicGrid cards={workspaceCards} />;
};
