import React, { useState, useRef, useEffect } from 'react';
import { X, FileText, Folder, Target, Lightbulb, Briefcase, Smartphone, Zap, Palette, Video, BarChart3, Camera, Code, Dumbbell, Clock, BookOpen, Users, Wrench, Database, Home, Star, Heart, Globe, Music, Image, MessageSquare, Settings, Search, Bell, Map, Compass, Gift, Truck, Shield, Wifi, Sun, Moon, Cloud, Battery, Headphones, Mic, Speaker, Phone, Mail, Calendar, Edit, Save, Download, Upload, Trash2, Plus, Minus, Check, AlertCircle, Info, HelpCircle, Flag, Key, Lock, Unlock, Eye, EyeOff, TrendingUp, DollarSign, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const EditFolderModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || 'My Profile');
  const [icon, setIcon] = useState(initialData.icon || 'palette');
  const [color, setColor] = useState(initialData.color || '#f97316');
  const [searchQuery, setSearchQuery] = useState('');
  const colorSliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Toutes les icônes lucide disponibles - COLLECTION COMPLÈTE
  const allLucideIcons = [
    // Essentials
    { id: 'folder', icon: Folder }, { id: 'file', icon: FileText }, { id: 'home', icon: Home }, { id: 'star', icon: Star }, 
    { id: 'heart', icon: Heart }, { id: 'target', icon: Target }, { id: 'lightbulb', icon: Lightbulb }, { id: 'palette', icon: Palette },
    
    // Business & Finance
    { id: 'briefcase', icon: Briefcase }, { id: 'users', icon: Users }, { id: 'building', icon: Building }, { id: 'chart', icon: BarChart3 }, 
    { id: 'trending', icon: TrendingUp }, { id: 'globe', icon: Globe }, { id: 'dollar-sign', icon: DollarSign },
    
    // Creative & Media
    { id: 'camera', icon: Camera }, { id: 'video', icon: Video }, { id: 'music', icon: Music }, { id: 'image', icon: Image }, 
    { id: 'mic', icon: Mic }, { id: 'headphones', icon: Headphones }, { id: 'speaker', icon: Speaker },
    
    // Technology
    { id: 'code', icon: Code }, { id: 'smartphone', icon: Smartphone }, { id: 'wifi', icon: Wifi }, { id: 'database', icon: Database }, 
    { id: 'wrench', icon: Wrench }, { id: 'shield', icon: Shield }, { id: 'battery', icon: Battery },
    
    // Communication
    { id: 'message', icon: MessageSquare }, { id: 'mail', icon: Mail }, { id: 'phone', icon: Phone }, { id: 'bell', icon: Bell },
    
    // Navigation & Location
    { id: 'map', icon: Map }, { id: 'compass', icon: Compass }, { id: 'map-pin', icon: MapPin },
    
    // Time & Calendar
    { id: 'clock', icon: Clock }, { id: 'calendar', icon: Calendar },
    
    // Weather & Nature
    { id: 'sun', icon: Sun }, { id: 'moon', icon: Moon }, { id: 'cloud', icon: Cloud },
    
    // Actions & Controls
    { id: 'plus', icon: Plus }, { id: 'minus', icon: Minus }, { id: 'edit', icon: Edit }, { id: 'save', icon: Save }, 
    { id: 'download', icon: Download }, { id: 'upload', icon: Upload }, { id: 'trash', icon: Trash2 }, { id: 'check', icon: Check },
    
    // Interface & System
    { id: 'settings', icon: Settings }, { id: 'search', icon: Search }, { id: 'eye', icon: Eye }, { id: 'eye-off', icon: EyeOff }, 
    { id: 'lock', icon: Lock }, { id: 'unlock', icon: Unlock }, { id: 'key', icon: Key },
    
    // Status & Info
    { id: 'alert', icon: AlertCircle }, { id: 'info', icon: Info }, { id: 'help', icon: HelpCircle }, { id: 'flag', icon: Flag },
    
    // Transport & Delivery
    { id: 'truck', icon: Truck }, { id: 'gift', icon: Gift },
    
    // Books & Learning
    { id: 'book', icon: BookOpen }
  ];

  const iconsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(0);
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
  const handleColorSlider = (e) => {
    if (!colorSliderRef.current) return;
    
    const rect = colorSliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    
    // Générer une couleur HSL basée sur la position
    const hue = Math.round(percentage * 360);
    const hsl = `hsl(${hue}, 70%, 55%)`;
    setColor(hsl);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleColorSlider(e);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleColorSlider(e);
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
          {/* Folder Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Folder Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Enter folder name"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Choose Color</label>
            
            {/* Innovative Circle Line Color Picker */}
            <div className="mb-4">
              <div 
                ref={colorSliderRef}
                className="relative flex items-center justify-between p-2 cursor-pointer"
                onMouseDown={handleMouseDown}
              >
                {/* Circles representing the color spectrum */}
                {Array.from({ length: 20 }, (_, i) => {
                  const hue = (i / 19) * 360;
                  const circleColor = `hsl(${hue}, 70%, 55%)`;
                  const isSelected = Math.abs(parseInt(color.match(/\d+/)?.[0] || '0') - hue) < 18;
                  
                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full transition-all duration-200 hover:scale-125 cursor-pointer ${
                        isSelected ? 'scale-150 ring-4 ring-white ring-opacity-80 shadow-2xl' : 'hover:shadow-lg'
                      }`}
                      style={{ backgroundColor: circleColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setColor(circleColor);
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Connecting line behind circles */}
              {/* Ligne gradient supprimée temporairement */}

            </div>

            {/* Quick Color Presets */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {predefinedColors.slice(0, 10).map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => setColor(colorOption.value)}
                  className={`w-10 h-10 rounded-full transition-all hover:scale-110 border-3 ${
                    color === colorOption.value ? 'border-gray-800 shadow-xl' : 'border-white shadow-md'
                  }`}
                  style={{ backgroundColor: colorOption.value }}
                />
              ))}
            </div>
            
            {/* Current Color Display */}
            <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div 
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: color }}
              />
              <div className="text-center">
                <p className="text-xs font-medium text-gray-700">Selected Color</p>
                <p className="text-xs text-gray-500 font-mono">{color}</p>
              </div>
            </div>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Choose Icon</label>
            
            {/* Search Icons */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Icons Grid avec Pagination */}
            <div className="space-y-4">
              {/* Grid des icônes */}
              <div className="grid grid-cols-8 gap-2 min-h-[240px]">
                {paginatedIcons.map(({ id, icon: IconComponent }) => (
                  <button
                    key={id}
                    onClick={() => setIcon(id)}
                    className={`p-3 rounded-xl transition-all hover:scale-105 group relative ${
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
