import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

// File type icons mapping
const fileTypeIcons = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  txt: FileText,
  image: Image,
  jpg: Image,
  jpeg: Image,
  png: Image,
  gif: Image,
  video: Video,
  mp4: Video,
  avi: Video,
  mkv: Video,
  audio: Music,
  mp3: Music,
  wav: Music,
  link: Link,
  default: FileIcon
};

// Color schemes for folders
const colorSchemes = [
  { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', accent: 'bg-blue-500' },
  { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', accent: 'bg-green-500' },
  { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', accent: 'bg-purple-500' },
  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', accent: 'bg-orange-500' },
  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', accent: 'bg-pink-500' },
  { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', accent: 'bg-yellow-500' },
  { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', accent: 'bg-indigo-500' },
  { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', accent: 'bg-red-500' },
];

// Available emojis for folders
const availableEmojis = ['📁', '🎬', '🎨', '📱', '💡', '🎯', '🏢', '⚡', '📚', '🎵', '🖼️', '📊', '💼', '🔧', '🎪', '🌟'];

const MyWorkspace = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Personal');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showEditFolderModal, setShowEditFolderModal] = useState(false);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [draggedFile, setDraggedFile] = useState(null);
  
  // Form states
  const [newFolder, setNewFolder] = useState({
    name: '',
    emoji: '📁',
    colorScheme: 0,
    category: 'Personal'
  });
  
  const [newFile, setNewFile] = useState({
    name: '',
    type: 'file',
    url: '',
    folderId: '',
    file: null
  });

  // Sample data structure
  const [folders, setFolders] = useState({
    Personal: [
      { 
        id: '1', 
        name: 'My Profile', 
        emoji: '👤', 
        colorScheme: 0, 
        files: [
          { id: 'f1', name: 'Resume.pdf', type: 'pdf', size: '2.5 MB', date: '2024-01-15' },
          { id: 'f2', name: 'Bio.txt', type: 'txt', size: '1.2 KB', date: '2024-01-20' }
        ] 
      },
      { 
        id: '2', 
        name: 'My Goals', 
        emoji: '🎯', 
        colorScheme: 1, 
        files: [
          { id: 'f3', name: '2024-objectives.pdf', type: 'pdf', size: '3.1 MB', date: '2024-01-01' },
          { id: 'f4', name: 'vision-board.jpg', type: 'image', size: '5.2 MB', date: '2024-01-10' },
          { id: 'f5', name: 'motivation-video.mp4', type: 'video', size: '25.8 MB', date: '2024-01-12' }
        ] 
      },
      { 
        id: '3', 
        name: 'My Business', 
        emoji: '🏢', 
        colorScheme: 2, 
        files: [
          { id: 'f6', name: 'business-plan.pdf', type: 'pdf', size: '4.7 MB', date: '2024-01-05' },
          { id: 'f7', name: 'Financial Projections', type: 'link', url: 'https://sheets.google.com', date: '2024-01-18' }
        ] 
      },
      { 
        id: '4', 
        name: 'My Platforms', 
        emoji: '📱', 
        colorScheme: 3, 
        files: [
          { id: 'f8', name: 'social-media-calendar.pdf', type: 'pdf', size: '2.3 MB', date: '2024-01-22' },
          { id: 'f9', name: 'Instagram Analytics', type: 'link', url: 'https://instagram.com/insights', date: '2024-01-25' }
        ] 
      },
      { 
        id: '5', 
        name: 'My Challenges', 
        emoji: '⚡', 
        colorScheme: 4, 
        files: [
          { id: 'f10', name: 'challenge-list.txt', type: 'txt', size: '800 B', date: '2024-01-08' },
          { id: 'f11', name: 'solutions-brainstorm.mp3', type: 'audio', size: '12.4 MB', date: '2024-01-14' }
        ] 
      }
    ],
    Resources: []
  });

  // File operations
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewFile(prev => ({ ...prev, file, name: file.name }));
    }
  };

  const addFile = () => {
    if (!newFile.name.trim() || !newFile.folderId) return;
    
    const targetFolder = folders[selectedCategory].find(f => f.id === newFile.folderId);
    if (!targetFolder) return;

    const fileData = {
      id: `f_${Date.now()}`,
      name: newFile.name,
      type: newFile.type === 'link' ? 'link' : getFileType(newFile.name),
      size: newFile.file ? formatFileSize(newFile.file.size) : 'N/A',
      date: new Date().toISOString().split('T')[0],
      url: newFile.url || undefined
    };

    setFolders(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].map(folder =>
        folder.id === newFile.folderId
          ? { ...folder, files: [...folder.files, fileData] }
          : folder
      )
    }));

    setNewFile({ name: '', type: 'file', url: '', folderId: '', file: null });
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
      emoji: newFolder.emoji,
      colorScheme: newFolder.colorScheme,
      files: []
    };

    setFolders(prev => ({
      ...prev,
      [newFolder.category]: [...prev[newFolder.category], folderData]
    }));

    setNewFolder({ name: '', emoji: '📁', colorScheme: 0, category: 'Personal' });
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
      [selectedCategory]: prev[selectedCategory].map(folder =>
        folder.id === editingFolder.id
          ? { ...folder, name: newFolder.name, emoji: newFolder.emoji, colorScheme: newFolder.colorScheme }
          : folder
      )
    }));

    setEditingFolder(null);
    setShowEditFolderModal(false);
    setNewFolder({ name: '', emoji: '📁', colorScheme: 0, category: 'Personal' });
    
    toast({
      title: "✅ Folder Updated",
      description: "Folder has been updated successfully"
    });
  };

  const deleteFolder = (folderId) => {
    setFolders(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter(folder => folder.id !== folderId)
    }));
    
    toast({
      title: "🗑️ Folder Deleted",
      description: "Folder and its contents have been removed"
    });
  };

  // Drag and drop handlers
  const handleDragStart = (file, sourceFolderId) => {
    setDraggedFile({ ...file, sourceFolderId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetFolderId) => {
    e.preventDefault();
    if (!draggedFile || draggedFile.sourceFolderId === targetFolderId) return;

    // Remove file from source folder
    setFolders(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].map(folder => {
        if (folder.id === draggedFile.sourceFolderId) {
          return { ...folder, files: folder.files.filter(f => f.id !== draggedFile.id) };
        }
        if (folder.id === targetFolderId) {
          return { ...folder, files: [...folder.files, { ...draggedFile, sourceFolderId: undefined }] };
        }
        return folder;
      })
    }));

    toast({
      title: "📁 File Moved",
      description: `${draggedFile.name} moved successfully`
    });

    setDraggedFile(null);
  };

  // Utility functions
  const getFileType = (filename) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['mp4', 'avi', 'mkv', 'mov'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'flac', 'aac'].includes(extension)) return 'audio';
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'doc';
    return extension || 'file';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    const IconComponent = fileTypeIcons[type] || fileTypeIcons.default;
    return <IconComponent className="h-4 w-4" />;
  };

  const filteredFolders = folders[selectedCategory].filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.files.some(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderOpen className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
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

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFolders.map((folder) => {
          const colorScheme = colorSchemes[folder.colorScheme];
          return (
            <Card 
              key={folder.id} 
              className={`${colorScheme.bg} ${colorScheme.border} border-2 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, folder.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${colorScheme.accent} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                      {folder.emoji}
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${colorScheme.text} group-hover:text-gray-900 transition-colors`}>
                        {folder.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{folder.files.length} files</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFolder(folder);
                        setNewFolder({
                          name: folder.name,
                          emoji: folder.emoji,
                          colorScheme: folder.colorScheme,
                          category: selectedCategory
                        });
                        setShowEditFolderModal(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFolder(folder.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {folder.files.slice(0, 3).map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group/file"
                      draggable
                      onDragStart={() => handleDragStart(file, folder.id)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className={`p-1 ${colorScheme.bg} rounded`}>
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover/file:opacity-100 transition-opacity">
                        {file.type === 'link' && (
                          <Button variant="ghost" size="sm" onClick={() => window.open(file.url, '_blank')}>
                            <Link className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {folder.files.length > 3 && (
                    <div className="text-center py-2">
                      <Badge variant="secondary" className={`${colorScheme.text}`}>
                        +{folder.files.length - 3} more files
                      </Badge>
                    </div>
                  )}
                  {folder.files.length === 0 && (
                    <div className="text-center py-4 text-gray-400">
                      <File className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No files yet</p>
                      <p className="text-xs">Drop files here or click to add</p>
                    </div>
                  )}
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
              <label className="text-sm font-medium">Emoji</label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {availableEmojis.map(emoji => (
                  <Button
                    key={emoji}
                    variant={newFolder.emoji === emoji ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewFolder(prev => ({ ...prev, emoji }))}
                    className="h-10 w-10 p-0"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Color Theme</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {colorSchemes.map((scheme, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setNewFolder(prev => ({ ...prev, colorScheme: index }))}
                    className={`h-10 ${scheme.bg} ${scheme.border} ${newFolder.colorScheme === index ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`w-4 h-4 ${scheme.accent} rounded-full`} />
                  </Button>
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
              <label className="text-sm font-medium">Emoji</label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {availableEmojis.map(emoji => (
                  <Button
                    key={emoji}
                    variant={newFolder.emoji === emoji ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewFolder(prev => ({ ...prev, emoji }))}
                    className="h-10 w-10 p-0"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Color Theme</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {colorSchemes.map((scheme, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setNewFolder(prev => ({ ...prev, colorScheme: index }))}
                    className={`h-10 ${scheme.bg} ${scheme.border} ${newFolder.colorScheme === index ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`w-4 h-4 ${scheme.accent} rounded-full`} />
                  </Button>
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
              Upload a file or add a link to your workspace
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
                  <SelectItem value="file">📄 File Upload</SelectItem>
                  <SelectItem value="link">🔗 Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  {folders[selectedCategory].map(folder => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.emoji} {folder.name}
                    </SelectItem>
                  ))}
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

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mkv,.mp3,.wav"
      />
    </div>
  );
};

export default MyWorkspace;