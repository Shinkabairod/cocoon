// src/components/dashboard/workspace/NeomorphicCards.tsx
import React from 'react';
import { Icons, Icon2D, getIcon } from '@/components/ui/icons';
import { FolderItem } from '@/hooks/useWorkspace';

// Map des couleurs pour chaque type de dossier
const getFolderColorClass = (folderId: string): string => {
  const colorMap: { [key: string]: string } = {
    'personal-profile': 'card-blue',
    'personal-goals': 'card-green', 
    'personal-business': 'card-purple',
    'personal-platforms': 'card-orange',
    'personal-challenges': 'card-red',
    'resources-scripts': 'card-dark',
    'resources-templates': 'card-blue'
  };
  return colorMap[folderId] || 'card-blue';
};

// Helper pour les descriptions des dossiers
const getFolderDescription = (folderId: string, folderName: string): string => {
  const descriptions: { [key: string]: string } = {
    'personal-profile': 'Personal information and creator profile settings',
    'personal-goals': 'Track progress and set new objectives for growth',
    'personal-business': 'Business plans and strategy documents',
    'personal-platforms': 'Social media accounts and analytics data',
    'personal-challenges': 'Challenges and roadblocks to overcome',
    'resources-scripts': 'Creative scripts for video content creation',
    'resources-templates': 'Reusable templates and resources library'
  };
  
  return descriptions[folderId] || `Files and documents for ${folderName}`;
};

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
      className="folder-card cursor-pointer"
      onClick={onClick}
      style={{
        width: '190px',
        height: '280px',
        borderRadius: '20px',
        background: '#f5f5f5',
        position: 'relative',
        padding: '1.8rem',
        border: '2px solid #c3c6ce',
        transition: '0.5s ease-out',
        overflow: 'visible',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      <div style={{
        height: '100%',
        gap: '0.5em',
        display: 'grid',
        placeContent: 'start'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          transition: '0.3s ease',
          alignSelf: 'start',
          background: '#e2e8f0'
        }}>
          <Icon2D 
            icon={IconComponent}
            size={28}
            color="#64748b"
            strokeWidth={1.5}
          />
        </div>
        
        {value && (
          <div style={{
            textAlign: 'left',
            fontSize: '1.5em',
            fontWeight: 'bold',
            color: color,
            marginBottom: '0.5rem'
          }}>
            {value}
          </div>
        )}
        
        <div style={{
          fontSize: '1.5em',
          fontWeight: 'bold',
          color: 'rgb(162, 0, 255)',
          textAlign: 'left',
          marginBottom: '0.5rem'
        }}>
          {title}
        </div>
        
        <div style={{
          color: 'rgb(134, 134, 134)',
          fontSize: '0.9em',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          {subtitle}
        </div>
        
        {value && (
          <div style={{
            background: 'rgba(108, 0, 248, 0.1)',
            color: '#6c00f8',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.8em',
            fontWeight: '500',
            marginTop: '0.5rem',
            alignSelf: 'start',
            width: 'fit-content'
          }}>
            {value} files
          </div>
        )}
      </div>
      
      <button style={{
        textDecoration: 'none',
        textAlign: 'center',
        transform: 'translate(-50%, 125%)',
        width: '70%',
        borderRadius: '1rem',
        border: 'none',
        backgroundColor: '#6c00f8',
        color: '#fff',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        position: 'absolute',
        left: '50%',
        bottom: '0',
        opacity: 0,
        transition: '0.3s ease-out',
        cursor: 'pointer',
        fontWeight: '500'
      }}>
        Open Folder
      </button>
      
      <style jsx>{`
        .folder-card:hover {
          border-color: #6c00f8 !important;
          box-shadow: 10px 5px 18px 0 rgba(255, 255, 255, 0.877) !important;
        }
        
        .folder-card:hover button {
          transform: translate(-50%, 50%) !important;
          opacity: 1 !important;
        }
        
        .folder-card:hover div:first-child div:first-child {
          transform: scale(1.05) !important;
          background: ${color} !important;
        }
        
        .folder-card:hover div:first-child div:first-child svg {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

// Composant pour les dossiers workspace (NOUVEAU DESIGN)
interface WorkspaceNeomorphicCardsProps {
  folders: FolderItem[];
  onFolderClick: (folder: FolderItem) => void;
}

export const WorkspaceNeomorphicCards: React.FC<WorkspaceNeomorphicCardsProps> = ({
  folders,
  onFolderClick
}) => {
  // Obtenir l'icône Lucide à partir du nom stocké
  const getFolderIcon = (iconName: string) => {
    const folderIcon = getIcon('folders', iconName);
    if (folderIcon) return folderIcon;
    
    const fileIcon = getIcon('files', iconName);
    if (fileIcon) return fileIcon;
    
    const businessIcon = getIcon('business', iconName);
    if (businessIcon) return businessIcon;
    
    return Icons.folders.Folder;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
      gap: '24px',
      padding: '20px 0'
    }}>
      {folders.map((folder) => {
        const FolderIconComponent = getFolderIcon(folder.emoji);
        const colorClass = getFolderColorClass(folder.id);
        
        // Couleurs pour chaque type
        const colorMap: { [key: string]: string } = {
          'card-blue': '#667eea',
          'card-green': '#4facfe',
          'card-purple': '#a8edea',
          'card-orange': '#fa709a',
          'card-red': '#ff9a9e',
          'card-dark': '#434343'
        };
        
        const hoverColor = colorMap[colorClass] || '#667eea';
        
        return (
          <div 
            key={folder.id} 
            className="folder-card cursor-pointer"
            onClick={() => onFolderClick(folder)}
            style={{
              width: '190px',
              height: '280px',
              borderRadius: '20px',
              background: '#f5f5f5',
              position: 'relative',
              padding: '1.8rem',
              border: '2px solid #c3c6ce',
              transition: '0.5s ease-out',
              overflow: 'visible',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            <div style={{
              height: '100%',
              gap: '0.5em',
              display: 'grid',
              placeContent: 'start'
            }}>
              <div 
                className="card-icon"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  transition: '0.3s ease',
                  alignSelf: 'start',
                  background: '#e2e8f0'
                }}
              >
                <Icon2D 
                  icon={FolderIconComponent}
                  size={28}
                  color="#64748b"
                  strokeWidth={1.5}
                />
              </div>
              
              <div style={{
                fontSize: '1.5em',
                fontWeight: 'bold',
                color: 'rgb(162, 0, 255)',
                textAlign: 'left',
                marginBottom: '0.5rem'
              }}>
                {folder.name}
              </div>
              
              <div style={{
                color: 'rgb(134, 134, 134)',
                fontSize: '0.9em',
                lineHeight: '1.4',
                textAlign: 'left'
              }}>
                {getFolderDescription(folder.id, folder.name)}
              </div>
              
              <div style={{
                background: 'rgba(108, 0, 248, 0.1)',
                color: '#6c00f8',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8em',
                fontWeight: '500',
                marginTop: '0.5rem',
                alignSelf: 'start',
                width: 'fit-content'
              }}>
                {folder.files.length} files
              </div>
            </div>
            
            <button 
              className="card-button"
              style={{
                textDecoration: 'none',
                textAlign: 'center',
                transform: 'translate(-50%, 125%)',
                width: '70%',
                borderRadius: '1rem',
                border: 'none',
                backgroundColor: '#6c00f8',
                color: '#fff',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                position: 'absolute',
                left: '50%',
                bottom: '0',
                opacity: 0,
                transition: '0.3s ease-out',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Open Folder
            </button>
            
            <style jsx>{`
              .folder-card:hover {
                border-color: #6c00f8 !important;
                box-shadow: 10px 5px 18px 0 rgba(255, 255, 255, 0.877) !important;
              }
              
              .folder-card:hover .card-button {
                transform: translate(-50%, 50%) !important;
                opacity: 1 !important;
              }
              
              .folder-card:hover .card-icon {
                transform: scale(1.05) !important;
                background: ${hoverColor} !important;
              }
              
              .folder-card:hover .card-icon svg {
                color: ${colorClass === 'card-purple' ? '#6c00f8' : 'white'} !important;
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
};

// Composant pour la grille de cards (pour compatibilité)
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
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
      gap: '24px',
      justifyItems: 'center'
    }}>
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
};;
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
