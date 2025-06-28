
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  targetFolderId?: string;
  availableFolders: any[];
}

const FileModal: React.FC<FileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  targetFolderId,
  availableFolders
}) => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    folderId: targetFolderId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.folderId) return;
    onSubmit(formData);
    setFormData({ name: '', content: '', folderId: targetFolderId || '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New File</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">File Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter file name..."
              className="mt-1"
            />
          </div>

          {!targetFolderId && (
            <div>
              <label className="text-sm font-medium">Folder</label>
              <Select value={formData.folderId} onValueChange={(value) => setFormData(prev => ({ ...prev, folderId: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select folder..." />
                </SelectTrigger>
                <SelectContent>
                  {availableFolders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter file content..."
              className="mt-1"
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add File
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileModal;
