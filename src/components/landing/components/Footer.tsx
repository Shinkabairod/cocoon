import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white transform rotate-45 rounded-sm"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-black">
                Cocoon AI
              </span>
            </div>
            <p className="text-gray-600">
              The platform that turns your expertise into automated income.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#features" className="hover:text-gray-900 transition-colors">How it works</a></li>
              <li><a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-gray-900 transition-colors">Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Cocoon AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;