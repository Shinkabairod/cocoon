import React from 'react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Configure ton expertise",
      description: "Importe tes contenus, méthodes et ressources pour créer la base de connaissances de ton bot",
      color: "violet"
    },
    {
      number: "02", 
      title: "Personnalise ton assistant",
      description: "Définis ton ton, tes spécialités et la façon dont tu veux que ton bot interagisse",
      color: "blue"
    },
    {
      number: "03",
      title: "Déploie et monétise",
      description: "Lance ton bot sur tes canaux et commence à générer des revenus automatisés",
      color: "violet"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre aligné à gauche */}
        <div className="text-left mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Trois étapes simples pour transformer ton expertise en revenus automatisés
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Fond en relief */}
              <div className={`absolute inset-0 ${
                step.color === 'violet' 
                  ? 'bg-gradient-to-r from-violet-50 to-violet-100' 
                  : 'bg-gradient-to-r from-blue-50 to-blue-100'
              } rounded-3xl transform ${
                index % 2 === 0 ? 'rotate-1 group-hover:rotate-2' : '-rotate-1 group-hover:-rotate-2'
              } transition-transform duration-300`}></div>
              
              <div className={`relative bg-white border-2 ${
                step.color === 'violet' 
                  ? 'border-violet-600 hover:border-violet-800' 
                  : 'border-blue-600 hover:border-blue-800'
              } rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                
                {/* Numéro de l'étape */}
                <div className={`w-16 h-16 ${
                  step.color === 'violet' ? 'bg-violet-50' : 'bg-blue-50'
                } rounded-2xl flex items-center justify-center mb-6 group-hover:${
                  step.color === 'violet' ? 'bg-violet-100' : 'bg-blue-100'
                } transition-colors duration-300`}>
                  <span className={`text-2xl font-bold ${
                    step.color === 'violet' ? 'text-violet-600' : 'text-blue-600'
                  }`}>
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Badge d'étape */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full ${
                  step.color === 'violet' 
                    ? 'bg-gradient-to-r from-violet-100 to-violet-200 text-violet-700' 
                    : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                } text-sm font-semibold`}>
                  Étape {step.number}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;