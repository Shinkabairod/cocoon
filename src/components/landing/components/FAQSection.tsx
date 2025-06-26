import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment mon bot peut-il vraiment refléter mon expertise ?",
      answer: "Ton bot s'entraîne sur tes contenus exclusifs : tes formations, articles, vidéos, méthodes. Il apprend ton vocabulaire, ton approche et tes solutions spécifiques. Plus tu alimentes sa base de connaissances, plus il devient précis et authentique."
    },
    {
      question: "Combien de temps faut-il pour configurer mon bot ?",
      answer: "La configuration de base prend 10-15 minutes. Tu peux commencer avec quelques documents et enrichir progressivement. Le bot s'améliore automatiquement à chaque interaction et mise à jour de contenu."
    },
    {
      question: "Puis-je contrôler ce que dit mon bot ?",
      answer: "Absolument ! Tu définis les limites, le ton, les sujets autorisés. Tu peux aussi réviser et approuver les réponses avant publication. Tu gardes un contrôle total sur ton image de marque."
    },
    {
      question: "Comment puis-je monétiser mon bot IA ?",
      answer: "Plusieurs options : consultations automatisées, vente de formations, support client premium, lead generation qualifiée. Le bot peut aussi recommander tes services payants au bon moment."
    },
    {
      question: "Mon bot peut-il s'intégrer à mes outils existants ?",
      answer: "Oui, nous proposons des intégrations avec les principales plateformes : sites web, réseaux sociaux, CRM, outils de messagerie. L'API permet aussi des intégrations personnalisées."
    },
    {
      question: "Que se passe-t-il si mon bot ne sait pas répondre ?",
      answer: "Il redirige intelligemment vers toi ou propose des alternatives. Tu peux aussi configurer des réponses par défaut et enrichir sa base de connaissances en continu."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre aligné à gauche */}
        <div className="text-left mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Tout ce que tu dois savoir pour transformer ton expertise en bot IA rentable
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="group relative">
              {/* Fond en relief */}
              <div className={`absolute inset-0 ${
                index % 3 === 0 
                  ? 'bg-gradient-to-r from-violet-50 to-violet-100' 
                  : index % 3 === 1 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
              } rounded-2xl transform ${
                index % 2 === 0 ? 'rotate-0.5 group-hover:rotate-1' : '-rotate-0.5 group-hover:-rotate-1'
              } transition-transform duration-300`}></div>
              
              <div className={`relative bg-white border-2 ${
                index % 3 === 0 
                  ? 'border-violet-200 hover:border-violet-400' 
                  : index % 3 === 1 
                    ? 'border-blue-200 hover:border-blue-400'
                    : 'border-gray-200 hover:border-gray-400'
              } rounded-2xl transition-all duration-300 hover:shadow-lg`}>
                
                <button
                  className="w-full p-6 text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 ${
                      index % 3 === 0 
                        ? 'text-violet-600' 
                        : index % 3 === 1 
                          ? 'text-blue-600'
                          : 'text-gray-600'
                    }`}>
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className={`border-t ${
                      index % 3 === 0 
                        ? 'border-violet-100' 
                        : index % 3 === 1 
                          ? 'border-blue-100'
                          : 'border-gray-100'
                    } pt-4`}>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;