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

// Composant pour les dossiers workspace (NOUVEAU DESIGN NEOMORPHIC)
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

  // Couleurs pour chaque type
  const colorMap: { [key: string]: string } = {
    'card-blue': '#667eea',
    'card-green': '#4facfe',
    'card-purple': '#a8edea',
    'card-orange': '#fa709a',
    'card-red': '#ff9a9e',
    'card-dark': '#434343'
  };

  return (
    <>
      {/* Styles CSS intégrés pour le neomorphism */}
      <style>{`
        .neomorphic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 30px;
          justify-items: center;
          padding: 20px 0;
        }
        
        .neomorphic-card {
          width: 190px;
          height: 280px;
          border-radius: 20px;
          background: #f5f5f5;
          position: relative;
          padding: 1.8rem;
          border: 2px solid #c3c6ce;
          transition: 0.5s ease-out;
          overflow: visible;
          cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .neomorphic-card-details {
          height: 100%;
          gap: 0.5em;
          display: grid;
          place-content: start;
        }
        
        .neomorphic-card-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: 0.3s ease;
          align-self: start;
          background: #e2e8f0;
        }
        
        .neomorphic-text-title {
          font-size: 1.5em;
          font-weight: bold;
          color: rgb(162, 0, 255);
          text-align: left;
          margin-bottom: 0.5rem;
        }
        
        .neomorphic-text-body {
          color: rgb(134, 134, 134);
          font-size: 0.9em;
          line-height: 1.4;
          text-align: left;
        }
        
        .neomorphic-file-count {
          background: rgba(108, 0, 248, 0.1);
          color: #6c00f8;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: 500;
          margin-top: 0.5rem;
          align-self: start;
          width: fit-content;
        }
        
        .neomorphic-card-button {
          text-decoration: none;
          text-align: center;
          transform: translate(-50%, 125%);
          width: 70%;
          border-radius: 1rem;
          border: none;
          background-color: #6c00f8;
          color: #fff;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          position: absolute;
          left: 50%;
          bottom: 0;
          opacity: 0;
          transition: 0.3s ease-out;
          cursor: pointer;
          font-weight: 500;
        }
        
        /* Hover Effects */
        .neomorphic-card:hover {
          border-color: #6c00f8;
          box-shadow: 10px 5px 18px 0 rgba(255, 255, 255, 0.877);
        }
        
        .neomorphic-card:hover .neomorphic-card-button {
          transform: translate(-50%, 50%);
          opacity: 1;
        }
        
        .neomorphic-card:hover .neomorphic-card-icon {
          transform: scale(1.05);
          background: #6c00f8;
        }
        
        .neomorphic-card:hover .neomorphic-card-icon svg {
          color: white !important;
        }
        
        /* Variantes spécifiques par couleur */
        .card-blue:hover .neomorphic-card-icon { 
          background: #667eea; 
        }
        
        .card-green:hover .neomorphic-card-icon { 
          background: #4facfe; 
        }
        
        .card-orange:hover .neomorphic-card-icon { 
          background: #fa709a; 
        }
        
        .card-purple:hover .neomorphic-card-icon { 
          background: #a8edea; 
        }
        .card-purple:hover .neomorphic-card-icon svg { 
          color: #6c00f8 !important; 
        }
        
        .card-red:hover .neomorphic-card-icon { 
          background: #ff9a9e; 
        }
        
        .card-dark:hover .neomorphic-card-icon { 
          background: #434343; 
        }
      `}</style>

      <div className="neomorphic-grid">
        {folders.map((folder) => {
          const FolderIconComponent = getFolderIcon(folder.emoji);
          const colorClass = getFolderColorClass(folder.id);
          
          return (
            <div 
              key={folder.id} 
              className={`neomorphic-card ${colorClass}`}
              onClick={() => onFolderClick(folder)}
            >
              <div className="neomorphic-card-details">
                <div className="neomorphic-card-icon">
                  <Icon2D 
                    icon={FolderIconComponent}
                    size={28}
                    color="#64748b"
                    strokeWidth={1.5}
                  />
                </div>
                
                <div className="neomorphic-text-title">
                  {folder.name}
                </div>
                
                <div className="neomorphic-text-body">
                  {getFolderDescription(folder.id, folder.name)}
                </div>
                
                <div className="neomorphic-file-count">
                  {folder.files?.length || 0} files
                </div>
              </div>
              <button className="neomorphic-card-button">Open Folder</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Composant pour les cards individuelles (si besoin)
interface NeomorphicCardProps {
  title: string;
  subtitle: string;
  icon: 'FolderOpen' | 'FileText' | 'Link' | 'Upload' | 'Plus';
  color: string;
  onClick?: () => void;
  value?: string | number;
}

export const NeomorphicCard: React.FC<NeomorphicCardProps> = ({
  title,
  subtitle,
  icon,
  color,
  onClick,
  value
}) => {
  const IconComponent = getIcon('business', icon) || Icons.folders.Folder;

  return (
    <div 
      className="neomorphic-card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="neomorphic-card-details">
        <div className="neomorphic-card-icon">
          <Icon2D 
            icon={IconComponent}
            size={28}
            color={color}
            strokeWidth={1.5}
          />
        </div>
        
        <div className="neomorphic-text-title">
          {title}
        </div>
        
        <div className="neomorphic-text-body">
          {subtitle}
        </div>
        
        {value && (
          <div className="neomorphic-file-count">
            {value}
          </div>
        )}
      </div>
      {onClick && <button className="neomorphic-card-button">Open</button>}
    </div>
  );
};

// Export par défaut
export default WorkspaceNeomorphicCards;