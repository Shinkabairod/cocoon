
import React from 'react';
import { modernIcons } from '@/lib/iconConfig';

interface IconSelectorProps {
  selectedIcon: any;
  onIconSelect: (icon: any) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconSelect
}) => (
  <div>
    <label className="text-sm font-medium">Choose Icon</label>
    <div className="grid grid-cols-5 gap-3 mt-2 max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50/50">
      {modernIcons.map((iconData, index) => {
        const IconComponent = iconData.icon;
        return (
          <div
            key={index}
            className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all backdrop-blur-sm ${
              selectedIcon.name === iconData.name ? 'border-blue-500 bg-blue-50/80' : 'border-gray-200/60 hover:border-gray-300/80 bg-white/60'
            }`}
            onClick={() => onIconSelect(iconData)}
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
);
