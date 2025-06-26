import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAuthRedirect: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthRedirect }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white transform rotate-45 rounded-sm"></div>
              </div>
              <div className="absolute inset-0 bg-black rounded-lg blur opacity-30 animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-black">
              Cocoon AI
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">Testimonials</a>
            <Button variant="outline" size="sm" onClick={onAuthRedirect} className="hover:scale-105 transition-transform">
              Sign in
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;