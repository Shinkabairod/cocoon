
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  className = '' 
}) => {
  const sizeConfig = {
    small: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-lg'
    },
    medium: {
      container: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-2xl'
    },
    large: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
      text: 'text-3xl'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icône logo */}
      <div className={`${config.container} bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200`}>
        <div className={`${config.icon} bg-white transform rotate-45 rounded-sm`}></div>
      </div>
      
      {/* Texte */}
      {showText && (
        <span className={`${config.text} font-bold text-gray-900`}>
          Cocoon AI
        </span>
      )}
    </div>
  );
};

export default Logo;
