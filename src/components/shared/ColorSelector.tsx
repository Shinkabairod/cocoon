// src/components/shared/ColorSelector.tsx
import React from 'react';
import { colorOptions } from '@/lib/colorConfig';

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  onColorSelect
}) => (
  <div>
    <label className="text-sm font-medium">Choose Color</label>
    <div className="grid grid-cols-6 gap-2 mt-2">
      {colorOptions.map((color) => (
        <div
          key={color.value}
          className={`flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all ${
            selectedColor === color.value ? 'border-blue-500 bg-blue-50/80' : 'border-gray-200/60 hover:border-gray-300/80'
          }`}
          onClick={() => onColorSelect(color.value)}
        >
          <div className={`w-6 h-6 ${color.bg} rounded-lg mb-1`} />
          <span className="text-xs text-gray-600">{color.name}</span>
        </div>
      ))}
    </div>
  </div>
);
