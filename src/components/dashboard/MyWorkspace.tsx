// src/components/dashboard/MyWorkspace.tsx - Version finale propre
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FolderOpen,
  FileText,
  Image,
  Video,
  Music,
  File,
  Link,
  Download,
  Upload,
  Plus,
  Search,
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  X,
  ArrowLeft,
  Type,
  Target,
  Lightbulb,
  Building2,
  Smartphone,
  Zap,
  Palette,
  Clapperboard,
  BarChart3,
  Star,
  Wrench,
  BookOpen,
  AudioWaveform,
  ImageIcon,
  Briefcase,
  Tent,
  Globe,
  Lock,
  TrendingUp
} from 'lucide-react';

// Modern Lucide icons
const modernIcons = [
  { icon: FileText, name: 'Document' },
  { icon: FolderOpen, name: 'Folder' },
  { icon: Target, name: 'Target' },
  { icon: Lightbulb, name: 'Idea' },
  { icon: Building2, name: 'Business' },
  { icon: Smartphone, name: 'Mobile' },
  { icon: Zap, name: 'Energy' },
  { icon: Palette, name: 'Design' },
  { icon: Clapperboard, name: 'Video' },
  { icon: BarChart3, name: 'Analytics' },
  { icon: Star, name: 'Star' },
  { icon: Wrench, name: 'Tools' },
  { icon: BookOpen, name: 'Books' },
  { icon: AudioWaveform, name: 'Music' },
  { icon: ImageIcon, name: 'Images' },
  { icon: Briefcase, name: 'Work' },
  { icon: Tent, name: 'Fun' },
  { icon: Globe, name: 'Global' },
  { icon: Lock, name: 'Security' },
  { icon: TrendingUp, name: 'Growth' }
];

// Color options
const colorOptions = [
  { name: 'Blue', value: 'blue', bg: 'bg-blue-500', light: 'bg-blue-50/80', border: 'border-blue-200/60' },
  { name: 'Green', value: 'green', bg: 'bg-green-500', light: 'bg-green-50/80', border: 'border-green-200/60' },
  { name: 'Purple', value: 'purple', bg: 'bg-purple-500', light: 'bg-purple-50/80', border: 'border-purple-200/60' },
  { name: 'Orange', value: 'orange', bg: 'bg-orange-500', light: 'bg-orange-50/80', border: 'border-orange-200/60' },
  { name: 'Pink', value: 'pink', bg: 'bg-pink-500', light: 'bg-pink-50/80', border: 'border-pink-200/60' },
  { name: 'Yellow', value: 'yellow', bg: 'bg-yellow-500', light: 'bg-yellow-50/80', border: 'border-yellow-200/60' },
  { name: 'Indigo', value: 'indigo', bg: 'bg-indigo-500', light: 'bg-indigo-50/80', border: 'border-indigo-200/60' },
  { name: 'Red', value: 'red', bg: 'bg-red-500', light: 'bg-red-50/80', border: 'border-red-200/60' },
  { name: 'Emerald', value: 'emerald', bg: 'bg-emerald-500', light: 'bg-emerald-50/80', border: 'border-emerald-200/60' },
  { name: 'Cyan', value: 'cyan', bg: 'bg-cyan-500', light: 'bg-cyan-50/80', border: 'border-cyan-200/60' },
  { name: 'Rose', value: 'rose', bg: 'bg-rose-500', light: 'bg-rose-50/80', border: 'border-rose-200/60' },
  { name: 'Violet', value: 'violet', bg: 'bg-violet-500', light: 'bg-violet-50/80', border: 'border-violet-200/60' }
];

// Color schemes with higher transparency
const getColorScheme = (colorValue: string) => {
  const color = colorOptions.find(c => c.value === colorValue) || colorOptions[0];
  return {
    bg: color.light,
    border: color.border,
    text: `text-${color.value}-700`,
    accent: color.bg,
    hover: `hover:bg-${color.value}-100/90`
  };
};

const MyWorkspace = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Personal');
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showEditFolderModal, setShowEditFolderModal] = useState(false);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState<any>(null);
  const [editingFolder, setEditingFolder] = useState<any>(null);
  
  // Form states
  const [newFolder, setNewFolder] = useState({
    name: '',
    iconData: modernIcons[0],
    color: 'blue',
    category: 'Personal'
  });
  
  const [newFile, setNewFile] = useState({
    name: '',
    type: 'file',
    url: '',
    content: '',
    folderId: '',
    file: null as File | null
  });

  // Initialize folders from localStorage or use default data
  const getInitialFolders = () => {
    try {
      const savedFolders = localStorage.getItem('myworkspace_folders');
      if (savedFolders) {
        return JSON.parse(savedFolders);
      }
    } catch (error) {
      console.error('Error loading folders from localStorage:', error);
    }
    
    // Default data if nothing in localStorage
    return {
      Personal: [
        { 
          id: '1', 
          name: 'My Profile', 
          iconData: modernIcons[0],
          color: 'blue', 
          files: [
            { id: 'f1', name: 'Resume.pdf', type: 'pdf', size: '2.5 MB', date: '2024-01-15', content: null, url: null },
            { id: 'f2', name: 'Bio', type: 'text', size: '1.2 KB', date: '2024-01-20', content: 'I am a passionate content creator with 5 years of experience in digital marketing and social media management...', url: null }
          ] 
        },
        { 
          id: '2', 
          name: 'My Goals', 
          iconData: modernIcons[2],
          color: 'green', 
          files: [
            { id: 'f3', name: '2024 Objectives', type: 'text', size: '800 B', date: '2024-01-01', content: '1. Grow YouTube channel to 100K subscribers\n2. Launch online course\n3. Increase revenue by 50%\n4. Build personal brand', url: null },
            { id: 'f4', name: 'vision-board.jpg', type: 'image', size: '5.2 MB', date: '2024-01-10', content: null, url: null },
            { id: 'f5', name: 'motivation-video.mp4', type: 'video', size: '25.8 MB', date: '2024-01-12', content: null, url: null }
          ] 
        },
        { 
          id: '3', 
          name: 'My Business', 
          iconData: modernIcons[4],
          color: 'purple', 
          files: [
            { id: 'f6', name: 'Business Plan', type: 'text', size: '2.1 KB', date: '2024-01-05', content: 'Executive Summary:\nOur company focuses on creating educational content for entrepreneurs...', url: null },
            { id: 'f7', name: 'Financial Projections', type: 'link', url: 'https://sheets.google.com', date: '2024-01-18', content: null, size: 'N/A' }
          ] 
        },
        { 
          id: '4', 
          name: 'My Platforms', 
          iconData: modernIcons[5],
          color: 'orange', 
          files: [
            { id: 'f8', name: 'Content Calendar', type: 'text', size: '1.8 KB', date: '2024-01-22', content: 'Week 1: Introduction to AI\nWeek 2: Productivity Tools\nWeek 3: Content Creation Tips...', url: null },
            { id: 'f9', name: 'Instagram Analytics', type: 'link', url: 'https://instagram.com/insights', date: '2024-01-25', content: null, size: 'N/A' }
          ] 
        }
      ],
      Resources: []
    };
  };

  const [folders, setFolders] = useState(getInitialFolders);

  // Save to localStorage whenever folders change
  React.useEffect(() => {
    try {
      localStorage.setItem('myworkspace_folders', JSON.stringify(folders));
    } catch (error) {
      console.error('Error saving folders to localStorage:', error);
      toast({
        title: "⚠️ Save Warning",
        description: "Unable to save data locally. Changes may be lost on refresh.",
        variant: "destructive"
      });
    }
  }, [folders]);

  // Export data function
  const exportData = () => {
    try {
      const dataStr = JSON.stringify(folders, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `myworkspace_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "✅ Data Exported",
        description: "Workspace data has been downloaded as backup file."
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "❌ Export Failed",
        description: "Unable to export data.",
        variant: "destructive"
      });
    }
  };

  // Import data function
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setFolders(importedData);
        toast({
          title: "✅ Data Imported",
          description: "Workspace data has been successfully imported."
        });
      } catch (error) {
        console.error('Import error:', error);
        toast({
          title: "❌ Import Failed",
          description: "Invalid backup file format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // File operations
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewFile(prev => ({ ...prev, file, name: file.name }));
    }
  };

  const addFile = () => {
    if (!newFile.name.trim() || !newFile.folderId) return;
    
    const targetFolder = folders[selectedCategory as keyof typeof folders].find(f => f.id === newFile.folderId);
    if (!targetFolder) return;

    const fileData = {
      id: `f_${Date.now()}`,
      name: newFile.name,
      type: newFile.type,
      size: newFile.file ? formatFileSize(newFile.file.size) : (newFile.type === 'text' ? `${newFile.content.length} chars` : 'N/A'),
      date: new Date().toISOString().split('T')[0],
      content: newFile.type === 'text' ? newFile.content : null,
      url: newFile.type === 'link' ? newFile.url : null
    };

    setFolders(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory as keyof typeof prev].map(folder =>
        folder.id === newFile.folderId
          ? { ...folder, files: [...folder.files, fileData] }
          : folder
      )
    }));

    setNewFile({ name: '', type: 'file', url: '', content: '', folderId: '', file: null });
    setShowAddFileModal(false);
    
    toast({
      title: "✅ File Added",
      description: `${fileData.name} has been added to ${targetFolder.name}`
    });
  };

  const addFolder = () => {
    if (!newFolder.name.trim()) return;
    
    const folderData = {
      id: `folder_${Date.now()}`,
      name: newFolder.name,
      iconData: newFolder.iconData,
      color: newFolder.color,
      files: []
    };

    setFolders(prev => ({
      ...prev,
      [newFolder.category as keyof typeof prev]: [...prev[newFolder.category as keyof typeof prev], folderData]
    }));

    setNewFolder({ name: '', iconData: modernIcons[0], color: 'blue', category: 'Personal' });
    setShowNewFolderModal(false);
    
    toast({
      title: "✅ Folder Created",
      description: `${folderData.name} has been created successfully`
    });
  };

  const editFolder = () => {
    if (!editingFolder || !newFolder.name.trim()) return;
    
    setFolders(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory as keyof typeof prev].map(folder =>
        folder.id === editingFolder.id
          ? { ...folder, name: newFolder.name, iconData: newFolder.iconData, color: newFolder.color }
          : folder
      )
    }));

    setEditingFolder(null);
    setShowEditFolderModal(false);
    setNewFolder({ name: '', iconData: modernIcons[0], color: 'blue', category: 'Personal' });
    
    toast({
      title: "✅ Folder Updated",
      description: "Folder has been updated successfully"
    });
  };

  const deleteFolder = (folderId: string) => {
    setFolders(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory as keyof typeof prev].filter(folder => folder.id !== folderId)
    }));
    
    toast({
      title: "🗑️ Folder Deleted",
      description: "Folder and its contents have been removed"
    });
  };

  // Utility functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'image':
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="h-4 w-4 text-blue-600" />;
      case 'video':
      case 'mp4':
      case 'avi':
      case 'mkv':
        return <Video className="h-4 w-4 text-purple-600" />;
      case 'audio':
      case 'mp3':
      case 'wav':
        return <Music className="h-4 w-4 text-green-600" />;
      case 'link':
        return <Link className="h-4 w-4 text-blue-500" />;
      case 'text':
        return <Type className="h-4 w-4 text-gray-600" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredFolders = folders[selectedCategory as keyof typeof folders].filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.files.some(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // File preview component
  const FilePreview = ({ file, onClose }: { file: any, onClose: () => void }) => (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {getFileIcon(file?.type)}
              {file?.name}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {file?.type === 'text' && file?.content && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">{file.content}</pre>
            </div>
          )}
          
          {file?.type === 'image' && (
            <div className="flex justify-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="w-64 h-48 bg-gray-200 rounded flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                  <span className="ml-2 text-gray-500">Image Preview</span>
                </div>
              </div>
            </div>
          )}
          
          {file?.type === 'pdf' && (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <FileText className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <p className="text-gray-600">PDF Preview</p>
              <p className="text-sm text-gray-500 mt-2">Size: {file.size}</p>
            </div>
          )}
          
          {file?.type === 'link' && file?.url && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Link className="h-4 w-4 text-blue-600" />
                <span className="font-medium">External Link</span>
              </div>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {file.url}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Folder view component
  const FolderView = ({ folder }: { folder: any }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedFolder(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className={`w-10 h-10 ${getColorScheme(folder.color).accent} rounded-lg flex items-center justify-center text-white shadow-sm backdrop-blur-sm bg-opacity-90`}>
            <folder.iconData.icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{folder.name}</h2>
            <p className="text-gray-600">{folder.files.length} files</p>
          </div>
        </div>
        <Button onClick={() => setShowAddFileModal(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-1" />
          Add File
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folder.files.map((file: any) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setShowFilePreview(file)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <p className="text-sm text-gray-500">{file.size} • {file.date}</p>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setShowFilePreview(file); }}>
                    <Eye className="h-3 w-3" />
                  </Button>
                  {file.type === 'link' && (
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank'); }}>
                      <Link className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              {file.type === 'text' && file.content && (
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p className="line-clamp-2">{file.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  if (selectedFolder) {
    return (
      <div className="space-y-6">
        <FolderView folder={selectedFolder} />
        <FilePreview file={showFilePreview} onClose={() => setShowFilePreview(null)} />
        
        {/* Add File Modal for folder view */}
        <Dialog open={showAddFileModal} onOpenChange={setShowAddFileModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New File to {selectedFolder.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">File Name</label>
                <Input
                  placeholder="My file..."
                  value={newFile.name}
                  onChange={(e) => setNewFile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={newFile.type} onValueChange={(value) => setNewFile(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">📝 Text Note</SelectItem>
                    <SelectItem value="file">📄 File Upload</SelectItem>
                    <SelectItem value="link">🔗 Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newFile.type === 'text' && (
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Write your note here..."
                    value={newFile.content}
                    onChange={(e) => setNewFile(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                </div>
              )}

              {newFile.type === 'file' && (
                <div>
                  <label className="text-sm font-medium">Choose File</label>
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mkv,.mp3,.wav"
                  />
                </div>
              )}

              {newFile.type === 'link' && (
                <div>
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    placeholder="https://..."
                    value={newFile.url}
                    onChange={(e) => setNewFile(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setShowAddFileModal(false); setNewFile({ name: '', type: 'file', url: '', content: '', folderId: selectedFolder.id, file: null }); }}>
                  Cancel
                </Button>
                <Button onClick={() => { setNewFile(prev => ({ ...prev, folderId: selectedFolder.id })); addFile(); }} disabled={!newFile.name.trim()}>
                  Add File
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderOpen className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
          <Badge variant="secondary" className="ml-2">
            {folders.Personal.length + folders.Resources.length} folders
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => document.getElementById('import-input')?.click()}>
            <Upload className="h-4 w-4 mr-1" />
            Import
          </Button>
          <Button onClick={() => setShowNewFolderModal(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-1" />
            New Folder
          </Button>
          <Button onClick={() => setShowAddFileModal(true)} variant="outline">
            <Upload className="h-4 w-4 mr-1" />
            Add File
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search in your files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={selectedCategory === 'Personal' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('Personal')}
            size="sm"
          >
            👤 Personal ({folders.Personal.length})
          </Button>
          <Button
            variant={selectedCategory === 'Resources' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('Resources')}
            size="sm"
          >
            📁 Resources ({folders.Resources.length})
          </Button>
        </div>
      </div>

      {/* Compact Folders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFolders.map((folder) => {
          const colorScheme = getColorScheme(folder.color);
          return (
            <Card 
              key={folder.id} 
              className={`${colorScheme.bg} ${colorScheme.border} ${colorScheme.hover} border-2 transition-all duration-200 cursor-pointer group relative backdrop-blur-md bg-opacity-60`}
              onClick={() => setSelectedFolder(folder)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${colorScheme.accent} rounded-xl flex items-center justify-center text-white shadow-sm mx-auto mb-2 backdrop-blur-sm bg-opacity-90`}>
                  <folder.iconData.icon className="h-6 w-6" />
                </div>
                <h3 className={`font-medium text-sm ${colorScheme.text} truncate mb-1`}>
                  {folder.name}
                </h3>
                <p className="text-xs text-gray-500">{folder.files.length} files</p>
                
                {/* Quick actions */}
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingFolder(folder);
                      setNewFolder({
                        name: folder.name,
                        iconData: folder.iconData,
                        color: folder.color,
                        category: selectedCategory
                      });
                      setShowEditFolderModal(true);
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
                      deleteFolder(folder.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* New Folder Modal */}
      <Dialog open={showNewFolderModal} onOpenChange={setShowNewFolderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Organize your files with a custom folder
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Folder Name</label>
              <Input
                placeholder="My awesome folder..."
                value={newFolder.name}
                onChange={(e) => setNewFolder(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Choose Icon</label>
              <div className="grid grid-cols-5 gap-3 mt-2 max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50/50">
                {modernIcons.map((iconData, index) => {
                  const IconComponent = iconData.icon;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all backdrop-blur-sm ${
                        newFolder.iconData.name === iconData.name ? 'border-blue-500 bg-blue-50/80' : 'border-gray-200/60 hover:border-gray-300/80 bg-white/60'
                      }`}
                      onClick={() => setNewFolder(prev => ({ ...prev, iconData }))}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mb-1">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-600 text-center">{iconData.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Choose Color</label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <div
                    key={color.value}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all ${
                      newFolder.color === color.value ? 'border-blue-500 bg-blue-50/80' : 'border-gray-200/60 hover:border-gray-300/80'
                    }`}
                    onClick={() => setNewFolder(prev => ({ ...prev, color: color.value }))}
                  >
                    <div className={`w-6 h-6 ${color.bg} rounded-lg mb-1`} />
                    <span className="text-xs text-gray-600">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={newFolder.category} onValueChange={(value) => setNewFolder(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Resources">Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewFolderModal(false)}>
                Cancel
              </Button>
              <Button onClick={addFolder} disabled={!newFolder.name.trim()}>
                Create Folder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Folder Modal */}
      <Dialog open={showEditFolderModal} onOpenChange={setShowEditFolderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
            <DialogDescription>
              Modify your folder settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Folder Name</label>
              <Input
                placeholder="Folder name..."
                value={newFolder.name}
                onChange={(e) => setNewFolder(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Choose Icon</label>
              <div className="grid grid-cols-5 gap-3 mt-2 max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50/50">
                {modernIcons.map((iconData, index) => {
                  const IconComponent = iconData.icon;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all backdrop-blur-sm ${
                        newFolder.iconData.name === iconData.name ? 'border-blue-500 bg-blue-50/80' : 'border-gray-200/60 hover:border-gray-300/80 bg-white/60'
                      }`}
                      onClick={() => setNewFolder(prev => ({ ...prev, iconData }))}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mb-1">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-600 text-center">{iconData.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Choose Color</label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <div
                    key={color.value}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all ${
                      newFolder.color === color.value ? 'border-blue-500 bg-blue-50/80' : 'border-gray-200/60 hover:border-gray-300/80'
                    }`}
                    onClick={() => setNewFolder(prev => ({ ...prev, color: color.value }))}
                  >
                    <div className={`w-6 h-6 ${color.bg} rounded-lg mb-1`} />
                    <span className="text-xs text-gray-600">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditFolderModal(false)}>
                Cancel
              </Button>
              <Button onClick={editFolder} disabled={!newFolder.name.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add File Modal */}
      <Dialog open={showAddFileModal} onOpenChange={setShowAddFileModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New File</DialogTitle>
            <DialogDescription>
              Upload a file, add a link, or write a text note
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">File Name</label>
              <Input
                placeholder="My file..."
                value={newFile.name}
                onChange={(e) => setNewFile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select value={newFile.type} onValueChange={(value) => setNewFile(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">📝 Text Note</SelectItem>
                  <SelectItem value="file">📄 File Upload</SelectItem>
                  <SelectItem value="link">🔗 Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newFile.type === 'text' && (
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Write your note here..."
                  value={newFile.content}
                  onChange={(e) => setNewFile(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                />
              </div>
            )}

            {newFile.type === 'file' && (
              <div>
                <label className="text-sm font-medium">Choose File</label>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mkv,.mp3,.wav"
                />
                {newFile.file && (
                  <p className="text-sm text-gray-500 mt-1">
                    Selected: {newFile.file.name} ({formatFileSize(newFile.file.size)})
                  </p>
                )}
              </div>
            )}

            {newFile.type === 'link' && (
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  placeholder="https://..."
                  value={newFile.url}
                  onChange={(e) => setNewFile(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium">Add to Folder</label>
              <Select value={newFile.folderId} onValueChange={(value) => setNewFile(prev => ({ ...prev, folderId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select folder..." />
                </SelectTrigger>
                <SelectContent>
                  {folders[selectedCategory as keyof typeof folders].map(folder => {
                    const IconComponent = folder.iconData.icon;
                    return (
                      <SelectItem key={folder.id} value={folder.id}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {folder.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddFileModal(false)}>
                Cancel
              </Button>
              <Button onClick={addFile} disabled={!newFile.name.trim() || !newFile.folderId}>
                Add File
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Preview Modal */}
      <FilePreview file={showFilePreview} onClose={() => setShowFilePreview(null)} />

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mkv,.mp3,.wav"
      />
      
      <input
        id="import-input"
        type="file"
        onChange={importData}
        accept=".json"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MyWorkspace;