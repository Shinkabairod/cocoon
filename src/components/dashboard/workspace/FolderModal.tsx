
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconSelector } from '@/components/shared/IconSelector';
import { ColorSelector } from '@/components/shared/ColorSelector';
import { modernIcons } from '@/lib/iconConfig';

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  description: string;
  initialData?: any;
}

const FolderModal: React.FC<FolderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  initialData
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Personal',
    iconData: modernIcons[0],
    color: 'blue'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        category: 'Personal',
        iconData: modernIcons[0],
        color: 'blue'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className="text-sm text-gray-600">{description}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Folder Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter folder name..."
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">👤 Personal</SelectItem>
                <SelectItem value="Resources">📁 Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <IconSelector
            selectedIcon={formData.iconData}
            onIconSelect={(icon) => setFormData(prev => ({ ...prev, iconData: icon }))}
          />

          <ColorSelector
            selectedColor={formData.color}
            onColorSelect={(color) => setFormData(prev => ({ ...prev, color }))}
          />

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FolderModal;
