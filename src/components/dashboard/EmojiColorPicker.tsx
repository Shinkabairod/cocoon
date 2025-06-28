
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Emojis 2D simples organisés par catégories
const EMOJI_CATEGORIES = {
  files: ['📄', '📝', '📋', '📊', '📈', '📉', '🗂️', '📁'],
  creative: ['🎨', '🎬', '🎭', '🎪', '🎯', '🎲', '🎨', '✨'],
  tech: ['💻', '🖥️', '⌨️', '🖱️', '💾', '💿', '📱', '🔧'],
  business: ['💼', '💰', '💵', '💳', '📊', '📈', '🏢', '🎯'],
  education: ['📚', '📖', '📝', '🎓', '📐', '📏', '🔬', '🧮'],
  misc: ['⭐', '❤️', '🔥', '💡', '🚀', '⚡', '🎉', '🏆']
};

// Couleurs disponibles
const COLORS = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // yellow
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#84CC16', // lime
  '#F97316', // orange
  '#6B7280'  // gray
];

interface EmojiColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoji: string, color: string) => void;
  currentEmoji?: string;
  currentColor?: string;
}

const EmojiColorPicker: React.FC<EmojiColorPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentEmoji = '📁',
  currentColor = '#3B82F6'
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(currentEmoji);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleConfirm = () => {
    onSelect(selectedEmoji, selectedColor);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choisir un emoji et une couleur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Aperçu */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div 
              className="text-4xl mb-2 inline-block p-2 rounded-lg"
              style={{ backgroundColor: selectedColor + '20', border: `2px solid ${selectedColor}` }}
            >
              {selectedEmoji}
            </div>
            <p className="text-sm text-gray-600">Aperçu</p>
          </div>

          {/* Sélection d'emoji */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Choisir un emoji :</h3>
            <div className="space-y-3">
              {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-gray-500 mb-2 capitalize">
                    {category === 'files' ? 'Fichiers' :
                     category === 'creative' ? 'Créatif' :
                     category === 'tech' ? 'Tech' :
                     category === 'business' ? 'Business' :
                     category === 'education' ? 'Éducation' :
                     'Divers'}
                  </p>
                  <div className="grid grid-cols-8 gap-1">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={`${category}-${index}`}
                        variant="ghost"
                        size="sm"
                        className={`h-10 w-10 p-0 text-xl hover:bg-gray-100 ${
                          selectedEmoji === emoji ? 'bg-blue-100 border-2 border-blue-500' : ''
                        }`}
                        onClick={() => setSelectedEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sélection de couleur */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Choisir une couleur :</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <Button
                  key={color}
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              Confirmer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Composant pour les stats Dashboard Home
export const DashboardStats: React.FC<{ stats: any }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Total Dossiers</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalFolders || 7}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Total Fichiers</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalFiles || 5}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Personnel</p>
          <p className="text-2xl font-bold text-blue-600">{stats?.personalFiles || 5}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Ressources</p>
          <p className="text-2xl font-bold text-purple-600">{stats?.resourceFiles || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default EmojiColorPicker;
