import React from 'react';
const FeaturesSection: React.FC = () => {
  return <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent mb-6">Nos bots surpassent tous les autres</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">La différence entre un chatbot générique et un expert digital personnalisé</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Carte 1 - Expertise authentique */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-800 rounded-3xl p-8 hover:border-blue-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* SVG 2D remplace l'emoji */}
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-blue-800">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6v6H9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Expertise 100% authentique
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Ton bot s'appuie sur tes vraies méthodes, ton contenu, ton savoir-faire. 
                Pas d'IA générique : chaque réponse reflète ta voix, ton expérience, ta valeur.
              </p>
              
              {/* Badge noir */}
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-200 to-blue-100 text-blue-700 text-sm font-semibold">
                ✨ Qualité Premium
              </div>
            </div>
          </div>

          {/* Carte 2 - Réponses sur-mesure */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-600 rounded-3xl p-8 hover:border-blue-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* SVG 2D remplace l'emoji */}
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Réponses sur-mesure
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Nos algorithmes adaptent ton ton, ton style, tes mots. Chaque échange est optimisé pour 
                reproduire ta façon unique de transmettre.
              </p>
              
              {/* Badge noir */}
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-200 to-blue-100 text-blue-700 text-sm font-semibold">
                ✨ Qualité Premium
              </div>
            </div>
          </div>

          {/* Carte 3 - Fiabilité garantie */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-400 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* SVG 2D remplace l'emoji */}
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fiabilité garantie
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Aucune info inventée. Tout est analysé, structuré et vérifié avant d'être utilisé. 
                Tu gardes le contrôle total sur ce que ton bot délivre.
              </p>
              
              {/* Badge noir */}
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-200 to-blue-100 text-blue-700 text-sm font-semibold">
                ✨ Qualité Premium
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FeaturesSection;