import React, { useState, useRef, useEffect } from 'react';
import { X, FileText, Folder, Target, Lightbulb, Briefcase, Smartphone, Zap, Palette, Video, BarChart3, Camera, Code, Dumbbell, Clock, BookOpen, Users, Wrench, Database, Home, Star, Heart, Globe, Music, Image, MessageSquare, Settings, Search, Bell, Map, Compass, Gift, Truck, Shield, Wifi, Sun, Moon, Cloud, Battery, Headphones, Mic, Speaker, Phone, Mail, Calendar, Edit, Save, Download, Upload, Trash2, Plus, Minus, Check, AlertCircle, Info, HelpCircle, Flag, Key, Lock, Unlock, Eye, EyeOff, TrendingUp, DollarSign, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface EditFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; icon: string; color: string }) => void;
  initialData?: {
    name?: string;
    icon?: string;
    color?: string;
  };
}

const EditFolderModal: React.FC<EditFolderModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {} 
}) => {
  const [name, setName] = useState(initialData.name || 'My Profile');
  const [icon, setIcon] = useState(initialData.icon || 'palette');
  const [color, setColor] = useState(initialData.color || '#f97316');
  const [searchQuery, setSearchQuery] = useState('');
  const colorSliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Icônes sans Building (remplacé par Briefcase)
  const allLucideIcons = [
    { id: 'folder', icon: Folder }, { id: 'file', icon: FileText }, { id: 'home', icon: Home }, 
    { id: 'star', icon: Star }, { id: 'heart', icon: Heart }, { id: 'target', icon: Target }, 
    { id: 'lightbulb', icon: Lightbulb }, { id: 'palette', icon: Palette },
    { id: 'briefcase', icon: Briefcase }, { id: 'users', icon: Users }, 
    { id: 'chart', icon: BarChart3 }, { id: 'trending', icon: TrendingUp }, 
    { id: 'globe', icon: Globe }, { id: 'camera', icon: Camera }, 
    { id: 'video', icon: Video }, { id: 'music', icon: Music }, 
    { id: 'image', icon: Image }, { id: 'mic', icon: Mic }, 
    { id: 'code', icon: Code }, { id: 'smartphone', icon: Smartphone }, 
    { id: 'database', icon: Database }, { id: 'settings', icon: Settings }
  ];

  const iconsPerPage = 24;
  const totalPages = Math.ceil(allLucideIcons.length / iconsPerPage);

  // Filtrer et paginer les icônes
  const filteredIcons = allLucideIcons.filter(iconData => 
    iconData.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const paginatedIcons = searchQuery 
    ? filteredIcons.slice(0, iconsPerPage)
    : allLucideIcons.slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage);

  // Couleurs prédéfinies avec leurs valeurs hex
  const predefinedColors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Cyan', value: '#06b6d4' }
  ];

  // Gestion du slider de couleur
  const handleColorSlider = (e: React.MouseEvent) => {
    if (!colorSliderRef.current) return;
    
    const rect = colorSliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    
    // Générer une couleur HSL basée sur la position
    const hue = Math.round(percentage * 360);
    const hsl = `hsl(${hue}, 70%, 55%)`;
    setColor(hsl);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleColorSlider(e);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleColorSlider(e as any);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Edit Folder</h2>
            <p className="text-sm text-gray-400 mt-1">Customize your folder appearance</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Nom du dossier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter folder name..."
            />
          </div>

          {/* Sélection d'icône */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Icon
            </label>
            
            {/* Barre de recherche */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
              {/* Grille d'icônes */}
              <div className="grid grid-cols-6 gap-2 mb-4">
                {paginatedIcons.map(({ id, icon: IconComponent }) => (
                  <button
                    key={id}
                    onClick={() => setIcon(id)}
                    className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${
                      icon === id 
                        ? 'bg-black text-white shadow-xl scale-105' 
                        : 'hover:bg-gray-50 text-gray-600 border border-gray-100'
                    }`}
                    title={id}
                  >
                    <IconComponent size={18} />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {id}
                    </div>
                  </button>
                ))}
              </div>

              {/* Pagination moderne */}
              {!searchQuery && totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {filteredIcons.length} icons • Page {currentPage + 1} of {totalPages}
                  </p>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    {/* Page dots */}
                    <div className="flex gap-1 mx-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageIndex;
                        if (totalPages <= 5) {
                          pageIndex = i;
                        } else if (currentPage < 3) {
                          pageIndex = i;
                        } else if (currentPage > totalPages - 4) {
                          pageIndex = totalPages - 5 + i;
                        } else {
                          pageIndex = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageIndex}
                            onClick={() => setCurrentPage(pageIndex)}
                            className={`w-6 h-6 rounded-full text-xs transition-all ${
                              currentPage === pageIndex
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            {pageIndex + 1}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Résultats de recherche */}
              {searchQuery && (
                <div className="text-center text-sm text-gray-500">
                  {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found for "{searchQuery}"
                </div>
              )}

              {searchQuery && filteredIcons.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Search size={48} className="mx-auto mb-2 opacity-30" />
                  <p>No icons found for "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-blue-500 text-sm mt-2 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sélection de couleur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Color
            </label>
            
            {/* Couleurs prédéfinies */}
            <div className="grid grid-cols-5 gap-3 mb-4">
              {predefinedColors.map((colorOption) => (
                <button
                  key={colorOption.name}
                  onClick={() => setColor(colorOption.value)}
                  className={`w-12 h-12 rounded-xl transition-all hover:scale-110 ${
                    color === colorOption.value ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                  }`}
                  style={{ backgroundColor: colorOption.value }}
                  title={colorOption.name}
                />
              ))}
            </div>
            
            {/* Slider de couleur personnalisé */}
            <div 
              ref={colorSliderRef}
              className="w-full h-8 rounded-lg cursor-pointer relative"
              style={{
                background: 'linear-gradient(to right, hsl(0, 70%, 55%), hsl(60, 70%, 55%), hsl(120, 70%, 55%), hsl(180, 70%, 55%), hsl(240, 70%, 55%), hsl(300, 70%, 55%), hsl(360, 70%, 55%))'
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Indicateur de position */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg pointer-events-none"
                style={{
                  left: `${(parseInt(color.match(/\d+/)?.[0] || '0') / 360) * 100}%`
                }}
              />
            </div>
            
            {/* Aperçu de la couleur */}
            <div className="flex items-center gap-3 mt-3">
              <div 
                className="w-8 h-8 rounded-lg border border-gray-200" 
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-600">{color}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ name, icon, color });
              onClose();
            }}
            className="flex-1 py-3 text-sm font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFolderModal;