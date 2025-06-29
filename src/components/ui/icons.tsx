// src/components/ui/icons.tsx
import React from 'react';
import {
  FolderOpen,
  FileText,
  Link,
  Upload,
  Plus,
  User,
  Target,
  Building,
  Smartphone,
  Zap,
  Video,
  FileImage,
  Clipboard,
  Search,
  Filter,
  Download,
  Settings,
  Edit,
  Trash2,
  Eye,
  Copy,
  Share,
  Home,
  MessageSquare,
  BarChart3,
  DollarSign,
  Sparkles,
  Save,
  X,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// Collection d'icônes 2D organisées par catégorie
export const Icons = {
  // Navigation & Menu
  navigation: {
    Home,
    FolderOpen,
    Building,
    MessageSquare,
    BarChart3,
    DollarSign,
    Settings,
    Sparkles
  },

  // Dossiers & Organisation
  folders: {
    FolderOpen,
    Building,
    User,
    Target,
    Smartphone,
    Zap
  },
  
  // Fichiers & Contenu
  files: {
    FileText,
    Video,
    FileImage,
    Clipboard,
    Link
  },
  
  // Actions
  actions: {
    Plus,
    Upload,
    Download,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Copy,
    Share,
    Settings,
    Save,
    X,
    ExternalLink,
    ChevronRight,
    ChevronDown
  }
};

// Composant d'icône avec style 2D uniforme
interface Icon2DProps {
  icon: React.ComponentType<any>;
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Icon2D: React.FC<Icon2DProps> = ({ 
  icon: IconComponent, 
  className = "", 
  size = 20,
  color = "currentColor",
  strokeWidth = 1.5
}) => {
  return (
    <IconComponent 
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};

// Export par défaut pour faciliter l'import
export default Icons;
