import React from 'react';
const HowItWorksSection: React.FC = () => {
  return <section className="bg-gradient-to-br from-gray-50 to-neutral-50 relative py-[40px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          
          
        </div>

        <div className="space-y-8">
          {/* Étape 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-purple-300 rounded-3xl p-8 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-6">
                {/* Numéro plus gros */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold">1.</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* Icon 2D simple */}
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-purple-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Crée ton profil</h3>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Renseigne tes compétences, ton domaine d'expertise et ajoute tes ressources (PDF, vidéos, textes). 
                    Notre IA analyse tout pour comprendre parfaitement ton univers et tes méthodes de travail.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-purple-600 rounded-3xl p-8 hover:border-purple-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-6">
                {/* Numéro plus gros */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold">2.</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* Icon 2D simple */}
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-purple-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Personnalise tes automations & bots</h3>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Notre IA analyse tes données et crée un assistant parfaitement adapté à ton expertise. 
                    Configure ses réponses, son style de communication et ses domaines d'intervention selon tes préférences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white border-2 border-purple-800 rounded-3xl p-8 hover:border-purple-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-6">
                {/* Numéro plus gros */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold">3.</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* Icon 2D simple */}
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-300 transition-colors duration-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-purple-800">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Génère tes premiers revenus</h3>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Ton bot gère tes clients 24/7, vend tes services et génère du contenu automatiquement. 
                    Il répond aux questions, propose tes solutions et convertit les visiteurs en clients payants sans que tu aies à intervenir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;