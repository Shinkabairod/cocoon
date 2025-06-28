// src/lib/colorSchemes.ts
import { colorOptions } from './colorConfig';

export const getColorScheme = (colorValue: string) => {
  const color = colorOptions.find(c => c.value === colorValue) || colorOptions[0];
  return {
    bg: color.light,
    border: color.border,
    text: `text-${color.value}-700`,
    accent: color.bg,
    hover: `hover:bg-${color.value}-100/90`
  };
};
