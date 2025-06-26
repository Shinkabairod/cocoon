import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title aligned to the left */}
        <div className="text-left mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Features
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 - Authentic Expertise */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-600 rounded-3xl p-8 hover:border-blue-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6v6H9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                100% Authentic Expertise
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Your bot relies on your real methods, content, and know-how. 
                No generic AI: every response reflects your voice, experience, and value.
              </p>
              
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-semibold">
                ✨ Premium Quality
              </div>
            </div>
          </div>

          {/* Card 2 - Tailored Responses */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-violet-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-violet-600 rounded-3xl p-8 hover:border-violet-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-14 h-14 bg-violet-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-violet-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tailored Responses
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Our algorithms adapt your tone, style, and vocabulary. Each interaction is optimized to replicate your unique way of communicating.
              </p>
              
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-violet-200 text-violet-700 text-sm font-semibold">
                🎯 Custom-Fit
              </div>
            </div>
          </div>

          {/* Card 3 - Smart Automation */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-600 rounded-3xl p-8 hover:border-blue-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Automation
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Delegate repetitive tasks while maintaining quality. 
                Save hours every week without sacrificing authenticity.
              </p>
              
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-semibold">
                ⚡ Automated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;