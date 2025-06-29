// src/components/ui/icons.tsx
import React from 'react';
import {
  // Navigation & Menu
  Home,
  FolderOpen,
  MessageSquare,
  BarChart3,
  DollarSign,
  Settings,
  Sparkles,
  Menu,
  X,
  
  // Dossiers & Organisation
  Building,
  User,
  Target,
  Smartphone,
  Zap,
  Briefcase,
  Users,
  Calendar,
  Clock,
  MapPin,
  Globe,
  Heart,
  Star,
  
  // Fichiers & Contenu
  FileText,
  Video,
  FileImage,
  Clipboard,
  Link,
  File,
  FilePlus,
  FileEdit,
  FileCheck,
  Image,
  Music,
  Film,
  BookOpen,
  Newspaper,
  
  // Actions & Interface
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
  Save,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  MoreVertical,
  
  // États & Feedback
  Check,
  AlertCircle,
  Info,
  AlertTriangle,
  Loader2,
  RefreshCw,
  CheckCircle,
  XCircle,
  
  // Communication
  Mail,
  Phone,
  MessageCircle,
  Send,
  Bell,
  BellOff,
  
  // Médias & Création
  Camera,
  Mic,
  Play,
  Pause,
  Stop,
  Volume2,
  VolumeX,
  Headphones,
  
  // Business & Finance
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Calculator,
  CreditCard,
  Wallet,
  Coins,
  
  // Outils & Utilitaires
  Tool,
  Wrench,
  Scissors,
  Paintbrush,
  Palette,
  Layers,
  Grid,
  Layout,
  Maximize,
  Minimize,
  
  // Social & Partage
  Share2,
  ThumbsUp,
  ThumbsDown,
  UserPlus,
  UserMinus,
  UserCheck,
  Users2,
  
  // Localisation & Navigation
  Navigation,
  Compass,
  Map,
  Route,
  
  // Temps & Productivité
  Timer,
  Stopwatch,
  AlarmClock,
  CalendarDays,
  
  // Technology
  Wifi,
  WifiOff,
  Bluetooth,
  Database,
  Server,
  Cloud,
  CloudUpload,
  CloudDownload,
  
  // Shopping & E-commerce
  ShoppingCart,
  ShoppingBag,
  Package,
  Truck,
  
  // Sécurité
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  Key,
  
  // Interface Avancée
  Sidebar,
  PanelLeft,
  PanelRight,
  Tabs,
  Command,
  
  // Création de contenu
  Pen,
  PenTool,
  Type,
  Bold,
  Italic,
  Underline,
  
  // Fichiers spécialisés
  Folder,
  FolderPlus,
  Archive,
  HardDrive,
  
  // Réseaux sociaux style
  Rss,
  Bookmark,
  BookmarkPlus,
  Tag,
  Tags,
  Hash
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
    Sparkles,
    Menu,
    X
  },

  // Dossiers & Organisation (ICÔNES 2D LUCIDE UNIQUEMENT)
  folders: {
    FolderOpen,
    Folder,
    FolderPlus,
    User,           // Profil utilisateur
    Target,         // Objectifs  
    Building,       // Business
    Smartphone,     // Plateformes
    Zap,           // Défis/Challenges
    Video,         // Scripts vidéo
    Clipboard,     // Templates
    Briefcase,     // Travail
    Users,         // Équipe
    Calendar,      // Planning
    Clock,         // Timing
    MapPin,        // Localisation
    Globe,         // Global
    Heart,         // Favoris
    Star,          // Important
    BookOpen,      // Apprentissage
    Archive,       // Archives
    Database,      // Données
    Cloud,         // Cloud storage
    File,          // Fichier générique
    FileText       // Fichier texte
  },
  
  // Fichiers & Contenu
  files: {
    FileText,
    Video,
    FileImage,
    Clipboard,
    Link,
    File,
    FilePlus,
    FileEdit,
    FileCheck,
    Image,
    Music,
    Film,
    BookOpen,
    Newspaper
  },
  
  // Actions & Interface
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
    Share2,
    Save,
    ExternalLink,
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    ChevronUp,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    MoreHorizontal,
    MoreVertical,
    Maximize,
    Minimize
  },

  // États & Feedback
  status: {
    Check,
    CheckCircle,
    AlertCircle,
    Info,
    AlertTriangle,
    Loader2,
    RefreshCw,
    XCircle
  },

  // Communication
  communication: {
    Mail,
    Phone,
    MessageCircle,
    MessageSquare,
    Send,
    Bell,
    BellOff
  },

  // Médias & Création
  media: {
    Camera,
    Mic,
    Play,
    Pause,
    Stop,
    Volume2,
    VolumeX,
    Headphones,
    Film,
    Image,
    Music
  },

  // Business & Analytics
  business: {
    TrendingUp,
    TrendingDown,
    PieChart,
    LineChart,
    BarChart3,
    Calculator,
    CreditCard,
    Wallet,
    Coins,
    ShoppingCart,
    ShoppingBag,
    Package,
    Truck
  },

  // Outils & Création
  tools: {
    Tool,
    Wrench,
    Scissors,
    Paintbrush,
    Palette,
    Layers,
    Grid,
    Layout,
    Pen,
    PenTool,
    Type,
    Bold,
    Italic,
    Underline
  },

  // Social & Communauté
  social: {
    Users,
    Users2,
    UserPlus,
    UserMinus,
    UserCheck,
    ThumbsUp,
    ThumbsDown,
    Rss,
    Bookmark,
    BookmarkPlus,
    Tag,
    Tags,
    Hash
  },

  // Technology & Cloud
  tech: {
    Wifi,
    WifiOff,
    Bluetooth,
    Database,
    Server,
    Cloud,
    CloudUpload,
    CloudDownload,
    HardDrive
  },

  // Sécurité
  security: {
    Lock,
    Unlock,
    Shield,
    ShieldCheck,
    Key
  },

  // Temps & Productivité
  time: {
    Clock,
    Timer,
    Stopwatch,
    AlarmClock,
    Calendar,
    CalendarDays
  },

  // Interface Avancée
  interface: {
    Sidebar,
    PanelLeft,
    PanelRight,
    Tabs,
    Command
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

// Helper pour obtenir une icône par nom (utile pour la config dynamique)
export const getIcon = (category: keyof typeof Icons, name: string) => {
  try {
    const categoryIcons = Icons[category] as any;
    return categoryIcons?.[name] || null;
  } catch (error) {
    console.warn(`Icon not found: ${category}.${name}`);
    return null;
  }
};

// Export par défaut pour faciliter l'import
export default Icons;