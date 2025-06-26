import React from 'react';
const FeaturesSection: React.FC = () => {
  return <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent mb-6">
            Pourquoi choisir Cocoon AI ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une technologie de pointe pour des résultats exceptionnels
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Carte 1 - Expertise authentique */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-800 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Emoji animé */}
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl">🗃️</span>
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
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-600 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Emoji animé */}
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                <span className="text-2xl">⚙️</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Réponses sur-mesure
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Nos algorithmes adaptent ton ton, ton style, tes mots. Chaque échange est optimisé pour 
                reproduire ta façon unique de transmettre.
              </p>
              
              {/* Badge noir */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-semibold">
                ✨ Qualité Premium
              </div>
            </div>
          </div>

          {/* Carte 3 - Fiabilité garantie */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-blue-300 rounded-3xl p-8 hover:border-blue-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Emoji animé */}
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-2xl ">🏆</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fiabilité garantie
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Aucune info inventée. Tout est analysé, structuré et vérifié avant d'être utilisé. 
                Tu gardes le contrôle total sur ce que ton bot délivre.
              </p>
              
              {/* Badge noir */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-semibold">
                ✨ Qualité Premium
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FeaturesSection;