import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Emojis 2D simples organisés par catégories
const EMOJI_CATEGORIES = {
  files: ['📄', '📝', '📋', '📊', '📈', '📉', '🗂️', '📁'],
  creative: ['🎨', '🎬', '🎭', '🎪', '🎯', '🎲', '✨', '💡'],
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

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'files': return 'Fichiers';
      case 'creative': return 'Créatif';
      case 'tech': return 'Tech';
      case 'business': return 'Business';
      case 'education': return 'Éducation';
      case 'misc': return 'Divers';
      default: return category;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choisir un emoji et une couleur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Aperçu */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div 
              className="text-4xl mb-2 inline-block p-3 rounded-lg border-2"
              style={{ 
                backgroundColor: selectedColor + '20', 
                borderColor: selectedColor 
              }}
            >
              {selectedEmoji}
            </div>
            <p className="text-sm text-gray-600 font-medium">Aperçu</p>
          </div>

          {/* Sélection d'emoji */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Choisir un emoji :</h3>
            <div className="space-y-4">
              {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-gray-500 mb-2 capitalize">
                    {getCategoryName(category)}
                  </p>
                  <div className="grid grid-cols-8 gap-1">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={`${category}-${index}`}
                        variant="ghost"
                        size="sm"
                        className={`h-10 w-10 p-0 text-xl hover:bg-gray-100 transition-all ${
                          selectedEmoji === emoji 
                            ? 'bg-blue-100 border-2 border-blue-500 scale-110' 
                            : 'border border-gray-200'
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
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <Button
                  key={color}
                  variant="ghost"
                  size="sm"
                  className={`h-10 w-10 p-0 rounded-lg border-2 transition-all hover:scale-110 ${
                    selectedColor === color 
                      ? 'border-gray-800 scale-110 shadow-lg' 
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <span className="text-white font-bold text-lg">✓</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1"
              style={{ backgroundColor: selectedColor }}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmojiColorPicker;