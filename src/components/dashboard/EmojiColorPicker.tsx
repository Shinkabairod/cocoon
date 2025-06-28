
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { IconSelector } from '@/components/shared/IconSelector';
import { ColorSelector } from '@/components/shared/ColorSelector';
import { modernIcons } from '@/lib/iconConfig';

interface EmojiColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; icon: any; color: string; category: string }) => void;
  initialData?: any;
  title: string;
  description: string;
}

const EmojiColorPicker: React.FC<EmojiColorPickerProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
  description
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(initialData?.iconData || modernIcons[0]);
  const [selectedColor, setSelectedColor] = useState(initialData?.color || 'blue');
  const [category, setCategory] = useState(initialData?.category || 'Personal');

  const handleSave = () => {
    if (!name.trim()) return;
    
    onSave({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
      category
    });
    
    // Reset form
    setName('');
    setSelectedIcon(modernIcons[0]);
    setSelectedColor('blue');
    setCategory('Personal');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className="text-sm text-gray-600">{description}</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Folder Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter folder name..."
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <div className="flex gap-2 mt-2">
              <Button
                variant={category === 'Personal' ? 'default' : 'outline'}
                onClick={() => setCategory('Personal')}
                size="sm"
              >
                👤 Personal
              </Button>
              <Button
                variant={category === 'Resources' ? 'default' : 'outline'}
                onClick={() => setCategory('Resources')}
                size="sm"
              >
                📁 Resources
              </Button>
            </div>
          </div>

          <IconSelector
            selectedIcon={selectedIcon}
            onIconSelect={setSelectedIcon}
          />

          <ColorSelector
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1" disabled={!name.trim()}>
              Save Folder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmojiColorPicker;
